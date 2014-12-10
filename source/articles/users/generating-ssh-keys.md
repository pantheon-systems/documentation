---
title: Generating SSH Keys
description: Understand how to generate SSH keys to configure Drush or SFTP.
parent_guide:
  - going-live
filename: source/_guides/generating-ssh-keys.md
---

 **NOTE:** SSH as a protocol is not supported on Pantheon. <!--You can not connect via SSH using Putty.--> These directions are to allow you have passwordless access if you configure Drush or SFTP to use the keys setup by putty

NOTE: SSH keys include the user and hostname of the account/computer that it was generated on as a comment (in the form of "==user@usercomputer") at the end of the file.

NOTE: If you experience errors, see the troubleshooting section at the end of the document.

Spaces and non-standard alphanumeric characters in the user or hostname can cause an SSH key to appear invalid to Pantheon.

To fix this, please edit the user or hostname and remove spaces and/or odd characters that exist. This will not affect the key itself, as the user/hostname are simply appended as a comment for reference.

Genrating SSH keys is different for every platform. Please follow the directions that are most appropriate for you below:

1.

[MacOS and Linux](/documentation/howto/generating-ssh-keys/-generating-ssh-keys#generating-keys-on-mac-os-x-and-linux)

2.

[Windows / Git GUI and OpenSSH](/documentation/howto/generating-ssh-keys/-generating-ssh-keys#generating-keys-on-windows-and-openssh)

<!--<li>
	<p><a href="/documentation/howto/generating-ssh-keys/-generating-ssh-keys#generating-keys-on-windows-and-putty">Windows / PuTTY</a></p>
	</li>-->
### MacOS and Linux

Open your favorite terminal utility and generate a key:

    ssh-keygen

Unless you're an advanced user, just press ENTER for every question. If the command says the key already exists, you can either overwrite it or continue onto the next step with your existing key.

Still from the Terminal, output your SSH key to a file you can use:

    cat ~/.ssh/id_rsa.pub > ~/Desktop/key_for_pantheon.txt

Open the `key_for_pantheon.txt` on your desktop, select all and copy. You're now ready to paste this into the "Add Key" form on your account page.

### Windows / OpenSSH

[Download](http://git-scm.com/downloads) and install Git.

![](https://pantheon-systems.desk.com/customer/portal/attachments/46904)

Once you have downloaded the Git GUI installer you can get started with the setup wizard.

![](https://pantheon-systems.desk.com/customer/portal/attachments/46905)

To continue you will need to read and accept the License by click the "Next" button.

![](https://pantheon-systems.desk.com/customer/portal/attachments/46906)

At this point you will have to select the installation folder that you want have Git installed. Unless you need to move this to another directory you can leave this with the default path.

![](https://pantheon-systems.desk.com/customer/portal/attachments/46907)

If want to have the git GUI appear in the start menu you can go ahead and set the title. In this instance we simply set it to "Git".

![](https://pantheon-systems.desk.com/customer/portal/attachments/46908)

A nice feature of the Git GUI is that it can set the PATH variable for you. If you are using Cygwin you will also need the have the Cygwin Git library installed and this way you can access git via the command line.

![](https://pantheon-systems.desk.com/customer/portal/attachments/46909)

Choose option: "Checkout Windows-style..." (unless you prefer checking out with Unix line endings). It's really up to you, but most Drupal code has Unix line endings.

![](https://pantheon-systems.desk.com/customer/portal/attachments/46910)

Voila! You are done with the installation of Git. Next you can move on the final steps of generating your SSH keys using the GUI.

![](https://pantheon-systems.desk.com/customer/portal/attachments/46911)

From the Start menu, open the "Git Gui." and Under the "Help" menu, click "Show SSH Key." 

![](https://pantheon-systems.desk.com/customer/portal/attachments/46912)

You probably don't have one yet, so click "Generate Key." 

![](https://pantheon-systems.desk.com/customer/portal/attachments/46915)

We recommend using a passphrase, but it's optional. It doesn't have to be the same as your Pantheon password, and it will help protect your key.

Ensure the whole key is selected (white text on a blue background). If it's not selected, triple-click on the random-looking text. Finally, click "Copy To Clipboard."

![](https://pantheon-systems.desk.com/customer/portal/attachments/46914)

### Add the key to your Pantheon account:

Here we will only cover the basics, but if you need more detailed instructions on this section, then take a look at the [Loading SSH Keys](/documentation/getting-started/loading-ssh-keys/) section of the wiki.

1.

Sign on to Pantheon and visit the "Your Sites & Account" page.

2.

Click the button in the lower right to add a new key.

3.

Paste the copied public key into the box and click to save it.

4.

Your computer is now set up to securely connect to the Pantheon git server.

Open Up the git bash client and put in the command to clone your Pantheon site. You can find this in the Dev environment of yor site above the git code log.

If you have added a password to your key earlier then you will be prompted to enter the password for the key you created using the git GUI tool.

![](https://pantheon-systems.desk.com/customer/portal/attachments/46916)

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
	<p>Follow the instructions telling you to move your mouse around the box until PuTTY finishes generating the key.</p>
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
	<p>Close the window if you like, but you might want to keep it open for now in case you lose the key copied to your clipboard.</p>
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
### Troubleshooting

#### Control Path Error

You may receive the following error:

    ControlPath too long fatal: Could not read from remote repository.

Check your SSH config files (by default, $HOME/.ssh/config and /etc/ssh/ssh\_config) for a declaration like this:

    Host *
    ControlMaster auto
    ControlPath ~/.ssh/control-%l.%r@%h:%p

 

There are two steps that you can try to fix this error:

    Host *
    ControlMaster auto
    ControlPath ~/.ssh/control-%r

1. You can fix this by simplifying the switches as follows:
2. If this does not fix the problem, you can go a step further and add individual hosts entries, remove ControlMaster auto, and simplify the switches:

    Host myapp-myname.blahblah.com
    ControlPath ~/.ssh/control-%r

#### Server refused to allocate pty

This error occurs when a user is attempting to make a direct connection to Pantheon via SSH. Pantheon does not support [direct SSH connections](/documentation/howto/generating-ssh-keys/-generating-ssh-keys#message_391).
