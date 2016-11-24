---
title: Troubleshoot
description: Understand and solve common problems.
videoid: j38ihh83m5
bullet1: Keffiyeh biodiesel post-ironic offal
bullet2: Leggings meh hella biodiesel four loko.
bullet3: Poke tumblr yr, polaroid distillery health goth
layout: topic
use: [docs_tags, guides_tags, videos_tags]
---
  <div class="col-md-8">

    <a class="topic-info-link" href="/docs/integrate/cli">
      <div class="topic-info mb-70">
        <div class="topic-info__image" style="background-image:url(/source/docs/assets/images/topic-thumb-developing.png)"></div>
        <div class="topic-info__text">
          <h3 class="topic-info__title">Command Line Tools</h3>
          <p class="topic-info__description">Beard tote bag blog, bicycle rights iPhone williamsburg gentrify pabst.</p>
        </div>
      </div>
    </a>

    <div class="row">
    <h4 style="margin-top:0;">More Training</h4>
      <ul class="top-docs top-docs-2col">
      {% for video in data.videos_tags.integrate %}
        <li><a href="{{ video.url }}"><i class="fa fa-video-camera"></i>   {{ video.title }}</a></li>
      {% endfor %}
          {% for guide in data.guides_tags.integrate %}
          <li><a href="{{ guide.url }}">{{ guide.title }}</a></li>
          {% endfor %}
      </ul>
    </div>

  </div>

  <div class="col-md-4">
    <h4 style="margin-top:0;">Reference Docs</h4>

    <ul class="related">
    {% for doc in data.docs_tags.integrate %}
      <li><a href="{{ doc.url }}">{{ doc.title }}</a></li>
    {% endfor %}

    </ul>
  </div>


  </div>
