---
title: Apache Tika 3.2 now available via PHP Runtime Generation 2
published_date: "2025-08-21"
categories: [infrastructure]
---
Support for [Apache Tika 3.2](https://tika.apache.org/3.2.0/index.html) is now available on the Pantheon platform via [PHP Runtime Generation 2](/php-runtime-generation-2). Older versions of Tika are still available for both PHP Runtime Gen 1 and Gen 2, however we recommend sites using older versions of Tika upgrade to 3.2 as soon as possible.

## How to upgrade
Upgrade your site by setting the following in your `pantheon.yml` file:

```yaml:title=pantheon.yml
tika_version: 3
```
<Alert type="info" title="Note">

Tika 3 is only available for sites using [PHP Runtime Generation 2](/php-runtime-generation-2).

</Alert>

After applying this configuration change, the latest version of Tika 3 is available at the following path:

```
/opt/pantheon/tika/tika.jar
```

See also, updated documentation for [Tika 3 on Pantheon](/external-libraries/#apache-tika).