---
title: WP-CLI
description: Interact with WordPress from a command line interface.
contributors:  [scottmassey]
videoid: zv7y9eczjb
permalink:  docs/videos/:basename/
tags: [devwpcli]
type: video
categories: [wordpress]
layout: video
---
WP-CLI is a set of command line tools for managing WordPress installations. Let’s install it and explore some commands.

WP-CLI can be installed locally in various ways. You can find instructions at [wp-cli.org](http://wp-cli.org/#installing).

If you install Pantheon’s command line tool, [Terminus](/docs/terminus/install/), you can run WP-CLI commands from your local computer on your Pantheon sites. I’ll be using Terminus in this video.

If you don’t already have a local environment configured, try installing [Kalabox](http://www.kalabox.io/). It comes pre-installed with Terminus and WP-CLI.

Let’s view the plugins on my WordPress site by running `terminus wp`, followed by `migration-example.dev`, which is my site name and environment, concatenated with a period, then the actual WP-CLI command, `plugin list`.

Note that there are 2 plugins, akismet and jetpack, which have updates available I will update these plugins with a single command.

I begin as usual, `terminus wp migration-example.dev`, then double-hyphen, `plugin update`, double-hyphen, `all`.

I added those first 2 hyphens after the environment argument to make sure terminus knows that everything afterwards is a WP-CLI command.

Since code is being downloaded to your dev server here, make sure you’re in SFTP mode.

Once updated, I can run automated tests, perform user-acceptance testing, then push to live.

With WP-CLI, I can also install plugins and themes. Here I’ll download and activate the vertex
theme in one command.

As usual, I run `terminus wp`, my environment name, double-hyphen, then the WP-CLI command, `theme install vertex`, and then the `activate` flag.

Almost all user functions available in the WordPress dashboard are available in WP-CLI.

For example, we can reset a user password by typing `wp user update`, with the user login, user email, or user ID of the user to update, then pass the flag `user_pass` with the new password value.

Another useful command is `wp search-replace`. It searches the database for a string and replaces it for another. It’s often used to change URLs between different environments.

WP-CLI also makes it easy to create WordPress plugins. Usually this requires some pretty rote procedures.

Now we can simply run `terminus wp scaffold plugin`, and generate the default structure for my new plugin, called crm-app.

Now I can see the directories, files, and even tests that are stubbed out for me. This saves time and reduces the possibility for user error.

This was a quick introduction to WP-CLI, the command line interface for WordPress. Please explore our technical documentation for more information about using and extending this tool’s functionality.
