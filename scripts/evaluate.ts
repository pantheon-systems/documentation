import { execSync, execFileSync } from "child_process";
import { readFileSync, writeFileSync, unlinkSync, mkdirSync } from "fs";
import { join, basename, extname, dirname } from "path";
import { fileURLToPath } from "url";
import { AnthropicVertex } from "@anthropic-ai/vertex-sdk";
import { GoogleAuth } from "google-auth-library";
import matter from "gray-matter";
import tmp from "tmp";

const TODAY = new Date().toISOString().slice(0, 10);
const BATCH_SIZE = 50;
const MODEL = "claude-sonnet-4-6";
const REPO = "pantheon-systems/documentation";
const REMOTE = process.env.GIT_REMOTE ?? "origin";

// ── Types ─────────────────────────────────────────────────────────────────────

interface StaleSection {
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
  stale_sections: StaleSection[];
  oldest_stale_days_since_review: number | null;
  related_issues: number[];
}

interface DateAuditResult {
  file: string;
  staleness_source: "frontmatter" | "git";
  date: string;
  days_since_review: number;
  related_issues: number[];
}

type AuditResult = InlineAuditResult | DateAuditResult;

interface GithubIssue {
  number: number;
  title: string;
  body: string;
}

interface IssueClassification {
  issue_number: number;
  relationship: "fixes" | "should_fix" | "related";
}

interface LineChange {
  line_start: number;
  line_end: number;
  replacement: string;
  reason: string;
  confidence?: "high" | "low";
}

interface ReviewToolInput {
  action: "bump_date" | "update_content";
  confidence: "high" | "low";
  reason: string;
  resolution: string;
  confidence_reason: string;
  deprecation_note?: string;
  changes: LineChange[];
}

// ── Tool definition ───────────────────────────────────────────────────────────

const REVIEW_TOOL = {
  name: "submit_review",
  description:
    "Submit documentation review results with line-level changes. For bump_date, changes must be an empty array — dates are applied programmatically.",
  input_schema: {
    type: "object" as const,
    required: ["action", "confidence", "reason", "resolution", "confidence_reason", "changes"],
    properties: {
      action: {
        type: "string",
        enum: ["bump_date", "update_content"],
        description:
          "bump_date if content is still accurate (only the review date needs updating). update_content if specific information is outdated.",
      },
      confidence: {
        type: "string",
        enum: ["high", "low"],
        description:
          'Set "low" if: more than 5 lines would change, you cannot verify whether specific versions or third-party behavior is still current, or the topic changes rapidly.',
      },
      reason: {
        type: "string",
        description:
          "What is outdated and why — the assessment. For bump_date, confirm why the content is still accurate. Format as GitHub-flavored markdown: use numbered lists (1. item), bullet lists (- item), **bold**, paragraphs separated by blank lines. Do not use heading syntax.",
      },
      resolution: {
        type: "string",
        description:
          "What should be done to resolve the staleness. For bump_date, state that no content changes are needed. For update_content, describe specifically what needs updating. Format as GitHub-flavored markdown: numbered or bullet lists, **bold** for emphasis, paragraphs separated by blank lines. Do not use heading syntax.",
      },
      confidence_reason: {
        type: "string",
        description:
          "One or two sentences explaining the confidence rating. For low: cite the specific reason (e.g. more than 5 lines changed, cannot verify third-party behavior, training data cutoff). For high: state why the assessment is reliable. Plain prose only — no markdown lists or headings.",
      },
      deprecation_note: {
        type: "string",
        description:
          "Optional. Include only when the document may be a candidate for deprecation, archiving, or removal — for example, when the underlying product/feature no longer exists, the ecosystem has changed so dramatically that the doc is fundamentally misleading, or the content is so outdated it would be less effort to remove than to fix. One or two sentences explaining why removal might be worth considering. Leave absent if the doc should simply be updated.",
      },
      changes: {
        type: "array",
        description:
          "Line-level changes to apply. MUST be [] for bump_date. Line numbers match those shown in the file content.",
        items: {
          type: "object",
          required: ["line_start", "line_end", "replacement", "reason"],
          properties: {
            line_start: {
              type: "number",
              description: "First line to replace (1-indexed, inclusive)",
            },
            line_end: {
              type: "number",
              description: "Last line to replace (1-indexed, inclusive)",
            },
            replacement: {
              type: "string",
              description:
                "Replacement text. Use empty string to delete lines.",
            },
            reason: { type: "string" },
            confidence: { type: "string", enum: ["high", "low"] },
          },
        },
      },
    },
  },
};

