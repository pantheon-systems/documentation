---
title: Article Categories
use: [documents_categories]
layout: document
---
{% for category,documents in data.documents_category %}
<p><a href="{{ site.url }}/categories/{{ category|url_encode(true) }}">{{ category|title }}</a></p>
{% endfor %}
