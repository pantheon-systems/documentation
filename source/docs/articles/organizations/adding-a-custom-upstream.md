---
title: Adding a Custom Upstream
description: Add and test a custom version of WordPress or Drupal.
category:
  - managing
  - going-live

---

By following this guide, you'll go from creating a custom version of WordPress or Drupal, to having it ready for us to add to the platform for members of your organization to spin up.

## 1. Create a Remote Repository.

Each site on Pantheon is generated from a unique public or private Git repository maintained by an upstream author and contains all the code needed to deploy the sites.

Clone the repository locally, and then pull in Pantheon's Core Upstream, or a Pantheon-compatible, publicly maintained base upstream (Drupal distributions running our drops-7 core).

**Drupal 6**

`git pull git://github.com/pantheon-systems/drops-6.git master`

**Drupal 7**

`git pull git://github.com/pantheon-systems/drops-7.git master`

**WordPress**

`git pull git://github.com/pantheon-systems/WordPress.git master`

**Public Drupal Distribution Examples**

`git pull git://github.com/phase2/openatrium-drops-7.git master`

`git pull git://github.com/populist/panopoly-drops-7.git master`

## 2. Add Your Code.

Follow conventions for using the /profiles directory in Drupal. With WordPress, you can add plugins and themes to their normal locations.
Push the repository to your upstreamâ€™s remote location.

`git push origin master`

## 3. Test Your Upstream.

### Create the Testing Site

Create a (core) Drupal or WordPress site on Pantheon that will be used for testing the upstream.

`drush psite-create upstream-test`

Upgrade the site plan to Business to enable Multidev and multiple app-servers on Live for testing.

Clone down the Pantheon repository.

`git clone
 ssh://codeserver.dev.$PUUID@codeserver.dev.$PUUID.drush.in:2222/~/repository.git
 machine-name`

Add code from your remote upstream repository.

`git pull git://github.com/organization/upstream.git master`

Push back to Pantheon

`git push origin master`

### Run Tests

#### Standard Site Installer

Use the standard install process to make sure your distribution spins up cleanly on Pantheon. Testers might find it helpful to use the wipe functionality as part of the workflow tools to easily run through the install process multiple times. Terminus command: `drush psite-ewipe $UUID dev`

#### Acceptance Tests

Run your automated acceptance tests, using behat, casper.js, or by manually executing user stories.

## 4. Update and Provide Pantheon with Read Access.

When testing is complete, merge your pull requests into or git push to the branch you want Pantheon to clone and pull updates from. Upstreams can be public or private repositories, but this cannot change after sites are created from it. For private repos, grant read-access to the gf-pantheon user on GitHub or to the pantheon\_distributions user on Bitbucket.

## 5. Submit Product Information.

After you have a distribution that works on Pantheon, open a ticket from the testing site or Pantheon One support tab, titled "Product submission for [organization]"" and include the following information about the distribution:

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

Public and organizational distributions must also provide a promotional screenshot for the public spinup page.

As part of a unified workflow, new Pantheon users will create an account, name their site, and be directed to the install page of the distribution.
