---
title: The Pantheon Deploy Log
description: Learn how to use the Deploy Log to manage updates, feature releases and more.
keywords: deploy, deploy log, how to deploy, deploying
---
Whether you're working on a new feature, or fixing up bugs, the Deploy Log helps you group a batch of commits into a single deployment. Best practice is to keep logical groups of edits together and then summarzie those groups with a single deployment message.

**Examples**:

- Fix for issue-12345
- New feature: User Bio Fields
- Update contrib modules to 2.x experimental branches
- Verified passes user acceptance tests
## Deploy to Test
Each site on Pantheon comes with three environments: Dev, Test, and Live. The Deploy Log found on the Test environment allows you to push code up from Dev, and pull content down from Live. You can also convert the URL protocol from HTTPS to HTTP for encrypted sites.
## Deploy to Live
The Deploy Log within the Live environment pushes your staging area from the Test environment and immediately updates your live website. This means no more surprises when it comes to deploying new features and updates.
![Deploy Log Live Environment](/source/docs/assets/images/deploy-log-live-env.png)
### Local Deployment with Terminus
[Terminus](https://github.com/pantheon-systems/cli), the Pantheon CLI, allows you to complete jobs in the Pantheon dashboard from a terminal, including deployment. After completing a batch of edits locally, and committing those changes via [Git](/docs/articles/local/starting-with-git), run the following command to deploy code from Dev to Test:
```
terminus site deploy --site=<site>
```
<div class="alert alert-info" role="alert">
<strong>Note</strong>: Replace <code>&lt;site&gt;</code> with your site name. You can see a list of all your sites by running <code>terminus sites list</code></div>
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
After you've tested to ensure your database content has been successfully pulled down from Live, and that no errors were introduced by the code changes pulled up from Dev, you can deploy to the live site by running the same command and selecting the desired environment.

## See also
- [Using the Pantheon Workflow](/docs/articles/sites/code/using-the-pantheon-workflow)
