// Shared by popup.js (script tag) and service-worker.js (importScripts).
// Everything hangs off globalThis.PantheonPr so both contexts see the same logic.
(function (root) {
  const REPOSITORY = "pantheon-systems/documentation";
  const API_ORIGIN = "https://api.github.com";
  const LIVE_ORIGIN = "https://docs.pantheon.io";
  const MIDDLEWARE_PATH = "src/middleware.ts";
  const FILES_PER_PAGE = 100;
  const MAX_FILE_PAGES = 3;
  const FETCH_BATCH = 6;
  const MAX_OPEN_ALL = 15;
  const PROBE_TIMEOUT_MS = 8000;
  const DAY_MS = 24 * 60 * 60 * 1000;
  const SPLIT_SESSION_KEY = "pantheon-split-review-session";

  function parsePrNumber(url) {
    const match = url?.match(/^https:\/\/github\.com\/pantheon-systems\/documentation\/pull\/(\d+)(?:[/?#]|$)/);
    return match ? match[1] : null;
  }

  function parsePreviewNumber(url) {
    const match = url?.match(/^https:\/\/pr-(\d+)-pandocs\.pantheonsite\.io\//);
    return match ? match[1] : null;
  }

  function previewOrigin(prNumber) {
    return `https://pr-${prNumber}-pandocs.pantheonsite.io`;
  }

  const REPOSITORY_NAME = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;

  // Only these hosts are ever opened or probed; permalinks and PR metadata are untrusted input.
  function isAllowedUrl(url) {
    let parsed;
    try {
      parsed = new URL(url);
    } catch {
      return false;
    }
    if (parsed.protocol !== "https:") return false;
    return (
      parsed.hostname === "github.com" ||
      parsed.hostname === new URL(LIVE_ORIGIN).hostname ||
      /^pr-\d+-pandocs\.pantheonsite\.io$/.test(parsed.hostname)
    );
  }

  // Joins a front-matter route onto a fixed origin and rejects anything that escapes it
  // (for example a permalink starting with a backslash or a second slash).
  function buildUrl(origin, route, anchor) {
    try {
      const url = new URL(route, `${origin}/`);
      if (url.origin !== origin) return null;
      if (anchor) url.hash = anchor;
      return url.href;
    } catch {
      return null;
    }
  }

  function encodePath(path) {
    return path.split("/").map(encodeURIComponent).join("/");
  }

  function frontMatterValue(markdown, key) {
    const frontMatter = markdown.match(/^---\s*\r?\n([\s\S]*?)\r?\n---(?:\s*\r?\n|$)/);
    if (!frontMatter) return null;
    const wanted = key.toLowerCase();
    const line = frontMatter[1].split(/\r?\n/).find((entry) => {
      const colon = entry.indexOf(":");
      return colon > 0 && entry.slice(0, colon).trim().toLowerCase() === wanted;
    });
    if (!line) return null;
    const value = line
      .slice(line.indexOf(":") + 1)
      .trim()
      .replace(/\s+#.*$/, "")
      .replace(/^['"]|['"]$/g, "")
      .trim();
    return value || null;
  }

  function normalizeRoute(route) {
    if (!route) return null;
    return `/${route.replace(/^\/+/, "").replace(/\/+$/, "")}`;
  }

  function headingSlug(text) {
    return text
      .replace(/^#{1,6}\s+/, "")
      .replace(/<[^>]*>/g, "")
      .replace(/[`*_~]/g, "")
      .normalize("NFKD")
      .replace(/[̀-ͯ]/g, "")
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
      if (/^#{1,6}\s+\S/.test(lines[index])) {
        headingIndex = index;
        break;
      }
    }
    if (headingIndex < 0) headingIndex = lines.findIndex((line) => /^#{1,6}\s+\S/.test(line));
    if (headingIndex < 0) return null;
    const slug = headingSlug(lines[headingIndex]);
    if (!slug) return null;
    const duplicates = lines.slice(0, headingIndex).filter((line) => headingSlug(line) === slug).length;
    return duplicates ? `${slug}-${duplicates}` : slug;
  }

  // Release notes live in src/source/releasenotes/ and carry published_at / published_date.
  function isReleaseNotePath(filename) {
    return /(^|\/)(releasenotes|release-notes)\//i.test(filename);
  }

  function releaseNoteDate(markdown) {
    const value = frontMatterValue(markdown, "published_at") || frontMatterValue(markdown, "published_date");
    if (!value) return { value: null, time: null };
    const time = Date.parse(value);
    return { value, time: Number.isNaN(time) ? null : time };
  }

  function describeAge(time, now = Date.now()) {
    const days = Math.floor((now - time) / DAY_MS);
    if (days <= 0 && time > now) return "in the future";
    if (days <= 0) return "today";
    return days === 1 ? "1 day ago" : `${days} days ago`;
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

  async function mapInBatches(items, size, task) {
    const results = [];
    for (let start = 0; start < items.length; start += size) {
      results.push(...(await Promise.all(items.slice(start, start + size).map(task))));
    }
    return results;
  }

  async function listChangedFiles(prNumber) {
    const files = [];
    for (let page = 1; page <= MAX_FILE_PAGES; page += 1) {
      const batch = await getJson(
        `${API_ORIGIN}/repos/${REPOSITORY}/pulls/${prNumber}/files?per_page=${FILES_PER_PAGE}&page=${page}`
      );
      files.push(...batch);
      if (batch.length < FILES_PER_PAGE) return { files, truncated: false };
    }
    return { files, truncated: true };
  }

  function rawUrl(repository, ref, path) {
    return `https://raw.githubusercontent.com/${encodePath(repository)}/${encodePath(ref)}/${encodePath(path)}`;
  }

  // Reads every changed Markdown file and returns one entry per affected docs page.
  // compareBase:false skips the base-branch reads (the service worker only needs routes).
  async function inspectPullRequest(prNumber, { compareBase = true } = {}) {
    const pullRequest = await getJson(`${API_ORIGIN}/repos/${REPOSITORY}/pulls/${prNumber}`);
    const headRepository = pullRequest.head?.repo?.full_name;
    const headRef = pullRequest.head?.ref;
    const headSha = pullRequest.head?.sha || headRef;
    const baseRepository = pullRequest.base?.repo?.full_name || REPOSITORY;
    const baseSha = pullRequest.base?.sha || pullRequest.base?.ref || "main";
    if (!headRepository || !headRef) throw new Error("The PR head repository is unavailable.");
    if (!REPOSITORY_NAME.test(headRepository) || !REPOSITORY_NAME.test(baseRepository)) {
      throw new Error("Unexpected repository name in the PR metadata.");
    }

    const { files, truncated } = await listChangedFiles(prNumber);
    const markdownFiles = files.filter((file) => file.status !== "removed" && /\.(md|mdx)$/i.test(file.filename));

    let unreadable = 0;
    const inspected = await mapInBatches(markdownFiles, FETCH_BATCH, async (file) => {
      let markdown;
      try {
        markdown = await getText(rawUrl(headRepository, headSha, file.filename));
      } catch (error) {
        console.warn("Could not read changed file", file.filename, error);
        unreadable += 1;
        return null;
      }

      const permalink = frontMatterValue(markdown, "permalink");
      const release = isReleaseNotePath(file.filename);
      const entry = {
        filename: file.filename,
        permalink,
        anchor: anchorForChange(file, markdown),
        release,
        releaseDate: release ? releaseNoteDate(markdown) : null,
        permalinkChange: null
      };

      if (compareBase && file.status !== "added") {
        try {
          const baseMarkdown = await getText(
            rawUrl(baseRepository, baseSha, file.previous_filename || file.filename)
          );
          const basePermalink = frontMatterValue(baseMarkdown, "permalink");
          if (normalizeRoute(basePermalink) !== normalizeRoute(permalink)) {
            entry.permalinkChange = { before: basePermalink, after: permalink };
          }
        } catch {
          // No readable base copy, so there's nothing to compare against.
        }
      }
      return entry;
    });

    const entries = inspected.filter(Boolean);
    const pages = [];
    const seenRoutes = new Set();
    for (const entry of entries) {
      const route = normalizeRoute(entry.permalink);
      if (!route || seenRoutes.has(route)) continue;
      seenRoutes.add(route);
      const previewUrl = buildUrl(previewOrigin(prNumber), route, entry.anchor);
      const liveUrl = buildUrl(LIVE_ORIGIN, route, entry.anchor);
      if (!previewUrl || !liveUrl) {
        seenRoutes.delete(route);
        entry.permalink = null;
        continue;
      }
      pages.push({
        filename: entry.filename,
        route,
        anchor: entry.anchor,
        release: entry.release,
        previewUrl,
        liveUrl
      });
    }

    return {
      prNumber,
      pages,
      unrouted: entries.filter((entry) => !entry.permalink).map((entry) => entry.filename),
      permalinkChanges: entries
        .filter((entry) => entry.permalinkChange)
        .map((entry) => ({ filename: entry.filename, ...entry.permalinkChange })),
      releaseNotes: entries
        .filter((entry) => entry.release)
        .map((entry) => ({ filename: entry.filename, ...entry.releaseDate })),
      unreadable,
      truncated,
      middlewareUrl: `https://github.com/${headRepository}/blob/${encodePath(headRef)}/${MIDDLEWARE_PATH}`
    };
  }

  function comparableUrl(url) {
    const parsed = new URL(url);
    parsed.hash = "";
    parsed.pathname = parsed.pathname.replace(/\/+$/, "") || "/";
    return parsed.href;
  }

  async function findOpenTab(url) {
    const target = comparableUrl(url);
    const tabs = await chrome.tabs.query({ url: `${new URL(url).origin}/*` });
    return tabs.find((tab) => tab.url && comparableUrl(tab.url) === target) || null;
  }

  // Opens url beside sourceTab without taking focus, unless a tab already shows it.
  async function openAdjacentOnce(url, sourceTab, { offset = 0, focusExisting = false } = {}) {
    if (!isAllowedUrl(url)) throw new Error("Refusing to open a URL outside the Pantheon docs and GitHub hosts.");
    const existing = await findOpenTab(url);
    if (existing) {
      if (focusExisting) {
        await chrome.tabs.update(existing.id, { active: true });
        await chrome.windows.update(existing.windowId, { focused: true });
      }
      return { tab: existing, created: false };
    }
    const tab = await chrome.tabs.create({
      url,
      active: false,
      openerTabId: sourceTab.id,
      windowId: sourceTab.windowId,
      index: sourceTab.index + 1 + offset
    });
    return { tab, created: true };
  }

  async function probePreview(url) {
    if (!isAllowedUrl(url)) return { ok: false, status: 0, timedOut: false };
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), PROBE_TIMEOUT_MS);
    try {
      const response = await fetch(url, { method: "HEAD", cache: "no-store", signal: controller.signal });
      return { ok: response.status < 400, status: response.status, timedOut: false };
    } catch (error) {
      return { ok: false, status: 0, timedOut: error?.name === "AbortError" };
    } finally {
      clearTimeout(timer);
    }
  }

  function describeProbe(result) {
    if (result.ok) return "The preview is responding.";
    if (result.timedOut) {
      return `No response after ${PROBE_TIMEOUT_MS / 1000} seconds. The multidev is probably waking up; retry in a minute.`;
    }
    if (result.status === 404) {
      return "The preview answered 404. The build may not have published this page yet.";
    }
    if (result.status >= 500) {
      return `The preview returned ${result.status}. The multidev may be asleep or still deploying; retry in a minute.`;
    }
    if (result.status >= 400) return `The preview returned ${result.status}.`;
    return "Could not reach the preview. Check your network or VPN, then retry.";
  }

  function splitReviewUrls(prNumber, page, { includeDiff = false } = {}) {
    if (!page?.liveUrl || !page?.previewUrl) throw new Error("A page needs both live and preview URLs.");
    const urls = [page.liveUrl, page.previewUrl];
    if (includeDiff) {
      urls.unshift(
        `https://github.com/${REPOSITORY}/pull/${prNumber}/files?path=${encodeURIComponent(page.filename)}`
      );
    }
    if (!urls.every(isAllowedUrl)) throw new Error("Refusing to open a split review URL outside the allowed hosts.");
    return urls;
  }

  async function getSplitReviewSession() {
    const saved = await chrome.storage.session.get(SPLIT_SESSION_KEY);
    return saved[SPLIT_SESSION_KEY] || null;
  }

  async function closeSplitReview() {
    const session = await getSplitReviewSession();
    await Promise.all(
      (session?.tabIds || []).map(async (tabId) => {
        try {
          await chrome.tabs.remove(tabId);
        } catch {
          // The tab may already have been closed.
        }
      })
    );
    await chrome.storage.session.remove(SPLIT_SESSION_KEY);
    return session;
  }

  async function openSplitReview(prNumber, page, sourceTab, { includeDiff = false } = {}) {
    if (!sourceTab?.windowId) throw new Error("The active tab is unavailable.");
    const urls = splitReviewUrls(prNumber, page, { includeDiff });
    await closeSplitReview();

    const tabIds = [];
    try {
      for (const [index, url] of urls.entries()) {
        const tabs = await chrome.tabs.query({ windowId: sourceTab.windowId });
        const target = comparableUrl(url);
        const existing = tabs.find((tab) => tab.url && comparableUrl(tab.url) === target);
        if (existing) continue;

        const created = await chrome.tabs.create({
          url,
          active: false,
          openerTabId: sourceTab.id,
          windowId: sourceTab.windowId,
          index: sourceTab.index + 1 + index
        });
        if (created?.id !== undefined) tabIds.push(created.id);
      }

      const session = {
        prNumber: String(prNumber),
        filename: page.filename,
        includeDiff,
        windowId: sourceTab.windowId,
        tabIds,
        urls,
        createdAt: Date.now()
      };
      await chrome.storage.session.set({ [SPLIT_SESSION_KEY]: session });
      const focusedTabId = tabIds[tabIds.length - 1];
      if (focusedTabId !== undefined) await chrome.tabs.update(focusedTabId, { active: true });
      return session;
    } catch (error) {
      await Promise.all(tabIds.map((tabId) => chrome.tabs.remove(tabId).catch(() => undefined)));
      await chrome.storage.session.remove(SPLIT_SESSION_KEY);
      throw error;
    }
  }

  // Shareable panel links: a plain GitHub Files changed URL that carries a marker. With the extension
  // installed, its service worker swaps the tab for the 2- or 3-panel review view. Without it, the
  // link opens that PR's Files changed page. The URL holds no extension ID, so it works for everyone
  // and opens from chat apps.
  const PANEL_PARAM = "pantheon_panel";
  const PANEL_PAGE_PARAM = "page";

  function panelRequestUrl(prNumber, filename, panels) {
    const url = new URL(`https://github.com/${REPOSITORY}/pull/${prNumber}/files`);
    url.searchParams.set(PANEL_PARAM, String(panels));
    url.searchParams.set(PANEL_PAGE_PARAM, filename);
    return url.href;
  }

  function parsePanelRequest(url) {
    const prNumber = parsePrNumber(url);
    if (!prNumber) return null;
    let params;
    try {
      params = new URL(url).searchParams;
    } catch {
      return null;
    }
    const panels = params.get(PANEL_PARAM);
    const filename = params.get(PANEL_PAGE_PARAM);
    if ((panels !== "2" && panels !== "3") || !filename || filename.length > 300) return null;
    return { prNumber, panels: Number(panels), filename };
  }

  // Mirrors openSplitForPage in popup.js.
  function reviewPageUrl(reviewBase, prNumber, page, includeDiff) {
    const labels = includeDiff ? ["GitHub Diff", "Live Article", "PR Preview"] : ["Live Article", "PR Preview"];
    const params = new URLSearchParams({ title: `PR #${prNumber} · ${page.filename.split("/").pop()}` });
    splitReviewUrls(prNumber, page, { includeDiff }).forEach((url, index) => params.append("pane", `${labels[index]}|${url}`));
    return `${reviewBase}?${params}`;
  }

  root.PantheonPr = {
    REPOSITORY,
    LIVE_ORIGIN,
    MAX_OPEN_ALL,
    splitReviewUrls,
    panelRequestUrl,
    parsePanelRequest,
    reviewPageUrl,
    getSplitReviewSession,
    openSplitReview,
    closeSplitReview,
    parsePrNumber,
    parsePreviewNumber,
    previewOrigin,
    describeAge,
    frontMatterValue,
    buildUrl,
    isAllowedUrl,
    inspectPullRequest,
    findOpenTab,
    openAdjacentOnce,
    probePreview,
    describeProbe
  };
})(globalThis);
