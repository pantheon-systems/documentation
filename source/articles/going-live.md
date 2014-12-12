---
title: Going Live
description: Best practices for preparing your site launch
category:
	- going-live
---

## Preparing for Your Site Launch

Congratulations, you're almost ready to launch your site on Pantheon! There's a couple things to do to get ready, but we'll help you with every step.

We recommend that you **prepare the Live environment at least 24 hours before your launch** date, so give yourself time. If you rush a launch, you'll increase the probability of avoidable mistakes and problems.

## Best Practices to Prepare for Launch

Making sure that your site code is current to reduce the potential for later issues and makes your site easier to maintain. For Drupal, make sure  you've updated any contrib modules and Drupal core to the latest recommended release to ensure stability and security.

While it's good for visitors and DNS to resolve both www and the domain itself, it's best practice to choose one or the other and redirect from www to non-www (or vice versa, your call). To do this, just update your settings.php configuration to redirect site traffic to your preferred domain. If you don't, there will be an SEO penalty due to duplicate content, among other problems.

<tbody>
		<tr>
			<th class="complete">Complete</th>
			<th class="action">Action</th>
			<th class="help">Help</th>
		</tr>
		<tr>
			<td class="complete">[ ]</td>
			<td class="action">Update core</td>
			<td class="help"><a href="/documentation/running-drupal/drupal-core-updates/">Core updates</a></td>
		</tr>
		<tr>
			<td class="complete">[ ]</td>
			<td class="action">Update contrib modules</td>
			<td>Latest stable release (avoid dev and alpha)</td>
		</tr>
		<tr>
			<td class="complete">[ ]</td>
			<td class="action">Update settings to redirect to a common domain</td>
			<td class="help"><a href="/documentation/howto/redirect-incoming-requests/#redirect_common">Redirect incoming requests</a></td>
		</tr>
	</tbody>

## Deploy Code to the Live Environment

When all code changes are complete, pull the code changes into the Live environment.

<tbody>
		<tr>
			<th class="complete">Complete</th>
			<th class="action">Action</th>
			<th class="help">Help</th>
		</tr>
		<tr>
			<td class="complete">[ ]</td>
			<td class="action">Pull code to Live</td>
			<td class="help"><a href="/documentation/howto/using-the-pantheon-workflow/">Using the Pantheon Workflow</a></td>
		</tr>
	</tbody>

## Test and Optimize Your Site

Start by disabling development modules, as they hurt performance by increasing overhead and can introduce security problems by disclosing structural and debugging information about your site to visitors.

You should also consider enabling New Relic monitoring to non-intrusively track the performance of your site; this is one of the first places Pantheon will look when there are performance concerns.

Take a look at your performance settings, including enabling anonymous page caching, enabling aggregated stylesheets, and so forth. This will make a drastic difference in how fast your site can deliver content.

Then, check to see if Varnish is properly caching your site using Pantheon's Varnish Check tool at [varnishcheck.getpantheon.com](http://varnishcheck.getpantheon.com/).

Finally, you should load test your Live environment to make sure everything is optimally configured.

<tbody>
		<tr>
			<th class="complete">Complete</th>
			<th class="action">Action</th>
			<th class="help">Help</th>
		</tr>
		<tr>
			<td class="complete">[ ]</td>
			<td class="action">Disable development modules &amp; plugins</td>
			<td>Ex: devel, examples, generate_errors, views_ui</td>
		</tr>
		<tr>
			<td class="complete">[ ]</td>
			<td class="action">Enable New Relic</td>
			<td class="help"><a href="/documentation/howto/new-relic-performance-analysis-on-pantheon/">Using New Relic on Pantheon</a></td>
		</tr>
		<tr>
			<td class="complete">[ ]</td>
			<td class="action">Optimize Performance Settings</td>
			<td class="help"><a href="/documentation/running-drupal/drupal-s-performance-and-caching-settings/">Performance and caching settings</a></td>
		</tr>
		<tr>
			<td class="complete">[ ]</td>
			<td class="action">Ensure Varnish caching works</td>
			<td class="help"><a href="/documentation/advanced-topics/varnish-caching-for-high-performance/">Varnish caching for high performance</a></td>
		</tr>
		<tr>
			<td class="complete">[ ]</td>
			<td class="action">Load test Live environment</td>
			<td class="help"><a href="/documentation/howto/load-and-performance-testing/">Load and performance testing</a></td>
		</tr>
	</tbody>

## Select a Paid Plan

