---
title: Article Categories
use: [documents_category]
layout: jumbo
---
<div class="container article">
<h2>CATEGORIES</h2>
{% for category,documents in data.documents_category %}
<p><a href="{{ site.url }}/docs/categories/{{ category|url_encode(true) }}">{{ category|replace({'-': ' '})|upper }}</a></p>
{% endfor %}
</div>
