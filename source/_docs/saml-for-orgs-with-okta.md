---
title: Configuring SAML SSO for Pantheon with Okta
description: Detailed information to enable SAML single sign-on for your organization with Okta.
categories:
  - developing
draft: true

---
Starting from the Okta admin dashboard, do the following:

1. Log in to Okta admin.
2. Select **Applications**.
3. Click **Add Application**.
4. Click **Create New App**.
5. Select **SAML 2.0** and click **Create**.
6. Name your app **Pantheon** and click **Next**.
7. Enter the following settings:

- **Single sign on URL**:   `https://dashboard.pantheon.io/saml/example.com/consume`  
    <div class="alert alert-info" role="alert">
    <h4>Note</h4>
    Replace <code>example.com</code> with the domain you control.</div>
- **Audience URI (SP Entity ID)**: `https://dashboard.pantheon.io`
- **Name ID format**: `EmailAddress`
- **Application username**: `Email`
  ![Okta settings](/source/assets/images/okta-4.png)
8.  Click **Show Advanced Settings**, select **Compressed** for **Request compression**, and click **Next**.
 ![Okta settings](/source/assets/images/okta-5.png)

9. Copy the values found in the Okta Pantheon app **Sign On** tab >> **View Setup Instructions** for **Identity Provider Single sign on URL** and **X.509 Certificate** for step 7.

10. Open a ticket with support as outlined in [Enabling SAML on Pantheon](/docs/sso/#enable-saml-on-pantheon).

## See Also
* [Single Sign-On for Pantheon Organizations](/docs/sso/)
