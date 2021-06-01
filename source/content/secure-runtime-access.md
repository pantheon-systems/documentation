---
title: Secure Runtime Access
description: Limit access to your site's database for additional defense against traffic-based attacks and unauthorized access.
tags: [security]
categories: [develop]
contributors: [edwardangert]
searchboost: 150
---

Pantheon’s database services use strong random passwords and TLS to encrypt communications by default. Customers seeking additional defense in depth can enable Secure Runtime Access (SRA).

SRA actively discards attempts to connect to persistent instances like MySQL or Redis, disregarding the attempt before it reaches the service. When SRA is enabled, the connection attempts to the service will be rejected unless the connection comes through the appropriate [SSH tunnel](/ssh-tunnels).

In addition to defense in depth, this feature can be used to enforce role-based permissions by preventing users with a developer role from accessing a live database. It also guarantees that users who are removed from a site team or organization can no longer use a saved set of credentials.

## How to Enable SRA on your site

Secure Runtime Access is available to [contract](https://pantheon.io/plans/pricing) customers with an [Organizational](/organizations) dashboard. [Contact Sales](https://pantheon.io/contact-us) to request that SRA be enabled for your Site. Once it's enabled:

1. Navigate to your Site’s Dashboard and click **Settings**.
   Secure Runtime Access will appear under **Available Add-Ons**.
1. In the Add Ons tab, click **Secure Runtime Access Enabled**.
1. Click **Save Secure Runtime Access** to enable SRA for that site.
   * Repeat this process for each site for which you want SRA enabled.

## How to Access Runtime Services when SRA is Enabled

Follow the [Secure Tunnels](/ssh-tunnels) doc to create the tunnel and and access resources once SRA is enabled.

## What it looks like when a connection is refused

When SRA is enabled and a connection is refused, SSH will respond with the `No route to host` error found in the troubleshooting section of the [SSH Tunnels](/ssh-tunnels) doc.
