---
title: Port 2222 Blocked Workaround
description: Instructions for accessing Port 2222 using and SSH tunnel on your Pantheon site.
category:
  - developing
keywords: port 2222, ssh tunnel, port, port numbers
---
In order to push and pull code to your Pantheon site you'll need access to port 2222. If for some reason this port isn't open to you, either because of a corporate firewall or router configuration, you'll get an error resembling the following:

    SSH: connect to host codeserver.dev.<site UUID>.drush.in port 2222: No route to host
    Fatal: Could not read from remote repository.

## Prerequisites

You can use an SSH tunnel to get around this barrier. In order to set this up you'll need SSH access to an another server somewhere outside of your network that can access port 2222 and reach Pantheon's git servers. Once you get the command to open a tunnel working, keep it handy somewhere because you'll need to open the tunnel before performing any remote Git operations.

## Set Up the Tunnel

Open a terminal window where you'll initiate the SSH tunnel. The form of the command is:

    ssh -L<local port #>:<pantheon server>:<pantheon port> user@other-server.com

Following is an example with some Pantheon credentials plugged in (site UUID omitted), note you can use the port numbers from this example, at a minimum, you'll need to leave port 2222 in place.

    ssh -L3333:codeserver.dev.<site UUID>.drush.in:2222 user@other-server.com

You should now be logged in to the other server, but simultaneously you've just set up your local port 3333 as a tunnel to your Pantheon git repo.

## Clone the Repo

Open a second terminal window where you'll clone the repository. The form of the command is:

    git clone <Pantheon repository URL>@localhost:3333/~/repository.git

Here's an example with Pantheon credentials plugged in (site UUID omitted):

    git clone ssh://codeserver.dev.<site UUID>:3333/~/repository.git

Now you should have a fully cloned repo that you can push and pull from.

### Optional: Add a Remote

If you use GitHub or Bitbucket in parallel you can run something like the following (as with any remote git operations, the tunnel must be open already):

    git remote add pantheon ssh://codeserver.dev.<site UUID>@localhost:3333/~/repository.git

## Footnotes

If any remote git commands stop working, check back in the original terminal window to see if the tunnel has collapsed, reopen if necessary.

For more info and troubleshooting, check out the following post:  
 [http://randyfay.com/content/git-over-ssh-tunnel-through-firewall-or-vpn](http://randyfay.com/content/git-over-ssh-tunnel-through-firewall-or-vpn)

Props to Thomas MacLean for contributing to this documentation!
