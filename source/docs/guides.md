---
layout: taxon
use: [guides]
title: Guides
---
<div class="article container-fluid">
<h1 style="margin: 0">Guides</h1>
<p>Welcome to the Guides section of our documentation site. Here you'll find longer articles covering best practices for building, launching, and running Drupal and WordPress sites. While we're developing our examples on the Pantheon platform, guides we publish need not be Pantheon-specific. These guides are different from our normal Docs, which explain and show how to work with and on our platform.</p>
<br>
{% for guide in data.guides %}
<a href="{{ guide.url }}">{{ guide.title }}</a><br>
{% endfor %}
</div>
