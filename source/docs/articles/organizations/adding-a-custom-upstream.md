---
title: Create a Custom Upstream
description: Add and test a custom distribution of WordPress or Drupal on the Pantheon website management platform.
category:
  - managing
  - going-live
keywords: custom upstream, distribution, remote repository, upstream
---
Create a custom distribution of WordPress or Drupal and add it to the Pantheon platform. This will enable users of the affiliated organization to create sites using a specialized codebase as a starting point.

## 1. Create a Remote Repository.

Each site on Pantheon is generated from a unique public or private Git repository maintained by an upstream author and contains all the code needed to deploy the sites.

Clone the repository locally, and then pull in Pantheon's Core Upstream, or a Pantheon-compatible, publicly maintained base upstream (Drupal distributions running our drops-7 core).

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

## 2. Add Your Code.

Follow conventions for using the `/profiles` directory in Drupal. With WordPress, you can add plugins and themes to their normal locations.

Push the repository to your upstream's remote location.

```bash
git push origin master
```

## 3. Test Your Upstream.

### Create the Testing Site

Create a (core) Drupal or WordPress site associated with your partner organization that will be used for testing the upstream using [Terminus](https://github.com/pantheon-systems/cli).

```bash
terminus sites create --name=<name-of-your-custom-upstream-test>
```

[Clone the Pantheon repository](/docs/articles/local/starting-with-git/#clone-your-site-codebase).

```bash
git clone ssh://codeserver.dev.$PUUID@codeserver.dev.$PUUID.drush.in:2222/~/repository.git machine-name
```

Add code from your remote upstream repository.

```bash
git pull git://github.com/organization/upstream.git master
```

Push back to Pantheon

```bash
git push origin master
```

### Run Tests

#### Standard Site Installer

Use the standard install process to make sure your distribution installs cleanly on Pantheon. Testers might find it helpful to use the wipe functionality as part of the workflow tools to easily run through the install process multiple times.
```bash
terminus site wipe --site=<site> --env=<env>
```
<div class="alert alert-info" role="alert">
<h4>Note</h4>
Replace <code>&lt;site&gt;</code> with your site name, and <code>&lt;env&gt;</code> with the environment (Dev, Test, or Live). You can see a list of all your sites by running <code>terminus sites list</code></div>
#### Acceptance Tests

Run your automated acceptance tests, using behat, casper.js, or by manually executing user stories.

## 4. Update and Provide Pantheon with Read Access.

When testing is complete, merge any outstanding pull requests into the master branch or push to the branch you want Pantheon to clone and pull updates from. Upstreams can be public or private repositories, but this cannot change after sites are created from it.
<div class="alert alert-info" role="alert">
<h4>Note</h4>
For private repositories, grant read-access to the <code>gf-pantheon</code> user on GitHub or to the <code>pantheon_distributions</code> user on Bitbucket.</div>

## 5. Submit Product Information.

After you have a distribution that works on Pantheon, open a ticket titled "Product submission for [organization]" and include the following information about the distribution:

- Name
- Upstream URL (https)\*\*
- Upstream Branch (usually master)\*\*
- If the upstream repository is public or private\*\*
- Description (< 200 characters, basic HTML allowed)
- Logo (70x80)
- Default connection mode (SFTP or Git)
- supporting information
- Product author name and URL
- Author name and URL
- supporting information (< 200 characters, basic HTML allowed) i.e. drupal.org issue queue, support contacts, website
- Links to evidence of testing on Pantheon. This should include the testing site, test files within the repository, and test reports.

\*\* Cannot change after product creation

Public and organizational distributions must also provide a promotional screenshot for the public installation page.

As part of a unified workflow, new Pantheon users will create an account, name their site, and be directed to the install page of the distribution.
