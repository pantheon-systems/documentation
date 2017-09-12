---
layout: taxon
use: [guides, guides_tags]
title: Guides
description: Pantheon step-by-step guides covering platform integrations, performance, workflows, and more.
---
<h1 style="margin-top:0px;font-family: 'AvenirLT-Black';">Guides</h1>
<div class="flex-panel-group">
  <div class="flex-panel-item-guides-landing">
      <div class="flex-panel-body-pantheon-workflows">
      <a href="/docs/guides/quickstart/">
        <div class="pantheon-workflows">
          <img alt="Quickstart" src="/source/docs/assets/images/launchGuide-twitterLarge.png" style="max-height:200px;" class="main-topic-info__plugin-image" >
        <h3>Quick Start</h3>
        </div>
        </a>
      </div>
  </div>
  <div class="flex-panel-item-guides-landing">
      <div class="flex-panel-body-pantheon-workflows">
      <a href="/docs/guides/launch/">
        <div class="pantheon-workflows">
          <img alt="Launch Essentials" src="/source/docs/assets/images/getting-started-Largethumb.png" style="max-height:200px;" class="main-topic-info__plugin-image" >
          <h3>Launch Essentials</h3>
        </div>
        </a>
      </div>
  </div>
</div>
<h2>Platform Integration Guides</h2>
<div class="flex-panel-group">
  <div class="flex-panel-item-platform-integrations-guides">
    <a href="/docs/guides/build-tools/">
      <div class="flex-panel-body-platform-integrations">
        <div class="platform-integrations">
          <img alt="GitHub" src="/source/docs/assets/images/logos/github-composer-circle.png" style="max-height:140px;" class="main-topic-info__plugin-image">
        </div>
      </div>
    </a>
  </div>
</div>
<div class="flex-panel-group">
  <div class="flex-panel-item-platform-integrations-guides">
    <a href="/docs/guides/asana/">
      <div class="flex-panel-body-platform-integrations">
        <div class="platform-integrations">
          <img alt="Asana" src="/source/docs/assets/images/logos/asana.png" class="main-topic-info__plugin-image" >
        </div>
      </div>
    </a>
  </div>
  <div class="flex-panel-item-platform-integrations-guides">
    <a href="/docs/deploybot/">
      <div class="flex-panel-body-platform-integrations">
        <div class="platform-integrations">
          <img alt="Deploybot" src="/source/docs/assets/images/logos/deploybot.png" class="main-topic-info__plugin-image" >
        </div>
      </div>
    </a>
  </div>
  <div class="flex-panel-item-platform-integrations-guides">
    <a href="/docs/guides/jenkins/">
      <div class="flex-panel-body-platform-integrations">
        <div class="platform-integrations">
          <img alt="Jenkins" src="/source/docs/assets/images/logos/jenkins.png" class="main-topic-info__plugin-image" >
        </div>
      </div>
    </a>
  </div>
  <div class="flex-panel-item-platform-integrations-guides">
    <a href="/docs/guides/jira/">
      <div class="flex-panel-body-platform-integrations">
        <div class="platform-integrations">
          <img alt="Jira" src="/source/docs/assets/images/logos/jira.png" class="main-topic-info__plugin-image" >
        </div>
      </div>
    </a>
  </div>
  <div class="flex-panel-item-platform-integrations-guides">
    <a href="/docs/guides/new-relic-deploys/">
      <div class="flex-panel-body-platform-integrations">
        <div class="platform-integrations">
          <img alt="New Relic" src="/source/docs/assets/images/logos/newrelic.png" class="main-topic-info__plugin-image" >
        </div>
      </div>
    </a>
  </div>
  <div class="flex-panel-item-platform-integrations-guides">
    <a href="/docs/guides/pagerduty/">
      <div class="flex-panel-body-platform-integrations">
        <div class="platform-integrations">
          <img alt="PagerDuty" src="/source/docs/assets/images/logos/pagerduty.png" class="main-topic-info__plugin-image" >
        </div>
      </div>
    </a>
  </div>
  <div class="flex-panel-item-platform-integrations-guides">
    <a href="/docs/guides/phpstorm-composer/">
      <div class="flex-panel-body-platform-integrations">
        <div class="platform-integrations">
          <img alt="PHPStorm" src="/source/docs/assets/images/logos/phpstorm.png" class="main-topic-info__plugin-image" >
        </div>
      </div>
    </a>
  </div>
  <div class="flex-panel-item-platform-integrations-guides">
    <a href="/docs/guides/pingdom-uptime-check/">
      <div class="flex-panel-body-platform-integrations">
        <div class="platform-integrations">
          <img alt="Pingdom" src="/source/docs/assets/images/logos/pingdom.png" class="main-topic-info__plugin-image" >
        </div>
      </div>
    </a>
  </div>
  <div class="flex-panel-item-platform-integrations-guides">
    <a href="/docs/guides/pivotal-tracker/">
      <div class="flex-panel-body-platform-integrations">
        <div class="platform-integrations">
          <img alt="Pivotal Tracker" src="/source/docs/assets/images/logos/pivotal.png" class="main-topic-info__plugin-image" >
        </div>
      </div>
    </a>
  </div>
  <div class="flex-panel-item-platform-integrations-guides">
    <a href="/docs/guides/trello/">
      <div class="flex-panel-body-platform-integrations">
        <div class="platform-integrations">
          <img alt="Trello" src="/source/docs/assets/images/logos/trello.png" class="main-topic-info__plugin-image" >
        </div>
      </div>
    </a>
  </div>
</div>
<h2>More Guides</h2>
<ul class="top-docs top-docs-2col">
{% for guide in data.guides_tags.moreguides %}
<li><a href="{{ guide.url }}">{{ guide.title }}</a></li>
{% endfor %}
</ul>
