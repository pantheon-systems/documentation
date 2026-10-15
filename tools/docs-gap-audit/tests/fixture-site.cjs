'use strict';

// A small synthetic docs site for tests. "Acme Widgets" is invented.

const http = require('node:http');

const page = (title, body) =>
  `<!doctype html><html><head><title>${title}</title><meta name="description" content="Acme ${title}"></head>` +
  `<body><header><nav><a href="/guide">Guide</a><a href="/reference">Reference</a></nav></header>` +
  `<main><h1>${title}</h1>${body}</main><footer>Footer text</footer></body></html>`;

const PAGES = {
  '/': page('Acme Widgets docs', '<p>Welcome. See the <a href="/guide">guide</a>, the <a href="/howto">how-to</a>, and <a href="/versions">versions</a>.</p>'),
  '/guide': page(
    'Guide',
    '<h2>Create a widget</h2><p>TODO: write this section.</p><img src="/a.png"><img src="/b.png" alt="">' +
      '<p>Read the <a href="/howto">how-to</a> or the <a href="/missing-page">missing page</a>.</p>',
  ),
  '/howto': page('Delete a widget', '<h2>Steps</h2><ol><li>Open the widget.</li><li>Delete it.</li></ol>'),
  '/orphan': page('Orphan page', '<p>No page links here.</p><a href="/guide">Guide</a>'),
  '/reference': page(
    'Reference',
    '<h2>Widget API</h2><p>Use <code>widget_create</code> and <code>widget_delete</code>. The old <code>widget_legacy_call</code> still appears.</p><a href="/">Home</a>',
  ),
  '/versions': page('Versions', '<p>The current version of acme-widgets is 2.3.0.</p><a href="/">Home</a>'),
  '/private/secret': page('Private', '<p>Should not be fetched.</p>'),
};

function start({ blockAll = false } = {}) {
  const hits = [];
  const server = http.createServer((req, res) => {
    hits.push(req.url);
    const base = `http://127.0.0.1:${server.address().port}`;
    if (blockAll && !['/robots.txt', '/sitemap.xml'].includes(req.url)) {
      res.writeHead(403).end('blocked');
      return;
    }
    if (req.url === '/robots.txt') {
      res.writeHead(200, { 'content-type': 'text/plain' }).end(`User-agent: *\nDisallow: /private/\nSitemap: ${base}/sitemap.xml\n`);
    } else if (req.url === '/sitemap.xml') {
      const urls = Object.keys(PAGES).map((p) => `<url><loc>${base}${p}</loc></url>`).join('');
      res.writeHead(200, { 'content-type': 'application/xml' }).end(`<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`);
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
