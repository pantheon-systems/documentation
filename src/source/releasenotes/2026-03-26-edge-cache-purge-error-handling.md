---
title: "Improved error handling for edge cache purge failures"
published_date: "2026-03-26"
categories: [infrastructure]
---

Edge cache purge failures could previously cause a **502 Bad Gateway** error. These failures are now handled gracefully across all CMS frameworks and PHP versions. 

Rather than throwing a 502, the improved error handling will log the following: 

* The number of cache keys that failed to purge (useful for gauging impact)
* The file and line number where the exception originated (useful for debugging without a full stack trace)
  * Example log output:

    ```
    Failed to clear 1 edge cache keys: Unexpected result from Pantheon API when attempting to PURGE edge cache. in /srv/includes/pantheon.php:696
    ```
