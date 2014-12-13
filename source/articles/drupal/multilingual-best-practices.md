---
title: Multilingual Best Practices on Pantheon
description: Configure a multilingual site on Pantheon.
category:
  - developing

---

Pantheon is home to many polylingual and non-English sites, and hosting a multi-language site on Pantheon requires no additional platform configuration.  

For detailed information on how to configure a multilingual Drupal site, see the [Multilingual Guide on Drupal.org](https://drupal.org/documentation/multilingual).  


Pantheon doesn’t enforce any particular site layout or architecture for multilingual sites, but the blog entry  [Working with multi-regional websites](http://googlewebmastercentral.blogspot.com/2010/03/working-with-multi-regional-websites.html) from The Google Webmaster Central Blog has some fantastic recommendations.  
It’s possible to specify a site language given a particular domain or path. In order of preference:

1. ccTLDs (country-code top level domain names)
2. Subdomains with gTLDs eg: de.site.com, fr.site.com, etc.
3. Subdirectories with gTLDs eg: site.com/de/, site.com/fr/, etc.

Each of these configurations is possible with Drupal’s built-in language switching.  

You can associate multiple domains with a single site environment. See [adding a domain to a site environment](/articles/sites/domains/adding-a-domain-to-a-site-environment) for details.  


<<<<<<< HEAD
Pantheon does not include any geolocation libraries. If you’d like to automatically direct traffic to a particular domain or path, check out [Geolocation and IP detection with SSL using JavaScript](/articles/advanced-topics/geolocation-and-ip-detection-with-ssl-using-javascript#geolocation-and-ip-detection-with-ssl-using-javascript).  
=======
Pantheon does not include any geolocation libraries. If you’d like to automatically direct traffic to a particular domain or path, check out [Geolocation and IP detection with SSL using JavaScript](/articles/advanced/geolocation-and-ip-detection-with-ssl-using-javascript).  
>>>>>>> d4a94817a227c88f206cbd16a4fc54839607a5f1


If you have a particular Pantheon platform related question that is not addressed in this document, please submit a support ticket through your Pantheon dashboard and we’ll be happy to help.
