---
title: Single Sign-On for Pantheon Organizations
description: Detailed information to enable SAML single sign-on for your organization.
tags: [security, tools]
categories: []
---
Single sign-on (SSO) allows users to authenticate against your Identity Provider (IdP) when logging into the Pantheon Dashboard. For more information, see [SSO and Identity Federation on Pantheon](/docs/sso/).

SAML SSO is included for customers with Diamond Support, and is available for purchase for Pantheon Organizations with Platinum or below. SAML is an organization-wide feature only and is not available on a per site or per environment basis. If you'd like to upgrade to an eligible support package, please contact [Sales](https://pantheon.io/why-pantheon-enterprise){.external}. Agencies interested in SAML SSO should reach out to their Partner Manager to see if they qualify. You must be part of the [Pantheon Partner Program](https://pantheon.io/agencies/partner-program){.external} to qualify.

## User Experience
* User submits the Pantheon login form with their email address.
* User is redirected to the configured IdP.
* After the IdP authenticates the user, they are redirected to their Pantheon Dashboard.

## Terminus Authentication
Users in a SAML-enabled Pantheon organization can authenticate via [Terminus](/docs/terminus/) by using [machine tokens](/docs/machine-tokens/).

## Managing Users

Pantheon organization administrators can [manage sites and teams with the Organization Dashboard](/docs/organization-dashboard/). Automated user provisioning isn't available.

### External Members

New and existing members outside the organization are not redirected to the configured IdP. There is no change in behavior when logging in. An external member is anyone in the organization using an email address on a different domain than what's configured for SSO (e.g., `@gmail.com`).

## Configure your IdP

Refer to your IdP for general SAML 2.0 setup instructions. Pantheon will supply the string to be used in place of `Pantheon-SSO-Connection-Name` in the examples below.

You will need to enter the following:

1.  **Single sign-on URL**: `https://pantheon.auth0.com/login/callback?connection=Pantheon-SSO-Connection-Name`

2.  **Audience URI (SP Entity ID)**: `urn:auth0:pantheon:Pantheon-SSO-Connection-Name`

3.  **Add an Attribute Statement** to map `mail` to `email`. If using [Okta](https://www.okta.com/), map the attribute `email` to `user:email`.

4.  **Additional configuration details:**
    * The post-back URL (also called Assertion Consumer Service URL) is: `https://pantheon.auth0.com/login/callback`
    * The SAML Request Binding (sent to the IdP from Auth0): `HTTP-Redirect`
    * The SAML Response Binding (how the SAML token is received by Auth0 from IdP): `HTTP-Post`
    * The NameID format: `unspecified`
    * Optional: The `user_id` attribute may need to be configured to be sent manually. If this value is not already present, it should be set to match the `email` attribute.
    * The SAML assertion, and the SAML response can be individually or simultaneously signed.
    * Optional: Assertions can be encrypted with the following keys: [CER](https://pantheon.auth0.com/cer) | [PEM](https://pantheon.auth0.com/pem) | [PKCS#7](https://pantheon.auth0.com/pb7)

## Enable SAML on Pantheon

[Contact support](/docs/support) and provide the following:

1. **Email Domain(s)**: The email domain(s) your organization controls. Only users with email addresses in this domain will use the Organization's IdP.

2. **Single Sign-on URL**: The URL of your IdP that we will redirect to for authentication.

3. **Certificate**: The X.509 certificate used to validate incoming SAML requests. Please share this via https://gist.github.com/

4. **Date/time to enable**: A time you'd like Pantheon to enable SSO, when you can test and ensure everything works.

## Troubleshooting
### Cannot Authenticate with Username/Password When Creating a New Machine Token
If you are a member of a SAML-enabled organization, and the password field does not disappear after you enter your username and password, you'll need to log out of your active session, log back in, and try again. This can occur if you have two accounts with different email addresses and have not logged out of an active session.

### Cannot Log in Using a Google Account
Google account login is disabled for users in organizations using single sign-on. SAML allows organizations to centrally manage authentication policies, so allowing social login could circumvent that policy.
