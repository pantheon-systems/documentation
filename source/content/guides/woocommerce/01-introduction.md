---
title: WooCommerce Quick Start
subtitle: Introduction
description: This guide covers how to quickly spinup a new WooCommerce site on Pantheon.
contributors: [BFTrick]
featuredcontributor: true
layout: guide
cms: "WordPress"
categories: [get-started]
tags: [plugins, site]
type: guide
anchorid: woocommerce
woocommerce: true
generator: pagination
pagination:
    provider: data.woocommercepages
use:
    - woocommercepages
permalink: docs/guides/woocommerce/
nexturl: guides/woocommerce/store-setup/
nextpage: Store Setup
editpath: woocommerce/01-introduction.md
completiontime: 1 hour
image: guides/woocommerce/WooCommerce-logo-400-200
searchboost: 200
---
Welcome!

This guide is here to help you get a WooCommerce store up and running on Pantheon. In this guide you'll learn how to:

* Create a WordPress site on Pantheon and install WooCommerce
* Commit your changes with version control
* Move your **<span class="glyphicons glyphicons-wrench"></span> Dev** site to a **<span class="glyphicons glyphicons-cardio"></span> Live** environment
* Accept orders on your **<span class="glyphicons glyphicons-cardio"></span> Live** site and pull your database to your **<span class="glyphicons glyphicons-equalizer"></span> Test** and **<span class="glyphicons glyphicons-wrench"></span> Dev** environments for future changes.

## Before You Begin
Before we get going it's important that you already have a [Pantheon account](https://pantheon.io/register) (they're free!), and you already know how to [create a site](/guides/quickstart/create-new-site).

### Learn the Pantheon Workflow
At Pantheon we believe in workflows and processes that make developer's (and site owner's) lives better. To help with that, every site on Pantheon has three environments: **<span class="glyphicons glyphicons-wrench"></span> Dev**, **<span class="glyphicons glyphicons-equalizer"></span> Test**, and **<span class="glyphicons glyphicons-cardio"></span> Live**.

![Pantheon workflow](../../../images/guides/woocommerce/00-pantheon-workflow.png)

We believe so strongly in this that we have our own [workflow process](/pantheon-workflow) to help you move code from dev to test and from test to live, and move the database from **<span class="glyphicons glyphicons-cardio"></span> Live** to test and from **<span class="glyphicons glyphicons-equalizer"></span> Test** to **<span class="glyphicons glyphicons-wrench"></span> Dev**. We'll cover how to do this later in this guide.

With most websites, you want to be careful with the database and always make sure there's a single most up-to-date version of the database. With ecommerce this is critical. If you make changes to the database in the **<span class="glyphicons glyphicons-equalizer"></span> Test** environment and someone places an order on your site you could lose all records of that order if you push the test database to **<span class="glyphicons glyphicons-cardio"></span> Live**.

That's why it's critically important to follow the steps in this guide and in Pantheon's overall [workflow process](/pantheon-workflow) to make sure you're always pushing code changes up and pulling database (content) changes down.
