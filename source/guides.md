---
use: [guides_parent_guide]
layout: default
---
<ul>
    {% for parent_guide,guides in data.guides_parent_guide %}
        <li><a href="{{ site.url }}/guide-to/{{ parent_guide|url_encode(true) }}">{{ parent_guide }}</a></li>
    {% endfor %}
</ul>
