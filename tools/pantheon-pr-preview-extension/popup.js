const REPOSITORY = "pantheon-systems/documentation";
const LIVE_ORIGIN = "https://docs.pantheon.io";
const API_ORIGIN = "https://api.github.com";
const checks = [...document.querySelectorAll("input[data-check]")];
const context = document.querySelector("#context");
const notPr = document.querySelector("#not-pr");
const previewState = document.querySelector("#preview-state");
const previewMessage = document.querySelector("#preview-message");
const reviewPanel = document.querySelector("#review-panel");
const footer = document.querySelector("#footer");
const progress = document.querySelector("#progress");
const reset = document.querySelector("#reset");
const routeStatus = document.querySelector("#route-status");
const releaseCheck = document.querySelector("#release-check");
const slugCheck = document.querySelector("#slug-check");
const signals = document.querySelector("#signals");
const slugWarning = document.querySelector("#slug-warning");
const slugMessage = document.querySelector("#slug-message");
const releaseWarning = document.querySelector("#release-warning");
const openFiles = document.querySelector("#open-files");
const openPreview = document.querySelector("#open-preview");
const openLive = document.querySelector("#open-live");
const openMiddleware = document.querySelector("#open-middleware");
const retryPreview = document.querySelector("#retry-preview");

let currentTab = null;
let currentPr = null;
let currentStateKey = null;
let currentRoute = null;
let currentHeadRepository = REPOSITORY;
let currentHeadRef = "main";

function getPrNumber(url) {
  const match = url?.match(/^https:\/\/github\.com\/pantheon-systems\/documentation\/pull\/(\d+)/);
  return match ? match[1] : null;
}

