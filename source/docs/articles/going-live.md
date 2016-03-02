---
title: Going Live
description: Best practices for preparing your Pantheon Drupal or WordPress site launch.
category:
  - going-live
keywords: site launch, launch, pantheon, new site, best practices, going live
---
For clients with an Elite plan, our dedicated launch team guides you through the following checklist during the onboarding process. However, self service clients on any plan can follow the same best practices for going live.

We recommend that you **prepare the Live environment at least 24 hours before your launch**. If you rush a launch,  the probability of avoidable mistakes and problems will increase.

## Best Practices for Launching Sites Checklist
&nbsp;&nbsp;&nbsp;<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> [Deploy to the Live Environment](/docs/articles/sites/code/using-the-pantheon-workflow/#3.-deploy-code-to-live.)<br>
&nbsp;&nbsp;&nbsp;<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> [Select a Plan for Your Site](/docs/articles/sites/settings/selecting-a-plan/)<br>
&nbsp;&nbsp;&nbsp;<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> [Schedule Daily and Weekly Backups](#schedule-backups)<br>
**Configure Site Monitoring Services:**<br>
&nbsp;&nbsp;&nbsp;<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> [Enable New Relic for Performance Analysis](#monitoring-services)<br>
&nbsp;&nbsp;&nbsp;<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> [Create Site Alerts with Pingdom](#monitoring-services) (Optional)<br>
**Maximize Performance by Configuring Cache:**<br>
&nbsp;&nbsp;&nbsp;<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> [Redis as a Caching Backend](/docs/articles/sites/redis-as-a-caching-backend)<br>
&nbsp;&nbsp;&nbsp;<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> [Optimize Your Site's Caching Configuration](/docs/articles/sites/varnish/)<br>
&nbsp;&nbsp;&nbsp;<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> [Verify Varnish is Working](/docs/articles/sites/varnish/testing-varnish)<br>
**Verify Best Practices and Resolve All Errors:**<br>
&nbsp;&nbsp;&nbsp;<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> [WordPress Launch Check](/docs/articles/wordpress/launch-check-wordpress-performance-and-configuration-analysis/)<br>
&nbsp;&nbsp;&nbsp;<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> [Drupal Launch Check](/docs/articles/drupal/launch-check-drupal-performance-and-configuration-analysis/)<br>
&nbsp;&nbsp;&nbsp;<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> [Load and Performance Testing](/docs/articles/load-and-performance-testing/)<br>
&nbsp;&nbsp;&nbsp;<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> <a href="/docs/articles/sites/domains#step-2-add-domains-to-the-site-environment" data-proofer-ignore>Add Your Domain to the Live Environment</a><br>
&nbsp;&nbsp;&nbsp;<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span>  [Configure Redirects](#redirects)<br>
**Update and Test DNS Records:**<br>
&nbsp;&nbsp;&nbsp;<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> [Enable Secure HTTPS Communication](/docs/articles/sites/domains/adding-a-ssl-certificate-for-secure-https-communication) (Highly Recommended)<br>
&nbsp;&nbsp;&nbsp;<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> [Get and Update DNS Records](#get-dns-record-and-update-your-dns)<br>


## Schedule Backups

Schedule daily and weekly backups in case you need to revert your site content. Backups need to be run separately for each environment (Dev, Test, and Live). For details, see [Backup Creation](/docs/articles/sites/backups/backup-creation).

## Monitoring Services

Consider enabling [New Relic](/docs/articles/sites/newrelic/new-relic-performance-analysis/) monitoring to non-intrusively track the performance of your site; this is one of the first places Pantheon will look when there are performance concerns.

[Pingdom](https://www.pingdom.com/) can also be used as an additional monitoring service to create site alerts for non-cached pages. This will help you determine if your site's backend is actually down.

##  Redirects

Set up redirects for possible URL changes as a result of going live. Have a plan to monitor and mitigate 404 Page Not Found errors post-launch to retain search rankings. For more information, see [Redirecting Incoming Requests](/docs/articles/sites/code/redirect-incoming-requests/).
<div class="alert alert-danger" role="alert">
<h4>Warning</h4>
nginx does not recognize or parse Apache's directory-level configuration files, known as .htaccess files.</div>

## Get DNS Record and Update Your DNS

After you've added your domain to the Live environment, <a href="/docs/articles/sites/domains/#step-3-configure-your-dns" data-proofer-ignore>update your domain's DNS with the appropriate DNS record</a>, which will depend on your site's configuration. Once you do this, traffic will be directed from your domain to Pantheon and your site will be fully launched.

**Pantheon does not manage your domain name or DNS**. You will need to make these changes yourself. DNS changes can take up to 48 hours to propagate across the Internet. However, most updates happen in a couple hours.

## Frequently Asked Questions

#### What are the differences between the environments?

- Dev has lower TTL on Varnish caching and shows errors to site users.
- Test has the same caching configuration as Live and does not show errors to users, but only one application server.
- Live has optimal caching and does not show errors to users, and (depending on the plan) can have multiple application servers for high availability and high performance.

To learn more, see [Using the Pantheon Workflow](/docs/articles/sites/code/using-the-pantheon-workflow/).

#### Why is robots.txt is disallowing crawlers to my Live environment?

Pantheon serves a default robots.txt that disallows crawlers for any \*.pantheonsite.io domain. Once a domain has been associated with a live site environment and the site is accessed using that domain, the robots.txt from your site code will be served normally and the site will be crawled.

If you attempt to access your live environment with a pantheonsite.io domain, even if you have a domain associated with the environment, the default robots.txt will be served.

Pantheon does not allow crawlers on Dev, Test, or Multidev environments. Adding a domain to an environment other than Live will not permit crawlers to that environment.


## See Also
- [The Perfect Website Launch <span class="glyphicon  glyphicon-book" aria-hidden="true"></span>](https://pantheon.io/sites/default/files/perfect-website-launch-pantheon-ebook.pdf)
- [Required Reading: Essential Pantheon Documentation](/docs/articles/required-reading-essential-pantheon-documentation/)
