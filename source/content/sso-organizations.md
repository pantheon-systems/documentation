---
title: Single Sign-On for Pantheon Organizations
description: Detailed information to enable SAML single sign-on for your organization.
categories: [manage]
tags: [security, organizations]
---
Single sign-on (SSO) allows users to authenticate against your Identity Provider (IdP) when logging into the Pantheon Dashboard. For more information, see [SSO and Identity Federation on Pantheon](/sso).

Once enabled, SAML applies to an entire email domain and is not available on a per-site, per-environment, or per-user basis.

SAML SSO is included for customers with Diamond Accounts and is available for most [Pantheon Organizations](/organizations). If you'd like to upgrade to an eligible Account, please contact [Sales](https://pantheon.io/plans/elite?docs). Agencies interested in SAML SSO should reach out to their Partner Manager to see if they qualify. You must be part of the [Pantheon Partner Program](https://pantheon.io/plans/partner-program?docs) to qualify.

## User Experience
* User submits the Pantheon login form with their email address.
* User is redirected to the configured IdP.
* After the IdP authenticates the user, they are redirected to their Pantheon Dashboard.

## Terminus Authentication
Users in a SAML-enabled Pantheon organization can authenticate via [Terminus](/terminus) by using [machine tokens](/machine-tokens).

## Managing Users

Pantheon organization administrators can [manage sites and teams with the Organization Dashboard](/organization-dashboard). Automated user provisioning isn't available.

### External Members

New and existing members outside the organization are not redirected to the configured IdP. There is no change in behavior when logging in. An external member is anyone in the organization using an email address on a different domain than what's configured for SSO (e.g., `@gmail.com`).

## Configure your IdP

Refer to your IdP for general SAML 2.0 setup instructions. Pantheon will supply the string to be used in place of `Pantheon-SSO-Connection-Name` in the examples below.

You will need to enter the following:

1. **Single sign-on URL**: `https://pantheon.auth0.com/login/callback?connection=Pantheon-SSO-Connection-Name` 

    Note that the single sign-on URL is **case sensitive**.

2. **Audience URI (SP Entity ID)**: `urn:auth0:pantheon:Pantheon-SSO-Connection-Name`

3. **Add an Attribute Statement** to map `mail` to `email`. If using [Okta](https://www.okta.com/), map the attributes `mail` to `user.email` and `user_name` to `user.email`.

4. **Additional configuration details:**
    * The post-back URL (also called Assertion Consumer Service URL) is: `https://pantheon.auth0.com/login/callback`
    * The SAML Request Binding (sent to the IdP from Auth0): `HTTP-Redirect`
    * The SAML Response Binding (how the SAML token is received by Auth0 from IdP): `HTTP-Post`
    * The NameID format: `unspecified`
    * Optional: The `user_id` attribute may need to be configured to be sent manually. If this value is not already present, it should be set to match the `email` attribute.
    * The SAML assertion, and the SAML response can be individually or simultaneously signed.
    * Optional: Assertions can be encrypted with the following keys: [CER](https://pantheon.auth0.com/cer) | [PEM](https://pantheon.auth0.com/pem) | [PKCS#7](https://pantheon.auth0.com/pb7)

## Enable SAML on Pantheon

[Contact support](/guides/support/contact-support/) and provide the following:

1. **Email Domain(s)**: The email domain(s) your organization controls. Only users with email addresses in this domain will use the Organization's IdP.

2. **Single Sign-on URL**: The URL of your IdP that we will redirect to for authentication.

3. **Certificate**: The X.509 certificate used to validate incoming SAML requests. Please share this via https://gist.github.com/

4. **Date/time to enable**: A time you'd like Pantheon to enable SSO, when you can test and ensure everything works.

## Troubleshooting

### Cannot Authenticate with Username/Password When Creating a New Machine Token
If you are a member of a SAML-enabled organization, and the password field does not disappear after you enter your username and password, you'll need to log out of your active session, log back in, and try again. This can occur if you have two accounts with different email addresses and have not logged out of an active session.

### Cannot Log in Using a Google Account
Google account login is disabled for users in organizations using single sign-on. SAML allows organizations to centrally manage authentication policies, so allowing social login could circumvent that policy.

### Use Base-64 encoded X.509(.CER) when using Microsoft ADSF as idp 
Make sure you generate the certificate using the right encoding.

### Use token-signing certificate when using Microsoft ADSF as idp 
There are 3 types of certificate that you can generate:

 - `communication-service`
 - `token-decrypting`
 - `token-signing`

Use a `token-signing` certificate, otherwise you will get a thumbprint error.
