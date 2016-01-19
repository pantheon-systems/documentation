---
title: Developing on Pantheon Directly with SFTP Mode
description: Detailed information on how to use SFTP Mode to directly develop on Pantheon Website Management Platform environments.
category:
  - developing
keywords: sftp, sftp mode, wp-admin, apps.module, administrator, admin, connection info, connection information, sftp connection info, sftp connection information, authenticate sftp, access denied sftp, forbidden, authentication, commit sftp changes, commit changes, develop using sftp, make changes using sftp, how to use admin
---
In some cases, working via `git` is not the best option. You may not like local development, or you may want to show work to a remote collaborator (or client) immediately, or need to debug a specific problem that only occurs on the Pantheon platform.

This is why we offer **SFTP mode**. This allows you to develop directly on Pantheon and can be a major time-saver.

If you want to use your website framework's built-in update systems (e.g. the <code>apps.module</code> in Drupal, or the plugin/theme manager in WordPress), enable SFTP first.

<div class="alert alert-info" role="alert">
<h4>Note</h4>
Due to the nature of our platform, the connection information will change from time to time due to server upgrades, endpoint migrations, etc. You will need to check this within the Dashboard periodically or when you find that you can’t connect.</div>

 ![Enable SFTP mode](/source/docs/assets/images/desk_images/278855.png)
<div class="alert alert-danger" role="alert"><h4>Warning</h4>
SFTP changes to code that have not been committed will <strong>not be saved in backups</strong> as they are not part of your code repository yet. You must commit these file changes if you want to keep them permanently. If you switch from SFTP to Git mode while uncommitted changes are pending, you will be presented with a dialog confirming that you don't want to keep these changes, and if confirmed, they will be deleted.</div>

As you work via SFTP, the Pantheon Dashboard will track your changes. You can then commit them to version control once you are happy with the results without having to ever use Git.

<div class="alert alert-info" role="alert">
<h4>Note</h4>
This means you won't be able to save anything that's being excluded from version control via <code>.gitignore</code>.</div>

## SFTP Mode

Every development environment has a toggle to switch between SFTP and Git modes; this is to prevent you from accidentally overwriting changes from a different source. If you need to enable SFTP mode, just click the **SFTP** button next to Connection Mode.

When in SFTP mode, there's comment box above the commit log. As you make changes to the codebase you will see all the pending changes appear.

## SFTP Connection Information

To get your SFTP login credentials, click **Connection Info**. You will see your connection credentials and a link to connect directly with your preferred client.
 ![SFTP Connection Data](/source/docs/assets/images/desk_images/278856.png)<br />
