---
title: CMS as an API or Content as a Service
description: Consider options on how to build a CMS as an API in the context of decoupled CMS in Pantheon
tags: [cms]
categories: []
---

# Background

With the rise of Decoupled CMS architecture (aka “headless”), the traditionally “monolithic” CMSs that Drupal and WordPress have now changed. It has become easier to implement separate frontend component that communicates with the CMS via API.

The way this work is that the CMS expose a REST API for reading or submitting data over the web. The most common data format used is [JSON](http://www.json.org/) which supported out-of-the-box for Drupal and WordPress. These together form your "Web Services".

## Use Cases ##

The most common use-cases for CMS as an API are the following:

Static: the user-facing website is built via a static site generator that pulls from the CMS, allowing clean, elegant markup. Little to no end-user interactivity, but great for beautiful and scalable sites.

Hybrid: a portion of the website is highly interactive and communicates with the CMS via API. This is great for advanced editorial tools, calculators, or dashboards.

Single page app: the end-user experience is a complete application-in-browser, usually leveraging one of the newer JS frameworks such as Angular, Ember, or Backbone. 

Native app: the frontend is a native mobile app. Users may or may not also interact directly with the website.

CMS2: you can even decouple a CMS with another CMS! This allows you to create a strong separation of concerns between content and layout/presentation, while still using familiar tools for both.


## Considerations ##

### What is REST?

Web Services make it possible for external applications to interact with our application. This aims to enable a "CRUD" for your site, which is to CREATE, READ, UPDATE or DELETE content in your site but through HTTP Requests only. 
This is different rather than doing everything via the database. 

REST is one of the most popular ways of making Web Services work. There are other formats such as SOAP or XML-RPC, but the REST is the most commonly implemented among CMSes like WordPress and Drupal. 

REST utilizes HTTP methods, such as GET, POST, and DELETE to perform the CRUD operations needed for the site. The most common use of REST interfaces are for mobile applications that needs to read and write data to your site's database.


## Drupal 8 RESTful Web Services API

With the release of Drupal 8, Web Services have been implemented to core with the following modules:

### Core Modules ### 

RESTful Web Services (rest)
Exposes entities and other resources via a RESTful web API. It depends on the Serialization module for the serialization of data that is sent to and from the API.

Serialization (serialization)
Provides a service for serialization of data to and from formats such as JSON and XML.

Hypertext Application Language (hal)
Extends the Serialization module to provide the HAL hypermedia format. This is what is used as the primary format in Drupal 8 Core. It only adds two reserved keywords, ‘_links’ for link relations (also used by Github's Pull Request API) and ‘_embedded’ for embedded resources. The HAL hypermedia format can be encoded in both JSON and XML. For more details see the initial HAL proposal.

HTTP Basic Authentication (basic_auth)
This module implements basic user authentication using the HTTP Basic authentication provider. It facilitates the use of an username and password for authentication when making calls to the REST API. It is required for the examples shown in this blog post, and I would advise configuring SSL if you use it in production. For anyone looking for a more secure option, check out the contributed OAuth module which already has a Drupal 8 release.

### Resources Configuration ###

Once enabled, the default behavior makes node entity resources available for GET, POST, PATCH and DELETE operations. There is support for basic or cookie authentication, and alos the use of HAL or JSON formats. The default settings are found in a YAML configuration file in your files directory: sites/default/files/config_XXXX/active/rest.settings.yml. To enable REST for other entities (e.g. users, files, or fields), you need to add the required configuration to this file. 

There is a new contribute module called [REST UI](https://drupal.org/project/restui) which provides the admin interface for enabling or disabling resources, serialization formats and authentication providers.

### Resource using Views ###

Because Views is also part of core, you can easily make a JSON resource once REST and Serialization modules are also enabled. Just create a view and select "REST export" as its display type. Name the path as you like.
Use Filter Criterias to extract content as you like it (e.g., /json/articles?nid=5). You can also use Contextual Filters if we want to just append the end of the path (e.g., rest/views/articles/1) for filtering results. 
Make sure to save the view, and then try accessing the URL directly in your browser or your test tools, which return JSON by default.

### Example Requests ###

To create a node entity, we must send a POST to /entity/node with the Content-Type header set to application/hal+json and declare the required type and title fields in the request BODY.
If you have Basic Authentication enabled, you need to set headers PHP_AUTH_USER and PHP_AUTH_PW to authenticate as our user.


## Drupal 7 Modules ##

Web Services are implemented through various plugins in Drupal 7. 

[RESTful](https://www.drupal.org/project/restful)
[RESTful Web Services](https://www.drupal.org/project/restws)
[Services](https://www.drupal.org/project/services)

Service module have several integration features, and other web service format. It also has [several supporting modules](https://www.drupal.org/node/750036) that extend Drupal 7 functionalities be made available to the API.

Note: While not a REST API service by itself, you can create a JSON view using the [Views Datasource](https://www.drupal.org/project/views_datasource) module to simple create a views_json output, which can serve as a simple GET request resource.

## WordPress REST API

Since Wordpress 4.7, the [REST API plugin](https://wordpress.org/plugins/rest-api/) is no longer needed as it is now part of Core.
The complete list of resources about WP REST API is found in the [handbook](https://developer.wordpress.org/rest-api/)

To extract site posts for example, send a GET request to /wp-json/wp/v2/posts. 

To update a user with ID 4: Send a PUT request to /wp-json/wp/v2/users/4. 

To extract site posts but filter with a search term “awesome”?  GET /wp-json/wp/v2/posts?filter[s]=awesome 

Get involved or see older versions of the plugin. Visit WP REST API Team site [http://v2.wp-api.org/](http://v2.wp-api.org/)

## Contenta CMS ##

[Contenta](http://www.contentacms.org/) is an API-First Drupal distribution. It provides a standard platform that is API ready for building front-end applications. Contenta intends to ease the pain of using, or simply trying, decoupled Drupal. 

### Installation ###

You need to use [Composer](/docs/composer) to create a project. 
```composer create-project contentacms/contenta-jsonapi-project MYPROJECT --stability dev --no-interaction```

Continue to install Drupal like normal. 


## Deploying your CMS API site in Pantheon ##

After you have developed your complete CMS API service, deploy site just like any other site in Pantheon platform. Read about the [Pantheon Workflow](/docs/pantheon-workflow)

### Development Tools ###
To test or troubleshoot your REST API means to test the GET, POST or DELETE methods through HTTP. The most commonly used tools are the following:

[Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en) 

[Dev HTTP Client](https://chrome.google.com/webstore/detail/dev-http-client/aejoelaoggembcahagimdiliamlcdmfm/related)

[Restlet Client](https://chrome.google.com/webstore/detail/restlet-client-rest-api-t/aejoelaoggembcahagimdiliamlcdmfm)

Note: These are Chrome Plugin tools which usually have a counterpart for other browsers

You can also write scripts in [Guzzle](http://docs.guzzlephp.org/en/latest/), which is a great tool (and included in Drupal 8 Core). You can also use cURL via the command line or PHP.


### Edge Cache ###

<!-- How does Global CDN cache REST API resources -->

### Object Caching ###

<!-- tips on how Object Cache is best used for REST API CMS -->

### Solr Search with API ###

<!-- example cases for using Solr Search with CMS API -->

### Performance Monitoring ###

With New Relic enabled, page requests appear as transactions and not sessions for REST API resources retrieved. 
The best way to monitor its performance is to remember the most common transactions, hooks or name patterns that appear in the logs.

<!-- New Relic REST API patterns here -->




## Frequently Asked Questions ##

### Can I place a single page app in my root directory? ###

Yes, but instead of using index.html, we use override.html as the default page to be loaded. It is also possible to have sub-directory that contains singe-page apps with HTML, JS or CSS files.
However, these are treated the same way as other Static assets are in the platform.


## Known Issues ##

<!-- CORS issues -->



## See Also
[https://pantheon.io/decoupled-cms](https://pantheon.io/decoupled-cms)
[https://pantheon.io/blog/decoupled-architecture-wordpress-and-drupal](https://pantheon.io/blog/decoupled-architecture-wordpress-and-drupal)
[https://pantheon.io/what-know-about-decoupled-cms-recording](https://pantheon.io/what-know-about-decoupled-cms-recording)

## References
Drupal 8
https://www.drupal.org/docs/8/api/restful-web-services-api/restful-web-services-api-overview
https://drupalize.me/blog/201401/introduction-restful-web-services-drupal-8
https://drupalize.me/blog/201402/your-first-restful-view-drupal-8

WordPress
https://wordpress.org/plugins/rest-api/
https://developer.wordpress.org/rest-api/
http://v2.wp-api.org/](http://v2.wp-api.org/
