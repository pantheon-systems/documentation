'use strict';

const { sleep } = require('./util.cjs');

const MAX_REDIRECTS = 5;

class BlockedError extends Error {
  constructor(url, status) {
    super(`blocked: ${status} from ${url}; stopped without retrying or changing identity`);
    this.name = 'BlockedError';
    this.status = status;
  }
}

function parseRobots(text, agent) {
  const groups = [];
  let current = null;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/#.*$/, '').trim();
    const colon = line.indexOf(':');
    if (colon < 0) continue;
    const key = line.slice(0, colon).trim().toLowerCase();
    const value = line.slice(colon + 1).trim();
    if (key === 'user-agent') {
      if (!current || current.rules.length) {
        current = { agents: [], rules: [] };
        groups.push(current);
      }
      current.agents.push(value.toLowerCase());
    } else if ((key === 'allow' || key === 'disallow') && current) {
      current.rules.push({ allow: key === 'allow', path: value });
    }
  }
  const token = agent.toLowerCase();
  const group =
    groups.find((g) => g.agents.some((a) => a !== '*' && token.includes(a))) ||
    groups.find((g) => g.agents.includes('*'));
  return group ? group.rules : [];
}

function robotsAllows(rules, pathAndQuery) {
  let best = null;
  for (const rule of rules) {
    if (!rule.path) continue;
    const anchored = rule.path.endsWith('$');
    const body = (anchored ? rule.path.slice(0, -1) : rule.path)
      .replace(/[.+?^{}()|[\]\\]/g, '\\$&')
      .replace(/\*/g, '.*');
    const pattern = new RegExp(`^${body}${anchored ? '$' : ''}`);
    if (!pattern.test(pathAndQuery)) continue;
    if (!best || rule.path.length > best.path.length || (rule.path.length === best.path.length && rule.allow)) {
      best = rule;
    }
  }
  return best ? best.allow : true;
}

// Polite client: one request at a time, a fixed pause between requests, robots.txt
// honored for the audited site, and a hard stop after repeated 403/429 responses.
// Page fetches follow redirects by hand and stop at the first one that leaves the origin,
// so a crawl never silently reaches another site. Link status checks (opt-in) may follow
// redirects anywhere, because their job is to see where a link ends up.
function createFetcher({
  delayMs = 1000,
  userAgent = 'docs-gap-audit/0.1 (read-only docs audit)',
  timeoutMs = 30000,
  respectRobots = true,
  maxBlocked = 3,
} = {}) {
  let last = 0;
  let consecutiveBlocked = 0;
  const robots = new Map();

  async function request(url, method = 'GET', { manual = false } = {}) {
    const gap = delayMs - (Date.now() - last);
    if (gap > 0) await sleep(gap);
    last = Date.now();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, {
        method,
        redirect: manual ? 'manual' : 'follow',
        headers: {
          'user-agent': userAgent,
          accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
        signal: controller.signal,
      });
      const body = method === 'GET' && !(manual && res.status >= 300 && res.status < 400) ? await res.text() : '';
      return { status: res.status, url: res.url || url, body, contentType: res.headers.get('content-type') || '', location: res.headers.get('location') };
    } catch (error) {
      return { status: 0, url, body: '', error: String(error.cause?.code || error.name || error.message) };
    } finally {
      clearTimeout(timer);
    }
  }

  async function allowed(url) {
    if (!respectRobots) return true;
    const parsed = new URL(url);
    let rules = robots.get(parsed.origin);
    if (!rules) {
      // Manual redirects: a robots.txt that points at another origin is never followed (same-origin hops only).
      let res = await request(`${parsed.origin}/robots.txt`, 'GET', { manual: true });
      for (let hop = 0; hop < MAX_REDIRECTS && res.status >= 300 && res.status < 400 && res.location; hop += 1) {
        let next;
        try {
          next = new URL(res.location, `${parsed.origin}/robots.txt`);
        } catch {
          break;
        }
        if (next.origin !== parsed.origin) {
          res = { status: 0, url: next.href, body: '' };
          break;
        }
        res = await request(next.href, 'GET', { manual: true });
      }
      rules = res.status === 200 ? parseRobots(res.body, userAgent) : [];
      robots.set(parsed.origin, rules);
    }
    return robotsAllows(rules, parsed.pathname + parsed.search);
  }

  function countBlocks(url, status) {
    if (status === 403 || status === 429) {
      consecutiveBlocked += 1;
      if (consecutiveBlocked >= maxBlocked) throw new BlockedError(url, status);
    } else {
      consecutiveBlocked = 0;
    }
  }

  async function get(url) {
    const origin = new URL(url).origin;
    let current = url;
    for (let hop = 0; hop <= MAX_REDIRECTS; hop += 1) {
      if (!(await allowed(current))) return { status: 0, url: current, requestedUrl: url, body: '', skipped: 'robots.txt disallows this path' };
      const res = await request(current, 'GET', { manual: true });
      countBlocks(current, res.status);
      if (res.status >= 300 && res.status < 400 && res.location) {
        let next;
        try {
          next = new URL(res.location, current);
        } catch {
          return { status: res.status, url: current, requestedUrl: url, body: '', error: 'bad redirect location' };
        }
        if (next.origin !== origin) return { status: res.status, url: current, requestedUrl: url, body: '', offOrigin: next.href };
        current = next.href;
        continue;
      }
      return { ...res, url: current, requestedUrl: url };
    }
    return { status: 0, url: current, requestedUrl: url, body: '', error: 'too many redirects' };
  }

  // Status check for a link target. HEAD first; some servers refuse HEAD, so retry with GET.
  async function head(url, { sameSite = false } = {}) {
    if (sameSite && !(await allowed(url))) return { status: 0, url, skipped: 'robots.txt disallows this path' };
    let res = await request(url, 'HEAD');
    // Same-site targets count toward the block stop and are never retried after a 403/429.
    if (sameSite) countBlocks(url, res.status);
    const retry = sameSite ? [0, 405, 501] : [0, 403, 405, 501];
    if (retry.includes(res.status)) {
      res = await request(url, 'GET');
      if (sameSite) countBlocks(url, res.status);
    }
    return res;
  }

  return { get, head, userAgent };
}

module.exports = { createFetcher, BlockedError, parseRobots, robotsAllows };
