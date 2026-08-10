/**
 * Refresh the machine-generated Terminus data files from a Terminus release.
 *
 * Writes:
 *   src/source/data/commands.json         <- `terminus.phar list --format=json`
 *   src/source/data/terminusReleases.json <- GitHub Releases API
 *
 * Deliberately does NOT touch src/source/content/terminus/02-install.md. The
 * Terminus 4 install tab uses a floating `releases/latest/download/` URL that
 * never needs bumping, and the only pinned URL left in that file belongs to the
 * legacy Terminus 3 tab, which must stay on 3.6.2.
 *
 * Usage:
 *   npx tsx scripts/terminus-docs.ts [--terminus-release=4.3.2] [--dry-run]
 */

import { execFileSync } from "child_process";
import {
  chmodSync,
  mkdirSync,
  rmSync,
  readFileSync,
  realpathSync,
  writeFileSync,
  existsSync,
} from "fs";
import { tmpdir } from "os";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DATA_DIR = join(REPO_ROOT, "src/source/data");
const COMMANDS_FILE = join(DATA_DIR, "commands.json");
const RELEASES_FILE = join(DATA_DIR, "terminusReleases.json");

const TERMINUS_REPO = "pantheon-systems/terminus";
const API_ROOT = "https://api.github.com";

/** Only stable semver tags. Excludes -rc.N pre-releases and junk tags (testtag, alpha, ...). */
const STABLE_TAG = /^\d+\.\d+\.\d+$/;

/**
 * How many stable releases to keep, newest first.
 *
 * The <Releases /> changelog only renders releases from the last year and
 * <TerminusVersion /> only reads entry 0, so an unbounded list is dead weight:
 * fetching every page yields 118 releases back to 0.5.0 (2015) and inflates the
 * file from 139 KB to 666 KB. The PHP tool this replaces kept 28 by accident --
 * it made a single unpaginated API call. 40 keeps well over a year of history
 * with room for the current ~2-4 week cadence.
 */
const KEEP_RELEASES = 40;

interface Release {
  tag_name: string;
  published_at?: string;
  assets?: { download_count?: number }[];
}

interface Command {
  name: string;
  help?: string;
}

interface CommandsFile {
  application: { name: string; version: string };
  commands: Command[];
  namespaces?: unknown;
}

function arg(name: string): string | undefined {
  const hit = process.argv
    .slice(2)
    .find((a) => a === `--${name}` || a.startsWith(`--${name}=`));
  if (!hit) return undefined;
  const [, value] = hit.split("=");
  return value ?? "";
}

function ghHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "pantheon-systems-documentation-terminus-docs",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  // Optional: avoids rate limiting locally and is always present in Actions.
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function ghJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: ghHeaders() });
  if (!res.ok) {
    throw new Error(`GitHub API ${res.status} ${res.statusText} for ${url}`);
  }
  return (await res.json()) as T;
}

/**
 * PHP's json_encode escapes forward slashes; JSON.stringify does not. The
 * committed terminusReleases.json was produced by PHP, so reproduce that
 * escaping to keep diffs limited to real content changes.
 */
