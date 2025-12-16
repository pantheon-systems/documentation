---
title: Object Cache FAQs
description: Review frequently asked questions on Object Caching.
permalink: docs/object-cache/faq
tags: [cache, plugins, modules, database]
reviewed: "2024-10-25"
contenttype: [doc]
innav: [true]
categories: [cache]
cms: [--]
audience: [development]
product: [--]
integration: [--]
showtoc: true
contributors: [cityofoaksdesign, carolynshannon, jms-pantheon, whitneymeredith, scottbuscemi]
---

This section provides answers to frequently asked Object Cache questions.

### How much Object Cache is available for each plan level?

| Plan                   | Cache Memory Limit (in MB) |
| ---------------------- | -------------------------- |
| Basic                  |               N/A          |
| Performance Small      |               256          |
| Performance M, L, XL   |               512          |
| Elite                  |               1024         |

### What Happens When Object Cache Reaches Maxmemory?

Object Cache follows the `maxmemory-policy` configuration directive when the specified amount of memory is reached. This directive is defined in the platform `redis.conf` file.

On Pantheon, the maxmemory policy is `allkeys-lru`: evict keys by trying to remove the less recently used (LRU) keys first, in order to make space for the new data added. For more information, refer to the official [Redis documentation](https://redis.io/topics/lru-cache).

### Which versions of Redis are available?

There are two available versions of Redis available for the Object Cache: `2.8` and `6.2`.  The default version for the platform is `2.8` currently. You can [set your site's Redis version](/pantheon-yml#specify-a-redis-version).


### How is Redis Configured on the Platform?

Your `redis.conf` file can be retrieved via SFTP similarly to how you can download Redis log files (refer to the example below), or you can review it here:

```batch:title=redis.conf
port xxxxx
timeout 300
loglevel notice
logfile /srv/bindings/xxxxxxxxx/logs/redis.log
databases 16
save 900 1
save 300 10
save 60 10000
rdbcompression yes
dbfilename dump.rdb
dir /srv/bindings/xxxxxxxxx/data/
requirepass xxxxx
maxclients 1024
maxmemory 964689920
maxmemory-policy allkeys-lru
appendonly no
appendfsync everysec
no-appendfsync-on-rewrite no
list-max-ziplist-entries 512
list-max-ziplist-value 64
set-max-intset-entries 512
activerehashing yes
```

Note that the `maxmemory` value will vary based on plan level.

### Does Pantheon have optimization recommendations?

Our customers have encountered edge cases that may affect Redis performance under load during high traffic periods. There are several patches to the Drupal module available to alleviate the issues:

| Issue Description | Patch Link |
| -------- | ------- |
| [TTL handling broken, always permanent](https://www.drupal.org/project/redis/issues/3179757) | [Patch](https://www.drupal.org/files/issues/2020-10-30/3179757-4.patch) |
| [Always return array to mget to avoid breaking transactions](https://www.drupal.org/project/redis/issues/3216874) | [Patch](https://www.drupal.org/files/issues/2021-11-16/3216874-2.patch) |
| [TTL handling broken, always permanent](https://www.drupal.org/project/redis/issues/3102739) | [Patch](https://www.drupal.org/files/issues/2023-07-11/3102739-28.patch) |

### If Redis Hits the Upper Limit of Memory Usage, Is This Logged on Pantheon?

Yes. There is a `redis.log` file that is available on the Redis container for each environment.

Follow the steps below to access the Redis container.

1. [Go to the Site Dashboard](/guides/account-mgmt/workspace-sites-teams/sites#site-dashboard) and click the **Connection Info** button.

1. Copy the SFTP command line string and replace `appserver` with `cacheserver`. You can see where the log files and configuration reside:

```bash{outputLines:2-7}
sftp -o Port=2222 live.81fd3bea-d11b-401a-85e0-07ca0f4ce7cg@cacheserver.live.81fd3bea-d11b-401a-85e0-07ca0f4ce7cg.drush.in
Connected to cacheserver.live.81fd3bea-d11b-401a-85e0-07ca0f4ce7cg.drush.in.
sftp> ls
certs          chef.stamp     data           lock           logs           metadata.json  redis.conf     tmp
sftp> ls -la logs/
-rw-r--r-- 1 11455 11455 40674752 Mar 10 19:46 redis.log
sftp>
```

### Why won't my site work after importing a database backup?

When you replace the database with one that doesn't match the Object Cache, it can cause database errors on the site, and you may be unable to clear the cache via the Dashboard. To resolve the issue, [flush the Object Cache from the command line](/object-cache/cli#clear-cached-data).

## More Resources
- [Performance Addons](/addons)
- [Object Cache Overview](/object-cache)

### How-to Guides
- [Enable Object Cache Pro for WordPress](/object-cache/wordpress)
- [Enable Object Cache for Drupal](/object-cache/drupal)
- [Use the Redis CLI](/object-cache/cli)
- [Safely Remove Object Cache](/object-cache/remove)

### References
- [Object Cache Errors](/object-cache/errors)

### See Also
- [Plan Resources](/guides/account-mgmt/plans/faq#plan-resources)
- [Platform Considerations](/guides/platform-considerations)
