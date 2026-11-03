---
title: "Self-service User-Agent bypass for Next Generation GCDN"
published_date: "2026-11-03"
published_at: "2026-11-03T18:54:27Z"
categories: [new-feature, tools-apis]
description: "Use Terminus to exempt trusted tools that can't send a bot bypass token from Next Generation GCDN bot protection, by exact User-Agent, on each domain."
---

Sites on the [Next Generation GCDN](/guides/nextgen-gcdn) can now exempt trusted tools from bot protection by their User-Agent, without contacting support.

[Bot bypass tokens](/guides/nextgen-gcdn#bot-bypass-tokens) cover automation you can configure to send a request header. Some tools can't do that: hosted uptime monitors, SEO scanners, accessibility scanners, and partner integrations often let you see or set their User-Agent but not add a custom header.

You can now use Terminus to add up to 8 User-Agent strings to each of your site's domains. Requests whose `User-Agent` header exactly matches one of a domain's entries skip the standard challenge for automated traffic on that domain. Targeted protections, rate limiting, and the managed WAF still apply to every request.

## Key details:

- Entries apply to a single domain. The domain must be a verified custom domain on the Next Generation GCDN, and you must have access to the site to manage its entries. To manage entries, use `terminus gcdn:ua-bypass:add`, `gcdn:ua-bypass:remove` and `gcdn:ua-bypass:list`.

- Matching is exact and case-sensitive against the full User-Agent string, including any version number. If a tool changes its User-Agent, for example after an upgrade, update the entry.

- A User-Agent is not a secret: any client that sends the same string also skips the challenge. Prefer a distinctive string that identifies your tool. Entries that look like a web browser's User-Agent are refused unless you confirm with `--allow-browser-ua`. If your automation can send a request header, use a bot bypass token instead.

- Changes take effect within a few minutes. Remove entries you no longer need.

Update the plugin with `terminus gcdn:update`, or install it with `terminus self:plugin:install pantheon-systems/terminus-gcdn-plugin`. 

For setup instructions, see [User-Agent Bypass](/guides/nextgen-gcdn#user-agent-bypass) in the Next Generation GCDN guide.
