---
use: [changelogs]
layout: default
title: changelogs
---


<div class="container article">
  <div class="col-md-9">
  <h1>Changelogs</h1>
    {% for changelog in data.changelogs %}
        <article>
          <h3><a href="{{ changelog.url }}">{{ changelog.title }}</a></h3>
          <p> {{ changelog.description }} </p>  
          </article>
    {% endfor %}
</div>
<!--<div class="categories col-md-3">
{% include("doclist.html") %}
</div>-->
</div>
