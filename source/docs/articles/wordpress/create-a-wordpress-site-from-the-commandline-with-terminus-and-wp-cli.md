---
title: Create a WordPress site form the commandline with terminus and wp-cli
description: A walkthrough of how to install and use terminus and wp-cli to control a WordPress powered site on Pantheon
draft: true
---

Many developers feel more at home at the command line than clicking buttons on windows. Edit a text file, issue a command, go get coffee, and bang, you've completed your task. There is just something about being able to do it all from the command line that makes it a little more exciting.

Up until a year or so ago, WordPress did not have a good answer to Drupal's drush tool. Thankfully now it does in the form of **wp-cli**. 

wp-cli is exactly what the name implies a tool to manage a WordPress installation. However, don't think of it as a simple backup or search and replace tool. Yes, it can do those, but it is ever so much more than that. This guide will walk you through creating and configuring a site using nothing but wp-cli and Pantheon's terminus.

# Assumptions
This guide assumes you are familiar with your operating system's command line. It is also assumed that you are on a Unix based system. (Linux or OSX) The concepts should work the same on Windows but the commands may vary slightly. It also assumes you have a Pantheon account already created. If not, [go register]() for yours. Pantheon accounts are always free for development.

# Getting Started
To use wp-cli to manage your WordPress powered site hosted on Pantheon, you will first need to install Pantheon's command line tool, **terminus**. Terminus gives you access to your Pantheon account and sites and allows you to execute wp-cli commands on those sites. To install terminus follow the [installation instructions](https://github.com/pantheon-systems/cli/wiki/Installation) on the [github repo](https://github.com/pantheon-systems/cli). Follow the **Basic Installation** instructions.

Once it is complete you can test to make sure with the following command

```
$ terminus art
```

![The Pantheon logo represented in ASCII art](/docs/assets/images/command-line-terminus-art.png)

If you see the trademark Pantheon Fist-Bolt, then you know that terminus is installed properly and ready to change how you manage sites hosted on Pantheon.    

# Setup
## Logging In To Pantheon
Once you have terminus ready, it is time to tell terminus who you are. You do that with the auth command

```
$ terminus auth login your@email.tld
```

It should ask you for your password. If you are scripting a process later, you can use the ``--password`` argument to pass your password in on the command line. However, this means that your password will be visible in both your script and in your command line's history. Successful completion of the login command will again display the Pantheon logo.

## Creating a Site 
Now let's create a site. First however, open a browser and log into your Pantheon dashboard. This is not necessary but you will be able to see the progress being made on some of the commands.

Creating a site is a function of the Pantheon API, not wp-cli. terminus however handles both for us. Before you can create a site, you will need a few pieces of information. The first thing you need is your organization ID. This is a long, hexadecimal GUI assigned to your organization. Use this command to list the organizations of which you are part.

```
$ terminus organizations list
```

The output will be a table with two columns per organization, the human readable name, and the ID. If you are a member of more than one organization, select the ID of the organization you want to use when creating your WordPress powered site.

Next, you will need a **product id** This is an internal Pantheon GUID for the different systems that you can install. You can use this command to see the complete list.

```
$ terminus products all
```

Since these are assigned by Pantheon and used by all customers, they do not change. Therefore, the one you are looking for is ``e8fe8550-1ab9-4964-8838-2b9abdccf4bf``.    

Now you need a site name. This can be anything you want it to be, however it needs to be made of letters and dashes. It must be unique , some choose something that other's aren't likely to have used. At the same time that you are thinking up a site name, you need to create the "label". The label is the human readable version of the name. It can be anything you like, however, because some characters mean special things when working on the command line. It is best to keep it simple for your first few tries.

For your test site, use the following:
- *Site Name* = cli-test
- *Label* = Command Line Test

Now for the command. terminus is broken up into a series of command modules, each with it's on set of sub commands. To create a site, use the ``sites`` command and the ``create`` subcommand. The format of that command looks like this:

```
$ terminus sites create [--product=<productid>] [--name=<name>] [--label=<label>] [--org=<org>] [--import=<url>]
```

Issue the command using the values discussed above. It will look like this one.

```
$ terminus sites create --product=e8fe8550-1ab9-4964-8838-2b9abdccf4bf --name=cli-test --label="Command Line Test" --org=YOUR-ORG-ID 
```

Just like creating a site from your dashboard, this will take a few minutes. You will see a status bar as terminus spins up your new WordPress installation. Once complete though, you will be notified that you site is ready to go. 

