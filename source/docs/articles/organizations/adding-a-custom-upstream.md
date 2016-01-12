---
title: Create a Custom Upstream
description: Add and test a custom distribution of WordPress or Drupal on the Pantheon website management platform.
category:
  - managing
  - going-live
keywords: custom upstream, distribution, remote repository, upstream
---
Create a custom distribution of WordPress or Drupal and add it to the Pantheon platform. This will enable users of the affiliated organization to create sites using a specialized codebase as a starting point.

<div class="alert alert-info" role="alert">
<h4>Note</h4>
Custom upstreams are available to the "Partner" and "Strategic Partner" tiers in Pantheon's Partner program. <a href="https://pantheon.io/docs/articles/organizations/pantheon-for-agencies/#create-your-agency-profile">Create your agency profile</a> to get started and see our <a href="https://pantheon.io/sites/default/files/Partner_Program_Guide_2015.pdf">Partner Program Guide</a> for information on how to advance to Partner tiers.</div>

## Create a Remote Repository

Create a remote repository and clone it locally, then pull the applicable Pantheon compatible upstream:

**Drupal 6**

```bash
git pull git://github.com/pantheon-systems/drops-6.git master
```

**Drupal 7**

```bash
git pull git://github.com/pantheon-systems/drops-7.git master
```

**WordPress**

```bash
git pull git://github.com/pantheon-systems/WordPress.git master
```

**Public Drupal Distribution Examples**

```bash
git pull git://github.com/phase2/openatrium-drops-7.git master
```

```bash
git pull git://github.com/populist/panopoly-drops-7.git master
```

## Add Your Code

Follow conventions for using the `/profiles` directory in Drupal. With WordPress, you can add plugins and themes to their normal locations.

Push the repository to your upstream's remote location.

```bash
git push origin master
```

## Test Your Upstream

### Create the Testing Site

Create a vanilla Drupal or WordPress site associated with your partner organization so you can test the upstream using [Terminus](/docs/articles/local/cli/):

```bash
terminus sites create --site=<name-of-your-custom-upstream-test>
```

[Clone the Pantheon repository](/docs/articles/local/starting-with-git/#clone-your-site-codebase):

```bash
git clone ssh://codeserver.dev.$PUUID@codeserver.dev.$PUUID.drush.in:2222/~/repository.git machine-name
```

Add code from your remote upstream repository:

```bash
git pull git://github.com/organization/upstream.git master
```

Push back to Pantheon:

```bash
git push origin master
```

### Testing

#### Complete Site Installation

Visit the Development site URL and complete the site installation process to make sure your distribution installs cleanly.

Testers might find it helpful to use the wipe functionality as part of the workflow tools to easily run through the install process multiple times:
```bash
terminus site wipe --site=<site> --env=<env>
```
<div class="alert alert-info" role="alert">
<h4>Note</h4>
Replace <code>&lt;site&gt;</code> with your site name, and <code>&lt;env&gt;</code> with the environment (Dev, Test, or Live). You can see a list of all your sites by running <code>terminus sites list</code></div>


#### Acceptance Tests

Run your automated acceptance tests, using behat, casper.js, or by manually executing user stories.

## Update and Provide Pantheon with Read Access

When testing is complete, merge any outstanding pull requests into the master branch or push to the branch you want Pantheon to clone and pull updates from. Upstreams can be public or private repositories, but this cannot change after sites are created from it.
<div class="alert alert-info" role="alert">
<h4>Note</h4>
For private repositories, create a dedicated user with read-only access to the repository.</div>

## Submit Product Information

After you have a distribution that works on Pantheon, open a ticket titled "Product submission for [organization]" and include the following information about the distribution:

- Name
- Upstream URL (https)\*\*
- Upstream Branch (usually master)\*\*
- If the upstream repository is public or private\*\*
- Description (< 200 characters, basic HTML allowed)
- Logo (70x80)
- Default connection mode (SFTP or Git)
- Product author name and URL
- Author name and URL
- Supporting information (< 200 characters, basic HTML allowed) i.e. drupal.org issue queue, support contacts, website
- Links to evidence of testing on Pantheon. This should include the testing site, test files within the repository, and test reports.

<div class="alert alert-info" role="alert">
<h4>Note</h4>
You are not able to switch upstreams after creating a site. You will need to export your files, create a new site, and select a new upstream.</div>

Public and Organizational distributions must also provide a promotional screenshot for the public installation page.

As part of a unified workflow, new Pantheon users will create an account, name their site, and then go to the installation page of the distribution.
