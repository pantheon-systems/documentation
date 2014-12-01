---
use: [common_tasks]
layout: default
---
# Common Tasks

<ul>
    {% for common_task in data.common_tasks %}
        <article>
          <div><h4><a href="{{ common_task.url }}">{{ common_task.title }}</a></h4></div>
          </article>
    {% endfor %}
</ul>
