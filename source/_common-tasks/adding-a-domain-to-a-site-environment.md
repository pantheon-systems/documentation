---
title: Adding a domain to a site environment
filename: source/_docs/adding-a-domain-to-a-site-environment.md
---

In order for Pantheon to know where to send your site traffic, you need to associate your domain to the appropriate site environment through the Pantheon dashboard.

This is independent of your DNS configuration, which is required in order to send traffic from your domain to Pantheon. To learn more, see our article on [configuring your DNS for Pantheon](/documentation/getting-started/dns-records-for-directing-your-domain-to-your-pantheon-site/).

For more about launching your site in general, see [going live and launching your site](/documentation/running-drupal/going-live-and-launching-your-site/).

## How to add a domain to a site environment

From your site dashboard, select the environment in question (typically Live), then go to Domains.  
  
  
 ![](https://pantheon-systems.desk.com/customer/portal/attachments/198280)  
  
  
On the Domain Setup tab, specify the domain that you want to associate with that environment, then click "Add New Domain to the ... Environment" button.  
  
  
Both the domain and the www subdomain of the domain will be added for convenience.  
  
  
 ![](https://pantheon-systems.desk.com/customer/portal/attachments/198281)  
  
  
Once this is completed, if your domain's DNS points to Pantheon and someone accesses that domain, Pantheon will know where to route that request.

## How to remove a domain to a site environment

From your site dashboard, select the environment in question (typically Live), then go to Domains. Next to the domain in question, click Remove.  
  
  
 ![](https://pantheon-systems.desk.com/customer/portal/attachments/198283)  
  
  
This will not change your DNS configuration, but if your domain's DNS is still pointing to Pantheon and you do not have that domain associated with any Pantheon site, then the request will fail.

## Limitations

You must add every domain (hostname) to the site environment that you want Pantheon to be able to serve. **Automatic resolution of domains and wildcards are not supported.**

**You must have a paying plan in order to add a domain** to a site environment. See our article on [selecting a plan](/documentation/howto/selecting-a-plan/) to learn more.

For both security and sensibility, **a specific domain or subdomain can only be associated with one environment** at any time. You can associate any combination of domains or subdomains, but you can't associate a specific domain or subdomain simultaneously on two separate site environments. You could associate domain.com with one site and archive.domain.com with another, though. Therefore, the following is possible:

- Pantheon site #1 - domain.com, www.domain.com
- Pantheon site #2 - archive.domain.com

## Developing with a domain without changing DNS

Sometimes, it's useful to experiment and develop on a site using a specific domain, but the overhead of temporarily changing DNS is too much. Fortunately, there's a workaround that will allow your local workstation to access your Pantheon site by domain without changing DNS.

1. From the Pantheon Dashboard, add domain to the target site environment
2. Edit your local  [hosts file](http://en.wikipedia.org/wiki/Hosts_(file)#Location_in_the_file_system) to include an entry containing a Pantheon IP address (A record from going live for HTTP, custom load-balanced IP from your dashboard for HTTPS) and the domain.
 

For example:

    192.237.142.203 puppies.cuddlyfanclub.com

Remember to remove this change to your local configuration when you're done!


