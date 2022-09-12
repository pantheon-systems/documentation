---
title: Object Cache (formerly Redis)
subtitle: FAQs
description: Get answers to your Object Cache questions.
categories: [performance]
tags: [cache, plugins, modules, database]
contributors: [cityofoaksdesign, carolynshannon, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/object-cache/faq-object-cache
anchorid: faq-object-cache
---

This section provides answers to frequently asked Object Cache questions.

### How much Object cache is available for each plan level?

| Plan                   | Cache Memory Limit (in MB) |
| ---------------------- | -------------------------- |
| Sandbox*               |               64           |
| Basic                  |               N/A          |
| Performance Small      |               256          |
| Performance M, L, XL   |               512          |
| Elite                  |               1024         |

*Object Cache is available on free Sandbox plans for usage during development and will remain through upgrades to any other plan except for Basic. Refer to the [Enable Object Cache](#enable-object-cache) section above for details about which account types have Object Cache on paid plans.

### What Happens When Object Cache Reaches Maxmemory?

When the specified amount of memory is reached, Object Cache follows the `maxmemory-policy` configuration directive, which is defined in the platform `redis.conf` file.

On Pantheon, the maxmemory policy is `allkeys-lru`: evict keys by trying to remove the less recently used (LRU) keys first, in order to make space for the new data added. For more information, refer to the official [Redis documentation](https://redis.io/topics/lru-cache).

### How is Redis Configured on the Platform?

Your `redis.conf` file can be retrieved via SFTP similarly to how you can download Redis log files (see below), or you can review it here:

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

### If Redis Hits the Upper Limit of Memory Usage, Is This Logged on Pantheon?

Yes. There is a `redis.log` file that is available on the Redis container for each environment.

To access the Redis container, copy the SFTP command line string from the **Connection Info** button, and replace `appserver` with `cacheserver`. You can see where the log files and configuration reside:

```bash{outputLines:2-7}
sftp -o Port=2222 live.81fd3bea-d11b-401a-85e0-07ca0f4ce7cg@cacheserver.live.81fd3bea-d11b-401a-85e0-07ca0f4ce7cg.drush.in
Connected to cacheserver.live.81fd3bea-d11b-401a-85e0-07ca0f4ce7cg.drush.in.
sftp> ls
certs          chef.stamp     data           lock           logs           metadata.json  redis.conf     tmp
sftp> ls -la logs/
-rw-r--r-- 1 11455 11455 40674752 Mar 10 19:46 redis.log
sftp>
```

### Why Won't My Site Work After Importing a Database Backup?

When you replace the database with one that doesn't match the object cache, it can cause database errors on the site, and you may be unable to clear the cache via the Dashboard. To resolve the issue, [flush the object cache from the command line](#clear-cache).