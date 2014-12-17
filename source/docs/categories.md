---
title: Article Categories
use: [documents_category]
layout: document
---
{% for category,documents in data.documents_category %}
<p><a href="{{ site.url }}/docs/categories/{{ category|url_encode(true) }}">{{ category|title }}</a></p>
{% endfor %}
