---
title: Fastly on Pantheon
subtitle: Connect Your Fastly Account to Pantheon
description: Learn how to connect your Fastly account to the Pantheon platform.
categories: [develop]
tags: [cms]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/fastly-pantheon/connect-fastly
anchorid: connect-fastly
---

This section provides steps on how to connect your Fastly account to your Pantheon account.

## Before You Begin

Verify that you have following before you begin:

- A registered domain name
- The ability to modify your domain's nameservers
- A paid [Pantheon plan](/site-plan#purchase-a-new-plan)
- A [Fastly account](https://www.fastly.com/signup/)

## Connect Fastly to Pantheon

Follow the steps below to connect your Fastly account to your Pantheon account.

1. Sign in to your Fastly account.

1. Create a **New Service** and set the **Origin service address** to the Pantheon sub-domain specific to your main site's Live environment. 

    - Sub-domain information can be found under the Domains/SSL tab. It should look similar to: `live-{site-name}.pantheon.io`.

1. Enter the site domain you want to serve as the root level in the **Domain Name** field.    
    
    - Note that Fastly does not serve A names, such as `site-example.com`. You must use www. Your site domain should look like this: `www.site-example.com`.

1. Click **Configure** after Fastly has finished setting up the service. 

1. Click the **Hosts** tab > click the **+ New** button and add the Pantheon sub-domain for the secondary site's Live environment.

1. Select the gear icon next to the primary content host > select **Conditions** > click the **+ New** button > complete the pop-up fields.

    - You must create a Fastly Condition for each host. Each condition let's Fastly know what traffic needs to be sent to what server. Your field entries should like this:

        - **Name:** `Main Content`
        - **Apply If...:** `req.url !~ "^/main"`
        - **Priority:** `2`

            - This tells Fastly that any URL that contains `/main` must be sent to the main server.

    
1. Select the gear icon next to the secondary content host > select **Conditions** > click the **+ New** button > complete the pop-up fields.

    - Your field entries should like this:

        - **Name:** `Blog Content`
        - **Apply If...:** `req.url ~ "^/blog"`
        - **Priority:** `2`

            - This tells Fastly that any URL that contains `/blog` must be sent to the blog content server.

1. Click **Content** > click **New** > complete the pop-up fields to create a custom header for redirected requests.

    - Your entries should look like this: 

        - **Name:** `Main_Server_Host`
        - **Type/Action:** `Request, Set`
        - **Destination:** `http.host`
        - **Source:** `live-{site-name}.pantheon.io <-- Main content server's Pantheon subdomain`
        - **Ignore If Set:** `No`
        - **Priority:** `10`

1. Click **Create** and save the new content.

1. Click the gear icon next to the **Main_Server_Host** header > select **Request Conditions** > click the **Name** drop-down menu > select the `Main_Server_Host_Condition` > click **Assign**. 

    - This assigns the `Main_Server_Host` Header to the `Main_Server_Host_Condition` and appends the header to all traffic sent to the main content server on Pantheon.

1. Click **Content** again > click **New** > complete the pop-up fields to create a second custom header for redirected requests.

    - Your entries should look like this: 

        - **Name:** `Blog_Server_Host`
        - **Type/Action:** `Request, Set`
        - **Destination:** `http.host`
        - **Source:** `live-{site-name}.pantheon.io <-- Secondary content server's Pantheon subdomain`
        - **Ignore If Set:** `No`
        - **Priority:** `10`

1. Click **Create** and save the new content.

1. Click the gear icon next to the `Main_Server_Host` header > select **Request Conditions** > click the **Name** drop-down menu > select `Blog_Server_Host_Condition` > click **Assign**. 

    - This assigns the `Main_Server_Host` Header to the `Blog_Server_Host_Condition` and appends the header to all traffic sent to the main content server on Pantheon.

## Test Your Setup

Follow the steps below to confirm that your Fastly account is working correctly with your Pantheon account.

1. Open a new browser tab and load the main URL, for example: `http://www.example-site.com/`. 

1. Verify that the website loads correctly and appends the directory that serves the second Pantheon site to the end of the main URL, for example: `http://www.example-site.com/blog/`


