---
use: [docs]
layout: doc
title: All Docs
permalink: docs/:basename/
---

{% for doc in data.docs %}
    <article>
      <h3><a href="{{ doc.url }}">{{ doc.title }}</a></h3>
      </article>
{% endfor %}
