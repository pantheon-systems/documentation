---
use: [guides]
layout: default
title: Guides
---
<div class="container article">
  <div class="col-md-9">
  <h1> Guides</h1>
<p>Welcome to the Guides section of our documentation site. Here you'll find longer articles covering best practices for building, launching, and running Drupal and WordPress sites. While we're developing our examples on the Pantheon platform, guides we publish need not be Pantheon-specific. These guides are different from our <a href="/docs/articles">Articles</a>, which explain and show how to work with and on our platform.</p>
<p>Soon we'll begin accepting and soliciting contributed guides from the great developers and authors in our community. Please stay tuned if you're interested in collaborating with us.</p>
    <h2>All Guides</h2>
  {% for guide in data.guides %}
        <article>
          <h3><a href="{{ guide.url }}">{{ guide.title }}</a></h3>
          <p> {{ guide.description }} </p>  
          </article>
    {% endfor %}
</div>
</div>
