---
use: [tools]
layout: default
---

# Tools

<ul>
    {% for tool in data.tools %}
        <article>
          <div><h4><a href="{{ tool.url }}">{{ tool.title }}</a></h4></div>
          </article>
    {% endfor %}
</ul>

				<ul class="nav">
					{% for tool in site.tools %}
						<li {% if tool.slug == page.slug %}class="active" {% endif %}><a href="{{ site.url }}/{{ tool.url }}">{{ tool.name }}</a>
							{% if tool.children %}
								<ul class="nav">
									{% for child_tool in tool.children %}
										<li {% if child_tool.slug == page.slug %} class="active" {% endif %}><a href="{{ site.url }}/{{ child_tool.url }}">{{ child_tool.name }}</a>
									{% endfor %}
								</ul>
							{% endif %}
						</li>
					{% endfor %}
				</ul>