![Screenshot of the results of creating a new site with Pantheon's terminus](/docs/assets/images/command-line-terminus-create-site.png)

Your site is now set up on Pantheon but it's not quite finished. If you swap over to your dashboard and refresh it, you should see your new site. 

![Screenshot of the Pantheon Unicorn letting you know that your site is ready to finish setting up](/docs/assets/images/pantheon-unicorn-wordpress-site-is-ready-to-be-setup.png)

You will notice that instead of a screenshot of a WordPress powered site, you have the Pantheon Magic Unicorn telling you that your site is ready to setup. All is as it should be.


# Setting Up the Site
Now that WordPress exists, you need to do the famous "Five Minute Install", only it won't take us five minutes and you don't need anything but the command line.  WordPress now exists on your new site. There is even a wp-config.php already created and ready to use. Now you need to populate the database and your site will be ready to use. For this, you turn to wp-cli, executed through terminus. We will use the ``wp core install`` command. For this to work, it is necesary that you understand the [wp-cli core install](http://wp-cli.org/commands/core/install/) command. The format for the command is as follows.

```
$ terminus wp core install --url=the.url.of.your.dev.site --title="Command Line Test Site" --admin_user=admin --admin_password=something_incredibly_secure --admin_email=your@emailaddress.tld --site=the-name-of-your-site
```

The first thing you will notice is that you need the URL of your site. We can easily pull this out of terminus with a little bash magic.

```
$ echo "http://`terminus site hostnames list --site=cli-test --env=dev --bash | awk '{print $1}`"
```

Or you can simply use the format ``http://dev-SITE_NAME.pantheon.io``.

To populate the database of the site you created above, use the following command.

```
$ terminus wp core install --url=http://dev-cli-test.pantheon.io --title="Command Line Test" --admin_user=admin --admin_password=pantheon.rocks --admin_email=bob@example.com --site=cli-test
```

If everything goes as planned you will see this message displayed.

```
Success: WordPress installed successfully.
```

Now swap back you the browser where you have your dashboard open. Now click into the dashboard of your newly create "Command Line Test" site. There's not much to see at this point since all we've done is create the site. However, if you click the "Visit Development Site" button, you will see a stock WordPress install ready for you to log in and start creating your site.

# Managing WordPress
Now that you have a stock WordPress install, you will want to start making it look a little better. wp-cli can do any number of things to manipulate a WordPress install. We all know however, that the best sites are the ones with images, and sadly the stock WordPress installation does not come with any images, so let's add one.

wp-cli gives us the ability to upload images and modify posts. In this case, you want to do both at once. The following command will add a featured image to the "Hello Word" post that WordPress installs automatically. 

You can see the full documentation for ``media import`` on the [wp-cli media import documentation page](http://wp-cli.org/commands/media/import/). Since you will use the ``--featured_image`` flag you also have to pass in the ``post_id``. You can pass in either the URL of an image or a local filename to ``media import``. Understand though that "local" in this case means already uploaded to your site. Our command to upload an image and set it as the featured image of post #1 looks like this one.


```
$ terminus wp media import https://farm8.staticflickr.com/7355/16204225167_1e1bb198e5_b.jpg --post_id=\"1\" --featured_image --site=cli-test
```

A successful upload will show this.

```
Success: Imported file https://farm8.staticflickr.com/7552/15827270506_ce62e709c9_o_d.jpg as attachment ID 3 and attached to post 1 as featured image.
```

Now, swap back to your browser and refresh the site (not your dashboard) and you will see the new image.    


# Add a New Theme
So far, so good. Many will stop there and start updating the content. There is one more thing we need to do to make this site more appealing to the eye, it needs a better theme. Once again, you can do this all without touching WordPress or your Pantheon Dashboard. Swap back to your Pantheon dashboard in the browser and position the window where you can see it while working in the terminal.

WordPress has a plethora of themes both free and paid that you can install to make your site look good. We've chosen one from the [WordPress.org Themes Repository](https://WordPress.org/themes/) named [Pinboard](https://WordPress.org/themes/pinboard). To add it to your site, you use the following command. There is no need to download the theme first, wp-cli will pull it for us from WordPress.org.

```
$ terminus wp theme install --activate --site=cli-test https://downloads.WordPress.org/theme/pinboard.1.1.12.zip
```

This will both install and activate you new theme in the same command.

Before you swap back to your site, look at your dashboard. You should now see a notice that you have uncommitted changes. 

![Screenshot of the pantheon dashboard showing uncommitted changes](/docs/assets/images/pantheon-dashboard-uncommitted-changes.png)

You need to clean this up before going on. So let's commit the changes to your site's repo. We do that through terminus but without the help of wp-cli. Before executing the command below, make sure that you position your browser so that you can see it while in your terminal. As soon as you issue the command, things will change in the browser.

```
$ terminus site code commit --site=cli-6 --env=dev --message="I never have to touch the interface again" --yes --branchname=master
```

terminus talks to Pantheon's API, which talks in real-time to any dashboard you may have open. The things do you in terminus are immediately represented in your dashboard so that it is always ip to date.

Now that we've committed out changed, swap back to your test site in the browser and refresh it to see what you've created.

![Screenshot of the final website created following the steps in this guide](/docs/assets/images/pantheon-final-command-line-test-site.png)


# Conclusion

If you are a developer who lives in the command line, you can now begin to see the power of terminus and wp-cli. This guide has just scratched the surface of what can be done. terminus provides the power to manages most aspects of your Pantheon sites, while tools like wp-cli (and drush for Drupal) give you the power to mange the inner workings of your WordPress powered website. Now it is time to explore on your own. Take the sandbox site we've setup and see what is possible. 
