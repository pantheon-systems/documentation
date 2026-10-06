#!/usr/bin/env node
// Report-only Vale measurement for the four-week labeling period.
//
//   added   Keep only alerts on lines a PR adds and write them as CSV (runs in CI).
//   weekly  Merge downloaded CSV artifacts into one labeling sheet (run locally).
//
// No dependencies, so CI doesn't need `npm ci` for it.

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
  appendFileSync,
} from "node:fs";
import { dirname, join } from "node:path";

const COLUMNS = [
  "pr",
  "head_sha",
  "generated_at",
  "file",
  "line",
  "rule",
  "severity",
  "match",
  "message",
  "line_text",
  "key",
];

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 2) {
    if (!argv[i].startsWith("--"))
      throw new Error(`Unexpected argument: ${argv[i]}`);
    args[argv[i].slice(2)] = argv[i + 1];
  }
  return args;
}

function csvCell(value) {
  let s = String(value ?? "");
  // Text from the PR lands in a spreadsheet; keep a leading = + - @ from being read as a formula.
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function toCsv(rows, columns) {
  return (
    [
      columns.join(","),
      ...rows.map((r) => columns.map((c) => csvCell(r[c])).join(",")),
    ].join("\n") + "\n"
  );
}

function parseCsv(text) {
  const rows = [];
  let row = [],
    cell = "",
    quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") {
      row.push(cell);
      cell = "";
    } else if (ch === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else if (ch !== "\r") cell += ch;
  }
  if (cell !== "" || row.length) {
    row.push(cell);
    rows.push(row);
  }
  const [header, ...body] = rows;
  return body.map((r) =>
    Object.fromEntries(header.map((h, i) => [h, r[i] ?? ""])),
  );
}

// The key ignores line numbers, so an edit above an alert doesn't make it look new.
function alertKey(file, rule, match, lineText) {
  return createHash("sha1")
    .update([file, rule, match, lineText.trim()].join("\u0000"))
    .digest("hex")
    .slice(0, 16);
}

// Added line numbers per file, from a zero-context diff against the merge base.
function addedLines(base, files) {
  const diff = execFileSync(
    "git",
    [
      "-c",
      "core.quotePath=false",
      "diff",
      "-U0",
      "--no-color",
      "--diff-filter=ACMR",
      `${base}...HEAD`,
      "--",
      ...files,
    ],
    {
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    },
  );
  const byFile = new Map();
  let current = null;
  for (const line of diff.split("\n")) {
    if (line.startsWith("+++ ")) {
      if (line.startsWith('+++ "')) {
        // Git still quotes paths with quotes or control characters; they can't be matched.
        console.error(`vale-measure: skipping quoted path ${line.slice(4)}`);
        current = null;
        continue;
      }
      // Git appends a tab to paths that contain spaces.
      current =
        line === "+++ /dev/null" ? null : line.slice(6).replace(/\t$/, "");
      if (current && !byFile.has(current)) byFile.set(current, new Set());
      continue;
    }
    const hunk = /^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/.exec(line);
    if (hunk && current) {
      const start = Number(hunk[1]);
      const count = hunk[2] === undefined ? 1 : Number(hunk[2]);
      for (let n = start; n < start + count; n++) byFile.get(current).add(n);
    }
  }
  return byFile;
}

