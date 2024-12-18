---
title: WooCommerce Quick Start
subtitle: Introduction
description: This guide covers how to quickly spinup a new WooCommerce site on Pantheon.
contributors: [BFTrick]
featuredcontributor: true
contenttype: [guide]
innav: [true]
categories: [ecommerce]
cms: [wordpress]
audience: [development]
product: [--]
integration: [woocommerce]
tags: [plugins, site]
type: guide
permalink: docs/guides/woocommerce/
editpath: woocommerce/01-introduction.md
searchboost: 200
---
Welcome!

This guide is here to help you get a WooCommerce store up and running on Pantheon. In this guide you'll learn how to:

* Create a WordPress site on Pantheon and install WooCommerce
* Commit your changes with version control
* Move your **<Icon icon="wrench" /> Dev** site to a **<Icon icon="wavePulse" /> Live** environment
* Accept orders on your **<Icon icon="wavePulse" /> Live** site and pull your database to your **<Icon icon="equalizer" /> Test** and **<Icon icon="wrench" /> Dev** environments for future changes.

## Before You Begin
Before we get going it's important that you already have a [Pantheon account](https://pantheon.io/register) (they're free!), and you already know how to [create a site](/guides/getstarted/addsite/).

### Learn the Pantheon Workflow
At Pantheon we believe in workflows and processes that make developer's (and site owner's) lives better. To help with that, every site on Pantheon has three environments: **<Icon icon="wrench" /> Dev**, **<Icon icon="equalizer" /> Test**, and **<Icon icon="wavePulse" /> Live**.

![Pantheon workflow](../../../images/guides/woocommerce/00-pantheon-workflow.png)

We believe so strongly in this that we have our own [workflow process](/pantheon-workflow) to help you move code from dev to test and from test to live, and move the database from **<Icon icon="wavePulse" /> Live** to test and from **<Icon icon="equalizer" /> Test** to **<Icon icon="wrench" /> Dev**. We'll cover how to do this later in this guide.

With most websites, you want to be careful with the database and always make sure there's a single most up-to-date version of the database. With ecommerce this is critical. If you make changes to the database in the **<Icon icon="equalizer" /> Test** environment and someone places an order on your site you could lose all records of that order if you push the test database to **<Icon icon="wavePulse" /> Live**.

That's why it's critically important to follow the steps in this guide and in Pantheon's overall [workflow process](/pantheon-workflow) to make sure you're always pushing code changes up and pulling database (content) changes down.
