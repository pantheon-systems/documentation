---
title: Going Live
description: Best practices for preparing your site launch.
category:
  - going-live
keywords: site launch, launch, pantheon, new site, best practices, going live
---
Congratulations, you're almost ready to launch your site on Pantheon! For Enterprise clients, our dedicated launch team guides you through these steps during the onboarding process. However, we have written this guide so that our self service clients can follow the same best practices for going live.

We recommend that you **prepare the Live environment at least 24 hours before your launch**. If you rush a launch,  the probability of avoidable mistakes and problems will increase.

## Best Practices Checklist

<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> [Select a Plan for Your Site](/docs/articles/sites/settings/selecting-a-plan/)<br>
<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> [Deploy to the Live Environment](/docs/articles/sites/code/using-the-pantheon-workflow/#3.-deploy-code-to-live)<br>
<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> [Schedule Daily and Weekly Backups](#schedule-backups)<br>
<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> Configure Site Monitoring Services:<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> [Enable New Relic for Performance Analysis](#monitoring-services)<br>
<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> Maximize Performance by Configuring Cache:<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> [Redis as a Caching Backend](/docs/articles/sites/redis-as-a-caching-backend)<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> [Varnish Caching for High Performance](/docs/articles/sites/varnish/)<br>
<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> Resolve all errors and/or notices found within the Status Tab in the Live Environment:<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> [WordPress Launch Check](/docs/articles/wordpress/launch-check-wordpress-performance-and-configuration-analysis/)<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> [Drupal Launch Check](/docs/articles/drupal/launch-check-drupal-performance-and-configuration-analysis/)<br>
<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> Enable SSL (Optional but highly recommended)<br>
<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> Load Test<br>
<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> Add a domain<br>
<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> Redirects<br>
<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> Add DNS<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> Test DNS<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span> Lower TTL<br>


## Schedule Backups

Ensure that your content is protected by scheduling daily and weekly backups. That way you've got a fallback in case you want to revert your site content. Backups need to be run separately for each environment (Dev, Test, and Live). For detailed instructions, see <a href="/docs/articles/sites/backups/backup-creation">Creating a backup</a>.

## Monitoring Services

Consider enabling [New Relic](/docs/articles/sites/newrelic/new-relic-performance-analysis/) monitoring to non-intrusively track the performance of your site; this is one of the first places Pantheon will look when there are performance concerns.

[Pingodm](https://www.pingdom.com/) can also be used as an additional monitoring service to create site alerts for non-cached pages.




## Test and Optimize Your Site

Start by disabling development modules, as they hurt performance by increasing overhead and can introduce security problems by disclosing structural and debugging information about your site to visitors.


Take a look at your performance settings, including enabling anonymous page caching, enabling aggregated stylesheets, and so forth. This will make a drastic difference in how fast your site can deliver content.

Check to see if Varnish is properly caching your site using Pantheon's Varnish Check tool at [varnishcheck.getpantheon.com](http://varnishcheck.getpantheon.com/).

Finally, you should load test your Live environment to make sure everything is optimally configured.

<table class=table>
<tbody>
		<tr>
			<th class="complete">Complete</th>
			<th class="action">Action</th>
			<th class="help">Help</th>
		</tr>
		<tr>
			<td class="complete"><span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span></td>
			<td class="action">Disable development modules &amp; plugins</td>
			<td>Ex: devel, examples, generate_errors, views_ui</td>
		</tr>
		<tr>
			<td class="complete"><span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span></td>
			<td class="action">Enable New Relic</td>
			<td class="help"><a href="/docs/articles/sites/newrelic/new-relic-performance-analysis/">Using New Relic on Pantheon</a></td>
		</tr>
		<tr>
			<td class="complete"><span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span></td>
			<td class="action">Optimize Performance Settings</td>
			<td class="help"><a href="/docs/articles/drupal/drupal-s-performance-and-caching-settings/">Performance and caching settings</a></td>
		</tr>
		<tr>
			<td class="complete"><span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span></td>
			<td class="action">Ensure Varnish caching works</td>
			<td class="help"><a href="/docs/articles/sites/varnish/">Varnish caching for high performance</a></td>
		</tr>
					<tr>
			<td class="complete"><span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span></td>
			<td class="action">Load test Live environment</td>
			<td class="help"><a href="/docs/articles/load-and-performance-testing/">Load and performance testing</a></td>
		</tr>
	</tbody>
	</table>

## Select a Paid Plan

Once you're satisfied with your site configuration, you'll need to select a paid plan. Among other reasons, free sandbox sites can't have custom domains. You will need to add a credit card to either the site or the account to set up billing.

<table class=table>
<tbody>
		<tr>
			<th class="complete">Complete</th>
			<th class="action">Action</th>
			<th class="help">Help</th>
		</tr>
		<tr>
			<td class="complete"><span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span></td>
			<td class="action">Select a paid plan</td>
			<td class="help"><a href="/docs/articles/sites/settings/selecting-a-plan/">Selecting a plan</a></td>
		</tr>
	</tbody>
	</table>

## Add Domain to the Live Environment

Now that the site is on a paid plan, you can associate your domain with the Live environment. This tells Pantheon where to send site traffic.

<table class=table>
<tbody>
		<tr>
			<th class="complete">Complete</th>
			<th class="action">Action</th>
			<th class="help">Help</th>
		</tr>
		<tr>
			<td class="complete"><span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span></td>
			<td class="action">Add domain(s) to Live environment</td>
			<td class="help"><a href="/docs/articles/sites/domains/adding-a-domain-to-a-site-environment/">Adding a domain to a site environment</a><p>
      <a href="/docs/articles/sites/domains/">Domains and SSL Tool</a></td>
		</tr>
	</tbody>
	</table>

## Get DNS Record and Update Your DNS

After you've added your domain to the Live environment, update your domain's DNS with the appropriate DNS record, which will depend on your site's configuration. Once you do this, traffic will be directed from your domain to Pantheon and your site will be fully launched.

**Pantheon does not manage your domain name or DNS**. You will need to make these changes yourself. DNS changes can take up to 48 hours to propagate across the Internet. However, most updates happen in a couple hours.

If you are an **enterprise** customer **or** using **HTTPS** to identify your site and encrypt traffic:

<table class=table>
<tbody>
		<tr>
			<th class="complete">Complete</th>
			<th class="action">Action</th>
			<th class="help">Help</th>
		</tr>
		<tr>
			<td class="complete"><span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span></td>
			<td class="action">Update DNS with custom load-balanced IP for SSL</td>
			<td class="help"><a href="/docs/articles/sites/domains/adding-a-ssl-certificate-for-secure-https-communication/">Adding a SSL certificate for secure HTTPS communication</a></td>
		</tr>
	</tbody>
	</table>

If your site plan is Business, Professional, or Personal **or** using **HTTP** and not using an identity certificate:

<table class=table>
<tbody>
		<tr>
			<th class="complete">Complete</th>
			<th class="action">Action</th>
			<th class="help">Help</th>
		</tr>
		<tr>
			<td class="complete"><span class="glyphicon  glyphicon-unchecked" aria-hidden="true"></span></td>
			<td class="action">Update DNS with Pantheon DNS record</td>
			<td><a href="/docs/articles/sites/domains/dns-records-for-directing-your-domain-to-your-pantheon-site/">DNS records for directing your domain to your Pantheon site</a></td>
		</tr>
	</tbody>
	</table>

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
