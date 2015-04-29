---
title: Single Sign-On for Pantheon Organizations
description: See what's needed to enable single-sign on for your company.
category:
  - developing
---

Single-sign on (SSO) allows your users to authenticate against your IdP when using the Pantheon product.

If you're interested in single-sign on for your company, please contact Customer Support. Our support team will assist you in configuring SAML.

##Enabling SAML
You will need to provide Customer Support with the following information:

**SAML Domain**: The email domain the organization controls. Only users with email addresses in this domain will use the Organizations IdP

**IdP Target URL**: The URL that we will redirect to for authentication

**Certificate Signature**: This is a x509 signature, used to validate incoming SAML requests e.g. EB:10:B4:F0:1F:4C:88:7E:08:61:AE:8D:EF:6E:66:B1:27:A9:53:99

Customer Support will provide the following fields to you:
**Assertion Consumer URL**: The URL the IdP should redirect back to after authentication
**SAML Issuer**: The URL where the Dashboard lives

##SAML User Experience
The experience is similar to any other single sign-on solution:  
1. Users enter their email and any password.  
2. After the user submits the form, they are redirected to the configured IdP.  
3. After the IdP authenticates the user, they are redirected to their Pantheon Dashboard homepage.
  
##See Also
[Configuring SAML for Pantheon](https://onelogin.zendesk.com/hc/en-us/articles/204356174-Configuring-SAML-for-Pantheon)
