---
title: Single Sign-on with Pantheon
subtitle: Introduction
description: Learn how to use secure Single Sign-on with Pantheon.
tags: [security]
reviewed: "2023-05-01"
contenttype: [guide]
innav: [true]
categories: [security]
cms: [drupal, wordpress]
audience: [development]
product: []
integration: [sso, saml]
contributors: [whitneymeredith]
showtoc: true
permalink: docs/guides/sso
---

Single sign-on (SSO) allows you to authenticate against your Identity Provider (IdP) when logging into Pantheon.

Pantheon’s flexible infrastructure does not restrict protocols or ports used for communication. There are also no outbound restrictions for traffic from Pantheon to external services.

## Who is Single Sign-on for?

SSO can help organizations centrally manage their users' identities and provide seamless integration across multiple applications. Numerous Pantheon customers use an SSO solution, including:

- Higher education institutions
- School districts
- Local governments
- Other groups and organizations

## How Does SSO Work?

Pantheon uses Security Assertion Markup Language (SAML) for SSO authentication. SAML is an XML-based open standard that transfers identity data between two parties, such as an identity provider (IdP) and a service provider (SP) or web application. SAML streamlines the authentication process by enabling users to access multiple, independent web applications across domains using one set of credentials.

<Alert title="Note"  type="info" >

SAML applies to an entire email domain when enabled on Pantheon. You cannot use SAML on a per-site, per-environment, or per-user basis. Refer to [Members of an SSO Organization](/guides/sso/sso-organizations#members-of-an-sso-organization) for more information on internal and external members of an SSO organization.

</Alert>

SAML SSO is included for customers with Diamond Accounts and is available for most [Pantheon Workspaces](/guides/account-mgmt/workspace-sites-teams/workspaces). If you'd like to upgrade to an eligible Account, please contact [Sales](https://pantheon.io/plans/elite?docs). Agencies interested in SAML SSO should reach out to their Partner Manager for qualification requirements. You must be part of the [Pantheon Partner Program](https://pantheon.io/plans/partner-program?docs) to qualify.

## More Resources

- [WP SAML Auth with Google Apps](/guides/wordpress-google-sso/saml-app/)
- [Secure Your Site with Two-Factor Authentication](/guides/secure-development/two-factor-authentication)
- [Pantheon Security](/guides/security)
