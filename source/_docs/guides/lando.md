---
title: Install and Configure Lando
description: Install and Configure Lando for local development.
contributors: [alexvasquez]
type: guide
permalink: docs/guides/:basename/
---

This guide will help you get up and running with [Lando](https://thinktandem.io/lando/){.external}, an Open Source development tool intended for developers who prefer a painless, easily customizable local server environment configuration they can track in their source control repositories.

<div class="alert alert-info" role="alert" markdown="1">
#### Note {.info}
Lando does not currently provide a Graphical User Interface (GUI). Everything is managed from the command line. 
</div>

Reviewing this guide will help you:

- Understand Lando: What it is and why you should use it.
- Installing and setting up Lando as well as understanding its command line interface.
- Spin up a fresh WordPress (no Pantheon integration).
- Spinning up a fresh WordPress via the Pantheon Recipe.
- Pushing and pulling your changes to your Pantheon hosted environments.

## Understanding Lando: What it is and Why You Should Use it.

With Lando, you can create local server environments using configurations and utilities that closely mimic what you’ll actually be using in your production or staging environments. 

Lando provides great flexibility and customizability through its configuration file . If you need to downgrade to PHP 5.6 to troubleshoot an issue, no problem. If you need to install Mailhog to test email messages coming from your site without the possibility of disturbing your clients or their customers that’s also not a problem—you can spin up different sites running different versions of PHP and MySQL DBs concurrently with no fuss. Lando is easily configured to include useful utilities and libraries by modifying the configuration file _.lando.yml_ to suit your project’s needs.

Lando really shines when used with Pantheon’s hosting platform. The tight integration improves your dev workflow efficiency and makes commonly mundane tasks (such as migrating databases and codebase changes from development) a snap.

The other benefit is that if you work with a team, you can easily standardize your development workflow and processes to ensure that everyone is on the same page or tech-stack. Standardization of your workflow and processes will save you and your team time and headaches in your projects going forward.

Lando + Pantheon helps developers answer long-standing and vexing questions: How do I move my local database to dev? How do I pull the latest copy of my database from production to local setup? With Lando + Pantheon, developers now have a fully integrated process to manage their development cycle from local to production with minimal friction.

Oh, and let’s not even talk about the fact I forgot to mention WP-CLI integration!


## Before You Begin

Be sure that you have:

- An existing WordPress site on Pantheon, or [create](https://dashboard.pantheon.io/sites/create){.external} one.
- Having a working knowledge of local server environments is helpful but not entirely necessary.
- While you’re at it be sure to check out [Lando getting started guide] and [Lando CLI usage].





## Installing and Setting-up Lando

Installing Lando is straight forward. Be sure to check its [system requirements] to ensure you can proceed.

### Downloading the correct Lando release

- The latest release of Lando for your OS can be found here. Download the appropriate release for your Operating System. Currently, Debian (and various flavors of Linux), MacOS, Windows.
- Click to open the installer package. The installer has a few pre-flight checks it runs before getting started.
![alt text](https://lh6.googleusercontent.com/lMk_JxH4wD8FaI1Hch40R81MtRTWFB4pWZoFBZUORUkGPVjLgQgmIZVfREQmYSHLv7D309UgSCPupq6-_ztXtfJJJgVkt5kROxkuNTRC "Lando Installer")

Once you finish following any system prompts, the Lando installation script will work its magic and install itself on your computer.

### Getting Started
You’ll manage your Lando instances via the command line. A shortlist of useful Lando commands can be found [here]. If you ever need a refresher, simply pull up your terminal and type `lando --help` and you will find the default commands returned. The Lando command is installed globally so you can run it from anywhere within your terminal. 

<div class="alert alert-info" role="alert" markdown="1">
#### Note {.info}
It’s always a good idea to keep your projects’ site files and folders organized. Keep your website projects in separate folders from one another.
</div>

Create a separate folder to hold your Lando-powered installations rather than mixing with installs managed by other server environments.

### Installing a Local WordPress (Without Pantheon)

Getting started with Lando can be disorienting at first. Fear not, mighty developer, that’s why this documentation exists! We’ll begin by installing and spinning up a fresh WordPress without Pantheon integration.

- Open your terminal and get to the directory where you plan to run your fancy Lando WP site. 
- While in your terminal simply type `lando init`.
![alt text](https://lh4.googleusercontent.com/wSSyn5FZsxUY_03N-d5vszYVQPljZCBafwsk_kjWP4SJ62QzSvB-YaFrHwX9nZvXD3Lab5LHGEDMUt19JqgFOrBY-nU5UulHgcYYRMnJ "Install Lando to your working directory")


	You may choose to start from your current directory or you can clone from Pantheon, Github, or another remote repository, or zip file. For this step, we’ll choose Current Working Directory.  
- Next, you’ll choose WordPress as your starting recipe.
![alt text](https://lh3.googleusercontent.com/9oaWMtWpGPftZ15xrjwB9mcPpFwXNgoS5yUeafZI_hoj57dWS2LLKi6Xfc4odz1yDBfLoatRLkcWEWviyvS0saQSEMJ_BffcolQ2kigA "Install Lando to your working directory")

- For your webroot, you may press enter and Lando will spin up the site from your current directory.
- Enter the name of the site. Use something you’ll remember!

Your local site has been created but your still not done! You still need to start the app, download WordPress and then install WordPress. Sure, it’s a few steps but the command line practice is good for bone growth and keyboard-punching-dexterity.

- In your terminal type `lando start`. This starts your lando app and gives you some basic information like your Appserver URLs to access the site in your local browser of choice.
![alt text](https://lh6.googleusercontent.com/MDz4wDlDJZeEmuNwRKR7rZJStKPLvPQqUjn3kfK_oEk5c33UcO7tJxghP41IUyBnsaEudIUk5Zua5qb8QX06X5uzI86zXmJhorOXIMVS "Install Lando to your working directory")

- Then type `lando wp core download`. 

<div class="alert alert-info" role="alert" markdown="1">
#### Note {.info}
This is where we talk a little bit about WP-CLI, Lando, and You. To use WP-CLI commands in Lando, simply prefix your wp command with lando and you’re good to go, Lando will run your WP-CLI command all nice like. 
</div>

- The `lando wp core download` command downloads the current stable release of WordPress and unpacks it in your current working directory.
- Your WP configuration file still needs to be created. You can actually do this from the command line. However, we’re going to go to do this the ol’ fashioned way through the browser.
- In your browser, enter in the URL given to you above: _http://yourappname.lndo.site_. You’ll notice WordPress’s _Famous Five Minute install_ screen. 
- Click next after choosing your preferred language and click Let’s Go on the following screen.
- In Lando, for a WordPress installation without Pantheon, the Database, Username, and Password are all `WordPress` and Database Host is `database` (the database host is case-sensitive). Enter your credentials and complete the installation process!   Congrats! You now have Lando installed with WordPress!! 

<div class="alert alert-info" role="alert" markdown="1">
#### Note {.info}
You can find your site’s login details simply by typing `lando info` in your terminal.
</div>

### Installing WordPress Using the Pantheon Recipe

Using Lando with Pantheon provides a couple of key advantages: One, it closely mimics Pantheon’s tech stacks and environments for your local environment, getting you as close to a one-to-one development setup as possible. The recipe also installs [Terminus] (if you don’t already have it installed), Pantheon’s powerful web server management API. And if that wasn’t enough, you can push and pull changes directly into Lando from any of your Pantheon environments.

To use this Lando recipe you must have an account with Pantheon, which you can register for free. Also, you need to have a Pantheon hosted instance ready to go. So you can either use an existing Pantheon site or spin up a whole new one.

For the WordPress site you created in the previous section, run `lando stop` in your terminal from within that site’s directory. And create a new directory for your WordPress + Pantheon integrated environment.

- In your terminal, you may either type `lando init --source pantheon` or `lando init`. The only difference is that defining the source as pantheon allows you to skip a couple of prompts.
- Choose your Pantheon account email from the following prompt and click/press Enter. (img)
- Next, choose the Pantheon site you want to pull from to create your local site.

<div class="alert alert-info" role="alert" markdown="1">
#### Note {.info}
Lando creates your local environment, mirroring your dev environment closely, and the clones down the site’s codebase (this part of the process does not include media files in the uploads folder or the site’s database). This part will take a few minutes or so depending on the site’s size on Pantheon.
</div>

- At this point, you should run `lando start`.
- With your site started, you’ll have your local site URL so you can access it from your browser. But now you can also pull the code, media files, and the database from the site’s Pantheon environment.

### Pushing and Pulling Your Changes
Certainly, one of the most awesome benefits of using Lando with the Pantheon recipe is the ability to _push_ your changes from your local site to your various Pantheon environments (yes, including live and multi-dev instances).
To initiate a push from your local environment simply type `lando push`; conversely, type `lando pull` to perform a pull. Either action will have Lando prompt you for which environments you wish to pull/push your codebase, files, and database from or to.

<div class="alert alert-info" role="alert" markdown="1">
#### Note {.info}
Your _database_ refers to your app's database. Your _code_ refers to your app’s codebase. That is, any files that you would track within your site’s source control repository. Your _media_ refers to assets and files stored within the /uploads folder; generally speaking, it’s a good idea to NOT include your media files in your repository as your repo’s size can get out of hand quickly.
</div>

- In your terminal, type `lando pull`.
- For our purposes, you will choose dev but it’s important to note you CAN pull your files from any Pantheon environment, including multi-dev environments.
- For the next prompt, you’ll be asked where or if you want to pull the database. Again, choose _dev_.
- In the next prompt, again, choose _dev_ for files.

Lando also runs a search and replace on the database  _siteurl_ and _sitename_ table fields and replaces Pantheon’s values with your local values. 

<div class="alert alert-info" role="alert" markdown="1">
#### Note {.info}
Sometimes, it’s just a good do your own search and replace on your local site once a pull has finished. Also, it can be a good idea to run a search replace on a site on Pantheon you pushed to. Here’s how you can do both!

`lando wp search-replace 'yourpantheondevurl.com' 'yourlocalapp.lndo.site'`

-OR-

`terminus wp yourpantheonsitename.dev -- search-replace 'yourlocalapp.lndo.site' ‘yourpantheondevurl.com'`
</div>

