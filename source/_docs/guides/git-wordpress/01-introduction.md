---
title: Use Git, FTP and WordPress Together on Pantheon
subtitle: Stop Cowboy Coding, Keep your Favorite Tools
description: Use your favorite tools: the WordPress admin UI, an FTP client, and a text editor and work quickly, safely and easily on the cloud.
tags: [develop]
contributors: scottmassey
layout: guide
type: guide
anchorid: git-wordpress
gitwordpress: true
generator: pagination
pagination:
    provider: data.gitwordpresspages
use:
    - gitwordpresspages
permalink: docs/guides/git-wordpress/
nexturl: guides/git-wordpress/create-site/
editpath: git-wordpress/01-introduction.md
---
Don’t use Git? No problem -- you can stick to a simple set of tools, and still take advantage of some of Git’s powerful features. This guide will walk you through building a WordPress site using your favorite FTP client, text editor, and our platform’s built in Git-based version control.

Why should you use git?

* Be more organized: Any kind of collaboration is easier and safer with version control. You can work in parallel with others and not be stepping on toes. Even working alone, you can have many features in progress on a site, but without risking the stability of the current site.
* Understand why your site is slow: Because there is a recorded timeline of changes, allowing you to move forward or back, similar to a document’s “Undo” function.
* Get hacked less: It is a much more secure way to move code around, meaning you can lock down your production environment, because you are never touching the code directly, you are deploying it securely with git.

Using Git is a big step away from the bad habits of “Cowboy Coding” and a leap towards professional development best practice. For growing agencies and developers, it isn’t an option, it is inevitable. And here is the easiest way to embrace your destiny as a WordPress professional.

## Before You Begin

For editing text, this guide uses Atom as well as the WordPress UI. Below are other options that should work interchangeably with this guide. IDEs such as PHPStorm will also work, but contain many more features which are a bit outside of the scope of this guide.

For an FTP client, this guide uses Transmit. Feel free to use what you are comfortable with. For fastest development, choose an FTP client that uploads on save, and allows you to authenticate with an SSH key. Creating a key takes a few minutes and handles the server authentication for you. Alternatively, you can use your Pantheon dashboard password.

Here are a few FTP clients and text editors you can successfully complete this guide with.

<table class="table  table-bordered table-responsive">
  <thead>
    <tr>
      <th>FTP Client</th>
      <th>Text Editor</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Transmit</td>
      <td>Atom</td>
    </tr>
    <tr>
      <td>Cyberduck</td>
      <td>Sublime</td>
    </tr>
    <tr>
      <td>Filezilla</td>
      <td>TextMate</td>
    </tr>
  </tbody>
</table>


##About your Local Environment
You: “Ok, yay, let’s do this. Let me fire up and configure my local development environment, give me one to three hours.”

Hold it right there. Sites on Pantheon each include a dev, test, and live environments, and as the name implies, dev is already set up for development purposes! Rather than managing and maintaining a LAMP stack on  your local computer, you can do your work in the cloud, directly on our platform, with zero setup and no ongoing responsibilities. 

Using our dev environment means fewer surprises, since it is guaranteed to be consistent with production. It also means you can immediately share a link to a running website with anyone who needs to see work in progress. Finally, it’s all set up with a workflow to help you make ongoing updates to the production site (running in the live environment) without ever putting it at risk of disruption or downtime.

## Create A New WordPress Site

Create a Pantheon account and spin up a site. It’s pretty straightforward to do, and here are detailed instructions.
Select WordPress as your start state. 
After the site and infrastructure are completely spun up, click the “Site Admin” button and finish the steps to create a site.

![Launch site admin page](/source/docs/assets/images/guides/git-wordpress/launch-admin.png)

