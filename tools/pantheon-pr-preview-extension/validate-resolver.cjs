// Offline checks for pr-resolver.js. Run from the repository root:
//   node tools/pantheon-pr-preview-extension/validate-resolver.cjs
const assert = require("node:assert/strict");

require("./pr-resolver.js");
const { buildUrl, isAllowedUrl, frontMatterValue, parsePrNumber, parsePreviewNumber, splitReviewUrls, panelRequestUrl, parsePanelRequest, reviewPageUrl, inspectPullRequest } = globalThis.PantheonPr;

const PREVIEW = "https://pr-7-pandocs.pantheonsite.io";
const LIVE = "https://docs.pantheon.io";

// URL construction stays on the fixed origin
assert.equal(buildUrl(PREVIEW, "/docs/a", "sec"), `${PREVIEW}/docs/a#sec`);
assert.equal(buildUrl(LIVE, "/docs/a", null), `${LIVE}/docs/a`);
assert.equal(buildUrl(PREVIEW, "/\\evil.example/x", null), null, "backslash must not change the host");
assert.equal(buildUrl(PREVIEW, "//evil.example/x", null), null, "protocol-relative route must be rejected");
assert.equal(buildUrl(PREVIEW, "https://evil.example/x", null), null, "absolute URL must be rejected");

// Only the expected hosts can be opened or probed
for (const ok of [
  "https://github.com/pantheon-systems/documentation/pull/7/files",
  "https://docs.pantheon.io/docs/a",
  "https://pr-12-pandocs.pantheonsite.io/docs/a#x"
]) assert.equal(isAllowedUrl(ok), true, ok);
for (const bad of [
  "http://docs.pantheon.io/docs/a",
  "https://docs.pantheon.io.evil.example/",
  "https://github.com.evil.example/",
  "https://pr-12-pandocs.pantheonsite.io.evil.example/",
  "https://pr-x-pandocs.pantheonsite.io/",
  "https://other.pantheonsite.io/",
  "javascript:alert(1)",
  "not a url"
]) assert.equal(isAllowedUrl(bad), false, bad);

// Front matter parsing without a dynamic RegExp
const md = '---\r\nTitle: T\r\nPermalink: "/docs/a"  # comment\r\npublished_at: 2026-09-30T14:34:55Z\r\n---\r\nbody';
assert.equal(frontMatterValue(md, "permalink"), "/docs/a");
assert.equal(frontMatterValue(md, "published_at"), "2026-09-30T14:34:55Z");
assert.equal(frontMatterValue("---\nxpermalink: /nope\n---\n", "permalink"), null);
assert.equal(frontMatterValue("no front matter", "permalink"), null);

// PR and preview URL recognition
assert.equal(parsePrNumber("https://github.com/pantheon-systems/documentation/pull/10303/files?x=1"), "10303");
assert.equal(parsePrNumber("https://github.com/pantheon-systems/documentation/pull/10303"), "10303");
assert.equal(parsePrNumber("https://github.com/other/documentation/pull/10303"), null);
assert.equal(parsePrNumber("https://github.com/pantheon-systems/documentation/pulls"), null);
assert.equal(parsePreviewNumber("https://pr-10303-pandocs.pantheonsite.io/docs/a"), "10303");
assert.equal(parsePreviewNumber("https://pr-10303-pandocs.pantheonsite.io.evil.example/"), null);

// Split review order and sizing
const page = {
  filename: "src/source/content/a.md",
  liveUrl: `${LIVE}/docs/a#section-one`,
  previewUrl: `${PREVIEW}/docs/a#section-one`
};
assert.deepEqual(splitReviewUrls("7", page), [page.liveUrl, page.previewUrl]);
assert.deepEqual(splitReviewUrls("7", page, { includeDiff: true }), [
  "https://github.com/pantheon-systems/documentation/pull/7/files?path=src%2Fsource%2Fcontent%2Fa.md",
  page.liveUrl,
  page.previewUrl
]);

// inspectPullRequest against a mocked GitHub
const respond = (body, text) => ({ ok: true, status: 200, json: async () => body, text: async () => text });
const notFound = { ok: false, status: 404, json: async () => ({}), text: async () => "" };
const files = [
  { filename: "src/source/content/a.md", status: "modified", patch: "@@ -4,1 +4,2 @@\n ## Section One\n+text" },
  { filename: "src/source/content/renamed.md", previous_filename: "src/source/content/old-name.md", status: "renamed", patch: "" },
  { filename: "src/source/content/new.md", status: "added", patch: "" },
  { filename: "src/source/content/evil.md", status: "added", patch: "" },
  { filename: "src/source/releasenotes/2026-09-30-x.md", status: "added", patch: "" },
  { filename: "src/source/content/removed.md", status: "removed", patch: "" }
];
const head = {
  "src/source/content/a.md": '---\npermalink: "/docs/a-new"\n---\n## Section One\ntext\n',
  "src/source/content/renamed.md": "---\npermalink: /docs/renamed\n---\n# R\n",
  "src/source/content/new.md": "---\npermalink: /docs/new\n---\n# N\n",
  "src/source/content/evil.md": "---\npermalink: \\\\evil.example\n---\n# E\n",
  "src/source/releasenotes/2026-09-30-x.md": "---\ntitle: X\npublished_at: 2026-09-30T14:34:55Z\n---\nnote\n"
};
const base = {
  "src/source/content/a.md": '---\npermalink: "/docs/a-old"\n---\n',
  "src/source/content/old-name.md": "---\npermalink: /docs/renamed\n---\n"
};
globalThis.fetch = async (url) => {
  const u = new URL(url);
  if (u.hostname === "api.github.com") {
    if (u.pathname.endsWith("/pulls/7")) {
      return respond({ head: { repo: { full_name: "fork/documentation" }, ref: "feature", sha: "headsha" }, base: { repo: { full_name: "pantheon-systems/documentation" }, sha: "basesha" } });
    }
    if (u.pathname.endsWith("/pulls/7/files")) return respond(files);
  }
  if (u.hostname === "raw.githubusercontent.com") {
    const [owner, repo, ref, ...rest] = u.pathname.slice(1).split("/");
    const key = rest.join("/");
    if (`${owner}/${repo}` === "fork/documentation" && ref === "headsha" && head[key]) return respond(null, head[key]);
    if (`${owner}/${repo}` === "pantheon-systems/documentation" && ref === "basesha" && base[key]) return respond(null, base[key]);
  }
  return notFound;
};

