---
use: [documents]
layout: default
title: Articles
---


<div class="container article">
  <div class="col-md-9">
  <h1>All Articles</h1>
    {% for document in data.documents %}
        <article>
          <a href="{{ document.url }}">{{ document.title }}</a>
          <p> {{ document.description }} </p>  
          </article>
    {% endfor %}
</div>
<div class="col-md-3">
</div>
</div>
