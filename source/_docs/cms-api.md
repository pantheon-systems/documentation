---
title: CMS as an API or Content as a Service
description: Consider options on how to build a CMS as an API in the context of decoupled CMS in Pantheon
tags: [cms]
categories: []
---


With the rise of Decoupled (**headless**) CMS architecture, the traditionally “monolithic” CMSs  Drupal and WordPress are have now changed. Content as a Service (**CaaS**) means to have an application that manages your content into feeds or services that other applications or properties can consume. It is now easier to implement separate frontend components or frameworks that communicates with the CMS via an API.

A Common feature is that the CMS application exposes a REST API, which allows reading or submitting data over the web. The most common data format used is [JSON](http://www.json.org/), which is supported out-of-the-box for Drupal and WordPress. These together form your "Web Services".

To know more of the different use-cases possible, check our [Decoupled CMS page](/decoupled-cms)

## Considerations

Pantheon supports only [one application per site](/docs/platform-considerations/#one-application-per-site) and only for Drupal or WordPress applications.

Database access is intended for both debugging or importing large databases. Exposing database connection for external applications use is not recommended. The REST API components of Drupal or WordPress is ideal instead of building your own application. See more information and read our [database access page](/docs/mysql-access/)

### What is REST?

Web Services make it possible for external applications to interact with our application. This aims to enable a **CRUD** for your site, which is to CREATE, READ, UPDATE or DELETE content in your site but through HTTP Requests only. This is different rather than connecting directly to the database.

[REST or RESTful web services](https://en.wikipedia.org/wiki/Representational_state_transfer) is one of the most popular ways of making Web Services work. There are other formats such as SOAP or XML-RPC, but REST is the most commonly implemented among CMSes like WordPress and Drupal.

REST utilizes HTTP methods, such as `GET`, `POST`, and `DELETE` to perform the CRUD operations needed for the site. The most common use of REST interfaces are for mobile applications that needs to read and write data to your site's database.


## Drupal 8 RESTful Web Services API

With the release of Drupal 8, Web Services have been implemented to core through different modules.

### Core Modules

* **RESTful Web Services (rest)** - Exposes entities and other resources via a RESTful web API. It depends on the Serialization module for the serialization of data that is sent to and from the API.

* **Serialization (serialization)** - Provides a service for serialization of data to and from formats such as JSON and XML.

* **Hypertext Application Language (hal)** - Extends the Serialization module to provide the HAL hypermedia format. This is what is used as the primary format in Drupal 8 Core. It only adds two reserved keywords, `_links` for link relations (also used by Github's Pull Request API) and `_embedded` for embedded resources. The HAL hypermedia format can be encoded in both JSON and XML.

* **HTTP Basic Authentication (basic_auth)** - This module implements basic user authentication using the HTTP Basic authentication provider. It facilitates the use of a username and password for authentication when making calls to the REST API. It is advised to enable SSL when used in production.

### Resources Configuration

By default, not all resources or endpoints are enabled. You may need to individually enable `GET`, `POST`, `PATCH` and `DELETE` operations for each web service like node entity or user. Read about the overview and steps for the configuration on the [API overview page](https://www.drupal.org/docs/8/api/restful-web-services-api/restful-web-services-api-overview).

There is a contributed module called [REST UI](https://drupal.org/project/restui) which provides an admin interface for enabling or disabling resources, serialization formats and authentication providers. Use this to quickly manage and save your configuration.

### Resource using Views ###

Because Views is also part of core, you can make a JSON resource once REST and Serialization modules are enabled. Just create a view and select "REST export" as its display type. Name the path as you like.

* Use Filter Criterias to extract content as you like it (e.g., `/json/articles?nid=5`).
* You can also use Contextual Filters if we want to just append the end of the path (e.g., `rest/views/articles/1`) for filtering results.

### Example Requests ###

To create a node entity, we must send a `POST` request to `/entity/node` with the `Content-Type` header set to `application/hal+json` and declare the required type and title fields in the request `BODY`.

If you have Basic Authentication enabled, you need to set headers `PHP_AUTH_USER` and `PHP_AUTH_PW` to authenticate as our user.

## Drupal 7 Modules ##

Web Services are implemented through various plugins in Drupal 7.

 - [RESTful](https://www.drupal.org/project/restful)
 - [RESTful Web Services](https://www.drupal.org/project/restws)
 - [Services](https://www.drupal.org/project/services)

The service module has several integration features, and other web service formats. It also has [several supporting modules](https://www.drupal.org/node/750036) that extend the Drupal 7 functionalities made available to the API.

<div class="alert alert-info" role="alert">
  <h4 class="info">Note</h4>
  <p markdown="1">While not a REST API service by itself, you can create a JSON view using the [Views Datasource](https://www.drupal.org/project/views_datasource) module.</p>
</div>

## WordPress REST API

Since Wordpress 4.7, the [REST API plugin](https://wordpress.org/plugins/rest-api/) is no longer needed as it is now part of Core.
The complete list of resources about WP REST API is found in the [handbook](https://developer.wordpress.org/rest-api/)

* To extract site posts for example, send a `GET` request to `/wp-json/wp/v2/posts`.

* To update a user with ID 4: Send a `PUT` request to `/wp-json/wp/v2/users/4`.

* To extract site posts but filter with a search term “awesome”: `GET /wp-json/wp/v2/posts?filter[s]=awesome`

* To get involved or see older versions of the plugin, visit the [WP REST API Team site](http://v2.wp-api.org/).

## Other Frameworks, Builds or Distributions

You can [use custom upstreams](/docs/custom-upstream/), [make your own build](/docs/guides/build-tools/) or [install distributions](/docs/start-state/) that may serve as a CMS API.

Unless there are some platform related issues, Pantheon does not support features or the code behind custom applications you may use.

### Contenta CMS

[Contenta](http://www.contentacms.org/) is an API-First Drupal distribution. It provides a standard platform that is API ready for building front-end applications. Contenta intends to ease the pain of using, or simply trying, decoupled Drupal.

To get started, see the distro [Github repository](https://github.com/contentacms/contenta_jsonapi) and learn how to install.
The demo site is hosted in Pantheon via the link: [http://live-contentacms.pantheonsite.io](http://live-contentacms.pantheonsite.io)

You may see the sample repository of [Contenta CMS Demo here](https://github.com/contentacms/contenta_jsonapi_demo). It uses the [Composer Drops 8](https://github.com/pantheon-systems/example-drops-8-composer) example repository as base.


## Deploying your CMS API site in Pantheon

There are no differences when deploying a CMS API than a normal site. You may follow our [Launch Essentials](/docs/guides/launch/) guide to get started, and also refer to the [Pantheon Workflow](/docs/pantheon-workflow) page for how to deploy your code or manage your content.

Make sure to check the [Best Practice Checklist for Going Live](/docs/guides/launch/next-steps/) and activate other features like [New Relic](/docs/new-relic/) for monitoring, or enabling [Solr](/docs/solr) and [Redis](/docs/redis/)

You can also write scripts in [Guzzle](http://docs.guzzlephp.org/en/latest/), which is a great tool (and included in Drupal 8 Core) for testing. You can also use cURL via the command line or PHP.

### Pantheon Global CDN

All sites will benefit from the use of [Global CDN](/global-cdn/), a core platform offering for improved performance and security. It enables an advanced caching mechanism, and have free and automated HTTPS by default.

To learn more, read our [Global CDN documentation](/docs/global-cdn/).

<!-- How does Global CDN cache REST API resources -->

<!-- ### Performance Monitoring ### -->

<!-- With New Relic enabled, page requests appear as transactions and not sessions for REST API resources retrieved.
The best way to monitor its performance is to remember the most common transactions, hooks or name patterns that appear in the logs. -->

<!-- New Relic REST API patterns here -->

<!-- ### Redis and Object Caching ### -->

<!-- tips on how Object Cache is best used for REST API CMS -->

<!-- ### Solr Search with API ### -->

<!-- example cases for using Solr Search with CMS API -->


## Frequently Asked Questions

### How can I troubleshoot my CMS API?

To test or troubleshoot your REST API means to test the `GET`, `POST` or `DELETE` methods through HTTP. The most commonly used tools are the following:

* [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en)
* [Dev HTTP Client](https://chrome.google.com/webstore/detail/dev-http-client/aejoelaoggembcahagimdiliamlcdmfm/related)
* [Restlet Client](https://chrome.google.com/webstore/detail/restlet-client-rest-api-t/aejoelaoggembcahagimdiliamlcdmfm)

Note: These are Chrome Plugin tools, but there are similar tools for other browsers

### Can I place a single page app in my root directory?

Yes, but instead of using `index.html`, we use `override.html` as the default page to be loaded. It is also possible to have a sub-directory that contains singe-page apps with HTML, JS or CSS files. For deployment, these are treated the same way as other static assets in the platform.


## See Also

* [https://pantheon.io/decoupled-cms](decoupled-cms)
* [https://pantheon.io/blog/decoupled-architecture-wordpress-and-drupal](/blog/decoupled-architecture-wordpress-and-drupal)
* [https://pantheon.io/what-know-about-decoupled-cms-recording](/what-know-about-decoupled-cms-recording)

## References
Drupal 8

* [https://www.drupal.org/docs/8/api/restful-web-services-api/restful-web-services-api-overview](https://www.drupal.org/docs/8/api/restful-web-services-api/restful-web-services-api-overview)
* [https://drupalize.me/blog/201401/introduction-restful-web-services-drupal-8](https://drupalize.me/blog/201401/introduction-restful-web-services-drupal-8)
* [https://drupalize.me/blog/201402/your-first-restful-view-drupal-8](https://drupalize.me/blog/201402/your-first-restful-view-drupal-8)

WordPress

* [https://wordpress.org/plugins/rest-api/](https://wordpress.org/plugins/rest-api/)
* [https://developer.wordpress.org/rest-api/](https://developer.wordpress.org/rest-api/)
* [http://v2.wp-api.org/](http://v2.wp-api.org/)
