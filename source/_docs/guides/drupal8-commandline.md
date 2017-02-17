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

This guide will walk through using the command line to perform operations creating a new Drupal 8 site.
With that site, we will add modules, create content, and move configuration between Pantheon environments.
The tasks covered in this guide can all be done in the browser, without using the command line.
For instance, seeing a list of all of your sites on Pantheon is easy in the browser.
It is the first thing you see when signing into the Dashboard.

![A list of websites in the Pantheon dashboard](/source/docs/assets/images/drupal8-commandline--dashboard-sites.png)

You can see the same list on the command line by running:

`terminus site:list`

In essence, Terminus is a way to do on the command line everything you can do in Pantheon's browser-based dashboard.
Once you are comfortable with Terminus, you may find it faster to use than the browser.
Terminus also opens the door to writing scripts that combine multiple Terminus commands to accommodate whatever workflow needs you have.
For more information about Terminus itself, see our [Terminus Manual](/docs/terminus/).

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

That command shows us the unique ID for our Drupal 8 source repository.
We will copy that ID (8a129104-9d37-4082-aaf8-e6f31154644e) into the next command for creating a new site.

#### Creating the Drupal 8 site.

In this command you will need to pick both a machine name and a label for your site.

In my case, I'm picking `steve-site-d8` as my site's machine name and "Steve's Site D8" as the label.
Finally, I'm adding that unique ID for the Drupal 8 source.

So the command I am running is:

`terminus site:create steve-site-d8 "My Site D8" 8a129104-9d37-4082-aaf8-e6f31154644e`

There's an additional option you can put on this command for organization ID `--org`. If you are walking through this guide as part of an in person training or if you work as part of a team that uses Pantheon, you might want to associate this site with your organization. To get your organization's ID, run `terminus org:list`. So your command might look like

`terminus site:create steve-site-d8 "My Site D8" 8a129104-9d37-4082-aaf8-e6f31154644e --org=123456-abcd-1234--abcd-1234567890`

#### Getting a link to your site's dashboard

Even though we are using the command line as much as possible, you may find it helpful to open the Pantheon Dashboard in your browser and leave it open as you walk through this guide. The dashboard will respond as you run later commands for operations like deploying code.

`terminus dashboard:view steve-site-d8  --print`

#### Connection information

In your browser dashboard you can easily get connection information.

![Git and MySQL connection information from the Pantheon dashboard](/source/docs/assets/images/drupal8-commandline--connection-info.png)

That same information is available in Terminus. Run this command replacing `steve-site-d8` with the name of the site you selected.

`terminus connection:info steve-site-d8.dev`

That command will show you some of the connection info. If you want to see all of the options available to you, run

`terminus connection:info --help`

Adding `--help` to any command will give you information about the options and parameters the command can use. In this case the `help` lets us know that we can specify different fields. So we can use the `--fields` to say that we want just the MySQL connection information.

`terminus connection:info steve-site-d8.dev --fields=mysql_username,mysql_host,mysql_password,mysql_url,mysql_port,mysql_database`

Or we could add the `--format` flag to specify a different format like csv or json.

`terminus connection:info steve-site-d8.dev --fields=mysql_username,mysql_host,mysql_password,mysql_url,mysql_port,mysql_database --format=json`

A more machine-processable format like json could be useful if we were writing a script that chained together multiple commands.

#### Installing Drupal

So far we have spun up the Pantheon infrastructure to hold a Drupal site. But we still haven't installed Drupal itself. If you were to go do the Dev environment in your browser, you would be prompted to install Drupal. This command will give you the URL to the Dev site. Visit it, but don't walk through the browser installation steps.

@todo, move this step after site-install

`terminus env:info steve-site-d8.dev --field=domain`

Instead, we will install Drupal using Drush, the Drupal command line utility. In this command you will see a few parameters to change.

`terminus drush steve-site-d8.dev -- site-install -y`

This command will take around 60 seconds to complete.

Congratulations! You've installed Drupal! Use the password included in the output of that command to sign into the site with your browser. Or use this command to get a one-time login link:

`terminus drush  steve-site-d8.dev  -- user-login`

#### Using a variable for the site name

At this point you are probably tired of replacing `steve-site-d8` in every command. So let's set a variable instead. 

`export TERMINUS_SITE=your-site-machine-name`

@todo, explain this better


To see the variable you set run:

`echo $TERMINUS_SITE`

