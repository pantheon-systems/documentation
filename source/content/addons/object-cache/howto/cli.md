---
title: Use the Redis CLI
description: How to use the Redis Command Line to manage Object Cache.
permalink: docs/object-cache/cli
tags: [cache, plugins, modules, database]
reviewed: "2023-08-17"
contenttype: [doc]
innav: [true]
categories: [cache]
cms: [--]
audience: [development]
product: [--]
integration: [--]
contributors: [cityofoaksdesign, carolynshannon, jms-pantheon, whitneymeredith]
showtoc: true
---
This section provides information on how to use the Redis Command Line to manage Object Cache.

## Use the Redis Command-Line Client

You don't need to install anything locally to use Redis on Pantheon. However, if you want to manually connect to the Pantheon-hosted Redis server for debugging, you'll need to install Redis on your machine.

1. Download Redis at [https://redis.io/download](https://redis.io/download) and install it on your local computer. Mac users may prefer to install Redis using [Homebrew](https://brew.sh/) (`brew install redis`).

1. Select the desired environment (Dev, Test, or Live) from the Site Dashboard.

1. Click the **Connection Info** button, copy the Redis connection string, and run the command in your local terminal.

1. Use the Redis Connection Info from the Dashboard to verify that Redis is working. Execute the following command after you log in:

  ```bash
  redis> DBSIZE
  ```

  The command should return the existing Redis keys. Example:

  ```bash
  redis> DBSIZE
  (integer) 23
  ```

  If Redis is configured correctly, it should output the number of keys in the selected database. If it returns `0` , there is no data.

1. Pass the `exists` command to check if a specific key exists. For example:

  ```bash
  redis> SET key1 "Hello"
  OK
  redis> EXISTS key1
  (integer) 1
  redis> EXISTS key2
  (integer) 0
  redis>
  ```

## Find a Specific Key

You can use search patterns that contain globs if you need to find a specific key. For example:

```bash
redis> KEYS *a*
$17
englash bigkahuna
redis> KEYS engl?sh
$23
englosh englash english
redis> KEYS engl[ia]sh
$15
englash english
```

## Clear Cached Data

You can clear the application cache via the Dashboard, Terminus, or the CMS, and it will also clear the Redis cache. However, the Redis cache will only be cleared if the appropriate module or plugin is active and the CMS application is functioning.

#### Drupal

Drupal deletes and regenerates cached entries during a cache rebuild or cache clear. The cache clear operation also writes a new set of keys in Redis to store when the last delete took place. Any keys created before this time will no longer be returned as valid cache entries. You can use Redis to store more permanent data in this case using custom programming without it being automatically cleared, unless it is in one of the existing caches that Drupal manages.

#### WordPress

If [WP Redis](https://wordpress.org/plugins/wp-redis/) or [Object Cache Pro](/object-cache/wordpress/) are installed, any operation that calls the WordPress function `wp_cache_flush()` will also clear the entire Redis database cache. This happens during WordPress core upgrades, and when clearing the cache via the [Pantheon Advanced Page Cache](https://wordpress.org/plugins/pantheon-advanced-page-cache) plugin, the Pantheon dashboard, or Terminus.

Refer to the Redis CLI section on [Clear All Keys](#clear-all-keys) as a backup method if necessary.

### Clear All Keys

Use the `flushall` command to clear all keys from the cache.

**Note:** If the [CMS cache clearing](#clearing-cached-data) is functioning as expected, this is generally not necessary. Be aware that in Drupal, it is possible that custom programming may rely on values stored here that are not meant to be temporary.

```bash
redis> flushall
OK
```

## Check the Number of Keys in Cache

Use the `DBSIZE` command to check the number of keys in the cache. The following is sample output:

```bash
redis> DBSIZE
:0
```

## View Service Configuration Details

Use the `config get *memory*` command to check the cache memory. The following is sample output:

```bash
redis> config get *memory*
maxmemory
52428800
```

## Hit/Miss Ratio

Use the `info stats` option to view the Hit/Miss ratio. The Hit/Miss ratio describes cache efficiency and provides relevant information about your approach. A low cache hit ratio results in larger latency, because most of the requests are fetching data from the disk. In this instance, you should reconsider the data you have stored and increase the size of the Redis cache to improve your sites’s performance. A low cache hit is usually the result of premature optimization in the early stages of a project when you can only guess which data you should cache.

Run the following code to access your Hit/Miss ratio:

```bash
  redis> info stats
  #Stats
  keyspace_hits:4
  keyspace_misses:15
  ```

## Continuous Stats Mode

Continuous Stats Mode uses the `--stat` option to monitor Object Cache instances in real time. In this mode, a new line of information with differences between old data points and new data points is printed every second by default. This allows you to view memory usage and connected clients.

Run the command below in your local terminal to access stat mode. Substitute `<redis-cli connection info>` with your Redis connection string.

```bash {outputLines: 2-11}
<redis-cli connection info> --stat
------- data ------ --------------------- load -------------------- - child -
keys       mem      clients blocked requests            connections
506        1015.00K 1       0       24 (+0)             7
506        1015.00K 1       0       25 (+1)             7
506        3.40M    51      0       60461 (+60436)      57
506        3.40M    51      0       146425 (+85964)     107
507        3.40M    51      0       233844 (+87419)     157
507        3.40M    51      0       321715 (+87871)     207
508        3.40M    51      0       408642 (+86927)     257
508        3.40M    51      0       497038 (+88396)     257
```

You can also use the `i` (interval) option in this mode to change the frequency at which new lines are printed.

## Big Keys Mode

Object Cache works as a key space analyzer when using the `--bigkeys` option. It scans the dataset for big keys, but also provides information about the data types within the dataset.

Run the command below in your local terminal to access stat mode. Substitute `<redis-cli connection info>` with your Redis connection string.

```bash {outputLines: 2-25}
<redis-cli connection info> --bigkeys

# Scanning the entire keyspace to find biggest keys as well as
# average sizes per key type.  You can use -i 0.01 to sleep 0.01 sec
# per SCAN command (not usually needed).

[00.00%] Biggest string found so far 'key-419' with 3 bytes
[05.14%] Biggest list   found so far 'mylist' with 100004 items
[35.77%] Biggest string found so far 'counter:__rand_int__' with 6 bytes
[73.91%] Biggest hash   found so far 'myobject' with 3 fields

-------- summary -------

Sampled 506 keys in the keyspace!
Total key length in bytes is 3452 (avg len 6.82)

Biggest string found 'counter:__rand_int__' has 6 bytes
Biggest   list found 'mylist' has 100004 items
Biggest   hash found 'myobject' has 3 fields

504 strings with 1403 bytes (99.60% of keys, avg size 2.78)
1 lists with 100004 items (00.20% of keys, avg size 100004.00)
0 sets with 0 members (00.00% of keys, avg size 0.00)
1 hashs with 3 fields (00.20% of keys, avg size 3.00)
0 zsets with 0 members (00.00% of keys, avg size 0.00)
```

## More Resources
- [Performance Addons](/addons)
- [Object Cache Overview](/object-cache)

### How-to Guides
- [Enable Object Cache Pro for WordPress](/object-cache/wordpress)
- [Enable Object Cache for Drupal](/object-cache/drupal)
- [Safely Remove Object Cache](/object-cache/remove)

### References
- [Object Cache Errors](/object-cache/errors)
- [Object Cache FAQs](/object-cache/faq)
