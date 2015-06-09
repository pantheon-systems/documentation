---
title: Generating SSH Keys
description: Understand how to generate SSH keys to configure Drupal Drush or SFTP.
category:
  - getting-started
keywords: ssh keys, ssh, generate keys  
---
SSH as a protocol is not supported on Pantheon. <!--You can not connect via SSH using Putty.--> These directions are to allow you have passwordless access if you configure Drush or SFTP to use the keys setup by putty.

<div class="alert alert-info" role="alert"> <strong> Note:</strong> SSH keys include the user and hostname of the account/computer that it was generated on as a comment (in the form of "==user@usercomputer") at the end of the file. If you experience errors, see the troubleshooting section at the end of the document.</div>

Spaces and non-standard alphanumeric characters in the user or hostname can cause an SSH key to appear invalid to Pantheon.

To fix this, please edit the user or hostname and remove spaces and/or odd characters that exist. This will not affect the key itself, as the user/hostname are simply appended as a comment for reference.

Genrating SSH keys is different for every platform. Please follow the directions that are most appropriate for you below:

1. [MacOS and Linux](/docs/articles/users/generating-ssh-keys#macos-and-linux)

2. [Windows / Git GUI and OpenSSH](/docs/articles/users/generating-ssh-keys#windows-/-openssh)

<!--<li>
	<p><a href="/articles/users/generating-ssh-keys#generating-ssh-keys#generating-keys-on-windows-and-putty">Windows / PuTTY</a></p>
	</li>-->
## MacOS and Linux

Open your favorite terminal utility and generate a key:

    ssh-keygen

Unless you're an advanced user, just press ENTER for every question. If the command says the key already exists, you can either overwrite it or continue onto the next step with your existing key.

Still from the Terminal, output your SSH key to a file you can use:

    cat ~/.ssh/id_rsa.pub > ~/Desktop/key_for_pantheon.txt

Open the key_for_pantheon.txt on your desktop, select all and copy. You're now ready to paste this into the "Add Key" form on your account page.

## Windows / OpenSSH

[Download](http://git-scm.com/downloads) and install Git.
![](/source/docs/assets/images/desk_images/46904.png)<br />
Once you have downloaded the Git GUI installer you can get started with the setup wizard.
![](/source/docs/assets/images/desk_images/46905.png)<br />
Click **Next** to continue.<br />
![](/source/docs/assets/images/desk_images/46906.png)<br />
At this point you will have to select the installation folder that you want have Git installed. Unless you need to move this to another directory you can leave this with the default path. Click **Next** to continue.
![](/source/docs/assets/images/desk_images/46907.png)<br />
If want to have the git GUI appear in the start menu you can go ahead and set the title. In this instance we simply set it to "Git". Click **Next** to continue.<br />
![](/source/docs/assets/images/desk_images/46908.png)<br />
A nice feature of the Git GUI is that it can set the PATH variable for you. If you are using Cygwin you will also need the have the Cygwin Git library installed and this way you can access git via the command line. Click **Next** to continue.<br />
![](/source/docs/assets/images/desk_images/46909.png)<br />
Choose option: **Checkout Windows-style...** (unless you prefer checking out with Unix line endings). It's really up to you, but most site code has Unix line endings. Click **Next** to continue.
![](/source/docs/assets/images/desk_images/46910.png)<br />
Voila! You are done with the installation of Git. Next you can move on the final steps of generating your SSH keys using the GUI. Click **Finish**.<br />
![](/source/docs/assets/images/desk_images/46911.png)<br />
From the Start menu, open the Git Gui and under the Help menu, click **Show SSH Key**. <br />
![](/source/docs/assets/images/desk_images/46912.png)<br />
You probably don't have one yet, so click **Generate Key**.<br />
![](/source/docs/assets/images/desk_images/46915.png)<br />
We recommend using a passphrase, but it's optional. It doesn't have to be the same as your Pantheon password, and it will help protect your key.<br />
Ensure the whole key is selected (white text on a blue background). If it's not selected, triple-click on the random-looking text. Finally, click **Copy To Clipboard.**<br />
![](/source/docs/assets/images/desk_images/46914.png)

### Add the Key to your Pantheon Account:

Here we will only cover the basics, but if you need more detailed instructions on this section, then take a look at [Loading SSH Keys](/docs/articles/users/loading-ssh-keys).
![Adding SSH Keys](/source/docs/assets/images/add-ssh-key-dashboard.png)

1. Sign in to Pantheon and visit the Account page.

2. Click **SSH Keys**.

3. Paste the copied public key into the box and click **Add Key** to save it.

4. Your computer is now set up to securely connect to the Pantheon git server.

5. Open Up the git bash client and put in the command to clone your Pantheon site. You can find this in the Dev environment of yor site above the git code log.

If you have added a password to your key earlier then you will be prompted to enter the password for the key you created using the git GUI tool.
![](/source/docs/assets/images/desk_images/46916.png)


<!--<h3 id="generating-keys-on-windows-and-putty">Windows / PuTTY</h3>


<h4 id="download-and-install-putty"><a class="external-link" href="http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html" rel="nofollow" target="_blank">Download</a> and install PuTTY</h4>


<ul>
	<li>
	<p>All installation defaults are okay.</p>
	</li>
</ul>


<h4 id="generate-an-SSH-key">Generate an SSH key</h4>


<p>If you already have a key (a <tt>.ppk</tt> file), right-click on it, select &quot;Edit&quot; and skip to the &quot;Add the key to your Pantheon account&quot; step.</p>


<ol>
	<li>
	<p>Open PuTTYgen (&quot;PuTTY Key Generator&quot;). It&#39;s usually available from the &quot;PuTTY&quot; folder in &quot;All Programs.&quot;</p>
	</li>
	<li>
	<p>If it immediately shows a progress bar, it&#39;s generating a new key. Otherwise, click &quot;Generate.&quot;</p>
	</li>
	<li>
	<p>Follow the instructions to move your mouse around the box until PuTTY finishes generating the key.</p>
	</li>
	<li>
	<p>Fill in the &quot;Key comment&quot; with something memorable, like your email address.</p>
	</li>
	<li>
	<p>We recommend using a passphrase, but it&#39;s optional. It doesn&#39;t have to be the same as your Pantheon password, and it will help protect your key.</p>
	</li>
	<li>
	<p>Click &quot;Save private key&quot; and save it as &quot;id_rsa.ppk&quot; to a place for safekeeping (probably not your desktop) that you can find later.</p>
	</li>
	<li>
	<p>Copy the text from the &quot;Public key for pasting into OpenSSH authorized_keys file&quot; box.</p>
	</li>
	<li>
	<p>You may want to keep the window open for now in case you lose the key copied to your clipboard.</p>
	</li>
</ol>


<h4 id="add-the-key-to-your-pantheon-account">Add the key to your Pantheon account:</h4>


<ol>
	<li>
	<p>Sign on to Pantheon and visit the &quot;Your Sites &amp; Account&quot; page.</p>
	</li>
	<li>
	<p>Click the button in the lower right to add a new key.</p>
	</li>
	<li>
	<p>Paste the copied public key into the box and click to save it.</p>
	</li>
</ol>


<h4 id="configure-putty">Configure PuTTY:</h4>


<ol>
	<li>
	<p>Open PuTTY from the Start menu.</p>
	</li>
	<li>
	<p>Navigate to &quot;Connection &gt; SSH &gt; Auth&quot; in the &quot;Category&quot; box.</p>
	</li>
	<li>
	<p>Under &quot;Private key file for authentication:&quot;, click &quot;Browse...&quot; and select the private key (the <tt>.ppk</tt> file) you saved before.</p>
	</li>
	<li>
	<p>Navigate to &quot;Session&quot; in the &quot;Category&quot; box.</p>
	</li>
	<li>
	<p>Put &quot;code.getpantheon.com&quot; in the hostname box.</p>
	</li>
	<li>
	<p>Under &quot;Load, save, or delete a stored session,&quot; single-click &quot;Default Settings&quot; then the &quot;Save&quot; button.</p>
	</li>
	<li>
	<p>At the bottom of the dialog, click &quot;Open.&quot;</p>
	</li>
	<li>
	<p>When asked about trusting the server, click &quot;Yes.&quot;</p>
	</li>
	<li>
	<p>When you see &quot;login as:&quot; in the command prompt it opens, close that window. The trust information is already saved; you don&#39;t actually have to log in.</p>
	</li>
</ol>


<h4 id="download-and-install-git"><a class="external-link" href="http://code.google.com/p/msysgit/" rel="nofollow" target="_blank">Download</a> and install Git.</h4>


<ol>
	<li>
	<p>Choose option: &quot;Run Git from the Windows Command Prompt&quot;</p>
	</li>
	<li>
	<p>Choose option: &quot;Use Tortoise(PLink).&quot;</p>


	<ul>
		<li>
		<p>If you don&#39;t see this option, re-do the &quot;Add Pantheon git to your trusted server list&quot; section and be sure to follow the step where you click &quot;Save.&quot; Then, start the Git installation over.</p>
		</li>
	</ul>
	</li>
	<li>
	<p>Choose option: &quot;Checkout Windows-style...&quot; (unless you prefer checking out with Unix line endings). It&#39;s really up to you, but most Drupal code has Unix line endings.</p>
	</li>
</ol>


<p>Your computer is now set up to securely connect to the Pantheon git server.</p>-->
## Troubleshooting

#### Control Path Error

You may receive the following error:

    ControlPath too long fatal: Could not read from remote repository.

Check your SSH config files (by default, `$HOME/.ssh/config and /etc/ssh/ssh\_config`) for a declaration like this:

    Host *
    ControlMaster auto
    ControlPath ~/.ssh/control-%l.%r@%h:%p


There are two steps that you can try to fix this error:

    Host *
    ControlMaster auto
    ControlPath ~/.ssh/control-%r

If this does not fix the problem, you can go a step further and add individual hosts entries, remove ControlMaster auto, and simplify the switches:

    Host myapp-myname.blahblah.com
    ControlPath ~/.ssh/control-%r

#### Server Refused to Allocate pty

This error occurs when a user is attempting to make a direct connection to Pantheon via SSH. Pantheon does not support [direct SSH connections](/docs/articles/users/generating-ssh-keys).
