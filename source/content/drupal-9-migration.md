---
title: Drupal 9 Migration
categories: [develop]
tags: [code, launch, migrate, site, updates, composer]
contributors: [wordsmither]
reviewed: "2021-03-31"

---
Drupal 9 includes many of the features and layout that Drupal 8 users are familiar with, and it removes deprecated code to help improve future Drupal development.

Drupal 9 updates Drupal’s underlying dependencies like [Symfony 4.4](https://symfony.com/releases/4.4) and [Twig 2](https://twig.symfony.com/doc/2.x/index.html), removes several deprecated API functions in favor of better options, and allows everyone running Drupal 8.8+ an easy upgrade path to Drupal 9 and beyond.

<Alert title="Note" type="info" >

This upgrade migrates your existing site to a new site.  The new site will not maintain your site’s commit history.

</Alert>

Answer these questions to determine which migration path to follow:


Is your site currently hosted on Pantheon?

<Accordion title="Yes" id="hosted">
Yes


</Accordion>
<Accordion title="No" id="unhosted">
No

Okay, here's the next question:
<Accordion title="Yes" id="hosted1">
Yes


</Accordion>
<Accordion title="No" id="unhosted2">
No


</Accordion>