import { execFileSync } from "child_process";
import { mkdtempSync, rmSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DATA_DIR = join(REPO_ROOT, "src/source/data");
const TERMINUS_REPO = "pantheon-systems/terminus";

// Terminus commands.json mirrors Symfony Console's `list --format=json`
// output verbatim — no transform needed, so drift here means the source
// file changed shape, not a bug in this script.
interface CommandsJson {
  application: { name: string; version: string };
  commands: unknown[];
}

function ghToken(): string | undefined {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN;
  try {
    return execFileSync("gh", ["auth", "token"], { encoding: "utf8" }).trim();
  } catch {
    return undefined;
  }
}

async function githubFetch(url: string): Promise<Response> {
  const token = ghToken();
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "pantheon-systems-documentation-update-terminus-data",
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(`GitHub API request failed: ${res.status} ${res.statusText} — ${url}`);
  }
  return res;
}

async function fetchAllReleases(): Promise<unknown[]> {
  const releases: unknown[] = [];
  let page = 1;
  for (;;) {
    const res = await githubFetch(
      `https://api.github.com/repos/${TERMINUS_REPO}/releases?per_page=100&page=${page}`
    );
    const batch = (await res.json()) as unknown[];
    if (batch.length === 0) break;
    releases.push(...batch);
    if (batch.length < 100) break;
    page += 1;
  }
  return releases;
}

async function fetchLatestRelease(): Promise<{
  tag_name: string;
  assets: Array<{ name: string; browser_download_url: string }>;
}> {
  const res = await githubFetch(
    `https://api.github.com/repos/${TERMINUS_REPO}/releases/latest`
  );
  return res.json() as Promise<{
    tag_name: string;
    assets: Array<{ name: string; browser_download_url: string }>;
  }>;
}

async function downloadPhar(url: string, destPath: string): Promise<void> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to download terminus.phar: ${res.status} ${res.statusText}`);
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  writeFileSync(destPath, buffer);
}

function runTerminusListJson(pharPath: string): CommandsJson {
  const out = execFileSync("php", [pharPath, "list", "--format=json"], {
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  });
  return JSON.parse(out) as CommandsJson;
}

function writeJson(relPath: string, data: unknown): void {
  const fullPath = join(DATA_DIR, relPath);
  writeFileSync(fullPath, JSON.stringify(data, null, 2) + "\n");
  console.error(`Wrote ${relPath}`);
}

async function updateCommands(): Promise<void> {
  const latest = await fetchLatestRelease();
  const pharAsset = latest.assets.find((a) => a.name === "terminus.phar");
  if (!pharAsset) {
    throw new Error(`No terminus.phar asset found on release ${latest.tag_name}`);
  }

  const tmpDir = mkdtempSync(join(tmpdir(), "terminus-phar-"));
  const pharPath = join(tmpDir, "terminus.phar");
  try {
    await downloadPhar(pharAsset.browser_download_url, pharPath);
    const commandsJson = runTerminusListJson(pharPath);
    writeJson("commands.json", commandsJson);
    console.error(
      `commands.json: ${commandsJson.application.name} ${commandsJson.application.version} (${commandsJson.commands.length} commands)`
    );
  } finally {
    rmSync(tmpDir, { recursive: true, force: true });
  }
}

async function updateReleases(): Promise<void> {
  const releases = await fetchAllReleases();
  writeJson("terminusReleases.json", releases);
  console.error(`terminusReleases.json: ${releases.length} releases`);
}

async function main() {
  await updateCommands();
  await updateReleases();
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