Once you're satisfied with your site configuration, you'll need to select a paid plan. Among other reasons, free sandbox sites can't have custom domains. You will need to add a credit card to either the site or the account to set up billing.

<tbody>
		<tr>
			<th class="complete">Complete</th>
			<th class="action">Action</th>
			<th class="help">Help</th>
		</tr>
		<tr>
			<td class="complete">[ ]</td>
			<td class="action">Select a paid plan</td>
			<td class="help"><a href="/documentation/howto/selecting-a-plan/">Selecting a plan</a></td>
		</tr>
	</tbody>

## Schedule backups

Ensure that your Live environment content is protected by scheduling daily and weekly backups. That way, you've got a fallback in case you want to revert your site content.

<tbody>
		<tr>
			<th class="complete">Complete</th>
			<th class="action">Action</th>
			<th class="help">Help</th>
		</tr>
		<tr>
			<td class="complete">[ ]</td>
			<td class="action">Schedule backups</td>
			<td class="help"><a href="/documentation/getting-started/backup-creation/#can-i-get-automatic-daily-backups">Creating a backup</a></td>
		</tr>
	</tbody>

## Add Domain to the Live Environment

Now that the site is on a paid plan, you can associate your domain with the Live environment. This tells Pantheon where to send site traffic.

<tbody>
		<tr>
			<th class="complete">Complete</th>
			<th class="action">Action</th>
			<th class="help">Help</th>
		</tr>
		<tr>
			<td class="complete">[ ]</td>
			<td class="action">Add domain(s) to Live environment</td>
			<td class="help"><a href="/documentation/getting-started/adding-a-domain-to-a-site-environment/">Adding a domain to a site environment</a></td>
		</tr>
	</tbody>

## Get DNS Record and Update Your DNS

After you've added your domain to the Live environment, you will need to update your domain's DNS with the appropriate DNS record, which will depend on your site's configuration. This is the last step; once you do this, traffic will be directed from your domain to Pantheon and your site will be fully launched.

**Pantheon does not manage your domain name or DNS**. You will need to make these changes yourself. DNS changes can take up to 48 hours to propagate across the Internet, so be patient - it will happen. With that said, most updates happen in a couple hours.

​If you are an **ENTERPRISE** customer **or** using **HTTPS** to identify your site and encrypt traffic:

<tbody>
		<tr>
			<th class="complete">Complete</th>
			<th class="action">Action</th>
			<th class="help">Help</th>
		</tr>
		<tr>
			<td class="complete">[ ]</td>
			<td class="action">Update DNS with custom load-balanced IP for SSL</td>
			<td class="help"><a href="/documentation/howto/adding-a-ssl-certificate-for-secure-https-communication/">Adding a SSL certificate for secure HTTPS communication</a></td>
		</tr>
	</tbody>

If your site plan is Business, Professional, or Personal **or** using **HTTP** and not using an identity certificate:

<tbody>
		<tr>
			<th class="complete">Complete</th>
			<th class="action">Action</th>
			<th class="help">Help</th>
		</tr>
		<tr>
			<td class="complete">[ ]</td>
			<td class="action">Update DNS with Pantheon DNS record</td>
			<td><a href="/documentation/getting-started/dns-records-for-directing-your-domain-to-your-pantheon-site/">DNS records for directing your domain to your Pantheon site</a></td>
		</tr>
	</tbody>

## Frequently Asked Questions

#### What are the differences between the environments?

- Dev has lower TTL on Varnish caching and shows errors to site users.
- Test has the same caching configuration as Live and does not show errors to users, but only one application server.
- Live has optimal caching and does not show errors to users, and (depending on the plan) can have multiple application servers for high availability and high performance.

​To learn more, see [using the Pantheon workflow](/articles/howto/using-the-pantheon-workflow/).

#### Why is robots.txt is disallowing crawlers to my Live environment?

Pantheon serves a default robots.txt that disallows crawlers for any \*.gotpantheon.com domain. Once a domain has been associated with a live site environment and the site is accessed using that domain, the robots.txt from your site code will be served normally and the site will be crawled.

If you attempt to access your live environment with a gotpantheon.com domain, even if you have a domain associated with the environment, the default robots.txt will be served.

Pantheon does not allow crawlers on Dev, Test, or any branch environment. Adding a domain to an environment other than Live will not permit crawlers to that environment.

<style type="text/css">.checklist .complete {
  width: 75px;
  text-align: center;
}
.checklist .action {
  width: 250px;
  text-align: left;
}
.checklist .help {
  text-align: left;
}
.checklist th {
  border-bottom: 1px solid black;
}
</style>
