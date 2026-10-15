'use strict';

// A synthetic multi-area docs site for scope tests. "Acme Widgets" is invented.
// Areas: /widgets (the audited area), /auth (a related area), /legacy and /blog (out of scope),
// /private (robots-disallowed), plus redirects, one of which leaves the origin.

const http = require('node:http');

const nav = '<header><nav><a href="/widgets">Widgets</a><a href="/auth/api-tokens">Auth</a></nav></header>';
const page = (title, body, { head = '' } = {}) =>
  `<!doctype html><html><head><title>${title}</title><meta name="description" content="Acme ${title}">${head}</head><body>${nav}<main><h1>${title}</h1>${body}</main><footer>Footer</footer></body></html>`;

const PAGES = {
  '/widgets': page('Widgets', '<p>Start with the <a href="/widgets/quickstart">quickstart</a>, then <a href="/widgets/create-widget">create a widget</a>. See the <a href="/widgets/api-reference">API reference</a>, the <a href="/widgets/mixed">overview</a>, and <a href="/widgets/a11y">formatting notes</a>. Older notes: <a href="/widgets/stale">release history</a>.</p>'),
  '/widgets/quickstart': page(
    'Widgets quickstart',
    '<p>In this tutorial you will create your first widget. By the end you will have a widget on your account.</p><h2>Before you begin</h2><p>You need an account.</p><h2>Steps</h2><ol><li>Sign in to your account.</li><li>Run <code>widget_create</code> with a name.</li><li>Open the widget and confirm it loads.</li></ol><p>Next, read <a href="/widgets/create-widget">Create a widget</a>.</p>',
  ),
  '/widgets/create-widget': page(
    'Create a widget',
    '<p>Last updated: 2026-09-20</p><h2>Prerequisites</h2><p>An API token. See <a href="/auth/api-tokens">Create an API token</a>.</p><h2>Steps</h2><ol><li>Open the dashboard.</li><li>Choose Create a widget.</li><li>Enter a name and select Save.</li></ol><h2>Verify</h2><p>The new widget appears in the list.</p><p>Next: <a href="/widgets/api-reference">API reference</a>.</p>',
    { head: '<meta property="article:modified_time" content="2026-09-20T00:00:00Z">' },
  ),
  '/widgets/api-reference': page(
    'Widgets API reference',
    '<h2>widget_create</h2><table><tr><th>Parameter</th><th>Type</th></tr><tr><td>name</td><td>string</td></tr></table><h2>widget_share</h2><p>Shares a widget. Returns a link.</p><h2>widget_restore</h2><p>Restores a deleted widget.</p><p><a href="/widgets">Back to widgets</a></p>',
  ),
  '/widgets/link-based-access': page(
    'Link-based access',
    '<h2>Steps</h2><ol><li>Open the widget you want to share.</li><li>To share a widget, choose Get link and select Copy.</li><li>Send the link to a teammate.</li></ol><p>Anyone with the link can view the widget.</p>',
  ),
  '/widgets/mixed': page(
    'Widgets overview',
    '<p>1. Open the dashboard. 2. Choose a widget. Follow these steps:</p><ol><li>Open the dashboard.</li><li>Choose a widget.</li></ol><h2>Why widgets work this way</h2><p>Widgets are stored per account because teams share them. The trade-off is that deleting one affects everyone, which is why the design keeps a recovery window.</p><table><tr><th>Option</th><th>Default</th></tr><tr><td>retention</td><td>30</td></tr></table><p><a href="/widgets">Back</a></p>',
  ),
  '/widgets/stale': page(
    'Widgets release history',
    '<p>Last updated: 2019-03-01</p><p>Notes about old releases. <a href="/widgets">Back</a></p>',
    { head: '<meta property="article:modified_time" content="2026-09-01T00:00:00Z">' },
  ),
  '/widgets/a11y': page(
    'Widget formatting notes',
    '<h3>Colors</h3><img src="/a.png"><p>For details, <a href="/widgets/api-reference">click here</a>. See the screenshot below. The WGT panel shows status. Click the green button to continue.</p><p><a href="/widgets">Back</a></p>',
  ),
  '/widgets/legacy/old': page('Legacy widgets', '<p>Old content.</p>'),
  '/auth/api-tokens': page('Create an API token', '<h2>Steps</h2><ol><li>Open settings.</li><li>Select Create token.</li><li>Copy the token.</li></ol><p><a href="/widgets">Widgets</a></p>'),
  '/blog/news': page('Acme ships widgets', '<p>Acme announced widgets today. Sales grew 40% last year.</p><p><a href="/widgets">Docs</a></p>'),
  '/private/x': page('Private', '<p>Never fetched.</p>'),
};

function start() {
  const hits = [];
  const server = http.createServer((req, res) => {
    hits.push({ url: req.url, host: req.headers.host });
    const port = server.address().port;
    const base = `http://127.0.0.1:${port}`;
    if (req.url === '/robots.txt') {
      res.writeHead(200, { 'content-type': 'text/plain' }).end(`User-agent: *\nDisallow: /private/\nSitemap: ${base}/sitemap.xml\n`);
    } else if (req.url === '/sitemap.xml') {
      const urls = [...Object.keys(PAGES), '/widgets/old-name', '/widgets/moved'].map((p) => `<url><loc>${base}${p}</loc></url>`);
      urls.push('<url><loc>https://elsewhere.example.test/widgets/x</loc></url>');
      res.writeHead(200, { 'content-type': 'application/xml' }).end(`<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}</urlset>`);
    } else if (req.url === '/widgets/old-name') {
      res.writeHead(301, { location: '/widgets/create-widget' }).end();
    } else if (req.url === '/widgets/moved') {
      res.writeHead(301, { location: `http://localhost:${port}/widgets/target` }).end();
    } else if (PAGES[req.url]) {
      res.writeHead(200, { 'content-type': 'text/html' }).end(PAGES[req.url]);
    } else {
      res.writeHead(404, { 'content-type': 'text/html' }).end('not found');
    }
  });
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve({ server, hits, base: `http://127.0.0.1:${server.address().port}`, close: () => new Promise((r) => server.close(r)) }));
  });
}

module.exports = { start, PAGES };
