---
title: Adding a Domain to a Site Environment
description: Learn how to associate a domain to an environment from within the Pantheon dashboard.
category:
  - going-live
  - managing
---

## Overview
In order for Pantheon to know where to send your site traffic, you need to associate your domain to the target site environment through the Pantheon dashboard.

This is independent of your DNS configuration, which is required to send traffic from your domain to Pantheon. For detailed instructions, see [Configuring Your DNS for Pantheon](/docs/articles/sites/domains/dns-records-for-directing-your-domain-to-your-pantheon-site/).

For general information about launching your site, see [Going Live and Launching Your Site](/docs/articles/going-live/).


## Add a Domain to a Site Environment

1. From your site dashboard, select the environment (typically Live), and click **Domains**.  


 ![](/source/docs/assets/images/desk_images/198280)  



2. On the Domain Setup tab, enter the domain you want associated with that environment, and click **Add New Domain to the ... Environment**.  



Both the domain and the www subdomain will be added.  


 ![](/source/docs/assets/images/desk_images/198281)  



Once this is complete and your domain's DNS points to Pantheon, Pantheon will know where to route that request.

## Remove a Domain From a Site Environment

1. From your site dashboard, select the environment (typically Live), and click **Domains**.
2. Click **Remove** next to the appropriate domain.  


 ![](/source/docs/assets/images/desk_images/198283)  



This will not change your DNS configuration. However, if your domain's DNS is still pointing to Pantheon and you do not have that domain associated with a Pantheon site, the request will fail.

## Limitations

* You must add every domain (hostname) to the site environment that you want Pantheon to be able to serve. Automatic resolution of domains and wildcards are not supported.

* You must have a paying plan in order to add a domain to a site environment. For more information, see [Selecting a Plan](/docs/articles/sites/settings/selecting-a-plan/).

* A specific domain or subdomain can only be associated with one environment at any time. You can associate any combination of domains or subdomains, but you can't associate a specific domain or subdomain simultaneously on two separate site environments. You could associate domain.com with one site and archive.domain.com with another. Therefore, the following is possible:

  Pantheon site #1 - domain.com, www.domain.com

  Pantheon site #2 - archive.domain.com

## Develop Using a Domain Without Changing DNS

Sometimes it's useful to develop on a site using a specific domain, but the overhead of temporarily changing DNS is too much. There is a workaround that will allow your local workstation to access your Pantheon site by domain without changing DNS.

1. From the Pantheon Dashboard, add the domain to the target site environment.
2. Edit your local [hosts file](http://en.wikipedia.org/wiki/Hosts_(file)#Location_in_the_file_system) to include a Pantheon IP address (a record from going live for HTTP, custom load-balanced IP from your dashboard for HTTPS) and the domain.

Example:

    192.237.142.203 puppies.cuddlyfanclub.com

**Note**: Remember to remove this change when you're done.
