---
title: WordPress FAQ
description: Answer questions to Frequently Asked Questions concerning WordPress on the Pantheon platform.
category:
  - getting-started
  - WordPress

---

####Can I import my site?



Yes. Please see [Importing a WordPress Site](/docs/articles/wordpress/importing-a-wordpress-site#importing-a-wordpress-site) for step-by-step instructions.  


####How do I configure wp-config?  


For detailed instructions, see [Configuring wp-config](/docs/articles/wordpress/configuring-wp-config-php#configuring-wp-config-php-).  


####Why isn't my status tab displaying a report like my Drupal site does?  

We are currently working on building a status page with similar features.  


####Can I run a custom theme?  



Yes. Pantheon gives you total access to your codebase, so you can control every aspect of your design.  


####Can I run Plugins?  


Yes. Pantheon puts the power back in your hands by giving you a best-practice deployment workflow that lets you manage your entire codebase, but still allows you to test your updates before deploying to production.  


####Can I use WordPress Multisite?  


Enterprise plans can run a number of domains on one WordPress application, which does allow you to run a network of blogs. We recommend caution if you intend to run more than 25 on a single application.  

If you have a very large number of sites, we recommend spreading the installation out so you can more easily manage deployments and scale your network.  

If you have sites which share common elements, but also have some customization to their theme or plugins, Pantheon One may be just what you need. It provides a sane way to manage this kind of hybrid environment without driving your developers or customers crazy.  


####Can I use other WordPress services like the JetPack CDN?  


Absolutely. Pantheon allows you to integrate with any third-party service (e.g. CDN, search, etc).  


####What about security updates?

Pantheon makes it easy to apply updates to Wordpress via our dashboard, and you can take advantage of our deployment workflow to test the update before it goes live. (Just like Drupal.)

####What about caching, performance, and scalability?

Pantheon provides a web-scale infrastructure, which includes a super-tuned PHP environment, horizontal scalability, and caching. You don’t need to worry about messing with buggy or frustrating cache plugins (supercache, batcache, etc).  


####Do you support cache backends?  


Yes, we support Redis. Please see [Redis as a caching backend](/docs/articles/sites/redis-as-a-caching-backend#redis-as-a-caching-backend).  


####Which caches do you clear?  


You can clear the caches from your site's Pantheon dashboard. This will take care of clearing Varnish and Redis caches, if applicable. At this time, WordPress database caches are not cleared nor is selective Varnish cache clearing supported.  


####Can I install WordPress in my Drupal site (or vice versa)?  


No. Attempting anything of the sort will only cause pain and unhappiness, this will also void your warranty.  


###Further Reading  

[Importing a WordPress Site](/docs/articles/wordpress/importing-a-wordpress-site/)  


[Launching a WordPress Site](docs/articles/wordpress/starting-wordpress-site/)
