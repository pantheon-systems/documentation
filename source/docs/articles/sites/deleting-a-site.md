---
title: Deleting a Site on Pantheon
description: Detailed information on how to remove a Drupal or WordPress site from Pantheon.
category:
  - managing
keywords: delete site, deleting a site, how to delete a pantheon site, how to remove a pantheon site, delete pantheon site, delete my site, delete sites
---
At some point, you may need or want to delete one of your sites on Pantheon. The number of free sites you can create is increased after a free site is deleted, or after it has converted to a paid plan.

<div class="alert alert-danger" role="alert">
<h4>Warning</h4>
This action is permanent and irreversible. Export any needed content, code, or files from the site before starting this operation.
</div>

## Delete a Site Using the Pantheon Site Dashboard
1. Select **Settings** > **Delete Site**.
2. Click the **Delete Site** button.
3. Enter the site title; this ensures you're aware of the site you're deleting.
4. Click **I understand the consequences, delete this site**.

## Delete a Site with Terminus
Run the following [Terminus](/docs/articles/local/cli/) command:
`terminus site delete --site=<site>`

<div class="alert alert-info" role="alert">
<h4>Note</h4>
Replace <code>&lt;site&gt;</code> with your site name. You can see a list of all your sites by running <code>terminus sites list</code>.</div>

## Delete a Site From the Organization Dashboard

1. Select the checkbox next to the site you want to delete.
2. Click **Operations**, and select **Delete Site**.
3. Type **Delete**.
4. Click **I understand the consequences, Delete these sites**.