function getPreviewNumber(url) {
  const match = url?.match(/^https:\/\/pr-(\d+)-pandocs\.pantheonsite\.io\//);
  return match ? match[1] : null;
}

function encodePath(path) {
  return path.split("/").map(encodeURIComponent).join("/");
}

function extractPermalink(markdown) {
  const frontMatter = markdown.match(/^---\s*\r?\n([\s\S]*?)\r?\n---(?:\s*\r?\n|$)/);
  if (!frontMatter) return null;
  const line = frontMatter[1].split(/\r?\n/).find((entry) => /^\s*permalink\s*:/i.test(entry));
  if (!line) return null;
  let permalink = line.replace(/^\s*permalink\s*:\s*/i, "").trim();
  permalink = permalink.replace(/\s+#.*$/, "").replace(/^[\'"]|[\'"]$/g, "").trim();
  return permalink || null;
}

function normalizeRoute(route) {
  if (!route) return null;
  return `/${route.replace(/^\/+/, "").replace(/\/+$/, "")}`;
}

function headingSlug(text) {
  return text.replace(/^#{1,6}\s+/, "").replace(/<[^>]*>/g, "").replace(/[\u0060*_~]/g, "")
    .normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}

function changedLineNumber(patch) {
  if (!patch) return null;
  let newLine = null;
  for (const line of patch.split("\n")) {
    const hunk = line.match(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/);
    if (hunk) { newLine = Number(hunk[1]); continue; }
    if (newLine === null) continue;
    if (line.startsWith("+") && !line.startsWith("+++")) {
      if (line.slice(1).trim()) return newLine;
      newLine += 1;
    } else if (!line.startsWith("-")) {
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
    if (/^#{1,6}\s+\S/.test(lines[index])) { headingIndex = index; break; }
  }
  if (headingIndex < 0) headingIndex = lines.findIndex((line) => /^#{1,6}\s+\S/.test(line));
  if (headingIndex < 0) return null;
  const slug = headingSlug(lines[headingIndex]);
  if (!slug) return null;
  const duplicate = lines.slice(0, headingIndex).filter((line) => headingSlug(line) === slug).length;
  return duplicate ? `${slug}-${duplicate}` : slug;
}

function isReleaseNote(filename, markdown = "") {
  const pathSignal = /(^|[\\/_-])(release[-_ ]?notes?|changelog|announcements?)([\\/_-]|$)/i.test(filename);
  return pathSignal || /release notes?/i.test(markdown.slice(0, 1200));
}

async function getJson(url) {
  const response = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
  if (!response.ok) throw new Error(`${response.status} while fetching GitHub data`);
  return response.json();
}

async function getText(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} while fetching source`);
  return response.text();
}

async function openAdjacent(url) {
  if (!currentTab || !url) return;
  await chrome.tabs.create({
    url,
    active: false,
    openerTabId: currentTab.id,
    windowId: currentTab.windowId,
    index: currentTab.index + 1
  });
}

function updateProgress() {
  const visibleChecks = checks.filter((input) => !input.closest("label").hidden);
  const complete = visibleChecks.filter((input) => input.checked).length;
  progress.textContent = `${complete} of ${visibleChecks.length} complete`;
}

function setRoute(route, anchor = null) {
  const normalized = normalizeRoute(route);
  currentRoute = normalized ? `${normalized}${anchor ? `#${anchor}` : ""}` : null;
  openPreview.disabled = !currentRoute;
  openLive.disabled = !currentRoute;
  routeStatus.hidden = false;
  routeStatus.textContent = currentRoute
    ? `Detected route: ${currentRoute}`
    : "No single changed permalink was detected for this PR.";
}

async function inspectPullRequest(prNumber) {
  const pullRequest = await getJson(`${API_ORIGIN}/repos/${REPOSITORY}/pulls/${prNumber}`);
  currentHeadRepository = pullRequest.head?.repo?.full_name || REPOSITORY;
  currentHeadRef = pullRequest.head?.ref || "main";
  const baseRepository = pullRequest.base?.repo?.full_name || REPOSITORY;
  const baseRef = pullRequest.base?.ref || "main";
  const files = await getJson(`${API_ORIGIN}/repos/${REPOSITORY}/pulls/${prNumber}/files?per_page=100`);
  const markdownFiles = files.filter((file) => file.status !== "removed" && /\.(md|mdx)$/i.test(file.filename));
  const routeCandidates = [];
  const slugChanges = [];
  let releaseNote = false;

  for (const file of markdownFiles) {
    const headUrl = `https://raw.githubusercontent.com/${encodePath(currentHeadRepository)}/${encodePath(currentHeadRef)}/${encodePath(file.filename)}`;
    const baseUrl = `https://raw.githubusercontent.com/${encodePath(baseRepository)}/${encodePath(baseRef)}/${encodePath(file.filename)}`;
    try {
      const headMarkdown = await getText(headUrl);
      const headPermalink = extractPermalink(headMarkdown);
      const anchor = anchorForChange(file, headMarkdown);
      if (headPermalink) routeCandidates.push({ route: headPermalink, anchor });
      releaseNote ||= isReleaseNote(file.filename, headMarkdown);
      let basePermalink = null;
      try { basePermalink = extractPermalink(await getText(baseUrl)); } catch { /* New files have no base copy. */ }
      if (normalizeRoute(basePermalink) !== normalizeRoute(headPermalink)) {
        slugChanges.push({ filename: file.filename, before: basePermalink, after: headPermalink });
      }
    } catch (error) {
      console.warn("Could not inspect changed file", file.filename, error);
    }
  }

  const uniqueRoutes = [...new Map(routeCandidates.map((item) => [normalizeRoute(item.route), item])).values()];
  const route = uniqueRoutes.length === 1 ? uniqueRoutes[0] : null;
  const previewUrl = route ? `https://pr-${prNumber}-pandocs.pantheonsite.io${normalizeRoute(route.route)}${route.anchor ? `#${route.anchor}` : ""}` : null;
  const liveUrl = route ? `${LIVE_ORIGIN}${normalizeRoute(route.route)}${route.anchor ? `#${route.anchor}` : ""}` : null;

  setRoute(route?.route, route?.anchor);
  releaseCheck.hidden = !releaseNote;
  releaseWarning.hidden = !releaseNote;
  slugCheck.hidden = slugChanges.length === 0;
  slugWarning.hidden = slugChanges.length === 0;
  signals.hidden = !releaseNote && slugChanges.length === 0;
  if (slugChanges.length) {
    const first = slugChanges[0];
    slugMessage.textContent = `${first.filename} changes from ${first.before || "no permalink"} to ${first.after || "no permalink"}. Review redirects and cross-links.`;
  }

  openPreview.onclick = () => openAdjacent(previewUrl);
  openLive.onclick = () => openAdjacent(liveUrl);
  openFiles.onclick = () => openAdjacent(`https://github.com/${REPOSITORY}/pull/${prNumber}/files`);
  openMiddleware.onclick = () => openAdjacent(`https://github.com/${currentHeadRepository}/blob/${encodePath(currentHeadRef)}/middleware.ts`);
  return { releaseNote, slugChanges, previewUrl };
}

async function loadChecklist(prNumber) {
  currentStateKey = `checklist-${prNumber}`;
  const saved = await chrome.storage.local.get(currentStateKey);
  const state = saved[currentStateKey] || {};
  checks.forEach((input) => { input.checked = Boolean(state[input.dataset.check]); });
  updateProgress();

  checks.forEach((input) => input.addEventListener("change", async () => {
    const current = Object.fromEntries(checks.map((item) => [item.dataset.check, item.checked]));
    await chrome.storage.local.set({ [currentStateKey]: current });
    updateProgress();
  }));

  reset.addEventListener("click", async () => {
    await chrome.storage.local.remove(currentStateKey);
    checks.forEach((input) => { input.checked = false; });
    updateProgress();
  });
}

async function loadPopup() {
  [currentTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const prNumber = getPrNumber(currentTab?.url);
  const previewNumber = getPreviewNumber(currentTab?.url);

  if (previewNumber) {
    context.textContent = `Multidev preview · PR #${previewNumber}`;
    previewState.hidden = false;
    previewMessage.textContent = currentTab.status === "loading"
      ? "This preview is still loading; the multidev may be waking up."
      : "Use Retry preview if the multidev looks stale or idle.";
    retryPreview.onclick = () => chrome.tabs.reload(currentTab.id);
    return;
  }

  if (!prNumber) {
    context.textContent = "Not on a documentation PR";
    notPr.hidden = false;
    return;
  }

  currentPr = prNumber;
  context.textContent = `${REPOSITORY} · PR #${prNumber}`;
  reviewPanel.hidden = false;
  footer.hidden = false;
  try {
    await inspectPullRequest(prNumber);
  } catch (error) {
    console.warn("Could not inspect PR metadata", error);
    routeStatus.hidden = false;
    routeStatus.textContent = "GitHub metadata could not be loaded; the basic checklist is still available.";
    openFiles.onclick = () => openAdjacent(`https://github.com/${REPOSITORY}/pull/${prNumber}/files`);
  }
  await loadChecklist(prNumber);
}

loadPopup();
