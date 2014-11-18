---
use: [howtos]
layout: default
---
<ul>
    {% for howto in data.howtos %}
        <li><a href="{{ howto.url }}">{{ howto.title }}</a></li>
    {% endfor %}
</ul>
