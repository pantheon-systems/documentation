---
title: Local Development
description: Terminus is Pantheon's command line interface. It allows you to do everything in a terminal that you can do in the Dashboard. It is useful for scripting, automation, and integration.
videoid: j38ihh83m5
tags: [develop]
bullet1: Keffiyeh biodiesel post-ironic offal
bullet2: Leggings meh hella biodiesel four loko.
bullet3: Poke tumblr yr, polaroid distillery health goth
layout: topic
permalink: docs/integrate/:basename/
use: [docs_tags, guides_tags, videos_tags]
---
  <div class="col-md-8">
  <div class="row">
  <h4 style="margin-top:0;">More Training</h4>
    <ul class="top-docs top-docs-2col">
    {% for video in data.videos_tags.cli %}
      <li><a href="{{ video.url }}"><i class="fa fa-video-camera"></i>   {{ video.title }}</a></li>
    {% endfor %}
    {% for guide in data.guides_tags.cli %}
    <li><a href="{{ guide.url }}">{{ guide.title }}</a></li>
    {% endfor %}


    </ul>
    </div>

  </div>

  <div class="col-md-4">
    <h4 style="margin-top:0;">Reference Docs</h4>

    <ul class="related">
        {% for doc in data.docs_tags.cli %}
          <li><a href="{{ doc.url }}">{{ doc.title }}</a></li>
        {% endfor %}

        </ul>

  </div>
