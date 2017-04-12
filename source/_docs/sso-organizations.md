---
title: Single Sign-On for Pantheon Organizations
description: Detailed information to enable SAML single sign-on for your organization.
tags: [security, tools]
categories: []
---
Single sign-on (SSO) allows users to authenticate against your Identity Provider (IdP) when logging into the Pantheon Dashboard. For more information, see [SSO and Identity Federation on Pantheon](/docs/sso/).

SAML SSO is included for Elite, Enterprise, and EDU+ customers. If you'd like to upgrade to an eligible plan, please contact [Sales](https://pantheon.io/why-pantheon-enterprise). Agencies interested in SAML SSO should reach out to their Partner Manager to see if they qualify. You must have a [Pantheon for Agencies](https://pantheon.io/agencies/pantheon-for-agencies) account and be a Pantheon Partner to qualify.

## User Experience
* User submits the Pantheon login form with their email address.
* User is redirected to the configured IdP.
* After the IdP authenticates the user, they are redirected to their Pantheon Dashboard.

## Terminus Authentication
Users in a SAML-enabled Pantheon organization can authenticate via [Terminus](/docs/terminus/) by using [machine tokens](/docs/machine-tokens/).

## Managing Users

Pantheon organization administrators can [manage sites and teams with the Organization Dashboard](/docs/organization-dashboard/). Automated user provisioning isn't available.

## Configure your IdP

Refer to your IdP for general SAML 2.0 setup instructions.

You will need to enter the following:

1.  **Single sign-on URL**: `https://pantheon.auth0.com/login/callback?connection=Example-Org-Name-SSO`

2.  **Audience URI (SP Entity ID)**: `urn:auth0:pantheon:Example-Org-Name-SSO`

    <div class="alert alert-info" role="alert">
    <h4 class="info">Note</h4>
    <ul>
    <li>Replace <code>Example-Org-Name</code> with your Pantheon organization name. Separate words with hyphens, and append 'SSO'.</li>
    <li> The connection name must start with an alphanumeric character and can only contain alphanumeric characters and hyphens (-).</li>
    <li> The max length for a connection name is 35 characters, including the appended 'SSO'.</li></ul>
    </div>

3.  **Add an Attribute Statement** to map `mail` to `email`. If using [Okta](https://www.okta.com/), the attribute is `email`, not `mail`.

4.  **Additional configuration details:**
    * The post-back URL (also called Assertion Consumer Service URL) is: `https://pantheon.auth0.com/login/callback`
    * The SAML Request Binding (sent to the IdP from Auth0): `HTTP-Redirect`
    * The SAML Response Binding (how the SAML token is received by Auth0 from IdP): `HTTP-Post`
    * The NameID format: `unspecified`
    * The SAML assertion, and the SAML response can be individually or simultaneously signed.
    * Optional: Assertions can be encrypted with the following keys: [CER](https://pantheon.auth0.com/cer) | [PEM](https://pantheon.auth0.com/pem) | [PKCS#7](https://pantheon.auth0.com/pb7)

## Enable SAML on Pantheon

[Contact support](/docs/getting-support) and provide the following:

1. **Email Domain(s)**: The email domain(s) your organization controls. Only users with email addresses in this domain will use the Organization's IdP.

2. **Single Sign-on URL**: The URL of your IdP that we will redirect to for authentication.

3. **Certificate**: The X.509 certificate used to validate incoming SAML requests. Please share this via https://gist.github.com/

4. **Date/time to enable**: A time you'd like Pantheon to enable SSO, when you can test and ensure everything works.

## Troubleshooting
### Cannot Authenticate with Username/Password When Creating a New Machine Token
If you are a member of a SAML-enabled organization, and the password field does not disappear after you enter your username and password, you'll need to log out of your active session, log back in, and try again. This can occur if you have two accounts with different email addresses and have not logged out of an active session.

### Cannot Log in Using a Google Account
Google account login is disabled for users in organizations using single sign-on. SAML allows organizations to centrally manage authentication policies, so allowing social login could circumvent that policy.