const SYSTEM_PROMPT = `You are a technical documentation reviewer for Pantheon, a WordPress and Drupal hosting platform. Evaluate whether documentation is still accurate given how long it has been since it was last reviewed.

HARD RULES — violating these will break the documentation site:
1. NEVER modify any heading line (lines starting with # characters). Headings generate anchor links cross-referenced from other docs. Changing them silently breaks incoming links.
2. NEVER change the position or format of <ReviewDate /> components. These are handled programmatically — do not include them in changes[].
3. NEVER add or remove sections.
4. Make the minimum viable change. If content is conceptually correct but slightly dated in phrasing, prefer bump_date over rewriting prose.
5. Set confidence: "low" if: more than 5 lines would change, you cannot verify whether specific version numbers or third-party behavior is current, or the content covers rapidly-changing topics (plugin compatibility, CVEs, external service APIs). The confidence rating is independent of how many changes are needed — include all line changes you have identified in changes[] regardless of scope. confidence: "low" tells human reviewers to scrutinize the PR carefully before merging; it does not mean limiting or omitting changes.

For bump_date: the changes array MUST be empty []. Dates are applied programmatically.
For update_content: return only the specific lines that need to change, not unchanged surrounding lines.

When evaluating content about third-party plugin versions, security advisories, or external service behavior that may have changed after your last training update, flag confidence: "low".

If the document is a strong candidate for deprecation, archiving, or removal — because the underlying product no longer exists, the ecosystem has changed so fundamentally that updating would be misleading, or the content is so outdated it would be less effort to remove than fix — populate the deprecation_note field. This is especially relevant for low-confidence items. The final decision rests with human reviewers; your role is to surface the possibility.`;

// ── Content helpers ───────────────────────────────────────────────────────────

function addLineNumbers(content: string): string {
  return content
    .split("\n")
    .map((line, i) => `${i + 1}: ${line}`)
    .join("\n");
}


function bumpFrontmatterDate(content: string): string {
  // Update existing reviewed: field
  if (/^reviewed:/m.test(content)) {
    return content.replace(
      /^(reviewed:\s*)["']?[\d-]*["']?/m,
      `$1"${TODAY}"`
    );
  }
  // No reviewed: field (git-fallback files) — insert before closing frontmatter ---
  return content.replace(/^---\s*$/m, `reviewed: "${TODAY}"\n---`);
}

function bumpInlineReviewDates(
  content: string,
  staleHeadings: string[]
): string {
  const lines = content.split("\n");

  for (const heading of staleHeadings) {
    let headingIdx = -1;
    for (let i = 0; i < lines.length; i++) {
      const m = lines[i].match(/^#{1,6}\s+(.+)/);
      if (m && m[1].trim() === heading) {
        headingIdx = i;
        break;
      }
    }
    if (headingIdx === -1) continue;

    // ReviewDate appears within a few lines of the heading
    for (
      let i = headingIdx + 1;
      i < Math.min(headingIdx + 5, lines.length);
      i++
    ) {
      if (/<ReviewDate date="[^"]+"\s*\/>/.test(lines[i])) {
        lines[i] = lines[i].replace(
          /<ReviewDate date="[^"]+"\s*\/>/,
          `<ReviewDate date="${TODAY}" />`
        );
        break;
      }
    }
  }

  return lines.join("\n");
}

function applyLineChanges(content: string, changes: LineChange[]): string {
  if (changes.length === 0) return content;

  const lines = content.split("\n");
  // Apply bottom-up so prior line numbers stay valid
  const sorted = [...changes].sort((a, b) => b.line_start - a.line_start);

  for (const change of sorted) {
    const start = change.line_start - 1; // 0-indexed
    const deleteCount = change.line_end - change.line_start + 1;
    const replacementLines =
      change.replacement === "" ? [] : change.replacement.split("\n");
    lines.splice(start, deleteCount, ...replacementLines);
  }

  return lines.join("\n");
}

// ── Git / PR helpers ──────────────────────────────────────────────────────────

function slugifyPath(filePath: string): string {
  return basename(filePath, extname(filePath))
    .replace(/[^a-z0-9]+/gi, "-")
    .toLowerCase();
}