function phpStyleJson(value: unknown, indent: number): string {
  return JSON.stringify(value, null, indent).replace(/\//g, "\\/");
}

async function latestTag(): Promise<string> {
  const release = await ghJson<Release>(
    `${API_ROOT}/repos/${TERMINUS_REPO}/releases/latest`,
  );
  if (!release.tag_name)
    throw new Error("Latest release response had no tag_name.");
  return release.tag_name;
}

/**
 * Fetch stable releases, newest first, until KEEP_RELEASES are collected.
 *
 * Paginated because a single page of raw releases is diluted by pre-releases and
 * junk tags, so page 1 alone does not reliably yield KEEP_RELEASES stable ones.
 */
async function recentStableReleases(): Promise<Release[]> {
  const stable: Release[] = [];
  for (let page = 1; page <= 10; page++) {
    const batch = await ghJson<Release[]>(
      `${API_ROOT}/repos/${TERMINUS_REPO}/releases?per_page=100&page=${page}`,
    );
    stable.push(...batch.filter((r) => STABLE_TAG.test(r.tag_name)));
    if (stable.length >= KEEP_RELEASES || batch.length < 100) break;
  }

  // GitHub orders by creation, which is not always publish order for old tags.
  stable.sort(
    (a, b) =>
      Date.parse(b.published_at ?? "") - Date.parse(a.published_at ?? ""),
  );
  return stable.slice(0, KEEP_RELEASES);
}

function currentVersions(): {
  commands: string | null;
  release: string | null;
} {
  let commands: string | null = null;
  let release: string | null = null;
  if (existsSync(COMMANDS_FILE)) {
    commands =
      (JSON.parse(readFileSync(COMMANDS_FILE, "utf8")) as CommandsFile)
        .application?.version ?? null;
  }
  if (existsSync(RELEASES_FILE)) {
    release =
      (JSON.parse(readFileSync(RELEASES_FILE, "utf8")) as Release[])[0]
        ?.tag_name ?? null;
  }
  return { commands, release };
}

function downloadPhar(tag: string): string {
  // Fixed directory name, not mkdtemp: Symfony bakes the script's absolute path
  // into the help text of the built-in `help`, `list` and `completion` commands,
  // so a random temp dir would churn those three strings on every run.
  const dir = join(tmpdir(), "terminus-docs");
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  const phar = join(dir, "terminus");
  const url = `https://github.com/${TERMINUS_REPO}/releases/download/${tag}/terminus.phar`;

  // curl over fetch here: -f fails loudly on a non-200 rather than writing an
  // error page to disk, and -L follows the release redirect to the CDN.
  execFileSync("curl", ["-fsSL", url, "--output", phar], {
    stdio: ["ignore", "ignore", "inherit"],
  });
  chmodSync(phar, 0o755);
  return phar;
}

function buildCommands(phar: string): string {
  const raw = execFileSync("php", [phar, "list", "--format=json"], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
    // Keep the dump deterministic and independent of the runner's own config.
    env: { ...process.env, TERMINUS_HIDE_UPDATE_MESSAGE: "1" },
  });

  const parsed = JSON.parse(raw) as CommandsFile;

  // Symfony interpolates the script's absolute path into the help text of the
  // built-in `help`, `list` and `completion` commands. That path differs between
  // macOS (/var/folders/...) and CI (/tmp/...), so normalize it to the command
  // name users actually type -- otherwise those three strings churn per machine.
  // Done on the parsed object, since PHP escapes the slashes in the raw JSON.
  // Both the given and symlink-resolved paths can appear (/var vs /private/var on
  // macOS), so replace the longest form first.
  const pharPaths = [...new Set([realpathSync(phar), phar])].sort(
    (a, b) => b.length - a.length,
  );
  for (const command of parsed.commands) {
    if (typeof command.help !== "string") continue;
    for (const pharPath of pharPaths) {
      command.help = command.help.split(pharPath).join("terminus");
    }
  }

  // `_complete` is a Symfony console internal; leaving it in breaks the docs
  // build in processTerminusCommandPages(). Note it is removed from commands[]
  // only -- the committed file still lists it under namespaces._global, so
  // leave namespaces alone to match.
  parsed.commands = parsed.commands.filter((c) => c.name !== "_complete");

  return (
    JSON.stringify(parsed, null, 2)
      .replace(/<site_env>/g, "<site>.<env>")
      .replace(/drush_command/g, "command")
      .replace(/wp_command/g, "command") + "\n"
  );
}

function buildReleases(releases: Release[]): string {
  for (const release of releases) {
    // Download counts churn on every run and would make every diff noisy.
    if (release.assets?.[0]?.download_count !== undefined) {
      release.assets[0].download_count = 0;
    }
  }
  // No trailing newline: matches the committed file.
  return phpStyleJson(releases, 4);
}

async function main(): Promise<void> {
  const dryRun = arg("dry-run") !== undefined;
  const tag = arg("terminus-release") || (await latestTag());
  console.log(`Terminus release: ${tag}`);

  const current = currentVersions();
  if (current.commands === tag && current.release === tag) {
    console.log(
      "commands.json and terminusReleases.json are already at this version; nothing to do.",
    );
    return;
  }
  console.log(
    `Current: commands.json=${current.commands}, terminusReleases.json=${current.release}`,
  );

  const releases = await recentStableReleases();
  console.log(
    `Keeping ${releases.length} stable releases (${releases[0]?.tag_name} … ${releases[releases.length - 1]?.tag_name}).`,
  );
  const releasesJson = buildReleases(releases);

  const phar = downloadPhar(tag);
  const commandsJson = buildCommands(phar);

  if (dryRun) {
    console.log("--dry-run: not writing files.");
    return;
  }

  writeFileSync(COMMANDS_FILE, commandsJson);
  writeFileSync(RELEASES_FILE, releasesJson);
  console.log(`Wrote ${COMMANDS_FILE}`);
  console.log(`Wrote ${RELEASES_FILE}`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
