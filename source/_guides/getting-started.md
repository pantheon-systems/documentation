---
title: Get Started
filename: source/_guides/get-started.md
---
The practice of professional web development has been thoroughly and professionally documented elsewhere. We built much of the most advanced and common performance-improving decsions directly into the Platform. Yes, our platform has a well-developed opinion about how you can and should build awesome websites, and it forces and nudges you into using them, for free. Step into our guides and common tasks to upgrade your trade.

## How does using Pantheon "Upgrade my trade"?

(embed clip of David's interview with Clink labs here)

- You go from x to y
- No Varnish to Varnish
- No SOLR to SOLR
- No PHP-FPM to it
- Apache to NGINX
- MySQL to MARIADB
- Shared hosting or VM's to Application Containers
- NTFS to GlusterFS with FUSEDAV
- No auth cache to REDIS
- No Git to GIT.
- Local dev to Dev-Prod Parity
- Credential-keeping to Credential Management
- Top Dev as sys-admin devops to #1 Dev as Top Dev

## Where do I start?

1. Create an account
2. Install Terminus
3. Create a site
4. Invite your friends
5. Tell people you respect



<ul>
    {% for parent_guide,guides in data.guides_parent_guide_getting-started %}
        <li><a href="{{ site.url }}/guides/{{ parent_guide|url_encode(true) }}">{{ parent_guide }}</a></li>
    {% endfor %}
</ul>
