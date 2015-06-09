---
use: [articles]
layout: default
title: Articles
---


<div class="container article">
  <div class="col-md-9">
  <h1>All Articles</h1>
    {% for article in data.articles %}
        <article>
          <h3><a href="{{ article.url }}">{{ article.title }}</a></h3>
          <p> {{ article.description }} </p>  
          </article>
    {% endfor %}
</div>
<!--<div class="categories col-md-3">
{% include("doclist.html") %}
</div>-->
</div>
