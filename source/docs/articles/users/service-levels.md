---
title: Service Levels and Environment Resources
description: Understand the service levels available for Pantheon sites and compare the resources provided for each plan and it's environments.
keywords: resources, environment resources, service level, plan, plan level, site level, site service level, site plan, site resources
---
Every site on Pantheon comes with a minimum of three dedicated environments: Dev, Test & Live. All environments are connected by version control using Git. They also have their own database, connections to our highly available file system (Valhalla), and unique URL.

The service level of your site determines available features and resources for your environments. For more details, see [Resource Comparison Across Service Levels](#resource-comparison-across-service-levels) below.
## Free Sandbox Sites
Each user is allocated two free sandbox sites for development purposes. When one of your sites converts to a paid plan, you can start another sandbox site.

You must have a paying plan in order to add a domain to a site environment.

## Personal
The Personal plan provides up to 10,000 monthly pageviews, 5GB storage, email support, and pne-click core updates. Currently, all plans except for Personal can use Redis. Redis is available to Sandbox plans for developmental purposes, but Redis will not be available going live on a Personal plan.


## Business

Business site's have [Multidev](/docs/articles/sites/multidev/) enabled with the ability to create 5 CDEs.

This plan also comes with the ability to utilize multiple application containers.
## Enterprise
Enterprise site's have [Multidev](/docs/articles/sites/multidev/) enabled with the ability to create 10 CDEs.

This plan also comes with the ability to utilize multiple application containers, SLA-guaranteed uptime, and 24/7 emergency support.
## Resource Comparison Across Service Levels
  <table class="table">
  <tbody>
		<tr>
      <th style="background-image: linear-gradient(to bottom,#f5f5f5 0,#e8e8e8 100%);"></th>
      <th style="background-image: linear-gradient(to bottom,#f5f5f5 0,#e8e8e8 100%);">Sandbox</th>
			<th style="background-image: linear-gradient(to bottom,#f5f5f5 0,#e8e8e8 100%);">Personal</th>
			<th style="background-image: linear-gradient(to bottom,#f5f5f5 0,#e8e8e8 100%);">Professional</th>
			<th style="background-image: linear-gradient(to bottom,#f5f5f5 0,#e8e8e8 100%);">Business</th>
      <th style="background-image: linear-gradient(to bottom,#f5f5f5 0,#e8e8e8 100%);">Enterprise</th>
      </span>
		</tr>
		<tr>
			<th>Monthly Page Views<br><span style="font-weight: normal;"><small>Estimated number of page views per month on your website.</small></span></th>
        <td style="background-color: #F4F4F4;"><small>10,000</small></small></td>
        <td><small>10,000</small></td>
        <td style="background-color: #F4F4F4;"><small>100,000</small></td>
        <td><small>500,000</small></td>
        <td style="background-color: #F4F4F4;"><small>Millions</small></td>
    </tr>
    <tr>
      <th>Billing</th>
        <td style="background-color: #F4F4F4;"><small>Free</small></td>
        <td><small>Monthly</small></td>
        <td style="background-color: #F4F4F4;"><small>Monthly</small></td>
        <td><small>Monthly</small></td>
        <td style="background-color: #F4F4F4;"><small>Annual</small></td>
    </tr>
		<tr>
      <th>Storage<br><span style="font-weight: normal;"><small>Robust SSD storage across the entire platform.</small></span></th>
        <td style="background-color: #F4F4F4;"><small>5GB</small></td>
        <td><small>5GB</small></td>
        <td style="background-color: #F4F4F4;"><small>20GB</small></td>
        <td><small>30GB</small></td>
        <td style="background-color: #F4F4F4;"><small>100GB+</small></td>
		</tr>
		<tr>
      <th>Application Memory Limit<br><span style="font-weight: normal;"><small>The amount of memory any single request can utilize. Sites htat handle complex data or with very large codebases will need more.</small></span></th>
        <td style="background-color: #F4F4F4;"><small>256MB</small></td>
        <td><small>256MB</small></td>
        <td style="background-color: #F4F4F4;"><small>128MB</small></td>
        <td><small>512MB</small></td>
        <td style="background-color: #F4F4F4;"><small>Up to 1GB</small></td>
  		</tr>
      <tr>
        <th>One-Click Core Updates<br><span style="font-weight: normal;"><small>Update WordPress and Drupal core with a single click.</small></span></th>
          <td style="background-color: #F4F4F4;"><small>Included</small></td>
          <td><small>Included</small></td>
          <td style="background-color: #F4F4F4;"><small>Included</small></td>
          <td><small>Included</small></td>
          <td style="background-color: #F4F4F4;"><small>Included</small></td>
      </tr>
      <tr>
        <th>Automated Backup Retention<br><span style="font-weight: normal;"><small>Automatic daily and weekly backups, stored in redundant offsite loactions.</small><span></th>
          <td style="background-color: #F4F4F4;"><small>1 week</small></td>
          <td><small>1 week</small></td>
          <td style="background-color: #F4F4F4;"><small>2 weeks</small></td>
          <td><small>1 month</small></td>
          <td style="background-color: #F4F4F4;"><small>Years</small></td>
      </tr>
      <tr>
        <th>Load Balancing<br><span style="font-weight: normal;"><small>All requests on Pantheon are load balanced, allowing you to scale at will and improving your site's uptime.</small></span></th>
          <td style="background-color: #F4F4F4;"><small>Included</small></td>
          <td><small>Included</small></td>
          <td style="background-color: #F4F4F4;"><small>Included</small></td>
          <td><small>Included</small></td>
          <td style="background-color: #F4F4F4;"><small>Included</small></td>
      </tr>
      <tr>
        <th>Website Firewall<br><span style="font-weight: normal;"><small>Platform-wide protection ensures only website traffice reahes your site.</small></span></th>
          <td style="background-color: #F4F4F4;"><small>Included</small></td>
          <td><small>Included</small></td>
          <td style="background-color: #F4F4F4;"><small>Included</small></td>
          <td><small>Included</small></td>
          <td style="background-color: #F4F4F4;"><small>Included</small></td>
      </tr>
      <tr>
        <th>End-to-end Encryption for Web Traffic<br><span style="font-weight: normal;"><small>All traffic routed through Pantheon is encrypted, allowing customers using HTTPS to guarantee encryption from a user's browser to the application container.</small></span></th>
          <td style="background-color: #F4F4F4;"><small>Included</small></td>
          <td><small>Included</small></td>
          <td style="background-color: #F4F4F4;"><small>Included</small></td>
          <td><small>Included</small></td>
          <td style="background-color: #F4F4F4;"><small>Included</small></td>
      </tr>
      <tr>
        <th>Encrypted End-Point Connections<br><span style="font-weight: normal;"><small>All development work can be done via secure, encrypted channels (e.g. SFTP or SSH tunnels).</small></span></th>
          <td style="background-color: #F4F4F4;"><small>Included</small></td>
          <td><small>Included</small></td>
          <td style="background-color: #F4F4F4;"><small>Included</small></td>
          <td><small>Included</small></td>
          <td style="background-color: #F4F4F4;"><small>Included</small></td>
      </tr>
      <tr>
        <th>Edge Cache<br><span style="font-weight: normal;"><small>Our edge-cache uses Varnish to accelerate content and pages on every Pantheon-powered site.</small></span></th>
          <td style="background-color: #F4F4F4;"><small>Included</small></td>
          <td><small>Included</small></td>
          <td style="background-color: #F4F4F4;"><small>Included</small></td>
          <td><small>Included</small></td>
          <td style="background-color: #F4F4F4;"><small>Included</small></td>
      </tr>
  		<tr>
        <th>Application Cache<br><span style="font-weight: normal;"><small>Our application cache uses Redis to significantly accelerate sites that make heavy use of the database.</small></span></th>
          <td style="background-color: #F4F4F4;"><small>Not available</small></td>
          <td><small>Not available</small></td>
          <td style="background-color: #F4F4F4;"><small>128MB</small></td>
          <td><small>256MB</small></td>
          <td style="background-color: #F4F4F4;"><small>16GB</small></td>
  		</tr>
      <tr>
        <th>Concurrency<br><span style="font-weight: normal;"><small>Having multiple threads allows your webiste to handle more simultaneous requests.</small></span></th>
          <td style="background-color: #F4F4F4;"><small>4</small></td>
          <td><small>4</small></td>
          <td style="background-color: #F4F4F4;"><small>8</small></td>
          <td><small>16</small></td>
          <td style="background-color: #F4F4F4;"><small>Managed Scaling</small></td>
  		</tr>
      <tr>
        <th>HTTPS<br><span style="font-weight: normal;"><small>Run your site securly in https, using your own certificates. Static IP address included.</small></span></th>
          <td style="background-color: #F4F4F4;"><small>Not available</small></td>
          <td><small>Not available</small></td>
          <td style="background-color: #F4F4F4;"><small>$30/mo per cert</small></td>
          <td><small>$30/mo per cert</small></td>
          <td style="background-color: #F4F4F4;"><small>Included</small></td>
      </tr>
        <th>Dedicated IP<br><span style="font-weight: normal;"><small>For advanced DNS routing or network integration.</small></span></th>
          <td style="background-color: #F4F4F4;"><small>Not available</small></td>
          <td><small>Not available</small></td>
          <td style="background-color: #F4F4F4;"><small>$30/mo or w/cert</small></td>
          <td><small>$30/mo or w/cert</small></td>
          <td style="background-color: #F4F4F4;"><small>Included</small></td>
      </tr>
      </tr>
        <th>Site Monitoring<br><span style="font-weight: normal;"><small>We monitor your site every minute from around the world and can take action if downtime is detected.</small></span></th>
          <td style="background-color: #F4F4F4;"><small>Not available</small></td>
          <td><small>Not available</small></td>
          <td style="background-color: #F4F4F4;"><small>Included</small></td>
          <td><small>Included</small></td>
          <td style="background-color: #F4F4F4;"><small>Included with on-call alerting</small></td>
      </tr>
      </tr>
        <th>Full-Text Search<br><span style="font-weight: normal;"><small>Pantheon provides a full Solr stack as a service, enabling performant, faceted full-text search of content and documents.</small></span></th>
          <td style="background-color: #F4F4F4;"><small>Not available</small></td>
          <td><small>Not available</small></td>
          <td style="background-color: #F4F4F4;"><small>Included</small></td>
          <td><small>Included</small></td>
          <td style="background-color: #F4F4F4;"><small>Included</small></td>
      </tr>
      <tr>
        <th>Database Working Set<br><span style="font-weight: normal;"><small>The amount of data you'll be able to hold in memory at any given time. Larger database footprints will benefit.</small></span></th>
          <td style="background-color: #F4F4F4;"><small>128MB</small></td>
          <td><small>128MB</small></td>
          <td style="background-color: #F4F4F4;"><small>500MB</small></td>
          <td><small>1GB</small></td>
          <td style="background-color: #F4F4F4;"><small>16GB</small></td>
      </tr>
      <tr>
        <th>Replica DB<br><span style="font-weight: normal;"><small>Add a second database for read-only queries and distribute the load.</small></span></th>
        <td style="background-color: #F4F4F4;"><small>Not available</small></td>
        <td><small>Not available</small></td>
        <td style="background-color: #F4F4F4;"><small>Not available</small></td>
        <td><small>Not available</small></td>
        <td style="background-color: #F4F4F4;"><small>Included</small></td>
      </tr>
      <tr>
        <th>Custom Distributions<br><span style="font-weight: normal;"><small>Support for custom upstreams allowing one-click installation and one-click updates across many sites.</small></span></th>
        <td style="background-color: #F4F4F4;"><small>Not available</small></td>
        <td><small>Not available</small></td>
        <td style="background-color: #F4F4F4;"><small>Not available</small></td>
        <td><small>Not available</small></td>
        <td style="background-color: #F4F4F4;"><small>Available</small></td>
      </tr>
      <tr>
        <th>Cloud Development Environments<br><span style="font-weight: normal;"><small>The Multidev feature lets you spin up Git feature branches as cloud development environments for teams.</small></span></th>
          <td style="background-color: #F4F4F4;"><small>Not available</small></td>
          <td><small>Not available</small></td>
          <td style="background-color: #F4F4F4;"><small>Not available</small></td>
          <td><small>5</small></td>
          <td style="background-color: #F4F4F4;"><small>10</small></td>
      </tr>
      <tr>
        <th>Secure Runtime Access<br><span style="font-weight: normal;"><small>Force all developer access to site resources through SSH tunnel.</small></span></th>
          <td style="background-color: #F4F4F4;"><small>Not available</small></td>
          <td><small>Not available</small></td>
          <td style="background-color: #F4F4F4;"><small>Not available</small></td>
          <td><small>Not available</small></td>
          <td style="background-color: #F4F4F4;"><small>Included</small></td>
      </tr>
      <tr>
        <th>Roles and Permissions<br><span style="font-weight: normal;"><small>Feature Change Management allows you to restrict access to deploying in test and live environments to only trusted users.</small></span></th>
        <td style="background-color: #F4F4F4;"><small>Not available</small></td>
        <td><small>Not available</small></td>
        <td style="background-color: #F4F4F4;"><small>Not available</small></td>
        <td><small>Not available</small></td>
        <td style="background-color: #F4F4F4;"><small>Included</small></td>
      </tr>
      <tr>
        <th>Secure Integration<br><span style="font-weight: normal;"><small>Pantheon Enterprise Gateway allows you to securely connect to resources that reside behind a firewall.</small></span></th>
        <td style="background-color: #F4F4F4;"><small>Not available</small></td>
        <td><small>Not available</small></td>
        <td style="background-color: #F4F4F4;"><small>Not available</small></td>
        <td><small>Not available</small></td>
        <td style="background-color: #F4F4F4;"><small>Available</small></td>
      </tr>
      <tr>
        <th>Support Tickets<br><span style="font-weight: normal;"><small>Access to website experts to help with launch and ongoing site performance.</small></span></th>
        <td style="background-color: #F4F4F4;"><small>Included</small></td>
        <td><small>Included</small></td>
        <td style="background-color: #F4F4F4;"><small>Included</small></td>
        <td><small>Unlimited tickets priority treatment</small></td>
        <td style="background-color: #F4F4F4;"><small>Unlimited tickets 2 hr response SLA-backed</small></td>
      </tr>
      <tr>
        <th>Phone Support<br><span style="font-weight: normal;"><small>One-on-one conversation to guide you through unresolved tickets or complicated website issues.</small></span></th>
        <td style="background-color: #F4F4F4;"><small>Not available</small></td>
        <td><small>Not available</small></td>
        <td style="background-color: #F4F4F4;"><small>Not available</small></td>
        <td><small>As required</small></td>
        <td style="background-color: #F4F4F4;"><small>Included</small></td>
      </tr>
      <tr>
        <th>24x7 On-call<br><span style="font-weight: normal;"><small>The Enterprise customer bat-phone -- emergency support anytime, anywhere for your website.</small></span></th>
        <td style="background-color: #F4F4F4;"><small>Not available</small></td>
        <td><small>Not available</small></td>
        <td style="background-color: #F4F4F4;"><small>Not available</small></td>
        <td><small>Not available</small></td>
        <td style="background-color: #F4F4F4;"><small>Included</small></td>
      </tr>
      <tr>
        <th>Onboarding<br><span style="font-weight: normal;"><small>Use live weekly training and our documentation for a smooth DIY onboarding process. Enterprise customs have the added support of a dedicated launch team.</small></span></th>
        <td style="background-color: #F4F4F4;"><small>DIY</small></td>
        <td><small>DIY</small></td>
        <td style="background-color: #F4F4F4;"><small>DIY</small></td>
        <td><small>DIY</small></td>
        <td style="background-color: #F4F4F4;"><small>Included with Launch Team support</small></td>
      </tr>
  	</tbody>
  </table>
