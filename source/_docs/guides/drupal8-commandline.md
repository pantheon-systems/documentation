---
title: Use the Command Line to complete Drupal Site Building Tasks with Using Terminus and Drush
description: Learn how to add modules, and manage configuration between Pantheon environments.
tags: [cli]
categories: [develop, cli]
type: guide
permalink: docs/guides/:basename/
contributors:
  - stevector
date: 2/15/2017
---

This guide will walk through using the command line to perform operations creating a new Drupal 8 site. With that site, we will add modules, create content, and move configuration between Pantheon environments. The tasks covered in this guide can all be done in the browser, without using the command line. For instance, seeing a list of all of your sites on Pantheon is easy in the browser. It is the first thing you see when signing into the Dashboard.

@TODO, add image.

You can see the same list on the command line by running:

`terminus site:list`

In essence, Terminus is a way to do on the command line everything you can do in Pantheon's browser-based dashboard. Once you are comfortable with Terminus, you may find it faster to use than the browser. Terminus also opens the door to writing scripts that combine multiple Terminus commands to accommodate whatever workflow needs you have. For more information about Terminus itself, see our [Terminus Manual](/docs/terminus/).


## Installing and authenticating with Terminus

The most reliable way to install Terminus is with our dedicated installer:

`curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar && php installer.phar install`