The connection information is a bit different than what you might be used to, though it is based on your unique "Site ID". This is the long string at the end of your Dashboard URL and in your Git connection string, something like: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`.

Your connection data is as follows:

**host:** `appserver.dev.site-id.drush.in`

**user:** `dev.site-id`

**port:** `2222`
 


<div class="alert alert-info" role="alert">
<h4>Note</h4>
When you set up your SFTP client, remember that SFTP is the protocol and you need to connect to your environment using port 2222.</div>

It is possible to connect to an environment via SFTP by using the terminal. The command is easily accessible from the Connection Information widget for the environment you are on.

There is also a one-click option so you can connect with a GUI client. For instance, in Mac OS Cyberduck:
 ![Cyberduck Example](/source/docs/assets/images/desk_images/278857.png)<br />
Get more information for other [GUI tools](/docs/articles/sites/code/developing-directly-with-sftp-mode#gui-tool-guides).

The main directory listing includes Pantheon, logs, environment data and configuration. Your website is in the `code` directory.

## Authenticating

There are two ways to get access to your Pantheon site via SFTP. One method is by using your Pantheon account's Dashboard password.  

Alternatively, you can connect via SFTP using the public [SSH key you uploaded to your account](/docs/articles/users/loading-ssh-keys). This allows password-less authentication. Learn how to [generate a SSH key](/docs/articles/users/generating-ssh-keys).

## Committing SFTP Changes

Even though you are unable to use Git to push remotely with SFTP mode enabled, you still need to commit your changes to save them, or to push them to Test/Live. You should commit early and commit often.

After you have made a change to your code, you will see a message that appears bellow the comment box to let you know you have some changes that are not in your repository.
 ![Viewing changes made via SFTP](/source/docs/assets/images/desk_images/278859.png)<br />
Clicking on the notification message expands the listing of the pending changes.

Write a helpful commit message to go with your changes. This will make maintaining your code a saner process, and make it easier for any other developers who pull your changes down to understand what you've done.<br />
 ![Writing a commit message](/source/docs/assets/images/desk_images/278861.png)<br />
Once your message is ready, click **Commit**.<br />
 ![Committing Blocking UI](/source/docs/assets/images/desk_images/278852.png)<br />

<div class="alert alert-info" role="alert">
<h4>Note</h4>
Your Dashboard tracks all changes made within your codebase. File change notifications will not include changes in the content files directory (e.g. <code>wp-content/uploads</code> or <code>sites/default/files/</code>) since these are not tracked in version control.</div>

## GUI Tool Guides

SFTP mode works with any standards-compliant SFTP client, including many GUI tools and IDEs. We have specific guides to some:

- PHPStorm with [WordPress](/docs/articles/wordpress/configuring-phpstorm-on-pantheon-for-wordpress) and [Drupal](/docs/articles/drupal/configuring-jetbrains-phpstorm-ide-with-pantheon)
- [FileZilla](/docs/articles/local/filezilla/)
- [WinSCP](/docs/articles/local/using-winscp/)

## Troubleshooting

### I can't write to my codebase on Test or Live.

This is by design. Please see [Using the Pantheon Workflow
](/docs/articles/sites/code/using-the-pantheon-workflow#understanding-write-permissions-in-test-and-live) to learn why.

### My SFTP client takes a long time to connect.

Your SSH connection may be using a slow encryption protocol. Configuring your SSH client to use the `diffie-hellman-group1-sha1` protocol will result in the fastest connections. For OSX/Linux, add the following to your ssh config (~/.ssh/config):

    Host *.drush.in
        KexAlgorithms diffie-hellman-group1-sha1

### I am receiving errors connecting to my server with an SFTP client.
This is caused by using the SFTP application's default connection settings. We recommend you set the connection limit to **1** and then connect to your site.

Do not specify a default remote directory within your SFTP client. When application servers are migrated, which can be done at anytime, the remote directory will change.

### I can't move files from one folder to another.
This is a known limitation of using SFTP for on-server development on the platform. You can work around the limitation by transferring the files from your local machine or using rsync.

### Connection Issues

    Status:	Connecting to appserver.dev.dc82c743-3088-426f-bfcf-e388e4add2b3.drush.in:2222...
    Response:	fzSftp started
    Command:	open "dev.dc82c743-3088-426f-bfcf-e388e4add2b3@appserver.dev.dc82c743-3088-426f-bfcf-e388e4add2b3.drush.in" 2222
    Error:	ssh_init: Host does not exist
    Error:	Could not connect to server

The vast majority of SFTP connection problems are DNS related and can be resolved by using Google's Public DNS service in place of your ISP's name servers. See the instructions here: [Google's Public DNS](https://developers.google.com/speed/public-dns/)

If you're already using Google's DNS, or you're still having connection issues after updating your name-servers, consider trying an alternative SFTP client. Many times when FileZilla won't connect, Cyberduck (or another client) will. View a list of [SFTP clients](http://en.wikipedia.org/wiki/Comparison_of_FTP_client_software).

### DNS Hijacking Issues
There have been observed cases in which Internet Service Providers (specifically Indonesian Telecom) hijack DNS, leaving you unable to connect via SFTP due to a timeout error:

    Unable to connect to host codeserver.dev.<xxx>.drush.in, or the request timed out.
    Be sure that the address is correct and that you have the necessary privileges, or try increasing the connection timeout (currently 10 seconds).

Replace `SITE_UUID` with your site's [UUID](/docs/articles/sites/#site-uuid) and run the following to obtain the returned IP address:

    dig codeserver.dev.<SITE_UUID>.drush.in

The returned IP is found within the ANSWER portion of the output:

    ;; ANSWER SECTION:
    codeserver.dev.<SITE_UUID>.drush.in. 188 IN A xx.xx.xx.xxx

Run the address through [IP WHOIS Lookup](https://www.whatismyip.com/ip-whois-lookup/) and review the results. The following is an example of DNS hijacking:

    % [whois.apnic.net]
    % Whois data copyright terms    http://www.apnic.net/db/dbcopyright.html

    % Information related to 'xx.xx.xx.0 - xx.xx.xx.255'

    inetnum:        xx.xx.xx.0 - xx.xx.xx.255
    netname:        TLKM_BB_SERVICE_36_86
    descr:          PT TELKOM INDONESIA
                    STO Gambir 3rd Floor
                    Jl. Medan Merdeka Selatan No. 12
                    Jakarta 10110
    country:        ID
    admin-c:        AR165-AP
    tech-c:         HM444-AP
    status:         ALLOCATED NON-PORTABLE
    mnt-by:         MAINT-TELKOMNET
    mnt-irt:        IRT-IDTELKOM-ID
    changed:        hostmaster@telkom.net.id 20130123
    source:         APNIC

Unfortunately, no permanent solution has been found aside from changing Internet Service Providers. In some cases, you may be able troubleshoot the issue with your ISP or connect using a VPN.
