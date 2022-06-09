---
title: Secure Runtime Access
description: Limit access to your site's database for additional defense against traffic-based attacks and unauthorized access.
tags: [security]
categories: [develop]
contributors: [edwardangert]
searchboost: 150
---

Pantheon’s database services use strong random passwords and TLS to encrypt communications by default. Customers seeking additional defense in depth can enable Secure Runtime Access (SRA).

SRA actively discards attempts to connect to persistent instances like MySQL or SFTP, disregarding the attempt before it reaches the service. When SRA is enabled, the connection attempts to the service will be rejected unless the connection comes through the appropriate [SSH tunnel](/ssh-tunnels).

In addition to defense in depth, this feature can be used to enforce role-based permissions by preventing users with a developer role from accessing a live database. It also guarantees that users who are removed from a site team or organization can no longer use a saved set of credentials.

## How to Enable SRA on Your Site

Secure Runtime Access is available to [contract](https://pantheon.io/plans/pricing) customers with an [Organization](/organizations) dashboard. [Contact Sales](https://pantheon.io/contact-us) to request that SRA be enabled for your site.

## How to Access Runtime Services When SRA Is Enabled

Follow the [Secure Tunnels](/ssh-tunnels) doc to create the tunnel and access resources after SRA is enabled.

## What It Looks Like When a Connection Is Refused

When SRA is enabled and a connection is refused, SSH will respond with the `No route to host` error. To resolve this issue refer to the troubleshooting section of the [SSH Tunnels](/ssh-tunnels) doc.
