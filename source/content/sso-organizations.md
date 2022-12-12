---
title: Single Sign-On for Pantheon Organizations
description: Detailed information to enable SAML single sign-on for your organization.
tags: [security, organizations]
contenttype: [doc]
categories: [user-authentication, config]
newcms: [drupal, wordpress]
audience: [development]
product: [--]
integration: [saml, sso, azure]
---

Single sign-on (SSO) allows users to authenticate against your Identity Provider (IdP) when logging into the Pantheon Dashboard. Refer to [SSO and Identity Federation on Pantheon](/sso) for more information.

SAML applies to an entire email domain when enabled and is not available on a per-site, per-environment, or per-user basis.

SAML SSO is included for customers with Diamond Accounts and is available for most [Pantheon Organizations](/guides/account-mgmt/workspace-sites-teams/workspaces). If you'd like to upgrade to an eligible Account, please contact [Sales](https://pantheon.io/plans/elite?docs). Agencies interested in SAML SSO should reach out to their Partner Manager for qualification requirements. You must be part of the [Pantheon Partner Program](https://pantheon.io/plans/partner-program?docs) to qualify.

## How It Works

The SSO user experience for members and external members is outlined in the sections below. Note that the distinction between members and external members is determined by the **email domain** they use to access their Pantheon Dashboard.

### Members of an SSO Organization

Members of an SSO-enabled organization have an email address that includes the organization's email domain, for example, `@xmail.com`. You can think of these members as *internal* members of the organization. Members of an SSO organization experience the following process:

- User submits the Pantheon login form with their email address.

- User is redirected to the configured IdP.

- The IdP authenticates the user and then redirects the user to their Pantheon Dashboard.

### External Members

An external member is anyone in the organization using an email address on a different domain than what's configured for SSO, for example, `@ymail.com`. New and existing external members of the organization are not affected when SSO is enabled. External users are not redirected to the configured IdP and experience no change in behavior when logging in. External members experience the following process:

- User submits the Pantheon login form with their email address.

- User is authenticated and taken to their Pantheon Dashboard.


## Terminus Authentication

Users in a SAML-enabled Pantheon organization can authenticate via [Terminus](/terminus) by using [machine tokens](/machine-tokens).

## Manage Users

Pantheon organization administrators can [manage sites and teams with the Organization Dashboard](/guides/legacy-dashboard/org-dashboard). Automated user provisioning isn't available.


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


### Azure IdP Configuration

Azure configuration requires several modifications from the general instructions in the above section. 

1. Complete the Pantheon-specific steps in Azure's documentation to [Configure Azure AD SSO](https://docs.microsoft.com/en-us/azure/active-directory/saas-apps/pantheon-tutorial#configure-azure-ad-sso).

1. Confirm that you make all required edits to correctly map custom attributes, including:

    - **Identifier text box:** `urn:auth0:pantheon:<orgname>-SSO`

    - **Reply URL text box:** `https://pantheon.auth0.com/login/callback?connection=<orgname>-SSO`

    - **Single sign-on URL:** `Leave Blank`

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
