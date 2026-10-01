const {
  REPOSITORY,
  MAX_OPEN_ALL,
  parsePrNumber,
  parsePreviewNumber,
  describeAge,
  inspectPullRequest,
  openAdjacentOnce,
  probePreview,
  describeProbe
} = globalThis.PantheonPr;

const checks = [...document.querySelectorAll("input[data-check]")];
const context = document.querySelector("#context");
const notPr = document.querySelector("#not-pr");
const previewState = document.querySelector("#preview-state");
const previewMessage = document.querySelector("#preview-message");
const retryPreview = document.querySelector("#retry-preview");
const reviewPanel = document.querySelector("#review-panel");
const footer = document.querySelector("#footer");
const progress = document.querySelector("#progress");
const reset = document.querySelector("#reset");
const routeStatus = document.querySelector("#route-status");
const previewStatus = document.querySelector("#preview-status");
const previewStatusText = document.querySelector("#preview-status-text");
const retryPrPreview = document.querySelector("#retry-pr-preview");
const pagesList = document.querySelector("#pages");
const unrouted = document.querySelector("#unrouted");
const releaseCheck = document.querySelector("#release-check");
const slugCheck = document.querySelector("#slug-check");
const signals = document.querySelector("#signals");
const slugWarning = document.querySelector("#slug-warning");
const slugList = document.querySelector("#slug-list");
const releaseWarning = document.querySelector("#release-warning");
const releaseList = document.querySelector("#release-list");
const openFiles = document.querySelector("#open-files");
const openAll = document.querySelector("#open-all");
const openMiddleware = document.querySelector("#open-middleware");

const DAY_MS = 24 * 60 * 60 * 1000;

let currentTab = null;
let currentStateKey = null;

function openBeside(url, options) {
  return openAdjacentOnce(url, currentTab, options);
}

function updateProgress() {
  const visibleChecks = checks.filter((input) => !input.closest("label").hidden);
  const complete = visibleChecks.filter((input) => input.checked).length;
  progress.textContent = `${complete} of ${visibleChecks.length} complete`;
}

function showStatus(message) {
  routeStatus.hidden = false;
  routeStatus.textContent = message;
}

function pageRow(page, index) {
  const item = document.createElement("li");

  const title = document.createElement("div");
  title.className = "page-title";
  title.textContent = page.filename.split("/").pop();
  if (page.release) {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = "Release note";
    title.append(" ", tag);
  }

  const route = document.createElement("div");
  route.className = "page-route";
  route.textContent = `${page.route}${page.anchor ? `#${page.anchor}` : ""}`;

  const actions = document.createElement("div");
  actions.className = "page-actions";
  for (const [label, url] of [["Preview", page.previewUrl], ["Live", page.liveUrl]]) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.setAttribute("aria-label", `Open ${label.toLowerCase()} for ${page.filename}`);
    button.addEventListener("click", () => openBeside(url, { focusExisting: true }));
    actions.append(button);
  }

  item.append(title, route, actions);
  item.dataset.index = String(index);
  return item;
}

function listItem(text, className) {
  const item = document.createElement("li");
  item.textContent = text;
  if (className) item.className = className;
  return item;
}

function renderPages(result) {
  const { pages } = result;
  pagesList.replaceChildren(...pages.map(pageRow));
  openAll.disabled = pages.length === 0;
  openAll.textContent = pages.length > 1 ? `Open all previews (${pages.length})` : "Open all previews";

  const notes = [];
  if (pages.length === 0) notes.push("No changed Markdown file has a permalink, so there is no page to preview.");
  if (result.unrouted.length) {
    notes.push(`No permalink in ${result.unrouted.length} changed file${result.unrouted.length === 1 ? "" : "s"}: ${result.unrouted.join(", ")}.`);
  }
  if (result.unreadable) notes.push(`${result.unreadable} changed file${result.unreadable === 1 ? "" : "s"} could not be read from GitHub.`);
  if (result.truncated) notes.push("This PR changes more files than the extension reads; the list may be incomplete.");
  unrouted.hidden = notes.length === 0;
  unrouted.textContent = notes.join(" ");

  openAll.onclick = async () => {
    const targets = pages.slice(0, MAX_OPEN_ALL);
    openAll.disabled = true;
    let created = 0;
    for (const page of targets) {
      const outcome = await openBeside(page.previewUrl, { offset: created });
      if (outcome.created) created += 1;
    }
    const skipped = targets.length - created;
    const capped = pages.length > MAX_OPEN_ALL ? ` Only the first ${MAX_OPEN_ALL} of ${pages.length} were opened.` : "";
    showStatus(`Opened ${created} preview${created === 1 ? "" : "s"}${skipped ? `; ${skipped} already open` : ""}.${capped}`);
    openAll.disabled = false;
  };
}

