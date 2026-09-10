---
title: "Self-service bot bypass tokens for Next Generation GCDN"
published_date: "2026-09-10"
published_at: "2026-09-10T15:36:09Z"
categories: [new-feature, tools-apis]
description: "Generate a per-site token with Terminus to exempt your own trusted automation from Next Generation GCDN bot protection, without contacting support."
---

Sites on the [Next Generation GCDN](/guides/global-cdn/next-gen-global-cdn) can now exempt their own trusted automation from bot protection, without contacting support.

Bot protection on the Next Generation GCDN automatically challenges traffic that looks automated. That is the right default for scrapers and attack tools, but it can also challenge automation you rely on: uptime monitors, CI/CD pipelines, feed importers, and custom API clients that are not on the verified bot list.

You can now generate a bot bypass token for your site using Terminus and configure your automation to send it in the `x-pantheon-bot-bypass` request header. Requests carrying a valid token skip the standard challenge applied to automated traffic; targeted protections, rate limiting, and the managed WAF still apply to every request.

Key details:

- Tokens are scoped to a single site (all environments) and valid for 6 months. The command returns a current token and a next token that becomes valid 3 months later; both are accepted during the overlap. Send the current token now, switch to the next token on or after its start date, and re-run the command each quarter to pick up the following pair.
- Treat the token like a credential. Send it only from trusted servers and services, and never expose it in client-side code. If a token is leaked, contact Pantheon support to revoke it; a replacement token becomes available at the start of the following month.
- Requests without the header are evaluated by bot protection as usual. Requests with an incorrect token are rejected with a 403, so check the header value first if your automation starts failing.

See [Bot Bypass Tokens](/guides/global-cdn/next-gen-global-cdn#bot-bypass-tokens) in the Next Generation GCDN guide for setup instructions.
