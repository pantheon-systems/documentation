---
title: The Pantheon Deploy Log
description: Learn how to use the Deploy Log to manage updates, feature releases and more.
keywords: deploy, deploy log, how to deploy, deploying
---
Whether you're working on a new feature or fixing up bugs, the Deploy Log helps you group a batch of commits into a single deployment. Best practice is to keep logical groups of edits together and then summarize those groups with a single deployment message.

## Deploy to Test
The Deploys tool on the test environment enables you to deploy code from the Dev environment, while optionally cloning the the database and files from the Live Environment. The code deployment is performed by adding a git tag to the most recent commit on the Dev environment. Cloning the DB and files from the Live environment completely replaces what was in Test.

On WordPress site dashboards, cloning the content will expose an option to convert URLs from the Live environment's pattern to the Test environment's, including the protocol from HTTPS to HTTP for encrypted live environments.

Drupal site deploys come with the ability to run `update.php` after  code deploys. `hook update n` and any other necessary database updates will be made automatically on the Test environment.

## Deploy to Live
The Deploys tool in the Live environment deploys only the code from the Test environment. If you cloned the database and files from the Live environment when you deployed to Test, your Live environment will behave exactly as the Test environment did prior to the deploy. Deploys are performed by adding a git tag to the last commit on the Test environment.
All sites have the option of clearing all caches after deploying code.
Drupal sites have the option of running update.php after deploying code.
![Deploy Log Live Environment](/source/docs/assets/images/deploy-log-live-env.png)

<!--### Local Deployment with Terminus
From [Terminus](/docs/articles/local/cli/), run the following command to deploy code from Dev to Test:
```
terminus site deploy [--site=<site>] [--env=<test>] [--from=<dev>] [--cc] [--updatedb] [--note=<note>]
```
<div class="alert alert-info" role="alert">
<h4>Note</h4>
Replace <code>&lt;site&gt;</code> with your site's machine name (in the environment URL). You can see a list of all your sites by running <code>terminus sites list</code></div>


Select the environment you wish to deploy from and summarize the deployment:
```
1. dev
2. test
3. live

Choose environment you want to deploy from: 1
Custom note for the Deploy Log: Update to Drupal modules: Apache Solr Search, Apache Solr Attachments, Facet API
Working .......
Success: Woot! Code deployed to test
```
After you've tested to ensure your database content has been successfully pulled down from Live, and that no errors were introduced by the code changes pulled up from Dev, you can deploy to the live site by running the same command and selecting the desired environment.-->

## See Also
- [Using the Pantheon Workflow](/docs/articles/sites/code/using-the-pantheon-workflow)
