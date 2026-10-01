const REPOSITORY = "pantheon-systems/documentation";
const GITHUB_PR_PATTERN = /^https:\/\/github\.com\/pantheon-systems\/documentation\/pull\/(\d+)(?:\/[^?#]*)?(?:[?#].*)?$/;
const inFlight = new Set();
const handledUrls = new Map();
const handledPrs = new Map();

function parsePullRequestNumber(url) {
  const match = url.match(GITHUB_PR_PATTERN);
  return match ? Number(match[1]) : null;
}

function hasOptedOut(url) {
  try {
    return new URL(url).searchParams.get("pantheon_preview") === "off";
  } catch {
    return false;
  }
}

function encodePath(path) {
  return path.split("/").map(encodeURIComponent).join("/");
}

function extractPermalink(markdown) {
  const frontMatter = markdown.match(/^---\s*\r?\n([\s\S]*?)\r?\n---(?:\s*\r?\n|$)/);
  if (!frontMatter) return null;

  const line = frontMatter[1]
    .split(/\r?\n/)
    .find((entry) => /^\s*permalink\s*:/i.test(entry));
  if (!line) return null;

  let permalink = line.replace(/^\s*permalink\s*:\s*/i, "").trim();
  permalink = permalink.replace(/\s+#.*$/, "");
  permalink = permalink.replace(/^['"]|['"]$/g, "").trim();
  return permalink || null;
}


function headingSlug(text) {
  return text
    .replace(/^#{1,6}\s+/, "")
    .replace(/<[^>]*>/g, "")
    .replace(/[\u0060*_~]/g, "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function changedLineNumber(patch) {
  if (!patch) return null;

  let newLine = null;
  for (const line of patch.split("\n")) {
    const hunk = line.match(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/);
    if (hunk) {
      newLine = Number(hunk[1]);
      continue;
    }
    if (newLine === null) continue;

    if (line.startsWith("+") && !line.startsWith("+++")) {
      if (line.slice(1).trim()) return newLine;
      newLine += 1;
    } else if (line.startsWith("-")) {
      continue;
    } else {
      newLine += 1;
    }
  }
  return null;
}

function anchorForChange(file, markdown) {
  const lines = markdown.split(/\r?\n/);
  const targetLine = changedLineNumber(file.patch);
  if (!targetLine) return null;

  let index = Math.min(targetLine - 1, lines.length - 1);
  let headingIndex = -1;
  for (; index >= 0; index -= 1) {
    if (/^#{1,6}\s+\S/.test(lines[index])) {
      headingIndex = index;
      break;
    }
  }

  if (headingIndex < 0) {
    headingIndex = lines.findIndex((line) => /^#{1,6}\s+\S/.test(line));
  }
  if (headingIndex < 0) return null;

  const slug = headingSlug(lines[headingIndex]);
  if (!slug) return null;

  const priorSameHeadingCount = lines
    .slice(0, headingIndex)
    .filter((line) => headingSlug(line) === slug).length;
  return priorSameHeadingCount ? `${slug}-${priorSameHeadingCount}` : slug;
}

async function getJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json"
    }
  });
  if (!response.ok) {
    throw new Error(`${response.status} while fetching ${url}`);
  }
  return response.json();
}

async function getText(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${response.status} while fetching ${url}`);
  }
  return response.text();
}

async function resolvePreviewUrl(prNumber) {
  const pullRequest = await getJson(
    `https://api.github.com/repos/${REPOSITORY}/pulls/${prNumber}`
  );
  const headRepository = pullRequest.head?.repo?.full_name;
  const headRef = pullRequest.head?.ref;
  if (!headRepository || !headRef) return null;

  const files = await getJson(
    `https://api.github.com/repos/${REPOSITORY}/pulls/${prNumber}/files?per_page=100`
  );
  const markdownFiles = files.filter((file) =>
    file.status !== "removed" && /\.(md|mdx)$/i.test(file.filename)
  );

  const routes = [];
  for (const file of markdownFiles) {
    const rawUrl = `https://raw.githubusercontent.com/${encodePath(headRepository)}/${encodePath(headRef)}/${encodePath(file.filename)}`;
    try {
      const markdown = await getText(rawUrl);
      const permalink = extractPermalink(markdown);
      if (permalink) {
        routes.push({ permalink, anchor: anchorForChange(file, markdown) });
      }
    } catch (error) {
      console.warn("Could not read changed file", file.filename, error);
    }
  }

  const uniqueRoutes = [...new Map(routes.map((item) => [item.permalink, item])).values()];
  if (uniqueRoutes.length !== 1) return null;

  const route = uniqueRoutes[0].permalink.replace(/^\/+/, "");
  const anchor = uniqueRoutes[0].anchor ? `#${uniqueRoutes[0].anchor}` : "";
  return `https://pr-${prNumber}-pandocs.pantheonsite.io/${route}${anchor}`;
}

async function maybeRedirect(details) {
  if (details.frameId !== 0 || hasOptedOut(details.url)) return;

  const prNumber = parsePullRequestNumber(details.url);
  if (!prNumber || inFlight.has(details.tabId)) return;
  if (handledPrs.get(details.tabId) === prNumber) return;
  if (handledUrls.get(details.tabId) === details.url) return;

  handledPrs.set(details.tabId, prNumber);
  inFlight.add(details.tabId);
  try {
    const previewUrl = await resolvePreviewUrl(prNumber);
    if (previewUrl) {
      const sourceTab = await chrome.tabs.get(details.tabId);
      await chrome.action.setBadgeText({ tabId: details.tabId, text: "" });
      await chrome.tabs.create({
        url: previewUrl,
        active: false,
        openerTabId: details.tabId,
        windowId: sourceTab.windowId,
        index: sourceTab.index + 1
      });
      handledUrls.set(details.tabId, details.url);
    } else {
      handledPrs.delete(details.tabId);
      await chrome.action.setBadgeText({ tabId: details.tabId, text: "?" });
      await chrome.action.setBadgeBackgroundColor({ tabId: details.tabId, color: "#a15c00" });
    }
  } catch (error) {
    console.error("Pantheon PR preview resolution failed", error);
    handledPrs.delete(details.tabId);
    await chrome.action.setBadgeText({ tabId: details.tabId, text: "!" });
    await chrome.action.setBadgeBackgroundColor({ tabId: details.tabId, color: "#b42318" });
  } finally {
    inFlight.delete(details.tabId);
  }
}

chrome.webNavigation.onCommitted.addListener(maybeRedirect);
chrome.webNavigation.onHistoryStateUpdated.addListener(maybeRedirect);

chrome.tabs.onRemoved.addListener((tabId) => {
  inFlight.delete(tabId);
  handledUrls.delete(tabId);
  handledPrs.delete(tabId);
});