Now you should be able to copy the rest of the commands in the guide without editing them. For example, let's run that `connection:info` command again, this time using our `TERMINUS_SITE` variable.

`terminus connection:info $TERMINUS_SITE.dev`

#### See the file that was changed during the installation process.

Installing Drupal results in a one-line change to `settings.php`. We have to commit that change to our git repository. First use Terminus to see the fact that we have one file with an uncommitted change.

`terminus env:diffstat $TERMINUS_SITE.dev`

#### Commit the file

`terminus env:commit $TERMINUS_SITE.dev --message="Installing Drupal"`

This command will commit change to `settings.php` to the master branch of the git repository for this site. The master branch is permanently tied to the Dev environment on Pantheon. The `--message flag` is the git commit message.

#### Create the Test environment

Now that we have Drupal installed in the Dev environment an our code fully committed to the master branch, we can deploy our site to the Test environment.

`terminus env:deploy $TERMINUS_SITE.test`

#### Create the Live environment

`terminus env:deploy $TERMINUS_SITE.live`

## Add a module in the Dev Environment

@todo, explain Drush here. `help` and `--`

We are going to download and enable modules from the `devel` package. These modules are helpful while a site is under construction. You can read more about [this package of modules on drupal.org](https://www.drupal.org/project/devel). You may want to remove these modules after your site has launch, or use more advanced configuration management techniques to keep the module on in the Dev environment and off in Test and Live. For this exercise on a Sandbox site, it is fine to have the modules installed in all three environments.

#### Using Drush to download a module

We can use a Drush command to download the latest stable release of the `devel` package from drupal.org.

`terminus drush $TERMINUS_SITE.dev -- pm-download devel`

You may have heard that some Drupal 8 developers are [using Composer](https://pantheon.io/docs/composer-drupal-8/) to manage all modules. You can even use our [Terminus Composer plugin](https://github.com/pantheon-systems/terminus-composer-plugin) to run Composer commands on your Dev environment. However, for this guide we will stick to simply downloading modules with Drush.

#### See a list of the code that was just downloaded

`terminus env:diffstat $TERMINUS_SITE.dev` 

#### Commit the downloaded modules

`terminus env:commit  $TERMINUS_SITE.dev --message="Adding devel module"`

#### Enable the modules

`terminus drush $TERMINUS_SITE.dev -- pm-enable devel devel_generate kint webprofiler -y`

All of these modules are helpful during active development. We use Devel Generate later in this walkthrough to make nodes on the Live environment.

#### Sign into Drupal in the Dev environment to see the enabled modules.

If you haven't done so yet, sign into your Dev environment where you will see a footer of helpful development information provided by the `webprofiler` module we just installed.

`terminus drush $TERMINUS_SITE.dev -- user-login`


![The webprofiler toolbar](/source/docs/assets/images/drupal8-commandline--webprofiler.png)


## Deploying configuration changes from Dev to Test to Live

We just enabled modules on the Dev environment that are not yet present or enabled on Test or Live. To get these modules out to those environments we will first use Drush to export the configuration on Dev from the database to the file system. We will then deploy code to Test and Live and import configuration to the databases in those environments.

#### Make sure the Dev environment is in SFTP mode

`terminus connection:set $TERMINUS_SITE.dev sftp`

If you've been following this walkthrough exactly, the Dev environment has remained in SFTP mode. Running the above command will flip it back in case you changed it to git mode. The file system needs to be writeable (SFTP mode) because we are about to use Drush to write a lot of configuration files to a location that is write-protected when in git mode (or on Test and Live which do not have SFTP mode).

#### Export the configuration in the Dev environment

`terminus drush $TERMINUS_SITE.dev -- config-export -y`

[Configuration management is a complex topic with its own detailed recommendations](/docs/drupal-8-configuration-management/). For this guide, all you need to know is that by default, Drupal 8 configuration is stored in the database and can be cleanly exported to `yml` files. Once exported to files and committed to git, these configuration changes can be deployed to different environments (like Test and Live) where they can then be imported to the database.

#### Commit the changes

`terminus env:commit  $TERMINUS_SITE.dev --message="export of config files"`

#### See the code commits made so far

`terminus env:code-log $TERMINUS_SITE.dev`

#### Deploy the changes to the Test environment

`terminus env:deploy $TERMINUS_SITE.test --sync-content --updatedb --cc  --note="Deploying exported config to enable modules"`

We are running the `env:deploy` command with the `--sync-content` flag which will bring the database down from the Live environment before deploying the code. In a real-world scenario, your content editors may have added nodes and files in the Live environment. You would want those updates present on the Test environment with your deployed code. The `--updatedb` flag runs Drupal's database update script. And `--cc` clears caches. The `--note` flag adds a message that is tied to the record of the deployment. Under the hood, Pantheon creates a git tag for each deployment. This note field is used as an annotation on the git tag. To see the tag that was just created.

#### Import the configuration on the Test environment

With the `yml` configuration files now present on the Test environment, they can be imported to the database there:

`terminus drush $TERMINUS_SITE.test -- config-import -y`

#### Sign into Drupal in the Test environment to see the enabled modules.

`terminus drush $TERMINUS_SITE.test -- user-login`

#### Sign into Drupal in the Live environment to see that the modules aren't there yet.

`terminus drush $TERMINUS_SITE.live -- user-login`

Now that you are signed into all three environments you should be seeing the development footer in Dev and Test but not Live.

You can also see the difference between the environments with other Drush commands. The `print-module-list` command and `help` command when run on Test will show that Devel modules are enabled and have added even more Drush commands.

`terminus drush $TERMINUS_SITE.test -- pm-list`

`terminus drush $TERMINUS_SITE.test -- help`

On Live you won't see those modules or commands yet.

`terminus drush $TERMINUS_SITE.live -- pm-list`

`terminus drush $TERMINUS_SITE.live -- help`


#### Deploy the changes to the Live environment

`terminus env:deploy $TERMINUS_SITE.live --updatedb --cc  --note="Deploying exported config to enable modules"`

We don't need the `--sync-content` flag when going to the Live environment because that environment already has our canonical database.

#### Import the configuration on the Live environment

`terminus drush $TERMINUS_SITE.live -- config-import -y`

Once this command completes you will be able to refresh the Live environment in your browser and see the development footer.

## Pulling content changes down from the Live environment to the Dev environment

In the lifecycle of managing a site, you can expect content editors to add new material to the Live environment. You may need this fresh command in your Development environment.

#### Make content on the Live environment

Since you are signed into the Live environment, you can manually make content by browsing to `/node/add`. We can also use a Drush command from `devel_generate` module to create some number of nodes.

`terminus drush $TERMINUS_SITE.live  -- generate-content 25`

Including "25" at the end of that command gives us 25 nodes.

#### Bring down the database and media files from the Liv Environment to the Dev environment

`terminus env:clone-content  $TERMINUS_SITE.live dev`

We are cloning content from `live` to `dev`.

## Combining code changes and content changes in the Test Environment before deploying to Live

#### Make another configuration change on the Dev environment

`terminus drush  $TERMINUS_SITE.dev -- views-enable glossary`

That command will enable the glossary View that displays content by month. You can see it by pointing your browser to `/glossary` on your Dev site.

#### Export the configuration change in the Dev environment

`terminus drush  $TERMINUS_SITE.dev -- config-export -y`

#### Commit the configuration change in the Dev environment

`terminus env:commit  $TERMINUS_SITE.dev --message="Enabling glossary View"`

#### Check the Test environment

Before we deploy our configuration change enabling the glossary View to the Test environment, let's first see what the Test environment looks like. Visit `/glossary` and `/admin/content` in your Test environment. You should see a 404 message for the glossary page and the administrative content list should not contain the articles and pages that were made on live. Once we deploy our code in the next step, we should see something different on both URLs.

#### Deploy the configuration change to Test

These are the same commands we ran above to deploy to Test and then import configuration from files to the database.

`terminus env:deploy $TERMINUS_SITE.test --sync-content --updatedb --cc  --note="Deploying glossary View"`

`terminus drush  $TERMINUS_SITE.test  -- config-import -y`

#### Check the Test environment again

Sign into the Test site again. Copying down the Live database likely signed you out of the Test environment.

`terminus drush $TERMINUS_SITE.test -- user-login`

Visit `/glossary` and `/admin/content` again. You should see both the glossary View and a full list of content on the administrative page.

#### Deploy to the Live environment and import the changes

`terminus env:deploy $TERMINUS_SITE.live --updatedb --cc  --note="Deploying glossary View"`

`terminus drush  $TERMINUS_SITE.test  -- config-import -y`

With the change to the glossary View deployed and imported on the Live environment you should be able to see the glossary page (`/glossary`).

