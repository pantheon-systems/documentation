---
use: [common-tasks]
layout: default
---
<ul>
    {% for howto in data.common-tasks %}
        <li><a href="{{ common-tasks.url }}">{{ common-task.title }}</a></li>
    {% endfor %}
</ul>
