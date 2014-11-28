---
use: [common_tasks]
layout: default
---
# Common Tasks

<ul>
    {% for common_task in data.common_tasks %}
        <h4><li><a href="{{ common_task.url }}">{{ common_task.title }}</a></li></h4>
    {% endfor %}
</ul>
