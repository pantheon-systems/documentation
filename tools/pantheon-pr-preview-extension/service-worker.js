importScripts("pr-resolver.js");

const { parsePrNumber, inspectPullRequest, openAdjacentOnce } = globalThis.PantheonPr;
const RECHECK_AFTER_MS = 5 * 60 * 1000;
const inFlight = new Set();

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

chrome.webNavigation.onCommitted.addListener(maybeOpenPreview);
chrome.webNavigation.onHistoryStateUpdated.addListener(maybeOpenPreview);