// Shareable panel links: build, parse, and the review page URL they lead to
{
  const file = "src/source/content/nextjs/drupal-quickstart.md";
  const link = panelRequestUrl("10269", file, 3);
  assert.equal(link, "https://github.com/pantheon-systems/documentation/pull/10269/files?pantheon_panel=3&page=src%2Fsource%2Fcontent%2Fnextjs%2Fdrupal-quickstart.md");
  assert.deepEqual(parsePanelRequest(link), { prNumber: "10269", panels: 3, filename: file }, "a built link parses back");
  assert.deepEqual(parsePanelRequest(panelRequestUrl("7", "a b&c=d/é.md", 2)), { prNumber: "7", panels: 2, filename: "a b&c=d/é.md" }, "awkward file names survive the round trip");
  assert.equal(parsePrNumber(link), "10269", "the link is still an ordinary PR URL");
  for (const bad of [
    "https://github.com/pantheon-systems/documentation/pull/7/files",
    "https://github.com/pantheon-systems/documentation/pull/7/files?pantheon_panel=4&page=a.md",
    "https://github.com/pantheon-systems/documentation/pull/7/files?pantheon_panel=3",
    "https://github.com/pantheon-systems/documentation/pull/7/files?pantheon_panel=3&page=",
    `https://github.com/pantheon-systems/documentation/pull/7/files?pantheon_panel=3&page=${"a".repeat(301)}`,
    "https://github.com/other/documentation/pull/7/files?pantheon_panel=3&page=a.md",
    "https://github.com.evil.example/pantheon-systems/documentation/pull/7/files?pantheon_panel=3&page=a.md",
    "http://github.com/pantheon-systems/documentation/pull/7/files?pantheon_panel=3&page=a.md",
    "not a url"
  ]) assert.equal(parsePanelRequest(bad), null, bad);

  const pg = { filename: file, previewUrl: "https://pr-7-pandocs.pantheonsite.io/docs/nextjs/q#learning", liveUrl: "https://docs.pantheon.io/docs/nextjs/q#learning" };
  const three = new URL(reviewPageUrl("chrome-extension://abc/review.html", "7", pg, true));
  assert.equal(`${three.protocol}//${three.host}${three.pathname}`, "chrome-extension://abc/review.html");
  assert.equal(three.searchParams.get("title"), "PR #7 · drupal-quickstart.md");
  assert.deepEqual(three.searchParams.getAll("pane").map((p) => p.split("|")[0]), ["GitHub Diff", "Live Article", "PR Preview"]);
  const two = new URL(reviewPageUrl("chrome-extension://abc/review.html", "7", pg, false));
  assert.deepEqual(two.searchParams.getAll("pane"), [`Live Article|${pg.liveUrl}`, `PR Preview|${pg.previewUrl}`]);
  assert.throws(() => reviewPageUrl("chrome-extension://abc/review.html", "7", { ...pg, liveUrl: "https://evil.example/x" }, false), /outside the allowed hosts/, "a page with a foreign URL is refused");
}

(async () => {
  const result = await inspectPullRequest(7);
  const byFile = Object.fromEntries(result.pages.map((p) => [p.filename, p]));
  assert.equal(result.pages.length, 3);
  assert.equal(byFile["src/source/content/a.md"].previewUrl, `${PREVIEW}/docs/a-new#section-one`);
  assert.equal(byFile["src/source/content/a.md"].liveUrl, `${LIVE}/docs/a-new#section-one`);
  assert.equal(byFile["src/source/content/new.md"].previewUrl, `${PREVIEW}/docs/new`);
  assert.deepEqual(result.permalinkChanges.map((c) => [c.filename, c.before, c.after]), [["src/source/content/a.md", "/docs/a-old", "/docs/a-new"]], "only the modified file changed its permalink; the rename and the added file did not");
  assert.ok(result.unrouted.includes("src/source/content/evil.md"), "a permalink that escapes the origin is dropped");
  assert.ok(!result.pages.some((p) => p.filename.endsWith("evil.md")));
  assert.equal(result.releaseNotes.length, 1);
  assert.equal(result.releaseNotes[0].value, "2026-09-30T14:34:55Z");
  assert.ok(!result.pages.some((p) => p.filename.endsWith("removed.md")), "removed files are ignored");
  assert.match(result.middlewareUrl, /^https:\/\/github\.com\/fork\/documentation\/blob\/feature\/src\/middleware\.ts$/);

  // A hostile repository name in PR metadata is rejected before any raw fetch
  const realFetch = globalThis.fetch;
  globalThis.fetch = async (url) => (
    new URL(url).pathname.endsWith("/pulls/8")
      ? respond({ head: { repo: { full_name: "evil/../../x" }, ref: "b", sha: "s" }, base: { repo: { full_name: "pantheon-systems/documentation" }, sha: "b" } })
      : realFetch(url)
  );
  await assert.rejects(() => inspectPullRequest(8), /Unexpected repository name/);

  console.log("validate-resolver: all checks passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
