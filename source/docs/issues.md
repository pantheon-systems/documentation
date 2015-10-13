---
use: [issues]
layout: default
title: Known Issues
---


<div class="container article">
  <div class="col-md-9">
    <h1>Known Issues</h1>
      <p>Platform known issues are problems users have reported working on the platform, that we are aware of. Please see <a href="http://status.pantheon.io">Pantheon Status</a> for current platform performance metrics and incidents.
      <hr>
      {% for issue in data.issues %}
        <article>
          <h3><a href="{{ issue.url }}">{{ issue.title }}</a></h3>
          <hr>
        </article>
    {% endfor %}
  </div>
  <div class="col-md-3">
    <h3>Project Issue Queues</h3>
      <p>Please use issue queues specific to the Open-Source project you're experiencing issues with.
      <ul>
        <li><a href="https://github.com/pantheon-systems/cli/issues?q=is%3Aopen+is%3Aissue+label%3ABug">Terminus</a> </li>
        <li><a href="https://github.com/pantheon-systems/drops-8/issues">Drops-8</a></li>
        <li><a href="https://github.com/pantheon-systems/drops-7/issues">Drops-7</a></li>
        <li><a href="https://github.com/pantheon-systems/drops-6/issues">Drops-6</a></li>
        <li><a href="https://github.com/pantheon-systems/wordpress/issues">WordPress</a></li>
        <li><a href="https://github.com/pantheon-systems/wp_launch_check/issues">WP Launch Check</a></li>
        <li><a href="https://github.com/pantheon-systems/https://github.com/pantheon-systems/wp-native-php-sessions/issues">WP Native PHP Sessions Plugin</a></li>
        <li><a href="https://github.com/pantheon-systems/wp-redis/issues">WP Redis Plugin</a></li>
        </li>
      </div>
</div>
