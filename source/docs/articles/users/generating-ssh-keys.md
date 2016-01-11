---
title: Generating SSH Keys
description: Understand how to generate SSH keys to configure Drupal Drush or SFTP.
category:
  - getting-started
keywords: ssh keys, ssh, generate keys  
---
Pantheon does not support the SSH protocol. <!--You can not connect via SSH using Putty.--> These directions allow you to have passwordless access if you configure Drush or SFTP to use the keys set up by putty.

<div class="alert alert-info" role="alert">
<h4>Note</h4>
SSH keys include the user and hostname of the account/computer that it was generated on as a comment (in the form of "==user@usercomputer") at the end of the file. If you experience errors, see the troubleshooting section at the end of the document.</div>

##Invalid SSH Keys
Spaces and non-standard alphanumeric characters in the user or hostname can cause an SSH key to appear invalid to Pantheon. To fix this, edit the user or hostname and remove spaces and/or odd characters. This will not affect the key itself, as the user/hostname are simply appended as a comment for reference.

Instructions for generating SSH keys are different for every platform. Select your platform:

 - [Mac OS and Linux](/docs/articles/users/generating-ssh-keys/#mac-os-and-linux)  
 - [Windows / Git GUI and OpenSSH](/docs/articles/users/generating-ssh-keys#windows-%2F-openssh)

<!--<li>
	<p><a href="/articles/users/generating-ssh-keys#generating-ssh-keys#generating-keys-on-windows-and-putty">Windows / PuTTY</a></p>
	</li>-->
## Mac OS and Linux

1. Open your favorite terminal utility and enter the command to generate a key:

 ```nohighlight
 ssh-keygen
 ```
2. Unless you're an advanced user, just press **enter** for every question. If the command says the key already exists, you can either overwrite it or continue onto the next step with your existing key.
3. Copy the content from `~/.ssh/id_rsa.pub` to your clipboard.

 Linux users must output the SSH key to a file:
 ```nohighlight
 cat ~/.ssh/id_rsa.pub > ~/Desktop/key_for_pantheon.txt
 ```

 Then open the key_for_pantheon.txt file on your desktop, select all and copy.

 Mac users can execute the following to copy the SSH key in a single step:

 ```nohighlight
 pbcopy < ~/.ssh/id_rsa.pub
 ```

4. You're now ready to [add the key to your Pantheon account](/docs/articles/users/generating-ssh-keys/#add-the-key-to-your-pantheon-account).

## Windows / OpenSSH

Before you can generate an SSH key, you'll need to [download](http://git-scm.com/downloads) and install Git. Follow these instructions once that is complete.

1. Open the Git Gui.
2. From the Help menu, click **Show SSH Key**. 
3. Click **Generate Key**.
4. Enter a passphrase (optional, but recommended). It doesn't have to be the same as your Pantheon password, and it will help protect your key.
5. Ensure the whole key is selected and click **Copy to Clipboard**.  

### Add the Key to your Pantheon Account

1. Sign in to Pantheon and go to the **Account** page.
2. Click **SSH Keys**.
3. Paste the copied public key into the box, and click **Add Key**.  
![Adding SSH Keys](/source/docs/assets/images/add-ssh-key-dashboard.png)
  Your computer is now set up to securely connect to the Pantheon Git server.  
5. Open the Git bash client, and put in the command to clone your Pantheon site. This is found in the Dev environment of your site above the Git code log.
6. If prompted, enter the password.

For more detailed instructions on adding SSH keys, see [Loading SSH Keys](/docs/articles/users/loading-ssh-keys).

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
```nohighlight
ControlPath too long fatal: Could not read from remote repository.
```
Check your SSH config files (by default, `$HOME/.ssh/config and /etc/ssh/ssh\_config`) for a declaration like this:
```bash
Host *
ControlMaster auto
ControlPath ~/.ssh/control-%l.%r@%h:%p
```

There are two steps to take to fix this error. First, enter the following command:
```bash
Host *
ControlMaster auto
ControlPath ~/.ssh/control-%r
```
If this does not fix the problem, go a step further and add individual hosts entries, remove ControlMaster auto, and simplify the switches:
```bash
Host myapp-myname.blahblah.com
ControlPath ~/.ssh/control-%r
```
#### Server Refused to Allocate pty

This error occurs when a user is attempting to make a direct connection to Pantheon via SSH. Pantheon does not support [direct SSH connections](/docs/articles/users/generating-ssh-keys).
