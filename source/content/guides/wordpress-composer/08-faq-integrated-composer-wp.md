---
title: WordPress with Integrated Composer on Pantheon
subtitle: Integrated Composer with WordPress FAQ
description: Get answers to your Integrated Composer with WordPress questions.
categories: [develop]
tags: [wordpress]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/wordpress-composer/faq-integrated-composer-wp
anchorid: faq-integrated-composer-wp
---

This section provides questions to frequently asked Integrated Composer with WordPress and Bedrock questions.

## Is Integrated Composer for WordPress using Bedrock compatible with Multisite?

Bedrock is compatible with [Multisite](/guides/multisite/). However, you might need to do extra work to ensure that admin URLs work correctly on subdomain installs. You can use the `roots/multisite-url-fixer`  mu-plugin to assist you with this work. Run the command below in your Bedrock directory:

```bash{promptUser: user}
composer require roots/multisite-url-fixer
```

Subdirectory Multisite is not currently compatible with Integrated Composer using Bedrock.

## Is Integrated Composer with WordPress compatible with Custom Upstream?

[Custom Upstreams](/guides/custom-upstream) and Integrated Composer will continue to work as they always have. The only difference is that the current [Pantheon Upstream WordPress template](https://github.com/pantheon-upstreams/wordpress-project)  will be deprecated and no longer recommended as a project to fork from in favor of the [Composer-enabled WordPress Upstream template](https://github.com/pantheon-upstreams/wordpress-project#composer-enabled-wordpress-upstream-template).

## Can I manage Themes with Integrated Composer for WordPress?

WordPress themes can be managed in Integrated Composer if the theme is available on the [WordPress.org](http://wordpress.org/) repository or [Packagist.org](http://packagist.org/). Bedrock uses the [WPackagist.org](http://wpackagist.org/) repository for themes and plugins which mirrors the plugin and theme repositories on WordPress.org.

For themes hosted on WordPress.org, the following command can be used:

```bash{promptUser: user}
composer require wpackagist-theme/{$theme-name}
```

If a theme is available on Packagist (uncommon but possible) you would use a standard composer require:

```bash{promptUser: user}
composer require {$vendor}/{$package-name}
```

In the above example, the `$package-name` could be the theme name, or it could just be the name of the package on Packagist.

## How do I manage Plugins with Integrated Composer for WordPress?

WordPress plugins are handled with Composer the same way that themes are above. For most plugins, the [WPackagist.org](http://wpackagist.org/) repository will be sufficient and contain the plugin you need, however many plugin developers also push their code to Packagist, which makes that an option for both plugins that exist on [WordPress.org](http://wordpress.org/) as well as plugins that are not in the WordPress.org repository but exist and are actively maintained on Github.

For plugins hosted on WordPress.org, the following command can be used:

```bash{promptUser: user}
composer require wpackagist-plugin/{$plugin-name}
```
If a plugin is available on Packagist, you would use the following instead:

```bash{promptUser: user}
composer require {$vendor}/{$package-name}
```

In this case, `$package-name` is the name of the package as it exists in Packagist.

## How do I manage Plugins or Themes in Integrated Composer that are not hosted by Packagist/WPackagist?

Not all projects (plugins or themes) on Github that contain a `composer.json` file exist in either [WPackagist.org](http://wpackagist.org/) or [Packagist.org](http://packagist.org/). It’s important to verify that the package exists in one of those two places if using them as a source. However, it’s possible to include plugins and themes that have a `composer.json` file and only exist in a Github (or other) repository by adding that repository to the `composer.json` file as a `vcs` source. This involves editing the `composer.json` file to add your desired repository as detailed in the [official Composer documentation](https://getcomposer.org/doc/05-repositories.md#vcs).

## More Resources

- [Create a Composer-managed WordPress Site with Bedrock](/guides/wordpress-composer/bedrock-composer)

- [Use Integrated Composer with WordPress](/guides/wordpress-composer/wordpress-ic)