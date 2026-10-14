#!/usr/bin/env node
// Regression test for the Vale rules that have fixtures in .vale/tests/.
//
//   node scripts/vale-test.mjs
//
// Each fixture marks the line it expects an alert on with a comment on the line above:
//
//   <!-- expect: Pantheon.OxfordComma -->
//   Back up your code, database and files.
//
// A line with no marker must produce no alert from the checked rules. Only the rules in
// CHECKED are compared, so unrelated rules can change without breaking these fixtures.
// Needs `vale sync` once (the Google package). No other dependencies.

import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const CHECKED = new Set([
  "Pantheon.OxfordComma",
  "Google.OxfordComma",
  "Pantheon.Headings",
]);
const DIR = ".vale/tests";
const EXPECT = /^<!--\s*expect:\s*([\w.,\s]+?)\s*-->\s*$/;

const files = readdirSync(DIR)
  .filter((f) => f.endsWith(".md"))
  .map((f) => join(DIR, f));
if (files.length === 0) throw new Error(`No fixtures in ${DIR}`);

// --no-exit: Vale exits 1 when it finds alerts, and these fixtures are meant to find some.
const out = JSON.parse(
  execFileSync("vale", ["--output=JSON", "--no-exit", ...files], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  }),
);

let failures = 0;
let checked = 0;
for (const file of files) {
  const lines = readFileSync(file, "utf8").split("\n");
  const expected = new Map(); // line number -> Set of rules
  let pending = null;
  lines.forEach((text, i) => {
    const m = EXPECT.exec(text.trim());
    if (m) {
      pending = new Set(m[1].split(/[,\s]+/).filter(Boolean));
    } else if (text.trim() !== "" && pending) {
      expected.set(i + 1, pending);
      pending = null;
    }
  });

  const actual = new Map();
  for (const a of out[file] ?? []) {
    if (!CHECKED.has(a.Check)) continue;
    if (!actual.has(a.Line)) actual.set(a.Line, new Set());
    actual.get(a.Line).add(a.Check);
  }

  const lineNumbers = new Set([...expected.keys(), ...actual.keys()]);
  for (const n of [...lineNumbers].sort((a, b) => a - b)) {
    const want = [...(expected.get(n) ?? [])].sort().join(",");
    const got = [...(actual.get(n) ?? [])].sort().join(",");
    if (want !== got) {
      failures++;
      console.error(
        `FAIL ${file}:${n}  expected [${want || "none"}]  got [${got || "none"}]\n     ${lines[n - 1].trim()}`,
      );
    }
  }
  checked += expected.size;
}

console.log(
  `${checked} expected alerts across ${files.length} fixtures, ${failures} mismatches`,
);
process.exit(failures ? 1 : 0);
