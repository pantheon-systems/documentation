---
use: [changelogs]
layout: default
title: Changelogs
---


<div class="container article">
  <div class="col-md-9">
  <h1>Changelogs</h1>
    {% for changelogs in data.changelogs %}
        <article>
          <h3><a href="{{ changelogs.url }}">{{ changelogs.title }}</a></h3>
          <p> {{ changelogs.description }} </p>  
          </article>
    {% endfor %}
</div>
<!--<div class="categories col-md-3">
{% include("doclist.html") %}
</div>-->
</div>
