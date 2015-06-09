---
title: Single Sign-On for Pantheon Organizations
description: Detailed information to enable SAML single sign-on for your organization.
category:
  - developing
---
Single sign-on (SSO) allows users to authenticate against your Identity Provider (IdP) when logging into the Pantheon Dashboard.

SSO is available as an add-on for Enterprise Pantheon Organizations.
To upgrade to an Enterprise plan, or to add SAML SSO to an existing Enterprise plan, contact [Sales](https://pantheon.io/why-pantheon-enterprise).

##User Experience
* User submits the Pantheon login form with email and any password, or the [SSO login form](https://dashboard.pantheon.io/sso) with just their email address.
* User is redirected to the configured IdP.  
* After the IdP authenticates the user, they are redirected to their Pantheon Dashboard.

## Configuring your IdP

Refer to your IdP for general SAML 2.0 setup instructions, or to any Pantheon-specific documentation:

* [Configuring SAML for Pantheon with Okta](/docs/articles/organizations/saml-for-orgs-with-okta)
* [Configuring SAML for Pantheon with OneLogin](https://onelogin.zendesk.com/hc/en-us/articles/204356174-Configuring-SAML-for-Pantheon)

You will need to enter the following:

+ **Single sign-on URL**: `https://dashboard.pantheon.io/saml/example.com/consume`

  <div class="alert alert-warning" role="alert"> <strong>Note:</strong>  Replace <code>example.com</code> with the domain you control</div>

+ **Audience URI (SP Entity ID)**: `https://dashboard.pantheon.io` or `https://dashboard.pantheon.io/`

## Enabling SAML on Pantheon

Open a support ticket with Pantheon with the following information:

1. **SAML Domain**: The email domain your organization controls. Only users with email addresses in this domain will use the Organization's IdP

2. **IdP Target URL**: The URL that we will redirect to for authentication

3. **Certificate**: The X.509 certificate used to validate incoming SAML requests.

4. **Date/time to enable**: A time you'd like Pantheon to enable SSO, when you can test and ensure everything works.