function renderSignals(result) {
  const { permalinkChanges, releaseNotes } = result;

  slugList.replaceChildren(
    ...permalinkChanges.map((change) =>
      listItem(`${change.filename.split("/").pop()}: ${change.before || "no permalink"} → ${change.after || "no permalink"}`)
    )
  );
  slugWarning.hidden = permalinkChanges.length === 0;
  slugCheck.hidden = permalinkChanges.length === 0;
  openMiddleware.onclick = () => openBeside(result.middlewareUrl, { focusExisting: true });

  releaseList.replaceChildren(
    ...releaseNotes.map((note) => {
      if (note.time === null) {
        return listItem(`${note.filename.split("/").pop()}: no published_at or published_date found`, "stale");
      }
      const stale = Date.now() - note.time > DAY_MS;
      return listItem(
        `${note.filename.split("/").pop()}: ${note.value} (${describeAge(note.time)})`,
        stale ? "stale" : ""
      );
    })
  );
  releaseWarning.hidden = releaseNotes.length === 0;
  releaseCheck.hidden = releaseNotes.length === 0;

  signals.hidden = permalinkChanges.length === 0 && releaseNotes.length === 0;
  updateProgress();
}

async function checkPrPreview(url) {
  previewStatus.hidden = false;
  retryPrPreview.disabled = true;
  previewStatusText.textContent = "Checking the preview…";
  const result = await probePreview(url);
  previewStatusText.textContent = describeProbe(result);
  previewStatus.classList.toggle("bad", !result.ok);
  retryPrPreview.hidden = result.ok;
  retryPrPreview.disabled = false;
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

async function loadPreviewTab(previewNumber) {
  context.textContent = `Multidev preview · PR #${previewNumber}`;
  previewState.hidden = false;
  previewMessage.textContent = currentTab.status === "loading"
    ? "This preview is still loading; the multidev may be waking up."
    : "Checking the preview…";

  const recheck = async () => {
    const result = await probePreview(currentTab.url);
    previewMessage.textContent = result.ok
      ? "The preview is responding. Use Retry preview if the page looks stale."
      : describeProbe(result);
  };

  retryPreview.onclick = async () => {
    retryPreview.disabled = true;
    previewMessage.textContent = "Reloading the preview…";
    await chrome.tabs.reload(currentTab.id);
    await recheck();
    retryPreview.disabled = false;
  };
  await recheck();
}

async function loadPullRequest(prNumber) {
  context.textContent = `${REPOSITORY} · PR #${prNumber}`;
  reviewPanel.hidden = false;
  footer.hidden = false;
  openFiles.onclick = () => openBeside(`https://github.com/${REPOSITORY}/pull/${prNumber}/files`, { focusExisting: true });
  showStatus("Reading the changed files…");

  const checklistLoaded = loadChecklist(prNumber);
  try {
    const result = await inspectPullRequest(prNumber);
    renderPages(result);
    renderSignals(result);
    showStatus(
      result.pages.length
        ? `${result.pages.length} affected page${result.pages.length === 1 ? "" : "s"} from the changed Markdown files.`
        : "No changed page with a permalink was found."
    );
    if (result.pages.length) {
      retryPrPreview.onclick = () => checkPrPreview(result.pages[0].previewUrl);
      checkPrPreview(result.pages[0].previewUrl);
    }
  } catch (error) {
    console.warn("Could not inspect PR metadata", error);
    showStatus("GitHub metadata could not be loaded (rate limit or network); the basic checklist is still available.");
  }
  await checklistLoaded;
}

async function loadPopup() {
  [currentTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const previewNumber = parsePreviewNumber(currentTab?.url);
  if (previewNumber) return loadPreviewTab(previewNumber);

  const prNumber = parsePrNumber(currentTab?.url);
  if (!prNumber) {
    context.textContent = "Not on a documentation PR";
    notPr.hidden = false;
    return undefined;
  }
  return loadPullRequest(prNumber);
}

loadPopup();
