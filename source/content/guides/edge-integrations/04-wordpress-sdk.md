---
title: Edge Integrations
subtitle: WordPress SDK
description: Install, configure, and use the Edge Integrations with WordPress.
categories: [develop]
tags: [collaborate, composer, continuous-integrations, webops, workflow]
contributors: [michellecolon-pantheon, jazzsequence, jspellman814]
type: guide
layout: guide
showtoc: true
anchorid: wordpress-sdk
permalink: docs/guides/edge-integrations/wordpress-sdk/
editpath: edge-integrations/04-wordpress-sdk.md
reviewed: "2022-03-09"
---

This doc will help you personalize, and provide custom experiences for visitors to your website, based on Geotargeting and Interest targeting.

## Before You Begin

**ADD NOTE ABOUT NEEDING AGCDN- REITERATE**

You can use Edge Integrations with WordPress by installing it into a project with Composer, or by manually installing the plugin.

### Install with Composer

Adding Edge Integrations support to your Composer-based project is simple and is the recommended means of adding the Edge Integrations WordPress SDK.

#### Require the Composer Package

To get started, add the [Edge Integrations WordPress SDK repository](https://github.com/pantheon-systems/edge-integrations-wordpress-sdk) as a dependency:

```bash
composer require pantheon-systems/edge-integrations-wordpress-sdk
```

This command will add the repository to your `/vendor` directory, as well as all of the compiled assets and included dependencies, which include a global CMS-agnostic [PHP library](https://github.com/pantheon-systems/pantheon-edge-integrations), a [WordPress plugin](https://github.com/pantheon-systems/pantheon-wordpress-edge-integrations), and all of the documentation for the SDK.

Alternately, you can add `pantheon-systems/edge-integrations-wordpress-sdk` as a dependency to your project's existing `composer.json` file and run `composer install`.

### Install manually

If you do not use Composer on your project at all, you can still get started with the WordPress Edge Integrations plugin without any hassle. In this case, you won't be installing the SDK package, instead, go to the [Pantheon WordPress Edge Integrations Releases page](https://github.com/pantheon-systems/pantheon-wordpress-edge-integrations/releases).

* Download the Source Code (zip) file associated with the most recent version.

![Release Assets](../../../images/guides/edge-integrations/ei-wp-plugin-assets.png)

* Extract the plugin in your `wp-content/plugins` directory. You will get all of the compiled assets and included dependencies, including the CMS-agnostic, [global PHP library](https://github.com/pantheon-systems/pantheon-edge-integrations) in the package.

### Activate the plugin

In either case, the last step is activating the plugin from your WordPress dashboard Plugins page. There is no other admin interface for the WordPress plugin -- all the features and components are handled in the code itself, with hooks that developers can use to interact with the geolocation and interest tracking features.

![WP Plugin Active](../../../images/guides/edge-integrations/ei-wp-plugin-active.png)

## Geolocation

### Configure Geolocation

Geotargeting is a method that delivers different content to visitors based on their geographic location. This includes country, continent, region, city and connection information (connection speed and connection type). The specific header data sent to your site depends on the settings configured for your specific AGCDN instance. 

You can learn more about how to use or manage the geolocation data in the [Geolocation SDK documentation](https://github.com/pantheon-systems/edge-integrations-wordpress-sdk/blob/main/docs/geo.md).

### Test Geolocation

To validate that geolocation is working, open your browser inspector tools, click the Network tab (in Chrome and Firefox), and reload the page so that new data can be recorded and displayed. When you click on the page URL- usually listed first- and inspect the Response Headers, the relevant geolocation data will appear.

![Chrome Developer Tools Geolocation Headers](../../../images/guides/edge-integrations/geo-audience-values2.png)

If the plugin is installed and configured correctly, the `Audience` or `Audience-Set` headers in the `vary` field, which indicates that those headers are being used to vary the cache on the CDN.

### Geolocation Code Samples



## Interests

### Configure Interests

Interests are much more straightforward to set up in the edge configuration. In this case, we're telling the CDN to vary cache for specific taxonomy terms. In WordPress, categories are used to define user interests by default (but any taxonomy can be used). When a visitor clicks on multiple pages that are tagged with the same term, it will set that term as an "interest" for that visitor (by default, the threshold is 3 pages tagged with the same term). Like geolocation, this configuration needs to be enabled on your AGCDN instance.

You can read more about how to use or manipulate the interest data in the [Interest SDK documentation](https://github.com/pantheon-systems/edge-integrations-wordpress-sdk/blob/main/docs/interest.md).

### Test Interests

You can validate that the interest tracking is working by clicking on multiple pages tagged with the same term 3 (or more, depending on your configuration) times, then going to the same Network tab in your browser inspector tools. This time, you should see a value for `interest` that matches the pages you navigated to.

![Chrome Developer Tools Interest Headers](../../../images/guides/edge-integrations/ei-interest-value2.png)

### Interests Code Samples



## How to integrate with cookie consent management plugins

It's possible to integrate with cookie consent management plugins to disallow user tracking if the user has not accepted cookies or other forms of local storage. This might be required based on the privacy laws of your region. In those cases, you won't want to store any tracking information until the user consents to it.

We've built an [example plugin](https://github.com/pantheon-systems/pantheon-edge-integrations-consent-management) that can help get you started on what needs to be done to integrate with cookie consent management. The plugin uses the [WP Consent API](https://github.com/rlankhorst/wp-consent-level-api) proposed feature plugin to manage consent levels and cookie categories. Our plugin adds a cookie consent banner and disables the functionality of the Pantheon WordPress Edge Integrations plugin when the user has not accepted cookies.

You can read more about it in the [plugin's README file](https://github.com/pantheon-systems/pantheon-edge-integrations-consent-management#description).

## Additional Resources

- [Pantheon Edge Integrations Global Library](https://github.com/pantheon-systems/pantheon-edge-integrations)
- [Pantheon Geolocation Shortcodes](https://github.com/pantheon-systems/pantheon-geolocation-shortcodes)
- [Geo: Function Reference](https://github.com/pantheon-systems/edge-integrations-wordpress-sdk/blob/main/docs/geo.md)
- [Interest: Function Reference](https://github.com/pantheon-systems/edge-integrations-wordpress-sdk/blob/main/docs/interest.md)
- [Integrate Cookie Consent](TBD- CR)
