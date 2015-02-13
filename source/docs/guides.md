---
use: [guides]
layout: default
title: Articles
---
<div class="container article">
  <div class="col-md-9">
  <h1>All Guides</h1>
    {% for guide in data.guides %}
        <article>
          <a href="{{ guide.url }}">{{ guide.title }}</a>
          <p> {{ guide.description }} </p>  
          </article>
    {% endfor %}
</div>
</div>
