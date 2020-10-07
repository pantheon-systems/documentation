---
title: Launch Essentials
subtitle: Choose a Primary Domain for SEO
description: Part five of our Launch Essentials guide covers redirecting users to the proper domains and paths.
launch: true
anchorid: redirects
generator: pagination
layout: guide
categories: [go-live]
tags: [dns, https, launch, webops]
type: guide
pagination:
    provider: data.launchpages
use:
    - launchpages
permalink: docs/guides/launch/redirects/
editpath: launch/05-redirects.md
image: getting-started-Largethumb
---

In this lesson, we'll redirect all traffic to a primary domain, which is a best practice for SEO. This means if you choose `www.example.com` as your primary domain, then if a visitor navigates to `example.com` (or any other domain you have connected to your site), they will end up on `https://www.example.com`.

Choose one of the following options to configure the primary domain.

<Partial file="primary-domain.md" />

## (WordPress) Update Database URLs

WordPress site admins must also ensure that all URLs in the site's database are updated. This update can be performed [during a database clone](/wordpress-broken-links#update-environment-urls-on-pantheon), or at any time [using a WordPress plugin](/wordpress-broken-links#theres-a-plugin-for-that) or through [Terminus](/terminus):

```bash{promptUser: user}
terminus wp <site>.live -- search-replace live-<site>.pantheonsite.io <custom-domain> --url=live-<site>.pantheonsite.io --dry-run
```

The example code above includes `--dry-run`, which executes the command but prevents permanent changes. Remove this flag once confident that the values are correct.

### Ready to launch like the pros?
Now that you're redirecting requests to a single, primary domain, it's the perfect time to configure a long-duration HSTS header, or set up an availability monitoring service to watch over your site like an automated hawk.

#### [Send a Long-Duration HSTS Header for Increased Security](/pantheon-yml/#enforce-https--hsts)
Prevent cookie hijacking and get an A+ rating from SSL Labs.

#### [Setup Availability Monitoring](/new-relic/#configure-ping-monitors-for-availability) (Optional)
New Relic provides a free availability monitoring service that sends a request to designated URLs from configured locations at given intervals and alerts you via email if a response fails.

