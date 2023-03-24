---
contenttype: [partial]
categories: []
cms: [drupal]
product: [front-end]
integration: []
tags: [--]
reviewed: ""
---

## Configure Your Site on Pantheon

The option for Front-End Sites is available in the New Dashboard after it is enabled during the customer onboarding process.

Follow the steps below to access the Front-End Site decoupled architecture and start developing the frontend application in Pantheon.

1. Log in to your **Pantheon Dashboard** and select the **Sites** page.

1. Click the **Decoupled** tab and then click **+Create New Site**.

    <Alert title="Note"  type="info" >

    You cannot use a . (period) or _ (underscore) for site and Multidev names.

    </Alert>

1. Click the option that best suits your needs under the **Decoupled Site** section on the **Site Creation** page.

1. Verify that you are using compatible versions for the associated tooling before you proceed. For example, Drupal 10, Next.js v12, etc.

### Connect your Account

You must configure your frontend to point to the backend. If your Pantheon backend is open, which it is by default, you can connect directly from your local artifact to that repository.

1. Specify the GitHub account associated with your decoupled site, and then follow the prompt to connect your Git provider.

1. Select the **GitHub** option and click **Connect**. A window for GitHub.com is displayed, and you are prompted with **“Where do you want to install Pantheon?”**

1. Select the repository that you will use to develop your decoupled site. A new page is displayed that confirms where Pantheon should be installed.

1. Specify the permission configurations and click **Install**. Your GitHub repository is now connected and you can continue with decoupled site creation on the Pantheon dashboard.