Once Terminus is installed, you can sign in with a [machine token generated in the Dashboard](https://dashboard.pantheon.io/machine-token/create).

`terminus auth:login --machine-token=‹machine-token›`

If you have trouble with these steps, [see our full installation documentation](https://pantheon.io/docs/terminus/install/).


## Create your site with Dev, Test, and Live environments

#### See your options for creating new sites

Pantheon offers a few choices for spinning up new sites. You can see them all with.

`terminus upstream:list`

The one we want is `Drupal 8`.

`terminus upstream:list | grep "Drupal 8"`

That command shows us the unique ID for our Drupal 8 source repository. We will copy that ID (8a129104-9d37-4082-aaf8-e6f31154644e) into the next command for creating a new site.

#### Creating the Drupal 8 site.

In this command you will need to pick both a machine name and a label for your site.

In my case, I'm picking `steve-site-d8` as my site's machine name and "Steve's Site D8" as the label. Finally, I'm adding that unique ID for the Drupal 8 source.

So the command I am running is:

`terminus site:create steve-site-d8 "My Site D8" 8a129104-9d37-4082-aaf8-e6f31154644e`

There's an additional option you can put on this command for organization ID `--org`. If you are walking through this guide as part of an in person training or if you work as part of a team that uses Pantheon, you might want to associate this site with your organization. To get your organization's ID, run `terminus org:list`. So your command might look like

`terminus site:create steve-site-d8 "My Site D8" 8a129104-9d37-4082-aaf8-e6f31154644e --org=123456-abcd-1234--abcd-1234567890`

#### Getting a link to your site's dashboard

Even though we are using the command line as much as possible, you may find it helpful to open the Pantheon Dashboard in your browser and leave it open as you walk through this guide. The dashboard will respond as you run later commands for operations like deploying code.

`terminus dashboard:view perschd8  --print`

#### Connection information

In your browser dashboard you can easily get connection information.

@todo, add image.

That same information is available in Terminus. Run this command replacing `steve-site-d8` with the name of the site you selected.

`terminus connection:info steve-site-d8.dev`

That command will show you some of the connection info. If you want to see all of the options available to you, run

`terminus connection:info --help`

Adding `--help` to any command will give you information about the options and parameters the command can use. In this case the `help` let's us know that we can specify different fields. So we can use the `--fields` to say that we want just the MySQL connection information.

`terminus connection:info steve-site-d8.dev --fields=mysql_username,mysql_host,mysql_password,mysql_url,mysql_port,mysql_database`

Or we could add the `--format` flag to specify a different format like csv or json.

`terminus connection:info steve-site-d8.dev --fields=mysql_username,mysql_host,mysql_password,mysql_url,mysql_port,mysql_database --format=json`

A more machine-processable format like json could be useful if we were writing a script that chained together multiple commands.

#### Installing Drupal

So far we have spun up the Pantheon infrastructure to hold a Drupal site. But we still haven't installed Drupal itself. If you were to go do the Dev environment in your browser, you would be prompted to install Drupal. This command will give you the URL to the Dev site. Visit it, but don't walk through the browser installation steps.

`terminus env:info steve-site-d8.dev --field=domain`

Instead, we will install Drupal using Drush, the Drupal command line utility. In this command you will see a few parameters to change.

`terminus drush  steve-site-d8.dev  -- site-install  --account-mail=my.email.address@example.com --account-name=admin397 --site-name="My Cool Site"`

Congratulations! You've installed Drupal! Use the password included in the output of that command to sign into the site with your browser. Or use this command to get a one-time login link:

`terminus drush  steve-site-d8.dev  -- user-login`

#### Using a variable for the site name

At this point you are probably tired of replacing `steve-site-d8` in every command. So let's set a variable instead. 

`export TERMINUS_SITE=steve-site-d8`

To see the variable you set run:

`echo $TERMINUS_SITE`

Now you should be able to copy the rest of the commands in the guide without editing them. For example, let's run that `connection:info` command again, this time using our `TERMINUS_SITE` variable.

`terminus connection:info $TERMINUS_SITE.dev`

#### See the file that was changed during the installation process.

Installing Drupal results in a one-line change to `settings.php`. We have to commit that change to our git repository. First use Terminus to see the fact that we have one file with an uncommitted change.

`terminus env:diffstat perschd8.dev` 



`terminus env:info perschd8.dev --field=domain`

`terminus env:commit  perschd8.dev --message="Installing Drupal"`

`terminus env:deploy perschd8.test`

`terminus env:deploy perschd8.live`

## Add a module in the Dev Environment

We are going to download and enable modules from the `devel` package. These modules are helpful while a site is under construction. You may want to remove this module after your site has launch, or use more advanced configuration management techniques to keep the module on in the Dev environment and Off in Test and Live. For this exercise on a Sandbox site it is fine to have the module on in all three environments.

#### Using Drush to download a module

`terminus drush perschd8.dev -- pm-download devel`

#### See a list of the code that was just downloaded

`terminus env:diffstat perschd8.dev` 

#### Commit the downloaded modules

`terminus env:commit  perschd8.dev --message="Adding devel module"`

This command commits the changed files to the master branch of the git repository for this site.

#### Enable the modules

`terminus drush perschd8.dev -- pm-enable devel devel_generate kint webprofiler -y`

All of these modules are helpful during active development. We we use Devel Generate later in this walkthrough to make nodes on the Live environment.

#### Sign into Drupal in the Dev environment to see the enabled modules.

`terminus drush perschd8.dev -- user-login`


## Deploying configuration changes from Dev to Test to Live

We just enabled modules on the Dev environment that are not yet present or enabled on Test or Live. To get these modules out to those environments we will first use Drush to export the configuration on Dev. We will then deploy to Test and Live and import configuration there.


#### Make sure the Dev environment is in SFTP mode

`terminus connection:set perschd8.dev sftp`

If you've been follow this walkthrough exactly, the Dev environment has remained in SFTP mode the whole time. Running the above command will flip it back in case you changed it to git mode. The file system needs to be writeable (SFTP mode) because we are about to use Drush to write a lot of configuration files to a location that is write-protected when in git mode (or on Test and Live which do not have SFTP mode)

#### Export the configuration in the Dev environment

`terminus drush perschd8.dev -- config-export -y`

[Configuration management is a complex topic with its own detailed recommendations](/docs/drupal-8-configuration-management/). For this guide, all you need to know is that by default, Drupal 8 configuration is stored in the database and can be cleanly exported to `yml` files. Once exported to files and committed to git, these configuration changes can be deployed to different environments (like Test and Live) where they can then be imported to the database.

#### Commit the changes

`terminus env:commit  perschd8.dev --message="export of config files"`

This command commits the changed files to the master branch of the git repository for this site.

#### The the list of commits you have made so far

`terminus env:code-log perschd8.dev`


#### Deploy the changes to the Test environment

`terminus env:deploy perschd8.test --sync-content --updatedb --cc  --note="Deploying exported config to enable modules"`

We are running the `env:deploy` command with the `--sync-content` flag which will bring the database down from the Live environment before deploying the code. In a real-world scenario, your content editors may have added nodes/files in the Live environment. You would want those updates present on the Test environment with your deployed code. The `--updatedb` flag runs Drupal's database update script. And `--cc` clears caches. The `--note` flag adds a message that is tied to the record of the deployment. Under the hood, Pantheon creates a git tag for each deployment. This note field is used as an annotation on the git tag.

#### Import the configuration on the Test environment

`terminus drush perschd8.test -- config-import -y`

#### Sign into Drupal in the Test environment to see the enabled modules.

`terminus drush perschd8.test -- user-login`

#### Sign into Drupal in the Live environment to see that the modules aren't there yet.

`terminus drush perschd8.live -- user-login`

You can also see the difference between the Test and Live environments with other Drush commands. The `print-module-list` command and `help` command when run on Test will show that Devel modules are enabled and have added even more Drush commands.

`terminus drush perschd8.test -- pm-list`

`terminus drush perschd8.test -- help`

On Live you won't see those commands yet.

`terminus drush perschd8.live -- pm-list`

`terminus drush perschd8.live -- help`


#### Deploy the changes to the Live environment

`terminus env:deploy perschd8.live --updatedb --cc  --note="Deploying exported config to enable modules"`

We don't need the `--sync-content` flag when going to the Live environment because that environment already has our canonical database.

#### Import the configuration on the Live environment

`terminus drush perschd8.live -- config-import -y`

Once this command completes you will be able to refresh the live environment in your browser and see the changes. TODO, can we look at devel drush commands instead?

## Pulling content changes down from the Live environment to the Dev environment

#### Make content on the Live environment

We can use a Drush command from `devel_generate` module to create 25 nodes.

`terminus drush perschd8.live  -- generate-content 25`

#### Bring down the database and media files from the Liv Environment to the Dev environment

`terminus env:clone-content  perschd8.live dev`

--Bring DB down from Live to dev.


## Combining code changes and content changes in the Test Environment before deploying to Live

#### Make another configuration change on the Dev environment

`terminus drush  perschd8.dev -- views-enable archive`

That command will enable the archive View that displays content by month. You can see it by pointing your browser to `/archive` on your dev site.

#### Export the configuration change in the Dev environment

`terminus drush  perschd8.dev -- config-export -y`

#### Commit the configuration change in the Dev environment

`terminus env:commit  perschd8.dev --message="Enabling archive View"`

#### Check the Test environment

Before we deploy our configuration change enabling the archive View to the Test environment, let's first see what the Test environment looks like. Visit `/archive` and `/admin/content` in your Test environment. You should see a 404 message for the archive page and the administrative content list should not contain the articles and pages that were made on live. Once we deploy our code in the next step, we should see something different on both URLs. 

#### Deploy the configuration change to Test

These are the same commands we ran above to deploy to Test and then import configuration from files to the database.

`terminus env:deploy perschd8.test --sync-content --updatedb --cc  --note="Deploying archive View"`

`terminus drush  perschd8.test  -- config-import -y`

#### Check the Test environment again

Sign into the Test site again. Copying down the Live database likely signed you out of the Test environment.

`terminus drush perschd8.test -- user-login`

Visit `/archive` and `/admin/content` again. You should see both the archive View and a full list of content on the administrative page.

#### Deploy to the Live environment and import the changes

`terminus env:deploy perschd8.live --updatedb --cc  --note="Deploying archive View"`

`terminus drush  perschd8.test  -- config-import -y`

With the change to the archive View deployed and imported on the Live environment you should be able to to the archive page (`/archive`) to see change.
















