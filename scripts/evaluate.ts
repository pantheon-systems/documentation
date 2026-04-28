import { execSync, execFileSync } from "child_process";
import { readFileSync, writeFileSync, unlinkSync, mkdirSync } from "fs";
import { join, basename, extname } from "path";
import { tmpdir } from "os";
import { AnthropicVertex } from "@anthropic-ai/vertex-sdk";
import { GoogleAuth } from "google-auth-library";
import matter from "gray-matter";

const TODAY = new Date().toISOString().slice(0, 10);
const BATCH_SIZE = 50;
const MODEL = "claude-sonnet-4-6";
const REPO = "pantheon-systems/documentation";
const REMOTE = "pantheon";

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
}

interface DateAuditResult {
  file: string;
  staleness_source: "frontmatter" | "git";
  date: string;
  days_since_review: number;
}

type AuditResult = InlineAuditResult | DateAuditResult;

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
5. Set confidence: "low" if: more than 5 lines would change, you cannot verify whether specific version numbers or third-party behavior is current, or the content covers rapidly-changing topics (plugin compatibility, CVEs, external service APIs).

For bump_date: the changes array MUST be empty []. Dates are applied programmatically.
For update_content: return only the specific lines that need to change, not unchanged surrounding lines.

Your training cutoff is August 2025. When evaluating content about third-party plugin versions, security advisories, or external service behavior that may have changed after that date, flag confidence: "low".`;

// ── Content helpers ───────────────────────────────────────────────────────────

function addLineNumbers(content: string): string {
  return content
    .split("\n")
    .map((line, i) => `${i + 1}: ${line}`)
    .join("\n");
}


function bumpFrontmatterDate(content: string): string {
  // Handles: reviewed: "2023-01-01"  |  reviewed: 2023-01-01  |  reviewed: ""
  return content.replace(
    /^(reviewed:\s*)["']?[\d-]*["']?/m,
    `$1"${TODAY}"`
  );
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
  review: ReviewToolInput
): { title: string; body: string } {
  const filePath = join(process.cwd(), "..", result.file);
  const { title: docTitle, url } = docMetadata(filePath);

  const reviewDate =
    result.staleness_source === "inline"
      ? result.oldest_stale_date ?? "unknown"
      : result.date;

  const confidenceLabel =
    review.confidence === "high" ? "High" : "Low ⚠️";

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
  ].join("\n");

  return { title: `[Update Stale] ${docTitle}`, body };
}

function applyReview(
  raw: string,
  result: AuditResult,
  review: ReviewToolInput
): string {
  if (review.action === "bump_date") {
    if (result.staleness_source === "inline") {
      return bumpInlineReviewDates(
        raw,
        result.stale_sections.map((s) => s.heading)
      );
    }
    return bumpFrontmatterDate(raw);
  }
  return applyLineChanges(raw, review.changes);
}

function generateDiff(original: string, updated: string, label: string): string {
  const orig = join(tmpdir(), `audit-orig-${Date.now()}`);
  const upd = join(tmpdir(), `audit-upd-${Date.now()}`);
  writeFileSync(orig, original);
  writeFileSync(upd, updated);
  try {
    // diff exits 1 when files differ — that's expected, not an error
    return execSync(`diff -u --label "a/${label}" --label "b/${label}" "${orig}" "${upd}"`, {
      encoding: "utf8",
      stdio: "pipe",
      maxBuffer: 10 * 1024 * 1024, // 10MB — well above any realistic doc diff
    });
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
  updated: string
): void {
  const DRY_RUN_DIR = join(process.cwd(), "dry-run");
  mkdirSync(DRY_RUN_DIR, { recursive: true });

  const slug = slugifyPath(result.file);
  const { title, body } = buildPRContent(result, review);
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
  originalBranch: string
): void {
  const filePath = join(process.cwd(), "..", result.file);
  const slug = slugifyPath(result.file);
  const branchName = `docs-audit/${TODAY}-${slug}`;
  const { title, body } = buildPRContent(result, review);
  const tmpBody = join(tmpdir(), `pr-body-${Date.now()}.md`);

  try {
    writeFileSync(tmpBody, body, "utf8");

    execSync(`git checkout -b "${branchName}" ${REMOTE}/main 2>/dev/null`, {
      stdio: "pipe",
    });

    writeFileSync(filePath, updatedContent, "utf8");
    execSync(`git add "${filePath}"`, { stdio: "pipe" });
    execSync(`git commit -m "${title}"`, { stdio: "pipe" });
    execSync(`git push ${REMOTE} "${branchName}" 2>/dev/null`, {
      stdio: "pipe",
    });

    execSync(
      `gh pr create --repo ${REPO} --head "${branchName}" --base main --title "${title}" --body-file "${tmpBody}" --draft`,
      { stdio: "inherit" }
    );

    console.error(`  ✓ PR created: ${branchName}`);
  } catch (err) {
    console.error(`  ✗ Failed for ${result.file}:`, (err as Error).message);
  } finally {
    try { unlinkSync(tmpBody); } catch {}
    execSync(`git checkout "${originalBranch}" 2>/dev/null`, { stdio: "pipe" });
  }
}

// ── Claude evaluation ─────────────────────────────────────────────────────────

async function evaluateFile(
  client: AnthropicVertex,
  result: AuditResult
): Promise<ReviewToolInput | null> {
  // Path relative to scripts/ parent (the repo root)
  const filePath = join(process.cwd(), "..", result.file);
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
    args.find((a, i) => args[i - 1] === "--audit") ?? "../audit-results.json";
  const dryRun = args.includes("--dry-run");
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

  const audit = JSON.parse(readFileSync(auditFile, "utf8"));
  const toProcess: AuditResult[] = (audit.results as AuditResult[])
    .filter((r) =>
      r.staleness_source === "inline"
        ? r.stale_sections.length > 0
        : r.days_since_review > 365
    )
    .sort((a, b) => staleDaysFor(b) - staleDaysFor(a))
    .slice(0, limit);

  console.error(
    `\nProcessing ${toProcess.length} files (dry-run: ${dryRun})\n`
  );

  // VERTEX_CREDENTIALS lets you point at a specific service account key without
  // overriding your global GOOGLE_APPLICATION_CREDENTIALS.
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

  for (const result of toProcess) {
    console.error(`→ ${result.file} [${staleDaysFor(result)}d stale]`);

    const review = await evaluateFile(client, result);
    if (!review) continue;

    console.error(
      `  action=${review.action}  confidence=${review.confidence}  changes=${review.changes.length}`
    );
    console.error(`  ${review.reason.slice(0, 120)}`);

    const filePath = join(process.cwd(), "..", result.file);
    const raw = readFileSync(filePath, "utf8");
    const updated = applyReview(raw, result, review);

    if (dryRun) {
      writeDryRunFile(result, review, raw, updated);
      console.error("");
      continue;
    }

    createBranchAndPR(result, updated, review, originalBranch);
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