function getOpenPRSlugs(): Set<string> {
  try {
    const output = execSync(
      "gh pr list --repo pantheon-systems/documentation --state open --json headRefName --limit 200",
      { encoding: "utf8" }
    );
    const prs = JSON.parse(output) as Array<{ headRefName: string }>;
    const slugs = new Set<string>();
    for (const pr of prs) {
      const match = pr.headRefName.match(/^docs-audit\/\d{4}-\d{2}-\d{2}-(.+)$/);
      if (match) slugs.add(match[1]);
    }
    return slugs;
  } catch {
    return new Set();
  }
}

// Resolves relative to this file's location (scripts/) regardless of cwd
const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const CLASSIFY_TOOL = {
  name: "classify_issues",
  description: "Classify the relationship between the PR and each related issue",
  input_schema: {
    type: "object" as const,
    required: ["classifications"],
    properties: {
      classifications: {
        type: "array",
        items: {
          type: "object",
          required: ["issue_number", "relationship"],
          properties: {
            issue_number: { type: "number" },
            relationship: {
              type: "string",
              enum: ["fixes", "should_fix", "related", "unrelated"],
              description:
                '"fixes": PR directly resolves the issue. "should_fix": PR is related and should be expanded to address this issue. "related": loosely related but PR does not fix it. "unrelated": no meaningful connection.',
            },
          },
        },
      },
    },
  },
};

async function classifyIssues(
  issueNumbers: number[],
  docTitle: string,
  docUrl: string,
  review: ReviewToolInput,
  client: AnthropicVertex
): Promise<IssueClassification[]> {
  if (issueNumbers.length === 0) return [];

  // Fetch issue details
  const issues: { number: number; title: string; body: string }[] = [];
  for (const num of issueNumbers) {
    try {
      const out = execFileSync(
        "gh", ["issue", "view", String(num), "--repo", REPO, "--json", "number,title,body"],
        { encoding: "utf8" }
      );
      issues.push(JSON.parse(out));
    } catch { /* skip if unavailable */ }
  }
  if (issues.length === 0) return [];

  const issueList = issues
    .map((i) => `Issue #${i.number}: ${i.title}\n${(i.body ?? "").slice(0, 800)}`)
    .join("\n\n---\n\n");

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 1024,
    tools: [CLASSIFY_TOOL],
    tool_choice: { type: "any" },
    messages: [{
      role: "user",
      content: [
        `Document: [${docTitle}](${docUrl})`,
        `PR action: ${review.action}`,
        `PR notes: ${review.reason.slice(0, 600)}`,
        ``,
        `Classify the relationship between this PR and each open issue:`,
        ``,
        issueList,
      ].join("\n"),
    }],
  });

  const toolUse = response.content.find((b) => b.type === "tool_use");
  if (!toolUse || toolUse.type !== "tool_use") return [];

  const input = toolUse.input as { classifications: IssueClassification[] };
  return input.classifications.filter((c) => c.relationship !== "unrelated");
}

function safeRepoPath(relativePath: string): string {
  const resolved = join(REPO_ROOT, relativePath);
  if (!resolved.startsWith(REPO_ROOT + "/")) {
    throw new Error(`Path traversal rejected: ${relativePath}`);
  }
  return resolved;
}

function parseOlderThanDays(arg: string): number {
  const m = arg.match(/^(\d+)m$/);
  if (!m) throw new Error(`Invalid --older-than format "${arg}" — use e.g. 12m, 6m, 24m`);
  return parseInt(m[1], 10) * 30;
}

function fetchRelatedIssuesForFile(relPath: string): number[] {
  const slug = slugifyPath(relPath);
  try {
    const out = execFileSync(
      "gh", ["issue", "list", "--repo", REPO, "--state", "open", "--search", slug, "--json", "number", "--limit", "20"],
      { encoding: "utf8" }
    );
    return (JSON.parse(out) as Array<{ number: number }>).map((i) => i.number);
  } catch {
    return [];
  }
}

function fileIsInReview(relPath: string): boolean {
  const slug = slugifyPath(relPath);
  try {
    const out = execFileSync(
      "gh", ["issue", "list", "--repo", REPO, "--state", "open", "--label", "Process: In Review", "--search", slug, "--json", "number", "--limit", "1"],
      { encoding: "utf8" }
    );
    return (JSON.parse(out) as Array<{ number: number }>).length > 0;
  } catch {
    return false;
  }
}

