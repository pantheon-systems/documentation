---
title: Using The Drupal Console on Pantheon.
description:
draft: true
contributors:
  - alexfornuto
  - greg-1-anderson
---

The [Drupal Console](https://drupalconsole.com/) is a CLI for Drupal, from which you can interact directly with your Drupal site. Pantheon has integrated the Drupal Console for all Drupal 8 sites, accessible through [Terminus](/docs/terminus).

<div class="alert alert-info">
<h4 class="info">Note</h4><p markdown="1">Drupal Console only works for Drupal 8 sites.
</p>
</div>

## Before You Begin

The methods described in this guide involve Composer. If you're not already using composer to manage Terminus or Drupal code, first check out:

 - The [Example Drops 8 Composer](https://github.com/pantheon-systems/example-drops-8-composer) repository on GitHub
 - [Using Drupal 8 and Composer](/docs/composer-drupal-8/)

## Install Drupal Console

Recent versions of Drupal Console cannot be installed globally; they must be part of a Drupal site. If you are already managing your Drupal site using Composer, then it is likely that Drupal Console is already included in your project.

1. To install Drupal Console in your dev environment remotely, you can use Terminus:

        terminus composer site.env -- require drupal/console

    Alternately, if you work from a local repository you can install Drupal Console directly through Composer:

        composer require drupal/console:~1.0 --prefer-dist --optimize-autoloader

2. Install the Drupal Console Terminus Plugin:

        mkdir -p $HOME/.terminus/plugins
        composer create-project --no-dev -d ~/.terminus/plugins pantheon-systems/terminus-drupal-console-plugin:~1

## Run Drupal Console Commands Remotely

The syntax for running Drupal Console commands in Terminus is:

    terminus drupal <site>.<env> <command>:<subcommand>

For example, to list debug information for installed themes, run:

    terminus drupal <site>.<env> theme:debug


The [Drupal Console Documentation](https://hechoendrupal.gitbooks.io/drupal-console/content/en/index.html) site lists all [available Drupal Console commands](https://hechoendrupal.gitbooks.io/drupal-console/content/en/commands/available-commands.html)


## Example Console Commands

### Inspecting / Debugging



### Create new Module


## Other considerations

 - [Avoid be verbs](http://writing.rocks/to-be-or-not-to-be/)
 - Avoid colloquialisms and personal opinions, feelings, or anecdotes.
 - Only assume as much knowledge from the reader as specified in [Before You Begin](#before-you-begin). Otherwise explain everything.
 - Notice the `draft: true` line in this template's header? If keeps this page from being visible in the live site. Be sure to remove it from your doc.

##See Also

If you can, end your doc with links to external resources that can be used to improve the reader's comprehension, or to guides on logical next steps in a common development workflow.

 - [An internal guide with a relative link](/docs/get-started)
 - [An external guide with a full URL](http://writing.rocks/)
