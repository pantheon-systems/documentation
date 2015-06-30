---
title: Going Live
description: Best practices for preparing your site launch.
category:
  - going-live
keywords: site launch, launch, pantheon, new site, best practices, going live
---
Congratulations, you're almost ready to launch your site on Pantheon! For Enterprise clients, our dedicated launch team guides you through these steps during the onboarding process. However, we have written this guide so that our self service clients can follow the same best practices for going live.

We recommend that you **prepare the Live environment at least 24 hours before your launch**. If you rush a launch,  the probability of avoidable mistakes and problems will increase.

## Best Practices for Launching Sites Checklist
<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> [Select a Plan for Your Site](/docs/articles/sites/settings/selecting-a-plan/)<br>
<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> [Deploy to the Live Environment](/docs/articles/sites/code/using-the-pantheon-workflow/#3.-deploy-code-to-live)<br>
<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> [Schedule Daily and Weekly Backups](#schedule-backups)<br>
**Configure Site Monitoring Services:**<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> [Enable New Relic for Performance Analysis](#monitoring-services)<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> [Create Site Alerts for Non-cached Pages using Pingdom](#monitoring-services)<br>
**Maximize Performance by Configuring Cache:**<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> [Redis as a Caching Backend](/docs/articles/sites/redis-as-a-caching-backend)<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> [Optimize Your Site's Caching Configuration with Varnish for High Performance](/docs/articles/sites/varnish/)<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> [Verify Varnish is Working on Your Pantheon Site](/docs/articles/sites/varnish/testing-varnish)<br>
**Resolve all errors and/or notices found within the Status Tab in the Live Environment:**<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> [WordPress Launch Check](/docs/articles/wordpress/launch-check-wordpress-performance-and-configuration-analysis/)<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> [Drupal Launch Check](/docs/articles/drupal/launch-check-drupal-performance-and-configuration-analysis/)<br>
<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> [Enable SSL for Secure HTTPS Communication](/docs/articles/sites/domains/adding-a-ssl-certificate-for-secure-https-communication) (Optional but highly recommended)<br>
<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> [Load and Performance Testing](/docs/articles/load-and-performance-testing/)<br>
<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> [Add Your Domain to the Live Environment](/docs/articles/sites/domains/adding-a-domain-to-a-site-environment/)<br>
<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span>  [Verify Redirection Sends Visitors to a Canonical Domain](#redirects)<br>
**Update and Test DNS Records:**<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> [Get and Update DNS Records](#get-dns-record-and-update-your-dns)<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> [Adjust TTL Value to 120s](https://en.wikipedia.org/wiki/Time_to_live#DNS_records)<br>


## Schedule Backups

Ensure that your content is protected by scheduling daily and weekly backups. That way you've got a fallback in case you want to revert your site content. Backups need to be run separately for each environment (Dev, Test, and Live). For detailed instructions, see <a href="/docs/articles/sites/backups/backup-creation">Creating a backup</a>.

## Monitoring Services

Consider enabling [New Relic](/docs/articles/sites/newrelic/new-relic-performance-analysis/) monitoring to non-intrusively track the performance of your site; this is one of the first places Pantheon will look when there are performance concerns.

[Pingodm](https://www.pingdom.com/) can also be used as an additional monitoring service to create site alerts for non-cached pages.

##  Redirects

Setup redirects for possible URL changes as a result of going live. Have plan to monitor and mitigate 404 Page not found errors post-launch to retain search rankings. For more information, see [Redirecting Incoming Requests](/docs/articles/sites/code/redirect-incoming-requests/)
<div class="alert alert-danger" role="alert">
<strong>Warning</strong>: For best results, do <strong>not</strong> rely global redirect logic within the application configuration (e.g. wp-config.php or settings.php). The <a href="https://www.drupal.org/project/redirect" target="blank">Redirect module</a> is recommended. </div>



## Get DNS Record and Update Your DNS

After you've added your domain to the Live environment, [update your domain's DNS with the appropriate DNS record](/docs/articles/sites/domains/dns-records-for-directing-your-domain-to-your-pantheon-site), which will depend on your site's configuration. Once you do this, traffic will be directed from your domain to Pantheon and your site will be fully launched.

**Pantheon does not manage your domain name or DNS**. You will need to make these changes yourself. DNS changes can take up to 48 hours to propagate across the Internet. However, most updates happen in a couple hours.


## Frequently Asked Questions

#### What are the differences between the environments?

- Dev has lower TTL on Varnish caching and shows errors to site users.
- Test has the same caching configuration as Live and does not show errors to users, but only one application server.
- Live has optimal caching and does not show errors to users, and (depending on the plan) can have multiple application servers for high availability and high performance.

To learn more, see [using the Pantheon workflow](/docs/articles/sites/code/using-the-pantheon-workflow/).

#### Why is robots.txt is disallowing crawlers to my Live environment?

Pantheon serves a default robots.txt that disallows crawlers for any \*.pantheon.io domain. Once a domain has been associated with a live site environment and the site is accessed using that domain, the robots.txt from your site code will be served normally and the site will be crawled.

If you attempt to access your live environment with a pantheon.io domain, even if you have a domain associated with the environment, the default robots.txt will be served.

Pantheon does not allow crawlers on Dev, Test, or any branch environment. Adding a domain to an environment other than Live will not permit crawlers to that environment.
