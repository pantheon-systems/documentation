import { execSync } from "child_process";
import { readFileSync, readdirSync, statSync, writeFileSync } from "fs";
import { join, relative } from "path";
import matter from "gray-matter";

const CONTENT_DIR = join(process.cwd(), "src/source/content");
const STALE_THRESHOLD_DAYS = 365;

interface Section {
  heading: string;
  date: string;
  days_since_review: number;
  line_start: number;
  line_end: number;
}

interface InlineAuditResult {
  file: string;
  staleness_source: "inline";
  frontmatter_date: string | null;
  frontmatter_days_since_review: number | null;
  stale_sections: Section[];
  oldest_stale_date: string | null;
  oldest_stale_days_since_review: number | null;
}

interface DateAuditResult {
  file: string;
  staleness_source: "frontmatter" | "git";
  date: string;
  days_since_review: number;
}

type AuditResult = InlineAuditResult | DateAuditResult;

function daysSince(dateStr: string): number {
  const date = new Date(dateStr);
  const now = new Date();
  return Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
}

function normalizeDateField(val: unknown): string | null {
  if (!val) return null;
  if (val instanceof Date) return val.toISOString().slice(0, 10);
  if (typeof val === "string" && val.trim() !== "") return val.trim();
  return null;
}

function getGitDate(filepath: string): string | null {
  try {
    const result = execSync(`git log -1 --format="%ai" -- "${filepath}"`, {
      encoding: "utf8",
      cwd: process.cwd(),
    }).trim();
    return result || null;
  } catch {
    return null;
  }
}

function parseInlineSections(content: string): Section[] {
  const lines = content.split("\n");
  const sections: Section[] = [];

  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(/<ReviewDate date="([^"]+)"\s*\/>/);
    if (!match) continue;

    const date = match[1];
    let heading = "(unknown section)";
    let headingIdx = -1;
    let headingLevel = 0;

    for (let j = i - 1; j >= 0; j--) {
      const headingMatch = lines[j].match(/^(#{1,6})\s+(.+)/);
      if (headingMatch) {
        heading = headingMatch[2].trim();
        headingIdx = j;
        headingLevel = headingMatch[1].length;
        break;
      }
    }

    // Find end of section: next heading at same or higher level
    let endIdx = lines.length;
    const searchFrom = headingIdx >= 0 ? headingIdx + 1 : i + 1;
    for (let k = searchFrom; k < lines.length; k++) {
      const nextHeading = lines[k].match(/^(#{1,6})\s+/);
      if (nextHeading && nextHeading[1].length <= headingLevel) {
        endIdx = k;
        break;
      }
    }

    sections.push({
      heading,
      date,
      days_since_review: daysSince(date),
      line_start: (headingIdx >= 0 ? headingIdx : i) + 1, // 1-indexed
      line_end: endIdx, // 1-indexed exclusive (points at first line of next section)
    });
  }

  return sections;
}

function isStale(result: AuditResult): boolean {
  if (result.staleness_source === "inline") {
    return result.stale_sections.length > 0;
  }
  return result.days_since_review > STALE_THRESHOLD_DAYS;
}

function* walkFiles(dir: string): Generator<string> {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      yield* walkFiles(fullPath);
    } else if (entry.endsWith(".md")) {
      yield fullPath;
    }
  }
}

function auditFile(filepath: string): AuditResult | null {
  const raw = readFileSync(filepath, "utf8");
  const { data: frontmatter, content } = matter(raw);
  const relPath = relative(process.cwd(), filepath);

  const hasInline = /<ReviewDate date="[^"]+"\s*\/>/.test(content);
  const frontmatterDate = normalizeDateField(frontmatter.reviewed);

  if (hasInline) {
    const sections = parseInlineSections(content);
    const staleSections = sections
      .filter((s) => s.days_since_review > STALE_THRESHOLD_DAYS)
      .sort((a, b) => b.days_since_review - a.days_since_review);
    const oldest = staleSections.at(0) ?? null;

    return {
      file: relPath,
      staleness_source: "inline",
      frontmatter_date: frontmatterDate,
      frontmatter_days_since_review: frontmatterDate
        ? daysSince(frontmatterDate)
        : null,
      stale_sections: staleSections,
      oldest_stale_date: oldest?.date ?? null,
      oldest_stale_days_since_review: oldest?.days_since_review ?? null,
    };
  }

  if (frontmatterDate) {
    const days = daysSince(frontmatterDate);
    return {
      file: relPath,
      staleness_source: "frontmatter",
      date: frontmatterDate,
      days_since_review: days,
    };
  }

  const gitDate = getGitDate(filepath);
  if (!gitDate) return null;

  const days = daysSince(gitDate);
  return {
    file: relPath,
    staleness_source: "git",
    date: gitDate,
    days_since_review: days,
  };
}

function main() {
  const args = process.argv.slice(2);
  const outputIndex = args.indexOf("--output");
  const outputFile = outputIndex !== -1 ? args[outputIndex + 1] : null;
  const onlyStale = args.includes("--stale-only");

  const results: AuditResult[] = [];

  for (const filepath of walkFiles(CONTENT_DIR)) {
    const result = auditFile(filepath);
    if (!result) continue;
    if (onlyStale && !isStale(result)) continue;
    results.push(result);
  }

  results.sort((a, b) => {
    const aDays =
      a.staleness_source === "inline"
        ? (a.oldest_stale_days_since_review ?? 0)
        : a.days_since_review;
    const bDays =
      b.staleness_source === "inline"
        ? (b.oldest_stale_days_since_review ?? 0)
        : b.days_since_review;
    return bDays - aDays;
  });

  const staleCount = results.filter(isStale).length;

  const summary = {
    generated_at: new Date().toISOString(),
    total_files_audited: results.length,
    stale_count: staleCount,
    by_source: {
      inline: results.filter((r) => r.staleness_source === "inline").length,
      frontmatter: results.filter((r) => r.staleness_source === "frontmatter")
        .length,
      git: results.filter((r) => r.staleness_source === "git").length,
    },
  };

  const output = JSON.stringify({ summary, results }, null, 2);

  if (outputFile) {
    writeFileSync(outputFile, output);
    console.error(`Wrote ${results.length} results (${staleCount} stale) to ${outputFile}`);
  } else {
    console.log(output);
  }
}

main();
