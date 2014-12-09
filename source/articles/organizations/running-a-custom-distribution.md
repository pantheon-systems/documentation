---
title: Running a Custom Distribution on Pantheon
category:
  - getting-started
filename: source/_guides/running-a-custom-distribution-on-pantheon.md
---

Pantheon provides support for running three types of custom distribution on the platform:

1.

**Public Distributions** - These are high quality distributions like [Commerce Kickstart](http://drupal.org/project/commerce_kickstart) or [Open Atrium](http://drupal.org/project/openatrium) which are released on drupal.org and are supported by their distribution authors for everyone to use. Public distributions are options available to all users of Pantheon as part of their site creation page.

2.

**Organizational Distributions** - These are organizational specific distributions like [OpenBerkeley](http://vcaf.berkeley.edu/initiatives/vcio-projects/open-berkeley) developed and supported for our Pantheon One customers [[data sheet](https://www.getpantheon.com/sites/default/files/Zeus%20Plan%20Datasheet.pdf)]. Organizational distributions are private to the members of each organizations.

3.

**Partner Distributions** - These are company specific distributions built and supported by our [Pantheon Partners](https://www.getpantheon.com/partners/program) for their internal development. Partner distributions are private to the members of each partner organization.

Assuming you meet the above qualification, you will need to:

1.

**Create a Repository for Pantheon** - Each distribution on Pantheon is deployed from an unique public or private git repository which is maintained by the distribution author which contains all the code needed to deploy the distribution. Many distribution authors prefer to use git hosting services like [GitHub](https://github.com/) or [Bitbucket](https://bitbucket.org/), but any git repository will do.

2.

**Use Pantheon's Drupal Core Upstream** - Pantheon maintains its own copy of both Drupal 6 and Drupal 7 core which are available at [https://github.com/pantheon-systems/drops-6](https://github.com/pantheon-systems/drops-6) or  [https://github.com/pantheon-systems/drops-7](https://github.com/pantheon-systems/drops-7) respectively and need to be used for all distributions on Pantheon. To include Pantheon's Drupal core upstream simply pull in that code by running:



**Drupal 6**  
`git pull git://github.com/pantheon-systems/drops-6.git master`  
**Drupal 7**  
`git pull git://github.com/pantheon-systems/drops-7.git master` respectively and pushing that code back out with _git push origin master_.
3.

**Add Your Distribution Code** - Each distribution should be packaged as an install profile which lives inside the /profiles folder and contains all of the necessary modules, themes, and libraries to install your distribution. Distributions can be packaged as a self contained directory by using _drush make _with the _--contrib-destination_ flag or downloaded directory from Drupal.org which [handles the packaging automatically](http://drupal.org/developing/distributions/drupalorg). All of your code should exist within a self contained directory inside /profiles, except for any needed core patches which can be applied directly.

​After following the above steps, you should have a git repository containing all of the code you need to install your distribution on Pantheon. To test this git repository on Pantheon:

1.

**Spin up a Vanilla Drupal Site** - Spin up a temporary Drupal 6 or Drupal 7 site on Pantheon which will be used for testing.

2.

**Add Code from Your Git Repository ** - Pull in the code from your git repository which will replace the existing codebase with your distribution's code. Commit this code and push it up to Pantheon.

3.

**Run Through Standard Distribution Installer** - Use the standard Drupal install process to make sure your distribution spins up cleanly on Pantheon. Testers might find it helpful to use the "wipe" functionality as part of the "workflow" tools to easily run through the install process multiple times. 

After you have a distribution that works on Pantheon, go ahead and get in [contact with us](https://www.getpantheon.com/contact) to get your distribution formally rolled onto the platform. Distribution authors will need to provide the following information:

-

**Read Access to the Git Repository** - This is the the git repository which contains the code you just set up. This can be in the form of a public URL or a private one with a username and password. It is also possible to share private URLs to use directly using our accounts on either [GitHub](http://github.com/gf-pantheon) or [Bitbucket](https://bitbucket.org/pantheon_distributions). 

-

**Information about the Distribution** - This is the information that we use to display your distribution both as part of the site creation page and on its own spinup page. At a minimum each distribution needs to provide a name and description (< 200 characters, basic HTML allowed), but we also support/encourage providing a distribution logo (70x80), promotional screenshot, name and URL of the author, and any information about what kind of support is provided (i.e. drupal.org issue queue, contact person, website).

After your distribution has been approved, it will be deployed to the platform and available as one click installs. Public distributions will be available to all users as part of site creation and organizational or partner distributions will only be available to their respective members. The one click experience looks like this:

![](https://pantheon-systems.desk.com/customer/portal/attachments/150755)

Additionally, distributions have the option of having a special standalone spinup page to which they can direct new users to spinup their distribution. As part of a unified workflow, users will create a Pantheon account, name their site, and be directed to the install page of the distribution. This experience is super cool and looks like this:

![](https://pantheon-systems.desk.com/customer/portal/attachments/150737)

Once you have a distribution running on Pantheon, you can easily take advantage of our one click update system for all of the modules, themes, and libraries you are including with your distribution:

-

**Updating Drupal Core** - Since Pantheon already maintains our own upstreams for Drupal core, you can easily pull in our updates to your distribution when a new version comes out. Just pull down the latest changes from our upstream repository by doing _git pull git://github.com/pantheon-systems/drops-6.git maste_r or _git pull git://github.com/pantheon-systems/drops-7.git master_ respectively and pushing those changes back up with _git push origin master_.

-

**Updating Your Distribution** - When you have a new release of your distribution, pushing out an update on Pantheon is as simple as making a git commit to your distribution's Pantheon git repository. After you package the new version of your distribution, replace the current packaged version in /profiles with the updated version and commit and push it up to the repository. Since the commit message you use will show to anyone using the distribution, many distribution authors include a link to a set of release notes that outline the changes and upgrade instructions for the new version.

-

**One Click to Update**  - After you have committed your update, all sites that use the distribution will be given the option to upgrade the distribution on their development dashboard. It typically takes ~30 minutes for the update to be detected, but assuming the site did not significant modify your distribution code the update can be applied immediately. Here is what the experience looks like:

![](https://pantheon-systems.desk.com/customer/portal/attachments/150756)
