---
title: "Manage Your Account"
subtitle: Enable MFA
description: Secure your Pantheon account by enabling MFA in your personal settings. 
contenttype: [guide]
innav: [true]
showtoc: "true"
permalink: docs/guides/account-mgmt/account/mfa
editpath: docs/guides/account-mgmt/account/04-mfa.md
reviewed: "2026-03-30"
---

Multi-Factor Authentication (MFA) adds an extra layer of security to your Pantheon account. Once MFA is enabled, you will be prompted to verify your identity with a second factor authenticator application upon login.

## Availability 
MFA is available to all Pantheon users as an opt-in feature, regardless of how you sign in (email and password, Google, or another method). It is configured at the user level, meaning each user manages their own MFA enrollment independently.

<Alert type="info" title="Note">

MFA applies to **dashboard logins only**. Users who access Pantheon via Terminus will continue to authenticate without MFA.

</Alert>

## Before you begin

* You'll need an authenticator app installed on your mobile device. 
* You must be logged in to the Pantheon dashboard to configure MFA.

## Enable MFA

1. Log in to the Pantheon dashboard.
1. Click your avatar in the top-right corner and select **User Settings**, or click [this link](https://dashboard.pantheon.io/login?destination=%2Fpersonal-settings/security).
1. From the **Security** tab, click **Enable multi-factor authentication**.
1. You will receive an email to continue the enablement process.

## Disable MFA
You can turn off MFA at any time from your personal settings.

1. Log in to the Pantheon dashboard.
1. Click your avatar in the top-right corner and select **User Settings**, or click [this link](https://dashboard.pantheon.io/login?destination=%2Fpersonal-settings/security).
1. From the **Security** tab, click **Disable multi-factor authentication**.
1. Confirm your choice in the dialog that appears.

You will be logged out and prompted to log back in. You can re-enable MFA at any time.

## Reset MFA
You can reset MFA at any time from your personal settings, in the event you need to change your authenticator app or device, or any other reason.

1. Log in to the Pantheon dashboard.
1. Click your avatar in the top-right corner and select **User Settings**, or click [this link](https://dashboard.pantheon.io/login?destination=%2Fpersonal-settings/security).
1. From the **Security** tab, click **Reset multi-factor authentication**.
1. Confirm your choice in the dialog that appears.
1. An email will be sent to your account to re-enable your MFA.

## FAQs

### I lost access to my authenticator app and recovery codes, can you help me recover my account? 

If you can no longer access your authenticator app (for example, if you lost your device) and you do not have access to the recovery codes, [contact Pantheon Support](/guides/support/contact-support) for help recovering access to your account.

### The "Enable MFA" option isn't showing up?
Ensure you are viewing [User Settings](https://dashboard.pantheon.io/login?destination=%2Fpersonal-settings/security) (your personal settings) and not workspace settings. 

### Can I enforce MFA configuration at the workspace level?
Not at this time, it is configured at the user level and not enforceable at the workspace level. This is being considered for future release. For now, please consider enabling SSO/SAML for your organization.
