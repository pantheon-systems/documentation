---
title: Single Sign-On for Pantheon Organizations
description: Detailed information to enable SAML single sign-on for your organization.
category:
  - developing
---
Single sign-on (SSO) allows users to authenticate against your Identity Provider (IdP) when logging into the Pantheon Dashboard.

SAML SSO is available for Pantheon Enterprise, Pantheon for EDU+, and full Partner Organizations.
To add SAML SSO to an existing Organization, please [contact support](https://dashboard.pantheon.io/users/#support/open-ticket).

## User Experience
* User submits the Pantheon login form with email and any password, or the [SSO login form](https://dashboard.pantheon.io/sso) with just their email address.
* User is redirected to the configured IdP.  
* After the IdP authenticates the user, they are redirected to their Pantheon Dashboard.

## Terminus
Users in a SAML-enabled Pantheon organization are unable to authenticate using Terminus. The current workaround is to add a machine user outside of the organization, add it as a team member to individual sites, and authenticate normally. See planned work to add [Authentication via keys or tokens](https://github.com/pantheon-systems/cli/issues/291) to Terminus.

## Managing Users

Pantheon organization administrators can [manage sites and teams with the organization dashboard](/docs/articles/organizations/dashboard/). Automated user provisioning isn't available.

## Configure your IdP

Refer to your IdP for general SAML 2.0 setup instructions.

You will need to enter the following:

+ **Single sign-on URL**: `https://dashboard.pantheon.io/saml/example.com/consume`

  <div class="alert alert-info" role="alert">
  <h4>Note</h4>
  Replace <code>example.com</code> with the domain you control</div>

+ **Audience URI (SP Entity ID)**: `https://dashboard.pantheon.io` or `https://dashboard.pantheon.io/`

While there may be SAML setups that provide keys to configure your IdP, we do not provide them. We provide the SSO URL and Audience URI (SP Entity ID) as listed above.

If your IdP is Okta or OneLogin, see:

* [Configuring SAML for Pantheon with Okta](/docs/articles/organizations/sso)
* [Configuring SAML for Pantheon with OneLogin](https://onelogin.zendesk.com/hc/en-us/articles/204356174-Configuring-SAML-for-Pantheon)

## Enable SAML on Pantheon

Open a support ticket with Pantheon with the following information:

1. **SAML Domain**: The email domain your organization controls. Only users with email addresses in this domain will use the Organization's IdP

2. **IdP Target URL**: The URL that we will redirect to for authentication

3. **Certificate**: The X.509 certificate used to validate incoming SAML requests.

4. **Date/time to enable**: A time you'd like Pantheon to enable SSO, when you can test and ensure everything works.
