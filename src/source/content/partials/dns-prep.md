---
contenttype: [partial]
categories: [--]
cms: [--]
product: [--]
integration: [--]
tags: [--]
reviewed: ""
---

Follow these simple steps to help minimize DNS-related downtime when you're planning a site migration:

1. Lower the TTL values as low as allowed (usually `300`) several days in advance at your DNS service manager. That way when the values are changed, new records are propagated faster.

1. Use `dig` to confirm the new TTL values have propagated to your ISP's DNS servers:

    ```bash{outputLines:2}
    dig +nocmd +noall +answer pantheon.io
    pantheon.io.            60      IN      A       23.185.0.2
    ```

    In the example above, the TTL of the A record for`pantheon.io` is 60 seconds.

1. Raise the TTL values back to `3600` (24 hours) after the migration is complete to improve stability in case of a DNS service outage.