function added(args) {
  for (const k of ["alerts", "base", "files", "out"])
    if (!args[k]) throw new Error(`--${k} is required`);
  const files = readFileSync(args.files, "utf8").split("\n").filter(Boolean);
  const alerts = JSON.parse(readFileSync(args.alerts, "utf8") || "{}");
  const lines = addedLines(args.base, files);
  const generatedAt = new Date().toISOString();
  const rows = [];
  for (const [file, list] of Object.entries(alerts)) {
    const keep = lines.get(file);
    if (!keep) continue;
    const text = readFileSync(file, "utf8").split("\n");
    for (const a of list) {
      if (!keep.has(a.Line)) continue;
      const lineText = text[a.Line - 1] ?? "";
      rows.push({
        pr: args.pr ?? "",
        head_sha: args.sha ?? "",
        generated_at: generatedAt,
        file,
        line: a.Line,
        rule: a.Check,
        severity: a.Severity,
        match: a.Match,
        message: a.Message,
        line_text: lineText.trim(),
        key: alertKey(file, a.Check, a.Match, lineText),
      });
    }
  }
  writeFileSync(args.out, toCsv(rows, COLUMNS));
  // Run metadata, written even when there are no alerts, so `weekly` can tell that a
  // later push fixed everything.
  writeFileSync(
    join(dirname(args.out), "vale-run.json"),
    JSON.stringify({
      pr: args.pr ?? "",
      head_sha: args.sha ?? "",
      generated_at: generatedAt,
      files: files.length,
      alerts: rows.length,
    }) + "\n",
  );

  const counts = {};
  for (const r of rows)
    counts[`${r.rule}\t${r.severity}`] =
      (counts[`${r.rule}\t${r.severity}`] ?? 0) + 1;
  const summary = [
    "### Vale alerts on added lines (report-only)",
    "",
    `${rows.length} alerts across ${files.length} changed file(s). Nothing here fails the check during the four-week measurement period.`,
    "",
    "| Rule | Severity | Alerts |",
    "|---|---|---|",
    ...Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([k, n]) => `| ${k.replace("\t", " | ")} | ${n} |`),
    "",
  ].join("\n");
  if (args.summary) appendFileSync(args.summary, summary + "\n");
  else process.stdout.write(summary + "\n");
}

// One row per alert per PR. `at_final_run` says whether the alert was still there in the
// PR's last measured run; the labeler fills `label` (TP or FP) and `notes`.
function weekly(args) {
  for (const k of ["in", "out"])
    if (!args[k]) throw new Error(`--${k} is required`);
  // Each artifact directory holds one run: vale-run.json plus vale-added-lines.csv.
  const metas = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      if (statSync(p).isDirectory()) walk(p);
      else if (name === "vale-run.json") metas.push(p);
    }
  };
  walk(args.in);

  const runs = new Map(); // pr -> [{generatedAt, rows}]
  for (const p of metas) {
    const meta = JSON.parse(readFileSync(p, "utf8"));
    const rows = parseCsv(
      readFileSync(join(dirname(p), "vale-added-lines.csv"), "utf8"),
    );
    if (!runs.has(meta.pr)) runs.set(meta.pr, []);
    runs.get(meta.pr).push({ generatedAt: meta.generated_at, rows });
  }

  const sheet = [];
  for (const [pr, list] of runs) {
    list.sort((a, b) => a.generatedAt.localeCompare(b.generatedAt));
    const finalKeys = new Set(list[list.length - 1].rows.map((r) => r.key));
    const seen = new Map();
    for (const run of list)
      for (const r of run.rows) if (!seen.has(r.key)) seen.set(r.key, r);
    for (const r of seen.values()) {
      sheet.push({
        ...r,
        pr,
        runs: list.length,
        at_final_run: finalKeys.has(r.key) ? "present" : "gone",
        label: "",
        notes: "",
      });
    }
  }
  writeFileSync(
    args.out,
    toCsv(sheet, [...COLUMNS, "runs", "at_final_run", "label", "notes"]),
  );
  const zero = [...runs.values()].filter((l) =>
    l.every((r) => !r.rows.length),
  ).length;
  console.log(`${zero} PR(s) had no alerts on added lines in any run.`);
  console.log(
    `${sheet.length} alerts from ${runs.size} PR(s), ${metas.length} run(s) -> ${args.out}`,
  );
}

const [command, ...rest] = process.argv.slice(2);
const commands = { added, weekly };
if (!commands[command]) {
  console.error(
    "Usage: vale-measure.mjs added --alerts <json> --base <sha> --files <list> --out <csv> [--pr N --sha SHA --summary FILE]",
  );
  console.error(
    "       vale-measure.mjs weekly --in <artifact dir> --out <csv>",
  );
  process.exit(2);
}
commands[command](parseArgs(rest));
