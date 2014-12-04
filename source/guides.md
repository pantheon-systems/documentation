---
use: [guides]
layout: default
title: Guides
---

# Parent Guides

<ul>
    {% for guide in data.guides %}
        <article>
          <div><h4><a href="{{ guide.url }}">{{ guide.title }}</a></h4></div>
          </article>
    {% endfor %}
</ul>
