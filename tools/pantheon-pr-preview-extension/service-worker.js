importScripts("pr-resolver.js");

const { parsePrNumber, parsePanelRequest, reviewPageUrl, inspectPullRequest, openAdjacentOnce } = globalThis.PantheonPr;
const RECHECK_AFTER_MS = 5 * 60 * 1000;
const inFlight = new Set();
const panelInFlight = new Set();
// GitHub rewrites the URL right after load and drops the panel marker. That follow-up navigation in
// the same tab must not start the automatic preview, so remember when a panel link was last seen.
const PANEL_WINDOW_MS = 8000;
const panelTabs = new Map();

function hasOptedOut(url) {
  try {
    return new URL(url).searchParams.get("pantheon_preview") === "off";
  } catch {
    return false;
  }
}

// Per-PR state survives service-worker restarts, so revisiting a PR or switching
// between its Conversation and Files tabs doesn't open the preview again.
function stateKey(prNumber) {
  return `pr-${prNumber}`;
}

async function readState(prNumber) {
  const saved = await chrome.storage.session.get(stateKey(prNumber));
  return saved[stateKey(prNumber)] || null;
}

async function writeState(prNumber, state) {
  await chrome.storage.session.set({ [stateKey(prNumber)]: { ...state, at: Date.now() } });
}

async function setBadge(tabId, text, color) {
  await chrome.action.setBadgeText({ tabId, text });
  if (text) await chrome.action.setBadgeBackgroundColor({ tabId, color });
}

function badgeForCount(tabId, count) {
  if (count === 0) return setBadge(tabId, "?", "#a15c00");
  if (count > 1) return setBadge(tabId, String(count), "#175cd3");
  return setBadge(tabId, "", "#000000");
}

async function maybeOpenPreview(details) {
  if (details.frameId !== 0 || hasOptedOut(details.url)) return;

  const prNumber = parsePrNumber(details.url);
  if (!prNumber || inFlight.has(prNumber)) return;

  const state = await readState(prNumber);
  if (state?.opened) return;
  if (state && Date.now() - state.at < RECHECK_AFTER_MS) {
    if (state.count >= 0) await badgeForCount(details.tabId, state.count);
    return;
  }

  inFlight.add(prNumber);
  try {
    const { pages } = await inspectPullRequest(prNumber, { compareBase: false });
    if (pages.length === 1) {
      const sourceTab = await chrome.tabs.get(details.tabId);
      await openAdjacentOnce(pages[0].previewUrl, sourceTab);
      await writeState(prNumber, { opened: true, count: 1 });
    } else {
      await writeState(prNumber, { opened: false, count: pages.length });
    }
    await badgeForCount(details.tabId, pages.length);
  } catch (error) {
    console.error("Pantheon PR preview resolution failed", error);
    await writeState(prNumber, { opened: false, count: -1 });
    await setBadge(details.tabId, "!", "#b42318");
  } finally {
    inFlight.delete(prNumber);
  }
}

// A documentation PR link with ?pantheon_panel=2|3&page=<file> becomes the review view for that page.
// Returns true when the URL was a panel link, so the automatic preview doesn't also run.
async function maybeOpenPanel(details) {
  const request = parsePanelRequest(details.url);
  if (!request) return false;
  panelTabs.set(details.tabId, Date.now());
  if (panelInFlight.has(details.tabId)) return true;

  panelInFlight.add(details.tabId);
  try {
    const { pages } = await inspectPullRequest(request.prNumber, { compareBase: false });
    const page = pages.find((entry) => entry.filename === request.filename);
    if (!page) {
      console.warn("The panel link names a page this PR doesn't change", request.filename);
      await setBadge(details.tabId, "?", "#a15c00");
      return true;
    }
    // The tab may have moved on while the PR was being read. GitHub drops the marker from the URL,
    // so check that the tab is still on this PR, not that the marker is still there.
    const tab = await chrome.tabs.get(details.tabId);
    if (parsePrNumber(tab.url) !== request.prNumber) return true;
    await chrome.tabs.update(details.tabId, {
      url: reviewPageUrl(chrome.runtime.getURL("review.html"), request.prNumber, page, request.panels === 3)
    });
  } catch (error) {
    console.error("Opening the panel link failed", error);
    await setBadge(details.tabId, "!", "#b42318");
  } finally {
    panelInFlight.delete(details.tabId);
  }
  return true;
}

async function onNavigation(details) {
  if (details.frameId !== 0) return;
  if (await maybeOpenPanel(details)) return;
  if (Date.now() - (panelTabs.get(details.tabId) || 0) < PANEL_WINDOW_MS) return;
  await maybeOpenPreview(details);
}

// review.html embeds GitHub, the live docs and the multidev preview in iframes. GitHub sends
// X-Frame-Options: deny and a CSP, so strip those headers, only for frames requested by this
// extension's own pages.
chrome.runtime.onInstalled.addListener(() => chrome.declarativeNetRequest.updateDynamicRules({
  removeRuleIds: [1],
  addRules: [{
    id: 1,
    priority: 1,
    action: {
      type: "modifyHeaders",
      responseHeaders: [
        { header: "x-frame-options", operation: "remove" },
        { header: "content-security-policy", operation: "remove" }
      ]
    },
    condition: {
      resourceTypes: ["sub_frame"],
      initiatorDomains: [chrome.runtime.id],
      requestDomains: ["github.com", "docs.pantheon.io", "pantheonsite.io"]
    }
  }]
}));

async function openPreviews(urls, sourceTab) {
  let created = 0;
  for (const url of urls) {
    const outcome = await openAdjacentOnce(url, sourceTab, { offset: created });
    if (outcome.created) created += 1;
  }
  return { ok: true, created, skipped: urls.length - created };
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type !== "openAllPreviews") return false;
  openPreviews(message.urls, message.sourceTab).then(sendResponse, (error) => {
    console.error("Opening previews failed", error);
    sendResponse({ ok: false });
  });
  return true;
});

chrome.webNavigation.onCommitted.addListener(onNavigation);
chrome.webNavigation.onHistoryStateUpdated.addListener(onNavigation);
