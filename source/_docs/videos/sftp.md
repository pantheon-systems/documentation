---
title: On-Server Development
description: Develop on Pantheon directly via SFTP.
videoid: 6r4y1zf97c
contributors:  [scottmassey]
permalink:  docs/videos/:basename/
tags: [admin, sftpfiles]
type: video
layout: video
---
Pantheon allows you to quickly and easily write code or add modules and plugins directly on the platform using on-server development.

All the code on your Pantheon site is stored in a repository, which is a remote canonical storehouse of code along with its history of changes.

You make changes to your code in 1 of 2 ways. You can use Git, the repository’s native language, via the command line. Or as we’re discussing today, on-server development with SFTP.

SFTP mode works by basically making your Dev environment temporarily writable, and aware of any changes you make. These changes are eventually pulled to Test and Live via version control.


Let’s begin by switching to SFTP mode. Then use the connection settings in the dashboard with Transmit, my SFTP client. And add the host name or server, and then my username. For password, I’m going to use my SSH Key, but you can also use your dashboard password. And then finally, I’m going to add the port number.

When I connect, I should be able to see my Dev environment code. My SFTP client will upload whatever I save, so I can make changes, and see and test them as I go. If I look at the dashboard, I can see that it’s aware that a change has been made.


So let’s look at the site. I’ll see the change in the date formatting that I just made on the homepage. I like the way that looks, so I’m going to commit it to the repo with a relevant message. It’s really important and a best practice to make regular commits.


While I’m doing on-server development, I can get some other work done, such as updating a module or plugin to the dashboard user interface. Since this plugin update is basically just a code change, of course I’m going to go back to dashboard and commit it.


For those of us who like to use command line tools, if I have [Terminus](/docs/terminus/) installed, I can use Drush or WP-CLI to download modules to the Dev environment. In this case, I’ll run the command that downloads and activates the WordPress plugin for [Optimizely](https://wordpress.org/plugins/optimizely/). As with the first 2 examples, nothing lasts forever unless it’s stored in the Git repository. So I’ll add a message and commit it.


While I’m doing on-server development, the Dev environment is writable, but it’s also blocking anyone from pushing to it via Git, so I switch it back to Git mode on the dashboard.

Whether you’re a Git user or an FTP user, on-server Development can be a pretty handy tool. Give it a shot and see if you can integrate it into your workflow.
