---
title: Personal Settings
description: Customize and manage your personal settings.
contenttype: [doc]
innav: [true]
categories: [dashboard]
cms: [--]
audience: [development, marketing, sysadmin, agency, business]
product: [dashboard]
integration: [--]
tags: [dashboard, webops, workflow]
contributors: [wordsmither]
reviewed: "2025-12-10"
showtoc: true
---

Personal Settings help you control several key aspects of the Dashboard, and can be accessed by clicking the user gravatar in the upper right corner, then **Personal Settings**.

![A screenshot of the Personal Settings page](../images/dashboard/new-dashboard/2024/_personal-settings-profile.png)


## Profile

The user gravatar is a personalized image you can upload.  If you have not personalized your gravatar, it will appear as it does in the image below. To customize it, click **Change your Gravator**, to the right of the existing gravatar.

![The user gravatar](../images/dashboard/new-dashboard/2024/_gravatar-user.png)

You can also add your name, email address, password, country and region, or [delete your account](/guides/account-mgmt/account/delete).

### Account and Security

You can update the current email address or password associated with your Dashboard. 

#### Email

To update the email address, click **Change Email Address**. Enter the updated email address in the **New Email Address** field and click **Save Changes**.

<Alert title="Note" type="info">

Members of SSO-enabled workspaces cannot update email addresses as described above for accounts created via SAML connections. [Instead, email changes must be done via your IdP.](/guides/sso/sso-organizations#update-email-address)  

</Alert>

#### Password

To update the password, click **Change Password**. You are directed to a page where you are prompted to enter your current password and your desired new password. Enter the updated password in the **New Password** field, confirm your entry, and then click **Save Changes**.

When changing your password, make sure the new password meets the following requirements:

* At least 8 characters
* A mixture of both uppercase and lowercase letters
* A mixture of letters and numbers
* Inclusion of at least one special character. For example, use !, @, #, ?, %. Do not use < or > in your password.

You’ll need to log in again after your password is changed.

## Notifications

### Autopilot Email Notifications

You can configure email notifications for Autopilot alerts and activity digests.

<Partial file="autopilot/autopilot-email-notifications.md" />

### Email Preferences

You can manage your Pantheon marketing email preferences directly from the Dashboard to control which communications you receive from Pantheon, including newsletters, events, and product updates.

To manage your email preferences:

1. Click your user gravatar in the upper right corner.

1. Select **Personal Settings**.

1. Click the **Notifications** tab.

1. Navigate to **Email Notifications**.

1. Confirm your email address and select the categories of emails you want to receive.

1. Click **Save Changes** to save your preferences.

![Email Notifications settings in the Pantheon Dashboard](../images/dashboard/new-dashboard/2024/dashboard-email-preferences.png)

Changes take effect after clicking **Save Changes**. You can update your preferences at any time.

<Alert title="Note" type="info">

Email preferences control marketing communications only. System notifications (such as site alerts, team invitations, and billing notifications) are managed separately and cannot be disabled through this interface. For more information about system notifications, see [Platform Notifications](/platform-notifications).

</Alert>

## SSH Keys

SSH keys allow you to establish a secure connection between your computer and Pantheon. Visit the SSH Keys tab to review your existing configured keys, and add or revoke SSH keys. Follow the steps in [SSH Keys](/ssh-keys) to generate, add, and revoke SSH keys. 

## Machine Tokens

Machine tokens are used to uniquely identify your machine and securely authenticate via Terminus.

The token key will only be shown once and provides the same access as your username and password. To learn more about machine tokens, refer to the [Creating and Revoking Machine Tokens](/machine-tokens) documentation.
