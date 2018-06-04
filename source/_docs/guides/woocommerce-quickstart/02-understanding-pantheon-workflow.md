---
title: WooCommerce Quick Start
subtitle: "Understanding Pantheon's Workflow"
anchorid: understanding-pantheon-workflow
layout: guide
type: guide
woocommerce-quickstart: true
generator: pagination
pagination:
    provider: data.woocommerce-quickstartpages
use:
    - woocommerce-quickstartpages
permalink: docs/guides/woocommerce-quickstart/understanding-pantheon-workflow/
nexturl: guides/woocommerce-quickstart/woo-commerce-set-up/
nextpage: WooCommerce Set Up
previousurl: guides/woocommerce-quickstart/
previouspage: Introduction
editpath: woocommerce-quickstart/02-understanding-pantheon-workflow.md
image: guides/woocommerce-quickstart/WooCommerce-logo-400-200.png
---
At Pantheon we believe in workflows and processes that make developer's (and site owner's) lives better. To help with that, every site on Pantheon has three environments:

* Dev
* Test
* Live

<p style="text-align:center;">
    <img align="center" src="/source/docs/assets/images/guides/woocommerce-quickstart/00-pantheon-workflow.png" style="max-width:100%;" alt="Pantheon workflow">
</p>

We believe so strongly in this that we have our own [workflow process](/docs/pantheon-workflow/) to help you move code from dev to test and from test to live. And move the database from live to test and from test to dev. We'll cover how to do this later in this guide.

With most websites, you want to be careful with the database and always make sure there's a single most up-to-date version of the database. With ecommerce this is critical. If you make changes to the database in the test environment and someone places an order on your site you could lose all records of that order if you push the test database to live.

That's why it's critically important to follow the steps in this guide and in Pantheon's overall [workflow process](/docs/pantheon-workflow/) to make sure you're always pushing code changes up and pulling database (content) changes down.
