---
title: Developing on Pantheon Directly with SFTP Mode
description: Detailed information on how to use SFTP Mode to directly develop on Pantheon site environments.
category:
  - developing
keywords: sftp, sftp mode, wp-admin, apps.module, administrator, admin, connection info, connection information, sftp connection info, sftp connection information, authenticate sftp, access denied sftp, forbidden, authentication, commit sftp changes, commit changes, develop using sftp, make changes using sftp, how to use admin
---
In some cases working via `git push` is not the best option. You may not like local development, or you may want to show work to a remote collaborator (or client) immediately, or need to debug a specific problem that only occurs on the Pantheon platform.

This is why we offer **SFTP mode**. This allows you to develop directly on Pantheon and can be a major time-saver.

If you want to use your website framework's built-in update systems (e.g. the <code>apps.module</code> in Drupal, or the plugin/theme manager in WordPress), enable SFTP first!

<div class="alert alert-info" role="alert">
<strong>Note</strong>: Due to the nature of our platform, the connection information will change from time to time due to server upgrades, endpoint migrations, etc. You will need to check this within the Dashboard periodically or when you find that you can’t connect.</div>

 ![Enable SFTP mode](/source/docs/assets/images/desk_images/278855.png)
<div class="alert alert-danger" role="alert"><strong>Warning:</strong> SFTP changes to code that have not been committed <em>will not be saved in backups</em> as they are not part of your code repository yet. If you have pending changes and the site is migrated (which we may do at any time for various reasons), your changes will be lost without warning. You must commit these file changes if you want to keep them permanently. If you switch from SFTP to Git mode while uncommitted changes are pending, you will be presented with a dialog confirming that you don't want to keep these changes, and if confirmed, they will be deleted.</div>

As you work via SFTP, the Pantheon  Dashboard will track your changes. You can then commit them to version control once you are happy with the results without having to ever mess around with Git directly.

<div class="alert alert-info" role="alert">
<strong>Note</strong>: This does mean you won't be able to save anything that's being excluded from version control via <code>.gitignore</code>.</div>

## SFTP mode

Every development environment has a toggle to switch between SFTP and Git modes; this is to prevent you from accidentally overwriting changes from a different source. If you need to enable SFTP mode, just click the **SFTP** button next to Connection Mode.

When in SFTP mode, there's comment box above the commit log. As you make changes to the codebase you will see all the pending changes appear.

## SFTP Connection Information

To get your SFTP login credentials you can click **Connection Info**. This will show your connection credentials as well as a link that may allow you to connect directly with your preferred client.
 ![SFTP Connection Data](/source/docs/assets/images/desk_images/278856.png)<br />
The connection information is a bit different than what you might be used to though as it based on your unique "Site ID". This is the long random-seeming string at the end of your Dashboard URL and in your Git connection string, something like: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`.

Your connection data is as follows:
<table>
<tbody>
		<tr>
			<td><b>host: </b></td>
			<td>appserver.dev.<tt>site-id</tt>.drush.in</td>
		</tr>
		<tr>
			<td><b>user: </b></td>
			<td>dev.<tt>site-id</tt>
</td>
		</tr>
		<tr>
			<td><b>port: </b></td>
			<td>2222</td>
		</tr>
	</tbody>
</table>
 


<div class="alert alert-warning" role="alert">
<strong>Note</strong>: When you setup your SFTP client remember that <em>SFTP</em> will be the protocol and you will need to connect to your environment using port <em>2222</em>.</div>

It is possible to connect to an environment via SFTP by using the terminal. The command is easily accessible from the Connection information widget for the environment you are on.

There is also a one-click that will allow you to connect with a GUI client. For instance, in MacOS Cyberduck:
 ![Cyberduck Example](/source/docs/assets/images/desk_images/278857.png)<br />
There are links to specific guides for other GUI tools at the end of this article.

The main directory listing includes Pantheon, logs, environment data and configuration. You're free to take a look there, but your website is in the `code` directory.

## Authenticating

There are two ways to get access to your Pantheon site via SFTP. One method is by using you Pantheon account's Dashboard password.  

Alternatively you can connect via SFTP using the public [SSH key you uploaded to your account](/docs/articles/users/loading-ssh-keys). This will allow for password-less authentication. If you would like to [generate a SSH key](/docs/articles/users/generating-ssh-keys) you can get more information on the wiki.

## Committing SFTP Changes

Even though you are unable to use Git to push remotely with SFTP mode enabled, you still need to commit your changes to save them, or to push them to Test/Live. You should commit early and commit often. As soon as you are happy with a change, make a commit.

After you have made a change to your code you will notice that a message appears bellow the comment box letting you know you have some changes that are not in your repository.
 ![Viewing changes made via SFTP](/source/docs/assets/images/desk_images/278859.png)<br />
Clicking on the yellow notification message will then expand the listing of pending changes you have made.

You should try to write a helpful commit message to go with your changes. This will make maintaining your code a saner process, and make it easier for any other developers who pull your changes down to understand what you've done.<br />
 ![Writing a commit message](/source/docs/assets/images/desk_images/278861.png)<br />
Once your message is ready, clicking on commit will trigger the commit job and a push notification will block the UI as the code is being committed.<br />
 ![Committing Blocking UI](/source/docs/assets/images/desk_images/278852.png)<br />
The blocking UI will appear for all users on the team who are looking at that environment. This is to maintain the integrity of the changes and so each team member is aware of the current state of the code.

<div class="alert alert-info" role="alert">
<strong>Note</strong>: Your dashboard will track all changes made within your codebase. File change notifications will not include changes in the content files directory (e.g. <code>wp-content/uploads</code> or <code>sites/default/files/</code>) since these are not tracked in version control.</div>

## GUI Tool Guides

SFTP mode works with any standards-compliant SFTP client, including many GUI tools and IDEs. We have specific guides to some:

- PHPStorm with [WordPress](/docs/articles/wordpress/configuring-phpstorm-on-pantheon-for-wordpress) and [Drupal](/docs/articles/drupal/configuring-jetbrains-phpstorm-ide-with-pantheon)
- [FileZilla](/docs/articles/local/filezilla/)
- [WinSCP](/docs/articles/local/using-winscp/)


## Troubleshooting

### I can't write to my codebase on Test or Live.

This is by design. Please see [Using the Pantheon Workflow
](/docs/articles/sites/code/using-the-pantheon-workflow#understanding-write-permissions-in-test-&-live) to learn why.

###I am receiving errors connecting to my server with an SFTP client.
This is caused by using the SFTP application's default connection settings. We recommend you set the connection limit to **1** and then connect to your site.
