---
title: Use the Command Line to Create a WordPress Site Using Terminus and WP-CLI
description: Learn how to install and use Terminus and WP-CLI to control a WordPress site on Pantheon
authors:
  - bmackinney
  - calevans
date: 2/25/2015
---
Many developers feel more at home at the command line than they do using a GUI. Edit a text file, issue a command, and bang—you've completed your task. There's just something about doing it all from the command line that makes it a little more exciting.

Until recently, WordPress didn't have a great answer for developers who are most at home on the CLI.

WP-CLI is a tool used to manage a WordPress installation. However, don't think of it as a simple backup or search and replace tool. Yes, it can do those things, but it's so much more than that. This guide will walk you through creating and configuring a site using WP-CLI and Pantheon's own CLI, called Terminus.

## Before You Begin

Be sure that you:

- Are familiar with your operating system's command line.
- Are using a Unix-based system (Linux or Mac OS X). Windows commands may vary slightly.
- Have created a [Pantheon account](https://dashboard.pantheon.io/register). Pantheon accounts are always free for development.

## Install Terminus
To use WP-CLI to manage your WordPress powered site hosted on Pantheon, you first need to install Pantheon's command line tool, Terminus. Terminus gives you access to your Pantheon account and sites, and allows you to execute WP-CLI commands on those sites. To install terminus, follow the [basic installation instructions](https://github.com/pantheon-systems/cli/wiki/Installation).

Once installed, test it using the following command:

```
$ terminus art
```

![The Pantheon logo represented in ASCII art](/source/docs/assets/images/command-line-terminus-art.png)

If you see the Pantheon lightning fist, you'll know that terminus is installed properly.

## Log In to Pantheon

Now we need to tell terminus who you are. You can do that with the `auth` command:

```nohighlight
$ terminus auth login your@email.tld
Your dashboard password (input will not be shown):
Logging in as brian@pantheon.io
Saving session data

```

You'll need to enter your password. If you are scripting a process, use the ``--password`` argument. You'll know it's successful when you see the Pantheon logo.

## Create Your Site

Open a browser and log in to your Pantheon Dashboard so you can see the progress being made on some of the commands.

Creating a site is a function of the Pantheon API, not WP-CLI; however, Terminus handles both for us.

```nohighlight
$ terminus sites create
Human readable label for the site: WP Elevation Webinar
Machine name of the site; used as part of the default URL [ if left blank will be wpelevationwebinar]: wpe-webinar

1. None

Choose organization: 1

1. Awesome Codebase
2. Backdrop
3. Community Media Starter Kit
4. CiviCRM Starter Kit
5. Commerce Kickstart
6. DKAN
7. Drupal 6
8. Drupal 7
9. Drupal 8 Beta
10. Introduction to Theming Basics for Drupal 7
11. FreakPress
12. Mukurtu CMS
13. Open Academy
14. Open Atrium 2
15. Open Outreach
16. OpenAid
17. OpenIdeaL
18. OpenPublic
19. OpenPublish
20. OpenScholar
21. Panopoly
22. Plato Típico
23. Pushtape
24. Restaurant
25. University of Texas at Austin Distribution
26. WordPress

Select one: 26
Creating new WordPress installation ...
working .............................
Success: Pow! You created a new site!
$
```
To create a site with one command, you need
- **Upstream ID:** an internal Pantheon UUID for the different systems that you can install. WordPress on Pantheon is `e8fe8550-1ab9-4964-8838-2b9abdccf4bf`. To see all products, `$ terminus upstreams list`.
- **Site Name:** A machine-readable name, that will become a part of your environments' URLs. `--site=cli-test` will yield a Pantheon development environment URL of `http://dev-cli-test.pantheonsite.io`. This name will also be used in all terminus commands against the site, so it's a good idea to keep it short. The site name must be unique on Pantheon.
- **Label:** A human-readable name, used to label your site on the Pantheon Dashboard. Can contain capital letters and spaces.
- **Organization ID:** The UUID of the organization that will own the site.

The format for creating a site with a single command is:

```nohighlight
$ terminus sites create [--upstream=<upstreamid>] \  
                        [--site=<name>] \  
                        [--label=<label>] \  
                        [--org=<id>] \    
```

For my test site, I used the following:  
**Upstream** = WordPress
**Site Name** = cli-test  
**Label** = Command Line Test

```nohighlight
$ terminus sites create --upstream=e8fe8550-1ab9-4964-8838-2b9abdccf4b \  
                        --site=cli-test \  
                        --label="Command Line Test" \  
                        --org=YOUR-ORG-ID \  
```
**Note:** Copying this command will fail, because the site name is now taken. Choose a different name for your test.

Just like when you create a site from your Dashboard, this will only take a few minutes. You will see a status bar as terminus creates your new WordPress installation. Once complete, you will be notified that you site is ready to go.

From terminus, you can get to your Site Dashboard with `$ terminus site dashboard --site=<site-name>`

## Install WordPress

Now that WordPress code is there, it's time for step five of the "[Famous 5-minute  Install](http://codex.wordpress.org/Installing_WordPress#Famous_5-Minute_Install)". Steps 1-4 were completed for you by Pantheon, and you don't need anything but the command line to finish. There's even a wp-config.php already created and ready to use.

All you need to do now is populate the database and your site will be ready to use. Using Terminus and WP-CLI running on the server, use the ``wp core install`` command. For this to work, it's necessary that you understand the [wp-cli core install](http://wp-cli.org/commands/core/install/) command. The format is:

```nohighlight
$ terminus wp 'core install --url=the.url.of.your.dev.site \
                           --title="Command Line Test Site" \
                           --admin_user=admin --admin_password=something_incredibly_secure \  
                           --admin_email=your@emailaddress.tld'
                           --site=the-name-of-your-site \
```

Before this command will work though, you need one critical piece of information: the URL for your new site. Lucky for us, that is not difficult to find if you understand a little about Terminus.

Terminus has many great commands that allow you to manage all aspects of the sites built on Pantheon, and one of those commands is the `site` command.

```nohighlight
$ terminus site
```

If you execute the `site` command by itself it will list all of the sub-commands you can issue to control a specific site. One of those subcommands is `hostname`, which lists the hostname for a given site and environment. To specify the site you want a hostname for, use the `--site` option. Throughout Terminus, when a command needs to be executed on a single site, you specify that site with `--site` and then the name of your site. This is the same name that you created using `sites create` two steps above.

As you know, every website built on Pantheon has a minimum of three environment, Dev, Test, and Live. Most sub-commands of `site` require that you let Terminus know which environment you want the command run in. If you fail to specify it, Terminus will ask you to select one before it executes. You can specify which environment you want to work on with the `--env` option.

Now armed with this knowledge, you can see that with a little bash magic you can use Terminus to get the URL of your site:

```bash
$ echo "http://`terminus site hostnames list --site=cli-test --env=dev --bash | awk '{print $1}`"
```

With the URL for your site, you can execute the `wp core install` command and complete the example above.

To populate the database of the site you created, use the following command:

```nohighlight
$ terminus wp 'core install
                           --url=http://dev-cli-test.pantheonsite.io \
                           --title="WP-CLI Test" \
                           --admin_user=admin \
                           --admin_password=pantheon.rocks \
                           --admin_email="cal@pantheon.io"'
                           --site=cli-test \
```
The same command shown on a single line:
```nohighlight
terminus wp 'core install --url=http://dev-cli-test.pantheion.io --title="WP-CLI-Test" --admin_user=admin --admin_password=pantheon.rocks --admin_email=cal@pantheon.io' --site=cli-test
```
If everything goes as planned you'll see this message:
```bash
Success: WordPress installed successfully.
```

Now go to your Dev environment
```bash
$ open http://dev-cli-test.pantheonsite.io/wp-admin
```
Log in using the username and password you set in the `wp core install` command. You've got a speedy WordPress admin ready to start developing!

There's not much to see at this point since we've only just created the site. However, click **Visit Development Site**, and you'll see a WordPress install ready for you to start creating your site.

Return to the terminal, we don't need no stinking mouse.

## Prepare for Development

I use a few plugins on every site, but  [WP-CFM](https://github.com/forumone/wp-cfm) is the most important. It allows me to track configuration changes, export them to code, deploy them as code, and import the config to my database without disrupting the content coming into the **Live Environment**. For more information on using WP-CFM on Pantheon, please see our article on [WordPress Configuration Management](/docs/articles/wordpress/configuration-management-plugin).
```nohighlight
$ terminus wp 'plugin install --activate' --site=cli-test --env=dev
```
Results in
```bash
Running wp plugin install wp-cfm --activate=1  on cli-test-dev
Installing WP-CFM (1.3.1)
Downloading install package from https://downloads.wordpress.org/plugin/wp-cfm.zip...
Using cached file '/srv/bindings/17e08f1b8e1e465faae9927bb3e20730/.wp-cli/cache/plugin/wp-cfm-1.3.1.zip'...
Unpacking the package...
Installing the plugin...
Plugin installed successfully.
Activating 'wp-cfm'...
Success: Plugin 'wp-cfm' activated.
```

Now I can [use WP-CFM](/docs/articles/wordpress/configuration-management-plugin) to create a bundle that will track my configurations and export them to code.

If you have the **Site Dashboard** open, you'll see the 19 files with changes ready to commit in a yellow box. You can expand that to see which files changed and commit through the UI, or use `$ terminus site code diffstat` and `$ terminus site code commit`

```nohighlight
$ terminus site code diffstat --site=cli-test --env=dev
+---------------------------------------------------------------------------------+-----------+--------+-----------+
| File                                                                            | Deletions | Status | Additions |
+---------------------------------------------------------------------------------+-----------+--------+-----------+
| wp-content/plugins/wp-cfm/languages/wpcfm.po                                    | 0         | A      | 79        |
| wp-content/plugins/wp-cfm/includes/class-wp-cli.php                             | 0         | A      | 79        |
| wp-content/plugins/wp-cfm/assets/js/multiple-select/jquery.multiple.select.js   | 0         | A      | 484       |
| wp-content/plugins/wp-cfm/README.md                                             | 0         | A      | 70        |
| wp-content/plugins/wp-cfm/assets/css/admin.css                                  | 0         | A      | 186       |
| wp-content/plugins/wp-cfm/assets/js/multiple-select/multiple-select.png         | -         | A      | -         |
| wp-content/plugins/wp-cfm/includes/class-readwrite.php                          | 0         | A      | 294       |
| wp-content/plugins/wp-cfm/assets/js/pretty-text-diff/diff_match_patch.js        | 0         | A      | 49        |
| wp-content/plugins/wp-cfm/includes/class-helper.php                             | 0         | A      | 133       |
| wp-content/plugins/wp-cfm/assets/js/multiple-select/multiple-select.css         | 0         | A      | 190       |
| wp-content/plugins/wp-cfm/readme.txt                                            | 0         | A      | 132       |
| wp-content/plugins/wp-cfm/assets/js/pretty-text-diff/jquery.pretty-text-diff.js | 0         | A      | 71        |
| wp-content/plugins/wp-cfm/assets/js/admin.js                                    | 0         | A      | 189       |
| wp-content/plugins/wp-cfm/templates/page-settings.php                           | 0         | A      | 122       |
| wp-content/plugins/wp-cfm/includes/integrations/custom-field-suite.php          | 0         | A      | 170       |
| wp-content/plugins/wp-cfm/wp-cfm.php                                            | 0         | A      | 182       |
| wp-content/plugins/wp-cfm/includes/class-options.php                            | 0         | A      | 42        |
| wp-content/plugins/wp-cfm/includes/class-ajax.php                               | 0         | A      | 86        |
| wp-content/plugins/wp-cfm/includes/class-registry.php                           | 0         | A      | 111       |
+---------------------------------------------------------------------------------+-----------+--------+-----------+
```
Only the expected changes are reported. Let's commit.
```nohighlight
$ terminus site code commit --site=cli-test --env=dev \
                            --message="Install wp-cfm plugin"
                            Commit 1 changes? [y/n] y
                            Success: Successfully commited.
                            +---------------------+-----------------+-----------+------------------------------------------+---------------------------------------------------+
                            | Time                | Author          | Labels    | Hash                                     | Message                                           |
                            +---------------------+-----------------+-----------+------------------------------------------+---------------------------------------------------+
                            | 2015-02-12T22:22:45 | Brian MacKinney | dev       | a6ea17f55d6022bb4d9ad4c9deacc79c1b4e29c7 | Install wp-cfm plugin
```


## Customize Your Site
Now that you have a stock WordPress install, let's make it look a little better. WP-CLI can do a number of things to manipulate a WordPress site. The best sites are the ones with images, but sadly the stock WordPress installation doesn't come with any. Let's add some.

### Add Images
Using WP-CLI gives us the ability to upload images and modify posts. In this case, you can do both at once. The following command will add a featured image to the Hello Word post that WordPress installs automatically.

You can see the full documentation for `media import` on the [wp-cli media import documentation page](http://wp-cli.org/commands/media/import/). Since you're using the `--featured_image` flag, you also need to pass the `post_id`. You can pass in either the URL of an image or a local filename to `media import.` Understand that in this case, "local" means it's already uploaded to your site. Our command to upload an image and set it as the featured image of post #1 looks like this:
```
$ terminus wp 'media import https://farm8.staticflickr.com/7355/16204225167_1e1bb198e5_b.jpg \
           --post_id=\"1\" \  
           --featured_image'  \  
           --site=cli-test  
```

After a successful upload you'll see this message:

```
Success: Imported file https://farm8.staticflickr.com/7552/15827270506_ce62e709c9_o_d.jpg
as attachment ID 3 and attached to post 1 as featured image.
```
You can see the full documentation for `media import` on the [wp-cli media import documentation page](http://wp-cli.org/commands/media/import/). Since you're using the `--featured_image` flag, you also need to pass the `post_id`. You can pass in either the URL of an image or a local filename to `media import`. In this case, "local" means it's already uploaded to your site.

Go to your browser and refresh your WordPress website's front page to see the new image.

### Install and Add a New Theme

So far, so good. Many will stop there and start updating the content. There is one more thing we need to do to make this site more appealing, and that is to add a better looking theme. Once again, you can do this all without touching WordPress or your Pantheon Dashboard.

WordPress has a plethora of free and paid themes you can install to customize your site. We've chosen one from the [WordPress.org Themes Repository](https://WordPress.org/themes/) named [Pinboard](https://WordPress.org/themes/pinboard).
**Note:** There is no need to download the theme first, WP-CLI will pull it for us from WordPress.org.

Position your Pantheon Dashboard window where you can see it while working in the terminal. To install and activate the new theme on your site, use the following command:


```nohighlight
$ terminus wp 'theme install --activate' \
                            --site=cli-test pinboard
```

Watch your Dashboard. It recognizes your uncommitted changes.

![Screenshot of the pantheon dashboard showing uncommitted changes](/source/docs/assets/images/pantheon-dashboard-uncommitted-changes.png)

We can commit the changes to your site's repo with Terminus. First, make sure that you position your browser so that you can see it while in your terminal. As soon as you issue the command, you'll see everything update in the browser.

```nohighlight
$ terminus site code commit --site=cli-test \
                            --env=dev \  
                            --message="Install Pinboard theme" \
                            --yes \  
```

Terminus connects to Pantheon's API, which makes real-time updates to any Dashboard you have open. What you do in Terminus is immediately represented in your Dashboard, so it is always up to date.

Now that we've committed our changes, go back to your test site in the browser and refresh it to see what you've created.

### Theming Best Practices

No WordPress site is ready for development without a child theme. Let's create one:

```nohighlight
$ terminus wp 'scaffold child-theme
                            --parent-theme=pinboard \
                            --theme-name=cli-test-theme' \
                            --site=cli-test \
```
Next, we'll commit it.

```nohighlight
$ terminus site code commit --site=cli-test \
                            --env=dev \  
                            --message="Create cli-test-theme child of pinboard theme" \
                            --yes \  
```

Now you're ready to edit the cli-test theme, allowing for upstream theme improvements in the pinboard theme to happen without interfering with the functionality of your site.

![Screenshot of the final website created following the steps in this guide](/source/docs/assets/images/pantheon-final-command-line-test-site.png)


## The Power of Terminus and WP-CLI

If you're a developer who lives in the command line, you now see the power of Terminus and WP-CLI. This guide has just scratched the surface of what can be done. Terminus provides the power to manage most aspects of your Pantheon sites, while tools like WP-CLI (and drush for Drupal) give you the power to manage the inner workings of your WordPress powered site. Now you're ready to take the sandbox site we've setup and explore on your own to see what else is possible.
