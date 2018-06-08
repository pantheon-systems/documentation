---
title: WooCommerce Quick Start
subtitle: Introduction
description: The Quick Start guide is designed to get you started on Pantheon.
tags: [woocommerce]
contributors: [BFTrick]
featuredcontributor: true
layout: guide
type: guide
anchorid: woocommerce
woocommerce: true
generator: pagination
pagination:
    provider: data.woocommercepages
use:
    - woocommercepages
permalink: docs/guides/woocommerce/
nexturl: guides/woocommerce/install/
nextpage: WooCommerce Set Up
editpath: woocommerce/01-introduction.md
completiontime: 1 hour
image: guides/woocommerce/WooCommerce-logo-400-200
---
Welcome!

This guide is here to help you get a WooCommerce store up and running on Pantheon. In this guide you'll learn how to:

* Create a WordPress site on Pantheon and install WooCommerce
* Commit your changes with version control
* Move your dev site to a live environment
* Accept orders on your live site and pull your database to your test and dev environments for future changes.

## Before You Begin
Before we get going it's important you already have a <a href="https://pantheon.io/register" target="_blank">Pantheon account <span class="glyphicons glyphicons-new-window-alt"></span></a> (they're free!) and you already know how to [create a site](/docs/guides/quickstart/create-new-site/).

### Learn the Pantheon Workflow
At Pantheon we believe in workflows and processes that make developer's (and site owner's) lives better. To help with that, every site on Pantheon has three environments: Dev, Test, and Live.

![Pantheon workflow](/source/docs/assets/images/guides/woocommerce/00-pantheon-workflow.png)

We believe so strongly in this that we have our own [workflow process](/docs/pantheon-workflow/) to help you move code from dev to test and from test to live. And move the database from live to test and from test to dev. We'll cover how to do this later in this guide.

With most websites, you want to be careful with the database and always make sure there's a single most up-to-date version of the database. With ecommerce this is critical. If you make changes to the database in the test environment and someone places an order on your site you could lose all records of that order if you push the test database to live.

That's why it's critically important to follow the steps in this guide and in Pantheon's overall [workflow process](/docs/pantheon-workflow/) to make sure you're always pushing code changes up and pulling database (content) changes down.
