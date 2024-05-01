---
title: Pantheon Secrets Guide
subtitle: Use Cases
description: Some common uses cases for Pantheon Secrets
terminuspage: true
type: terminuspage
layout: terminuspage
contributors: [stovak]
contenttype: [guide]
innav: [true]
categories: [secrets]
cms: [drupal, wordpress]
audience: [development]
product: [secrets]
integration: [--]
tags: [reference, cli, local, terminus, workflow]
permalink: docs/guides/secrets/use-cases
reviewed: "2024-05-01"
---

# Use Case: Using secrets with Integrated Composer

## Introduction

## Mechanism 1: Oauth composer authentication (recommended)

### GitHub

### GitLab

### Bitbucket

## Mechanism 2: HTTP Basic Authentication

TEST THAT WHAT IS IN THE PLUGIN STILL WORKS!

# Use Case: Using secrets with Drupal Key module

[https://github.com/pantheon-systems/pantheon_secrets/blob/1.0.x/docs/example.md](https://github.com/pantheon-systems/pantheon_secrets/blob/1.0.x/docs/example.md)

Also short version in README: [https://github.com/pantheon-systems/pantheon_secrets/blob/1.0.x/README.md#usage](https://github.com/pantheon-systems/pantheon_secrets/blob/1.0.x/README.md#usage)

# Use Case: Accessing secrets from your codebase

### Introduction

Include this note: "Note: Only get has been implemented so far. You should handle your secrets through terminus using [Terminus Secrets Manager](https://github.com/pantheon-systems/terminus-secrets-manager-plugin)." Do not present this as something we "may" do in the future!

Also: [https://github.com/pantheon-systems/customer-secrets-php-sdk?tab=readme-ov-file#restrictions](https://github.com/pantheon-systems/customer-secrets-php-sdk?tab=readme-ov-file#restrictions)

Note: this also applies to quicksilver scripts

## Mechanism 1: get_pantheon_secrets

## Mechanism 2: OOP (get a better name here!!!)

[https://github.com/pantheon-systems/customer-secrets-php-sdk?tab=readme-ov-file#usage](https://github.com/pantheon-systems/customer-secrets-php-sdk?tab=readme-ov-file#usage)

## Resources

See our detailed [Drupal](https://github.com/pantheon-systems/customer-secrets-php-sdk/blob/main/docs/drupal-example.md) or [WordPress](https://github.com/pantheon-systems/customer-secrets-php-sdk/blob/main/docs/wordpress-example.md) examples for more detailed end to end examples.

