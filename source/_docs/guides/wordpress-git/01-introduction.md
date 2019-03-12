---
title: Using Git with SFTP & WordPress
subtitle: Add Git-Based Version Control to Your SFTP Workflow
description: Beginners guide on how to use the WordPress Dashboard, an SFTP client, and your text editor of choice to work quickly, safely and easily on Pantheon's Git-based platform.
layout: guide
type: guide
contributors: [scottmassey, rachelwhitton]
anchorid: wordpress-git
gitwordpress: true
generator: pagination
pagination:
    provider: data.gitwordpresspages
use:
    - gitwordpresspages
permalink: docs/guides/wordpress-git/
nexturl: guides/wordpress-git/plugins/
editpath: wordpress-git/01-introduction.md
image: git-sftp-wp-docs-guide
---
This guide demonstrates how SFTP users can build WordPress sites on Pantheon's git-based platform. Don't use git? No problem -- we'll show you how easy it is to use by demonstrating workflows for various development tasks, such as adding a new theme or plugin.

Dive into Git with WordPress on Pantheon, keeping your favorite SFTP client and text editor without compromising use of the WordPress Dashboard or adding a lot of complexity to your workflow. But first, why should you use git, when SFTP and a text editor has been working fine? Here are a few reasons why:

<div class="panel panel-drop panel-guide" id="accordion">
  <div class="panel-heading panel-drop-heading">
    <a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#unique-anchor">
      <h3 class="info panel-title panel-drop-title" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-lightbulb"></span> Benefits of Git</h3>
    </a>
  </div>
  <div id="unique-anchor" class="collapse" markdown="1" style="padding:10px;">
  ### Collaborate  {.info}
  Any kind of collaboration is easier and safer with version control. You can work in parallel with others and not step on any toes. Even working alone, you can have many features in progress on a site, but without risking the stability of the current site.
  ### Security  {.info}
  Version control creates a more secure way to move code around. You can lock down your production environment, because you are never touching the code directly; you're deploying it securely with git.
  ### History  {.info}
  Git provides a recorded timeline of changes, allowing you to move forward or back in the code's history. What caused that new bug? Simply step back through past revisions until you find where it appears!
  ### Best Practice  {.info}
  Using Git is a big step away from the bad habits of Cowboy Coding <a rel="popover" data-proofer-ignore data-toggle="tooltip" data-html="true" data-title="Cowboy Coding" data-content="Developing directly on the production environment, a poor practice."><em class="fa fa-info-circle"></em></a> and a leap towards professional development best practices. For growing agencies and developers, it isn’t an option, it's inevitable. And here is the easiest way to embrace your destiny as a WordPress professional.
  </div>
</div>

## Before You Begin
Make sure that you have a:

* WordPress site on Pantheon
* Text editor and SFTP client on your local computer, such as:

    <table class="table  table-bordered table-responsive">
      <thead>
        <tr>
          <th>SFTP Client</th>
          <th>Text Editor</th>
        </tr>
      </thead>
      <tbody>
        <tr markdown="1">
          <td>[Transmit](https://panic.com/transmit/){.external}</td>
          <td>[Atom](https://atom.io/){.external}</td>
        </tr>
        <tr markdown="1">
          <td>[Cyberduck](https://cyberduck.io/){.external}</td>
          <td>[Sublime](https://www.sublimetext.com/){.external}</td>
        </tr>
        <tr markdown="1">
          <td>[Filezilla](https://filezilla-project.org/){.external}</td>
          <td>[TextMate](https://macromates.com/){.external}</td>
        </tr>
      </tbody>
    </table>

Demonstrations throughout this guide use Atom and Transmit. For fastest development, choose an SFTP client that uploads on save, and allows you to authenticate with an [SSH key](/docs/ssh-keys/). Creating a key takes a few minutes and handles the server authentication for you. Alternatively, you can use your Pantheon account password to sign in, when prompted.

## Cloud Development Environment
>Ok, yay, let’s do this. Let me fire up and configure my local development environment, give me one to three hours. -- You, probably.

*Hold it right there*. Sites on Pantheon each include **<span class="glyphicons glyphicons-wrench"></span> Dev**, **<span class="glyphicons glyphicons-equalizer"></span> Test**, and **<span class="glyphicons glyphicons-cardio"></span> Live** environments -- and as the name implies, **<span class="glyphicons glyphicons-wrench"></span> Dev** is already set up for development purposes! Rather than managing and maintaining a LAMP stack on  your local computer, you can do your work in the cloud, directly on our platform, with zero setup and no ongoing responsibilities.

Using the **<span class="glyphicons glyphicons-wrench"></span> Dev** environment means you can:

* Build in a known state with fewer surprises, since **<span class="glyphicons glyphicons-wrench"></span> Dev** is the same as **<span class="glyphicons glyphicons-cardio"></span> Live**.
* Share work in progress with a web accessible URL (e.g., `example-dev.pantheonsite.io`)
* Stop Cowboy Coding <a rel="popover" data-proofer-ignore data-toggle="tooltip" data-html="true" data-title="Cowboy Coding" data-content="Developing directly on the production environment, a poor practice."><em class="fa fa-info-circle"></em></a>
