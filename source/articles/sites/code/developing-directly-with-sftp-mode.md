---
title: Developing on Pantheon Directly with SFTP Mode
description: Use SFTP Mode to develop directly on the Pantheon Dashboard.
category:
  - developing

---

## Overview
In some cases working via `git push` is not the best option. You may not like local development, or you may want to show work to a remote collaborator (or client) immediately, or need to debug a specific problem that only occurs on the Pantheon platform.

This is why we offer **SFTP mode** . This allows you to develop <me>directly on Pantheon, and can be a major time-saver.</me>

**Note:** Due to the nature of our platform, the connection information will change from time to time due to server upgrades, endpoint migrations, etc. You will need to check this within the Dashboard periodically or when you find that you can’t connect.

**ProTip:**  If you want to use your website framework's built-in update systems (e.g. the `apps.module` in Drupal, or the plugin/theme manager in WordPress), enable SFTP first!

![Enable SFTP mode](https://pantheon-systems.desk.com/customer/portal/attachments/278855)

**Warning:** SFTP changes to code that have not been committed _will not be saved in backups_ as they are not part of your code repository yet, and they _will not persist over time_ as your development server migrates through the cloud. You must commit these file changes if you want to keep them permanently. If you switch from SFTP to Git mode while uncommitted changes are pending, you will be presented with a dialog confirming that you don't want to keep these changes, and if confirmed, they will be deleted.

As you work via SFTP, the Pantheon developer dashboard will track your changes. You can then commit them to version control once you are happy with the results without having to ever mess around with Git directly.

**Note:**  This does mean you won't be able to save anything that's being excluded from version control via `.gitignore`.

## SFTP mode

Every development environment has a toggle to switch between SFTP and Git modes; this is to prevent you from accidentally overwriting changes from a different source. If you need to enable SFTP mode, just click the toggle.

When in SFTP mode, there's comment box above the commit log. As you make changes to the codebase you will see all the pending changes appear.

## SFTP Connection Information

To get your SFTP login credentials you can click on the "Connection Info" button. This will show your connection credentials as well as a link that may allow you to connect directly with your preferred client.

![SFTP Connection Data](https://pantheon-systems.desk.com/customer/portal/attachments/278856)

The connection information is a bit different than what you might be used to though as it based on your unique "Site ID". This is the long random-seeming string at the end of your dashboard URL and in your git connection string, something like: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`.

Your connection data is as follows:

<tbody>
		<tr>
			<td><b>host</b></td>
			<td>appserver.dev.<tt>site-id</tt>.drush.in</td>
		</tr>
		<tr>
			<td><b>user</b></td>
			<td>dev.<tt>site-id</tt>
</td>
		</tr>
		<tr>
			<td><b>port</b></td>
			<td>2222</td>
		</tr>
	</tbody>
 

**Note:** When you setup your SFTP client remember that _SFTP_ will be the protocol and you will need to connect to your environment using port _2222_.

It is possible to connect to an environment via SFTP by using the terminal. The command is easily accessible from the Connection information widget for the environment you are on.

There is also a one-click that will allow you to connect with a GUI client. For instance, in MacOS Cyberduck:

![Cyberduck Example](https://pantheon-systems.desk.com/customer/portal/attachments/278857)

There are links to specific guides for other GUI tools at the end of this doc page.

The main directory listing includes Pantheon, logs, environment data and configuration. You're free to take a look there, but your website is in the "code" directory.

## Authenticating

There are two ways to get access to your Pantheon site via SFTP. One method is by using you Pantheon account's dashboard password.  


Alternatively you can connect via SFTP using the public [SSH key you uploaded to your account](/articles/users/loading-ssh-keys/-loading-ssh-keys). This will allow for password-less authentication. If you would like to [generate a SSH key](/articles/users/generating-ssh-keys/-generating-ssh-keys) you can get more information on the wiki.

## Committing SFTP Changes

Even though you are unable to use git to push remotely with SFTP mode enabled, you still need to commit your changes to save them, or to push them to test/live. You should commit early and commit often. As soon as you are happy with a change, make a commit.

After you have made a change to your code you will notice that a message appears bellow the comment box letting you know you have some changes that are not in your repository.

![Viewing changes made via SFTP](https://pantheon-systems.desk.com/customer/portal/attachments/278859)

Clicking on the yellow notification message will then expand the listing of pending changes you have made.

You should try to write a helpful commit message to go with your changes. This will make maintaining your code a saner process, and make it easier for any other developers who pull your changes down to understand what you've done.

![Writing a commit message](https://pantheon-systems.desk.com/customer/portal/attachments/278861)

Once your message is ready, clicking on commit will trigger the commit job and a push notification will block the UI as the code is being committed.

![Committing Blocking UI](https://pantheon-systems.desk.com/customer/portal/attachments/278852)

The blocking UI will appear for all users on the team who are looking at that environment. This is to maintain the integrity of the changes and so each team member is aware of the current state of the code.

**ProTip** : Your dashboard will track all changes made within your codebase. File change notifications will not include changes in the content files directory (e.g. `wp-content/uploads` or `sites/default/files/`) since these are not tracked in version control.

## GUI Tool Guides

SFTP mode works with any standards-compliant SFTP client, including many GUI tools and IDEs. We have specific guides to some:

- [PHPStorm](/articles/local/configuring-jetbrains-phpstorm-ide-with-pantheon/)
- [FileZilla](/articles/local/filezilla-on-pantheon/)
- [WinSCP](/articles/local/using-winscp-on-pantheon/)


## Troubleshooting

### I can't write to my codebase on Test or Live.

This is by design. Please read [this section](/articles/sites/code/using-the-pantheon-workflow/-using-the-pantheon-workflow#perms-test-live) of our Pantheon Workflow article to understand why.
