---
title: Single Sign-on with Pantheon
subtitle: SSO for Pantheon Organizations
description: Learn how to enable SAML single sign-on for your organization.
tags: [security, organizations]
contenttype: [guide]
innav: [true]
showtoc: true
categories: [security, config]
cms: [drupal, wordpress]
audience: [development]
product: [--]
integration: [saml, sso, azure]
permalink: docs/guides/sso/sso-organizations
---

This section provides information on SSO workflow on Pantheon, as well as authentication and IdP configuration requirements.

The SSO user experience for members and external members is outlined in the sections below. Note that the distinction between members and external members is determined by the **email domain** used to access Pantheon.

### Members of an SSO Organization

Members of an SSO-enabled organization have an email address that includes the organization's email domain, for example, `@xmail.com`. You can think of these members as *internal* members of the organization. Members of an SSO organization experience the following process:

- User submits the Pantheon login form with their email address.

- User is redirected to the configured IdP.

- The IdP authenticates the user and then redirects the user to Pantheon.

<Alert title="Note"  type="info" >

SAML applies to an entire email domain when enabled on Pantheon. You cannot use SAML on a per-site, per-environment, or per-user basis.

</Alert>

### External Members

An external member is anyone in the organization using an email address on a different domain than what's configured for SSO, for example, `@ymail.com`. New and existing external members of the organization are not affected when SSO is enabled. External users are not redirected to the configured IdP and experience no change in behavior when logging in. External members experience the following process:

- User submits the Pantheon login form with their email address.

- User is authenticated and taken to Pantheon.


## Terminus Authentication

Users in a SAML-enabled Pantheon organization can authenticate via [Terminus](/terminus) by using [machine tokens](/machine-tokens).

## Manage Users

Pantheon organization administrators can [manage sites and teams with the workspace](/guides/account-mgmt/workspace-sites-teams/workspaces). Automated user provisioning isn't available.

## Configure your IdP

Refer to your IdP for general SAML 2.0 configuration instructions. Pantheon supplies the string you must use in place of `Pantheon-SSO-Connection-Name` in the examples below.

You must enter the following:

1. **Single sign-on URL**: `https://pantheon.auth0.com/login/callback?connection=Pantheon-SSO-Connection-Name`

    - Note that the single sign-on URL is **case sensitive**.

1. **Audience URI (SP Entity ID)**: `urn:auth0:pantheon:Pantheon-SSO-Connection-Name`

1. **Add an Attribute Statement** to map `mail` to `email`. If using [Okta](https://www.okta.com/), map the attributes `mail` to `user.email` and `user_name` to `user.email`.

1. **Additional configuration details:**
    * The post-back URL (also called Assertion Consumer Service URL) is: `https://pantheon.auth0.com/login/callback`
    * The SAML Request Binding (sent to the IdP from Auth0): `HTTP-Redirect`
    * The SAML Response Binding (how the SAML token is received by Auth0 from IdP): `HTTP-Post`
    * The NameID format: `unspecified`
    * The `user_id` attribute must be configured to be sent manually. If this value is not already present, it should be set to match the `email` attribute.
    * The SAML assertion, and the SAML response can be individually or simultaneously signed.
    * Optional: Assertions can be encrypted with the following keys: [CER](https://pantheon.auth0.com/cer) | [PEM](https://pantheon.auth0.com/pem) | [PKCS#7](https://pantheon.auth0.com/pb7)


### Azure IdP Configuration

Azure configuration requires several modifications from the general instructions in the above section.

1. Complete the Pantheon-specific steps in Azure's documentation to [Configure Azure AD SSO](https://docs.microsoft.com/en-us/azure/active-directory/saas-apps/pantheon-tutorial#configure-azure-ad-sso).

1. Confirm that you make all required edits to correctly map custom attributes, including:

    - **Identifier text box:** `urn:auth0:pantheon:Pantheon-SSO-Connection-Name`

    - **Reply URL text box:** `https://pantheon.auth0.com/login/callback?connection=Pantheon-SSO-Connection-Name`

    - **Single sign-on URL:** `Leave Blank`

## Enable SAML on Pantheon

[Contact support](/guides/support/contact-support/) and provide the following:

1. **Email Domain(s)**: The email domain(s) your organization controls. Only users with email addresses in this domain will use the Organization's IdP.

1. **Single Sign-on URL**: The URL of your IdP that we will redirect to for authentication.

1. **Certificate**: The X.509 certificate used to validate incoming SAML requests. Please share this via https://gist.github.com/

1. **Date/time to enable**: A time you'd like Pantheon to enable SSO, when you can test and ensure everything works.

## Troubleshooting

### Cannot Authenticate with Username/Password When Creating a New Machine Token

If you are a member of a SAML-enabled organization, and the password field does not disappear after you enter your username and password, you'll need to log out of your active session, log back in, and try again. This can occur if you have two accounts with different email addresses and have not logged out of an active session.

### Cannot Log in Using a Google Account

Google account login is disabled for users in organizations using single sign-on. SAML allows organizations to centrally manage authentication policies, so allowing social login could circumvent that policy.

### Use Base-64 encoded X.509(.CER) when using Microsoft Active Directory Federation Services (AD FS) as an IdP

Make sure you generate the certificate using the correct encoding.

### Use token-signing certificate when using Microsoft AD FS as an IdP

There are three types of certificates that you can generate:

 - `communication-service`
 - `token-decrypting`
 - `token-signing`

Use a `token-signing` certificate, otherwise you will get a thumbprint error.


## More Resources

- [Managing Sites and Teams with the Pantheon Workspace](/guides/account-mgmt/workspace-sites-teams/)
- [Professional Workspaces](/guides/account-mgmt/workspace-sites-teams/workspaces/)
