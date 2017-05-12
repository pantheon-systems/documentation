---
title: Going Live
subtitle: Next Steps
golive: true
anchorid: launch-check
generator: pagination
layout: guide
pagination:
    provider: data.goinglivepages
use:
    - goinglivepages
permalink: docs/guides/going-live/next-steps/
previousurl: guides/going-live/launch-check/
previouspage: Final Launch Check
editpath: going-live/05-next-steps.md
---
By following the preceding steps you should have a live site with all mandatory best practices in place.  Pantheon gives you additional tools and resource to make sure all of your launches go exceptionally smooth and living day to day is very manageable.  While nothing below is required and might seem advanced we expect that users of any skill can leverage these tools and practices for best results.  (Note this is not intended as a ‘how to’ portion, follow the provided links to explore each area in depth.   

1. New Relic APM Pro offers a wide array of metrics that provide a nearly real-time look into the performance of a web application and is provided to all sites on Pantheon for free. Using New Relic not only makes it easy for you to monitor to your performance, but it can also speed up the support process by helping our support team visualize corresponding performance and symptoms.

  * New Relic - monitoring and alert setup

2. Advanced cache configuration and optimization

  * Front end: (LINK TO NEW CACHE GUIDE)
  * Redis is an open-source, networked, in-memory, key-value data store that can be used as a drop-in caching backend for your Drupal or WordPress website.

    * Redis for backend caching

3. Load and performance testing
4. Robots.txt

  * All sites on Pantheon will prevent search engines from discovering the pantheonsite.io address by making use of a robots.txt file.  You can test this by visiting live-YourSIteName.pantheonsite.io. Once the site is using a custom domain the robots.txt file will not be addressable.  You are free to create your own robots.txt file that would be used for your domain.  Please see this page for more information:
