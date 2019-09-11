---
title: Secure Runtime Access
description: Limit access to your site's database to help defend against traffic-based attacks and unauthorized access.
tags: [security]
categories: []
contributors: [edwardangert]
searchboost: 150
---

Pantheon’s database services use strong random passwords and TLS to encrypt communications by default. Customers seeking additional defense in depth can enable Secure Runtime Access (SRA).

When SRA is enabled, the site's Pantheon MySQL databases will no longer listen for incoming connections over public internet ports, and developers will only be able to connect to those databases [via SSH tunnel](/ssh-tunnels/).

In addition to defense in depth, this feature can be used to enforce roles and permissions by preventing developers from accessing a live database. It also guarantees that users who are removed from a site team or organization can no longer use a saved set of credentials.

## How to Enable SRA on your site

Secure Runtime Access is available to customers with an [Organizational](/organizations/) dashboard. [Contact Support](/support/) to request that SRA be enabled for your Site. Once it's enabled:

1. Navigate to your Site’s Dashboard and click **Settings**
   Secure Runtime Access will appear under **Available Add-Ons**.
1. In the Add Ons tab, click **Secure Runtime Access Enabled**
1. Click **Save Secure Runtime Access** to enable SRA for that site
   * Repeat this process for each site for which you want SRA enabled.

## How to Access Runtime Services when SRA is Enabled

Follow the [Secure Tunnels](/ssh-tunnels/) doc to create the tunnel and and access resources once SRA is enabled.

## What it looks like when a connection is refused

When SRA is enabled and a connection is refused, SSH will respond with the `No route to host` error found in the troubleshooting section of the [SSH Tunnels](/ssh-tunnels/) doc.