function buildAuditResultForFile(relPath: string): AuditResult {
  const filePath = safeRepoPath(relPath);
  const raw = readFileSync(filePath, "utf8");
  const { data: frontmatter, content } = matter(raw);
  const related_issues = fetchRelatedIssuesForFile(relPath);

  const hasInline = /<ReviewDate date="[^"]+"\s*\/>/.test(content);

  if (hasInline) {
    const lines = content.split("\n");
    const sections: StaleSection[] = [];

    for (let i = 0; i < lines.length; i++) {
      const match = lines[i].match(/<ReviewDate date="([^"]+)"\s*\/>/);
      if (!match) continue;

      const date = match[1];
      let heading = "(unknown section)";
      let headingIdx = -1;
      let headingLevel = 0;

      for (let j = i - 1; j >= 0; j--) {
        const m = lines[j].match(/^(#{1,6})\s+(.+)/);
        if (m) { heading = m[2].trim(); headingIdx = j; headingLevel = m[1].length; break; }
      }

      let endIdx = lines.length;
      for (let k = (headingIdx >= 0 ? headingIdx : i) + 1; k < lines.length; k++) {
        const m = lines[k].match(/^(#{1,6})\s+/);
        if (m && m[1].length <= headingLevel) { endIdx = k; break; }
      }

      sections.push({
        heading,
        date,
        days_since_review: Math.floor((Date.now() - new Date(date).getTime()) / 86400000),
        line_start: (headingIdx >= 0 ? headingIdx : i) + 1,
        line_end: endIdx,
      });
    }

    const reviewed = frontmatter.reviewed;
    const frontmatterDate = reviewed instanceof Date
      ? reviewed.toISOString().slice(0, 10)
      : typeof reviewed === "string" && reviewed.trim() ? reviewed.trim() : null;

    const oldest = [...sections].sort((a, b) => b.days_since_review - a.days_since_review)[0];

    return {
      file: relPath,
      staleness_source: "inline",
      frontmatter_date: frontmatterDate,
      frontmatter_days_since_review: frontmatterDate
        ? Math.floor((Date.now() - new Date(frontmatterDate).getTime()) / 86400000)
        : null,
      stale_sections: sections,
      oldest_stale_days_since_review: oldest?.days_since_review ?? null,
      related_issues,
    };
  }

  const reviewed = frontmatter.reviewed;
  const date = reviewed instanceof Date
    ? reviewed.toISOString().slice(0, 10)
    : typeof reviewed === "string" && reviewed.trim()
      ? reviewed.trim()
      : null;

  return {
    file: relPath,
    staleness_source: date ? "frontmatter" : "git",
    date: date ?? TODAY,
    days_since_review: date
      ? Math.floor((Date.now() - new Date(date).getTime()) / 86400000)
      : 0,
    related_issues,
  };
}

function fileIsStale(result: AuditResult, thresholdDays: number): boolean {
  if (result.staleness_source === "inline") {
    return result.stale_sections.some((s) => s.days_since_review > thresholdDays);
  }
  return result.days_since_review > thresholdDays;
}

function getCurrentBranch(): string {
  return execSync("git rev-parse --abbrev-ref HEAD", {
    encoding: "utf8",
  }).trim();
}

function hasTrackedChanges(): boolean {
  const status = execSync("git status --porcelain", { encoding: "utf8" });
  return status.split("\n").some((line) => line.length > 0 && !line.startsWith("??"));
}

function staleDaysFor(result: AuditResult): number {
  if (result.staleness_source === "inline") {
    return result.oldest_stale_days_since_review ?? 0;
  }
  return result.days_since_review;
}

function docMetadata(filePath: string): { title: string; url: string } {
  const raw = readFileSync(filePath, "utf8");
  const { data } = matter(raw);

  const title = (data.title as string | undefined) ?? basename(filePath, extname(filePath));

  let urlPath: string;
  if (data.permalink) {
    // permalink is like "docs/guides/backups/create-backups" — strip leading "docs/"
    urlPath = (data.permalink as string).replace(/^docs\//, "");
  } else {
    // derive from file path: src/source/content/foo/bar.md → foo/bar
    urlPath = filePath
      .replace(/.*src\/source\/content\//, "")
      .replace(/\.md$/, "");
  }

  return { title, url: `https://docs.pantheon.io/${urlPath}` };
}

function buildPRContent(
  result: AuditResult,
  review: ReviewToolInput,
  issueClassifications: IssueClassification[] = []
): { title: string; body: string } {
  const filePath = safeRepoPath(result.file);
  const { title: docTitle, url } = docMetadata(filePath);

  const reviewDate =
    result.staleness_source === "inline"
      ? result.oldest_stale_date ?? "unknown"
      : result.date;

  const confidenceLabel =
    review.confidence === "high" ? "High" : "Low ⚠️";

  const deprecationSection = review.deprecation_note
    ? [``, `## ⚠️ Deprecation consideration`, ``, review.deprecation_note]
    : [];

  const fixes = issueClassifications.filter((c) => c.relationship === "fixes");
  const shouldFix = issueClassifications.filter((c) => c.relationship === "should_fix");
  const related = issueClassifications.filter((c) => c.relationship === "related");

  const issueSection = (fixes.length + shouldFix.length + related.length) > 0
    ? [
        ``,
        `## Related issues`,
        ``,
        ...fixes.map((c) => `Fixes #${c.issue_number}`),
        ...related.map((c) => `Possibly related to #${c.issue_number}`),
        ...(shouldFix.length > 0 ? [
          ``,
          `> ⚠️ The following issue(s) are related and this PR should be expanded to address them before merging:`,
          ...shouldFix.map((c) => `> - #${c.issue_number}`),
        ] : []),
      ]
    : [];

  const body = [
    `[${docTitle}](${url})`,
    `Date: ${reviewDate}`,
    `Days since last review: ${staleDaysFor(result)}`,
    `Confidence rating: ${confidenceLabel}`,
    ``,
    `## Review notes`,
    ``,
    review.reason,
    ``,
    `*Confidence: ${confidenceLabel} — ${review.confidence_reason}*`,
    ``,
    `## Suggested resolution`,
    ``,
    review.resolution,
    ...deprecationSection,
    ...issueSection,
  ].join("\n");

  return { title: `[Update Stale] ${docTitle}`, body };
}

function applyReview(
  raw: string,
  result: AuditResult,
  review: ReviewToolInput
): string {
  if (result.staleness_source === "inline") {
    const staleHeadings = result.stale_sections.map((s) => s.heading);
    const withContent =
      review.action === "update_content"
        ? applyLineChanges(raw, review.changes)
        : raw;
    return bumpInlineReviewDates(withContent, staleHeadings);
  }

  // frontmatter or git — always bump the reviewed: date
  const withContent =
    review.action === "update_content"
      ? applyLineChanges(raw, review.changes)
      : raw;
  return bumpFrontmatterDate(withContent);
}

function generateDiff(original: string, updated: string, label: string): string {
  const orig = tmp.fileSync({ prefix: "audit-orig-", discardDescriptor: true }).name;
  const upd = tmp.fileSync({ prefix: "audit-upd-", discardDescriptor: true }).name;
  writeFileSync(orig, original);
  writeFileSync(upd, updated);
  try {
    // diff exits 1 when files differ — expected, not an error
    return execFileSync(
      "diff",
      ["-u", "--label", `a/${label}`, "--label", `b/${label}`, orig, upd],
      { encoding: "utf8", maxBuffer: 10 * 1024 * 1024 }
    );
  } catch (err: any) {
    return err.stdout ?? "";
  } finally {
    try { unlinkSync(orig); unlinkSync(upd); } catch {}
  }
}

function writeDryRunFile(
  result: AuditResult,
  review: ReviewToolInput,
  raw: string,
  updated: string,
  issueClassifications: IssueClassification[] = []
): void {
  const DRY_RUN_DIR = join(dirname(fileURLToPath(import.meta.url)), "dry-run");
  mkdirSync(DRY_RUN_DIR, { recursive: true });

  const slug = slugifyPath(result.file);
  const { title, body } = buildPRContent(result, review, issueClassifications);
  const diff = generateDiff(raw, updated, result.file);

  const content = [
    `# ${title}`,
    ``,
    body,
    ``,
    `## Diff`,
    ``,
    "```diff",
    diff.trimEnd(),
    "```",
  ].join("\n");

  const outPath = join(DRY_RUN_DIR, `${slug}.md`);
  writeFileSync(outPath, content, "utf8");
  console.error(`  ✓ dry-run/${slug}.md`);
}

function createBranchAndPR(
  result: AuditResult,
  updatedContent: string,
  review: ReviewToolInput,
  originalBranch: string,
  issueClassifications: IssueClassification[] = []
): void {
  const filePath = safeRepoPath(result.file);
  const slug = slugifyPath(result.file);
  const branchName = `docs-audit/${TODAY}-${slug}`;
  const { title, body } = buildPRContent(result, review, issueClassifications);
  const tmpBody = tmp.fileSync({ prefix: "pr-body-", postfix: ".md", discardDescriptor: true }).name;

  try {
    writeFileSync(tmpBody, body, "utf8");

    execFileSync("git", ["checkout", "-b", branchName, `${REMOTE}/main`], { stdio: "pipe" });

    writeFileSync(filePath, updatedContent, "utf8");
    execFileSync("git", ["add", filePath], { stdio: "pipe" });
    execFileSync("git", ["commit", "-m", title], { stdio: "pipe" });
    execFileSync("git", ["push", REMOTE, branchName], { stdio: "pipe" });

    execFileSync(
      "gh",
      ["pr", "create", "--repo", REPO, "--head", branchName, "--base", "main", "--title", title, "--body-file", tmpBody, "--draft", "--label", "automation: Claude 🤖"],
      { stdio: "inherit" }
    );

    console.error(`  ✓ PR created: ${branchName}`);
  } catch (err) {
    console.error(`  ✗ Failed for ${result.file}:`, (err as Error).message);
  } finally {
    try { unlinkSync(tmpBody); } catch {}
    execFileSync("git", ["checkout", originalBranch], { stdio: "pipe" });
  }
}

// ── Claude evaluation ─────────────────────────────────────────────────────────

async function evaluateFile(
  client: AnthropicVertex,
  result: AuditResult
): Promise<ReviewToolInput | null> {
  // Path relative to scripts/ parent (the repo root)
  const filePath = safeRepoPath(result.file);
  const raw = readFileSync(filePath, "utf8");

  let userContent: string;

  if (result.staleness_source === "inline") {
    const fileLines = raw.split("\n");

    const sectionBlocks = result.stale_sections
      .map((s) => {
        const sectionText = fileLines
          .slice(s.line_start - 1, s.line_end)
          .map((line, idx) => `${s.line_start + idx}: ${line}`)
          .join("\n");
        return [
          `### Section: "${s.heading}"`,
          `Last reviewed: ${s.date} (${s.days_since_review} days ago)`,
          `Line range in full file: ${s.line_start}–${s.line_end}`,
          ``,
          sectionText,
        ].join("\n");
      })
      .join("\n\n---\n\n");

    userContent = [
      `File: ${result.file}`,
      ``,
      `The following sections are stale and need accuracy evaluation. Line numbers shown are absolute references to the full file — use them in your changes[].`,
      ``,
      sectionBlocks,
      ``,
      `For each section: decide bump_date (content still accurate) or update_content (specific information is outdated). Return a single submit_review covering all sections.`,
    ].join("\n");
  } else {
    userContent = [
      `File: ${result.file}`,
      `Last reviewed: ${result.date} (${result.days_since_review} days ago)`,
      ``,
      `Evaluate whether this documentation is still accurate. Use bump_date if valid, update_content with minimum changes if not.`,
      ``,
      addLineNumbers(raw),
    ].join("\n");
  }

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    tools: [REVIEW_TOOL],
    tool_choice: { type: "any" },
    messages: [{ role: "user", content: userContent }],
  });

  const toolUse = response.content.find((b) => b.type === "tool_use");
  if (!toolUse || toolUse.type !== "tool_use") {
    console.error(`  [warn] No tool use in response for ${result.file}`);
    return null;
  }

  return toolUse.input as ReviewToolInput;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const auditFile =
    args.find((a, i) => args[i - 1] === "--audit") ?? join(REPO_ROOT, "audit-results.json");
  const dryRun = args.includes("--dry-run");
  const includeAll = args.includes("--all");
  const fileArg = args.find((a, i) => args[i - 1] === "--file");
  const olderThanArg = args.find((a, i) => args[i - 1] === "--older-than");
  const thresholdDays = olderThanArg ? parseOlderThanDays(olderThanArg) : 365;
  const limit = parseInt(
    args.find((a, i) => args[i - 1] === "--limit") ?? String(BATCH_SIZE),
    10
  );

  if (!process.env.GOOGLE_CLOUD_PROJECT) {
    console.error("Error: GOOGLE_CLOUD_PROJECT env var is required");
    process.exit(1);
  }

  if (!dryRun && hasTrackedChanges()) {
    console.error(
      "Working tree has uncommitted tracked changes. Commit or stash them first."
    );
    process.exit(1);
  }

  const originalBranch = getCurrentBranch();

  const googleAuth = process.env.VERTEX_CREDENTIALS
    ? new GoogleAuth({
        keyFile: process.env.VERTEX_CREDENTIALS,
        scopes: ["https://www.googleapis.com/auth/cloud-platform"],
      })
    : undefined;

  const client = new AnthropicVertex({
    projectId: process.env.GOOGLE_CLOUD_PROJECT,
    region: process.env.VERTEX_REGION ?? "us-east5",
    ...(googleAuth ? { googleAuth } : {}),
  });

  // ── Single-file mode ────────────────────────────────────────────────────────
  if (fileArg) {
    if (fileIsInReview(fileArg)) {
      console.error(`Warning: ${fileArg} has an open issue labeled "Process: In Review" — skipping.`);
      return;
    }
    const result = buildAuditResultForFile(fileArg);
    if (!includeAll && !fileIsStale(result, thresholdDays)) {
      console.error(`No changes needed — ${fileArg} is not stale.`);
      return;
    }
    console.error(`→ ${fileArg} [single-file mode]`);
    const review = await evaluateFile(client, result);
    if (!review) return;
    console.error(`  action=${review.action}  confidence=${review.confidence}`);
    const { title: docTitle, url: docUrl } = docMetadata(safeRepoPath(fileArg));
    const issueClassifications = await classifyIssues(
      result.related_issues ?? [],
      docTitle,
      docUrl,
      review,
      client
    );
    const raw = readFileSync(safeRepoPath(fileArg), "utf8");
    const updated = applyReview(raw, result, review);
    if (dryRun) { writeDryRunFile(result, review, raw, updated, issueClassifications); }
    else { createBranchAndPR(result, updated, review, originalBranch, issueClassifications); }
    return;
  }

  const openPRSlugs = getOpenPRSlugs();
  if (openPRSlugs.size > 0) {
    console.error(`Skipping ${openPRSlugs.size} file(s) with open PRs`);
  }

  const audit = JSON.parse(readFileSync(auditFile, "utf8"));
  const toProcess: AuditResult[] = (audit.results as AuditResult[])
    .filter((r) =>
      r.staleness_source === "inline"
        ? r.stale_sections.length > 0
        : r.days_since_review > thresholdDays
    )
    .filter((r) => !openPRSlugs.has(slugifyPath(r.file)))
    .sort((a, b) => staleDaysFor(b) - staleDaysFor(a))
    .slice(0, limit);

  console.error(
    `\nProcessing ${toProcess.length} files (dry-run: ${dryRun})\n`
  );

  // VERTEX_CREDENTIALS lets you point at a specific service account key without
  // overriding your global GOOGLE_APPLICATION_CREDENTIALS.
  for (const result of toProcess) {
    console.error(`→ ${result.file} [${staleDaysFor(result)}d stale]`);

    const review = await evaluateFile(client, result);
    if (!review) continue;

    console.error(
      `  action=${review.action}  confidence=${review.confidence}  changes=${review.changes.length}`
    );
    console.error(`  ${review.reason.slice(0, 120)}`);

    const { title: docTitle, url: docUrl } = docMetadata(safeRepoPath(result.file));
    const issueClassifications = await classifyIssues(
      result.related_issues ?? [],
      docTitle,
      docUrl,
      review,
      client
    );
    if (issueClassifications.length > 0) {
      console.error(`  issues: ${issueClassifications.map((c) => `#${c.issue_number}(${c.relationship})`).join(", ")}`);
    }

    const filePath = safeRepoPath(result.file);
    const raw = readFileSync(filePath, "utf8");
    const updated = applyReview(raw, result, review);

    if (dryRun) {
      writeDryRunFile(result, review, raw, updated, issueClassifications);
      console.error("");
      continue;
    }

    createBranchAndPR(result, updated, review, originalBranch, issueClassifications);
    console.error("");

    // Pace API calls
    await new Promise((r) => setTimeout(r, 1500));
  }

  console.error("Done.");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
