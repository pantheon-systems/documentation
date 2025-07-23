---
title: Using WP SAML Auth with Google Apps
subtitle: Create a SAML App
description: Define a SAML app in the Google Admin dashboard to which you can connect your WordPress site
contributors: [alexfornuto, danielbachhuber, jazzsequence]
contenttype: [guide]
innav: [false]
categories: [security]
cms: [wordpress]
audience: [development]
product: [--]
integration: [plugins]
tags: [sso, saml, users, security, plugins]
reviewed: "2025-07-21"
permalink: docs/guides/wordpress-google-sso/saml-app/
editpath: wordpress-google-sso/03-saml-app.md
---

In this step, we'll create a custom Google Apps SAML application. This will be the gateway between the users in our Google organization and WordPress. We'll also define which Google users have access to the app.

## Define a new app in Google Workspace Admin Console

1. Find the [**Web and mobile apps** dashboard](https://admin.google.com/ac/apps/unified?hl=en) in the Google Apps admin, and click **Add app**:

  ![Google Console Web and Mobile Apps](../../../images/guides/wordpress-google-sso/wp-saml-auth-web-mobile-apps-console.png)

1. In the dropdown, click **Add custom SAML app**:

  ![Google Console Custom SAML App](../../../images/guides/wordpress-google-sso/wp-saml-auth-add-app.png)

1. Enter a name and description for your app, then click **Continue**. This is purely for your own reference and is most important if you have multiple SAML apps defined. You can also upload a logo:

  ![Google App Name and Description](../../../images/guides/wordpress-google-sso/wp-saml-auth-app-details.png)

## IdP Information

1. The **Google IdP Information** appears on the next page and provides values and a certificate to pass back to the WP SAML Auth plugin. The key details are in the **Option 2** section:

   ![Google IdP Information](../../../images/guides/wordpress-google-sso/wp-saml-auth-idp-info.png)

   - **SSO URL**: URL for WordPress to redirect to when initiating the SSO process.

   - **Entity ID**: How WordPress knows to recognize Google Apps.

   - **Certificate** - How Google Apps knows to trust a request coming from WordPress.

1. Copy the **SSO URL** and **Entity ID** values and paste them into the corresponding fields under **Identity Provider Settings** on the plugin settings page:

  ![Values from the Google SAML App copied to the WP SAML Auth settings](../../../images/guides/wordpress-google-sso/plugin-idp-values.png)

1. Download and commit the certificate file to your [`private` directory](/guides/secure-development/private-paths#private-path-for-code) so it's inaccessible from the web. You can add upload this file over [sftp](/guides/sftp), or commit it to a local clone of the Git repository, then commit and push. If the latter, you will need to first switch the connection mode to Git:

  <TabList>

  <Tab title="SFTP" id="cert-by-sftp" active={true}>

  ```bash{outputLines: 2-6, 8}
  sftp -o Port=2222 google-saml.1f2a347b....0@appserver.google-saml.1f2a347b....drush.in
  sftp> cd code/private/
  sftp> put GoogleIDPCertificate-mydomain.com.pem
  Uploading GoogleIDPCertificate-mydomain.com.pem to /srv/bindings/972dd.../code/private/GoogleIDPCertificate-mydomain.com.pem
  GoogleIDPCertificate-mydomain.com.pem                                                                            100% 1253    27.6KB/s   00:00
  sftp> quit
  terminus env:commit --message "Added the Google IDP Certificate to a protected path" $site.$env
   [notice] Your code was committed.
  ```

  </Tab>

  <Tab title="Git" id="cert-by-git">

  ```bash{promptUser: user}
  terminus connection:set $site.$env git
  git add private/GoogleIDPCertificate-mydomain.com.pem
  git commit -m "Added the Google IDP Certificate to a protected path"
  git push origin $env #or master, if working on the dev environment
  ```

  </Tab>

  </TabList>

1. Add the certificate path to the WP SAML Auth plugin settings, using the `ABSPATH` variable:

  ![The x509 Certificate Path field, filled out as ABSPATH/private/certfile.pem](../../../images/guides/wordpress-google-sso/plugin-certificate-path.png)

1. Click **Save Changes** on the plugin settings page, and **Continue** on the Google App modal.

## Service Provider Information

1. The Service Provider Details page asks for information from the WP SAML Auth plugin, which is the SAML service provider for our WordPress site. Refer back to the plugin settings page for the **ACS** (Assertion Consumer Service) **URL**, **Entity ID**, and **Start URL** (listed as **Base URL**). Copy and paste these values:

  ![Google App SAML Service Provider Details](../../../images/guides/wordpress-google-sso/wp-saml-auth-service-provider-details.png)

  Once you've filled out these fields, click **Continue**.

## Attribute Mapping

1. On the Attributes page, you'll need to specify any attributes you'd like Google Apps to return in the SAML response, and then keys you'd like to use for those attributes.

   Without any additional configuration, WP SAML Auth understands this attribute mapping:

   - SAML IdP (Google Apps) -> WordPress
   - `email` -> `user_email`
   - `uid` -> `user_login`
   - `first_name` -> `first_name`
   - `last_name` -> `last_name`

  Click **Add Mapping**, and map at least one identifying attribute. Using `email` as an example:

  ![An example of attribute mapped to all relevant values in the Google SAML App](../../../images/guides/wordpress-google-sso/wp-saml-auth-attribute-mapping.png)

1. Click **FINISH** and your application is created.

## Turn on user access

Before you can use the SAML SSO for Google Workspace, you will need to turn the app on for your users. By default, newly created SAML apps are off for all users. After creating the app, you will be directed to a page for your SAML app, but you can get there from the [Web and mobile apps](https://admin.google.com/ac/apps/unified?hl=en) dashboard.

1. Click on the Expand User Access down arrow at the top right of the **User access** section:

![Google Console SAML App info](../../../images/guides/wordpress-google-sso/wp-saml-auth-sso-app.png)

1. Toggle the **Service status** to **ON for everyone** or select specific organizational units to enable the app for. Click **Save**.

![Google Console SAML App user access](../../../images/guides/wordpress-google-sso/wp-saml-auth-service-status.png)

You can now use your Google Workspace login to access your WordPress site!

## More Resources

- [GSuite Admin Help - Set up your own custom SAML application](https://support.google.com/a/answer/6087519)
