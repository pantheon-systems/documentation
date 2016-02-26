---
title: Domain Masking With Fastly and Pantheon
description: Learn how to serve two Pantheon Drupal or WordPress sites with one common domain by using Fastly to create a domain masking setup.
category:
  - developing
  - drupal
  - wordpress
keywords: domain mask, domain masking, masking your domain, mask domain with fastly, fastly, masking domain with fastly on pantheon, fastly condition
---
There are many cases in which a user needs to use two different, disparate systems on a single common domain. For example, using one system as a front end for marketing efforts or custom applications, while using another for blog content or as a custom application. This typically looks something like:

* Main Site: http://www.example-site.com/
* Blog: http://www.example-site.com/blog/

In and of itself, Pantheon does not support this kind of setup. Each site on the platform must have it's own unique domain. However, this can be attained by using an external service such as Fastly.  [Fastly](https://www.fastly.com) is a high power, industrial CDN that allows users a high degree of granular control over their Varnish VCL file through the Dashboard. It's free to register and start using Fastly.


## Before You Begin

Be sure that you have:

- A registered domain name
- The ability to modify your domain's nameservers
- [A paid Pantheon plan](/docs/articles/sites/settings/selecting-a-plan)
- A Fastly [account](https://www.fastly.com/signup/)

## Pantheon Setup
1. In the Dashboard of the Pantheon site you want to use to serve the base domain, ex. http://www.example-site.com/, go to its Live environment and select the **Domains/HTTPS** tab.
2. Enter the main domain as well as its "www" prefix.
3. In the Pantheon site you want to act as the secondary content source, ensure that you have a Live environment setup.

## Fastly Setup

1. Sign up for a [Fastly account](https://www.fastly.com/signup/).
2. Create a new service. In the "Origin service address", use the Pantheon sub-domain specific to your main site's Live environment. You will find that on it's Domains/HTTPS tab, and will look like live-{site-name}.pantheonsite.io.
3. In the domain entry, put the www.site-example.com domain you want to serve as the root level. Fastly does not serve A names, such as site-example.com, so the www is required.
4. Once Fastly has finished setting up the service, click **Configure**, and select the **Hosts** tab.
5. Click the **+ New** button and add the Pantheon sub-domain for the secondary site's Live environment.

### Create a Condition

Now you need to create a Fastly condition for each host to tell Fastly what traffic needs to be sent to what server.

Select the gear icon next to the primary content host, select **Conditions**, and then **+ New**. In the pop-up form, enter the following:

* Name: Main Content
* Apply If...: req.url !~ "^/blog"
* Priority: 2

This tells Fastly that any URL that does not include "/blog/" is sent to the main content server.

Select the gear icon next to the secondary content host, select **Conditions**, and then **+ New**. In the pop-up form, enter the following:

* Name: Blog Content
* Apply If...: req.url ~ "^/blog"
* Priority: 2

This tells Fastly that any URL that does include "/blog" is sent to the main content server.

### Create Custom Headers for Redirected Requests

The final step is to create custom headers for Fastly's redirected requests.

Click **Content**, and select **New**. In the pop-up form, enter the following:

* Name: Main_Server_Host
* Type/Action: Request, Set
* Destination: http.host
* Source: live-{site-name}.pantheonsite.io <-- Main content server's Pantheon subdomain.
* Ignore If Set: No
* Priority: 10

Next, click **Create**. Once saved, click on the gear icon next to the Main_Server_Host header and select **Request Conditions**. In the "Name" drop-down menu, select the Main_Server_Host_Condition, then click **Assign**. This assigns the Main_Server_Host Header to the Main_Server_Host_Condition, and will append the header to all traffic being sent to the main content server on Pantheon.

Now click **+ New** a second time and enter:

* Name: Blog_Server_Host
* Type/Action: Request, Set
* Destination: http.host
* Source: live-{site-name}.pantheonsite.io <-- Secondary content server's Pantheon subdomain.
* Ignore If Set: No
* Priority: 10

Click **Create**. Once saved, click on the gear icon next to the Main_Server_Host header and select **Request Conditions**. In the "Name" drop-down menu, select the **Blog_Server_Host_Condition**, then click **Assign**. This assigns the Main_Server_Host Header to the Blog_Server_Host_Condition, and will append the header to all traffic being sent to the main content server on Pantheon.

## Test The Setup

Open a new browser tab and load the main URL. For example: http://www.example-site.com/. After it loads properly, append the directory that serves the second Pantheon site to the end of the main URL. Example:  http://www.example-site.com/blog/. The content from the WordPress site should now be served.
