---
title: Starting With Git
description: Use Git version control to deploy code to your Drupal or WordPress site's development environment.
categories: []
tags: [git]
---
Git is the version control tool at the heart of the Pantheon workflow. If you're a developer who likes to use [local development](/docs), it's a good way to work with the Pantheon platform: develop locally, commit, and push to master to deploy code into your Pantheon Development environment.

<div class="enablement">
  <h4 class="info" markdown="1">[Agency DevOps Training](https://pantheon.io/agencies/learn-pantheon?docs){.external}</h4>
  <p>Dev/Test/Live, parallel feature development with Multidev, hotfix workflows, and more! Learn how Pantheon's DevOps training can accelerate your workflow.</p>
</div>

## Install Git

Select your operating system and the download will automatically begin:

[Mac OS](https://git-scm.com/download/mac)  
[Windows](https://git-scm.com/download/win)  
[Linux](https://git-scm.com/download/linux)  

## Clone Your Site Codebase

The first step is to get a `git clone` of your code from Pantheon to your local computer.

### Step 1: Go to Your Site Dashboard

Log in to Pantheon and load the Dashboard for the site you want to work on.

### Step 2: Copy the Git Clone Command

At the top of the development panel, look for the `git clone` command and copy and paste it in your terminal. It will look something like this:<br />
![Copy Past Git Clone](/docs/assets/images/dashboard/git-string.png)<br />

### Step 3: Run Git Clone

On your local environment, go to where you want the code to reside. Git will create a directory as part of the clone, so you don't need to create one. Run the command you copied in step 2:

```nohighlight
git clone ssh://codeserver.dev.xxx@codeserver.dev.xxx.drush.in:2222/~/repository.git my-site
```
If everything worked correctly you will see Git fetching the data:<br />
![Git Clone During](/docs/assets/images/git_clone.png)<br />
If you run into permission problems, check your [SSH key](/docs/ssh-keys/) setup. If the clone starts but can't complete, check your network to see if you have a current version of Git.

## Make a Change

### Step 1: Edit a File

You can now edit your site code using any text editor. We recommend using [a butterfly](https://xkcd.com/378/).

### Step 2: Add a File

If you want to add a new file to your codebase, you will need to tell Git about it. Otherwise, Git will not track the file.

```bash
git add _path_to_file_
```
To find out if you have any files in your local clone that Git isn't yet tracking, run:
```bash
git status
```
Any pending changes and files to be added will be listed like this:<br />
![Git Status](/docs/assets/images/git_status.png)<br />
You can then cut and paste the paths to these files when using `git add .`

## Push Changes to Pantheon

Sending code to Pantheon is a two step process with Git. First, you need to commit the files locally. Then you need to "push" them to the Pantheon cloud.

### Step 1: Commit the Files Locally

In order to tell Git the files are ready, you need to commit them. Every commit includes a brief message so you can later remember why the change was made. It is worthwhile to take a moment and create an accurate commit message to help others understand your changes.

```bash
git commit -am "Add a great new module to increase awesomesauce level of my Drupal site."
```
This command uses a combination of options `-am`: `-a` to include *all* files changed, and `-m` to include a commit *message*:

If you don't specify a message on the command line, Git will open your default text editor and prompt you to create one. Exiting without making a message will abort the commit. If the commit worked you will see something like this:<br />
![Git Commit](/docs/assets/images/git_commit.png)<br />
There is a handy list of Git commands (along with a lot of other documentation) [on GitHub](https://github.com/AlexZeitler/gitcheatsheet/blob/master/gitcheatsheet.pdf).

### Step 2: Send the Changes to Pantheon

You have committed the file locally, but you still need to send the changes to Pantheon. To do this, use the push command:

```bash
git push origin master
```
This executes a push to the origin location, which is Pantheon since that's where you cloned the code from, on the branch "master", which is what your Dev environment tracks.

If you have a password on your SSH key, you may need to enter it to authorize the push. If everything worked, you will see something like this:<br />
![Git Push](/docs/assets/images/gitpush.png)

### Step 3: View the Changes on Pantheon

When the push command completes, Pantheon instantly deploys the changes to your development server.

Go back to your site's Dev tab in Pantheon, click the URL under "Development site", and browse to your changes.

## Troubleshooting

### Authenticity & Fingerprint Prompts
Initial connections from your local computer to a site's codebase on Pantheon after running `git` commands will prompt you to confirm the connection:

```
The authenticity of host '[codeserver.dev.UUID.drush.in]:2222 ([IP.ADDRESS]:2222)' can't be established.
RSA key fingerprint is SHA256:yPEkh1Amd9WFBSP5syXD5rhUByTjaKBxQnlb5CahZZE.
Are you sure you want to continue connecting (yes/no)?
```

You can safely type `yes` and press enter to add the server's SSH key fingerprint to your computer's `known_hosts` file. Additional connections to this specific Pantheon container will complete successfully without prompts. However, you will be prompted to confirm connections following a container migration, which is part of regular maintenance on the platform. See the following Pro Tip to automatically accept all Pantheon connections.  

<div class="panel panel-drop panel-guide" id="accordion">

<a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#host-keys">
<div class="panel-heading panel-drop-heading">
<h3 class="panel-title panel-drop-title" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-lightbulb"></span> Pro Tip: Trust All Pantheon Hosts</h3>
</div>
</a>

<div id="host-keys" class="collapse">
<div class="panel-inner" markdown="1">
The key fingerprint is a representation of the public key, used by the remote server to identify itself. These public keys, along with private keys, form a **keypair** used by the [Diffie-Hellman key exchange](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange) to encrypt communication between you and the server.

On a standard server system, the server administrator would publish their host keys and fingerprints publicly, so clients could match them to the keys presented at these prompts. On Pantheon however, application containers are created and destroyed too rapidly to maintain a public key list.

You can, however, easily tell your machine to automatically trust all Pantheon `*.drush.in` servers by disabling the `StrictHostKeyChecking` option in your SSH configuration file.

<div class="alert alert-danger" role="alert">
<h4 class="info">Warning</h4>
<p markdown="1">
Be aware that you're disabling a security feature, and trusting your DNS system to always point you to the right IP addresses.
</p>
</div>

Open `~/.ssh/config` (or create a new file if one does not exist) and add the following lines:

```
Host *.drush.in
    StrictHostKeyChecking no
```

Now, requests to any `*.drush.in` server address should automatically accept the server's SSH key fingerprint without prompting you.

</div>
</div>
</div>

### Checking Out Code using GUI Clients

SourceTree and other Git GUI clients generally prompt for a Source URL using HTTP or HTTPS to the repository to check out the site code. Pantheon does not provide Git repository access over HTTP(s), and instead provides a "Git over SSH" URL. For example:

    git clone ssh://codeserver.dev.xxx@codeserver.dev.xxx.drush.in:2222/~/repository.git my-site

Some Git GUI clients, like SourceTree, do support the use of `ssh://` URLs to clone the code base.

To configure this URL in SourceTree simply remove the `git clone` and the trailing space and 'my-site' name off the end of the command provided in the **Connection Info** section of your Pantheon Dashboard.

* Source URL: `ssh://codeserver.dev.xxx@codeserver.dev.xxx.drush.in:2222/~/repository.git`
* Destination Path: The local path where you want to clone the repository.
* Name: Your site name.

![SourceTree git Configuration](/docs/assets/images/sourcetree-config.png)

Alternatively, you can simply clone the repository using the `git clone` and then use the "Add Existing Local Repository" option in SourceTree to point to the checked out directory.

### Blocked port

If your local network is blocking port 2222, you'll see an error like this when attempting to run `git clone`, `git push`, or `git pull`:

```
ssh: connect to host codeserver.dev.xxx.drush.in port 2222: Operation timed out
fatal: Could not read from remote repository.
```

To clear this up, you may need to work with your network administrators to unblock this port. If this isn't an option, you may need to try a [Port 2222 Blocked Workaround](/docs/port-2222/).

## Additional Resources

For further learning, we recommend the following resources:

- [Git Documentation](https://git-scm.com/documentation){.external}
- [Pro Git Book](https://git-scm.com/book/en/v2){.external}
- [First Aid Git](https://github.com/magalhini/firstaidgit){.external}
- [Git Reference](http://gitref.org/){.external}
- [Git Cheatsheet](https://ndpsoftware.com/git-cheatsheet.html){.external}
- [Git Immersion](http://gitimmersion.com/){.external}
- [Code School - Try Git](https://try.github.io/levels/1/challenges/1){.external}
- [A successful Git branching model](http://nvie.com/posts/a-successful-git-branching-model/){.external}
- [SourceTree - Git GUI Client](https://www.sourcetreeapp.com/){.external}
- [GitKraken - Git GUI Client](https://www.gitkraken.com/){.external}
- [GitHub Desktop - Git GUI Client](https://desktop.github.com/){.external}
- [Repository mirroring](https://docs.gitlab.com/ee/workflow/repository_mirroring.html){.external}

For Pantheon-specific Git questions, see the following:

- [Git FAQs](/docs/git-faq/)
- [Undo Git Commits](/docs/undo-commits/)
