---
title: Developing on Pantheon Directly with SFTP Mode
description: Detailed information on how to use SFTP Mode to directly develop your Drupal or WordPress site on Pantheon.
tags: [admin]
categories: []
---
In some cases, working via Git is not the best option. You may not like local development, or you may want to show work to a remote collaborator (or client) immediately, or need to debug a specific problem that only occurs on the Pantheon platform.

SFTP mode allows you to develop directly on Pantheon and can be a major time-saver. If you want to [use your website framework's built-in update systems](/docs/more-sftp/) (e.g. the <code>apps.module</code> in Drupal, or the plugin/theme manager in WordPress), enable SFTP first.

<div class="alert alert-danger" role="alert">
  <h4 class="info">SFTP Mode Considerations</h4>
  <h5>Commit frequently and keep in mind:</h5>
  <ul>
    <li>SFTP changes to code that have not been committed will <strong> not be saved in backups and not included in deployments</strong> as they are not part of your code repository yet.</li>
    <li>The connection information will change from time to time due to server upgrades, endpoint migrations, etc. You will need to check this within the Dashboard periodically or when you find that you can’t connect.</li>
    <li>Containers are migrated as a regular part of maintenance.  This can delete uncommitted changes.</li>
    <li>You won't be able to save anything that's being excluded from version control via <code>.gitignore</code>.</li>
  </ul>
</div>


## SFTP Mode
Every Development environment has a toggle to switch between SFTP and Git modes; this is to prevent you from accidentally overwriting changes from a different source. To enable SFTP mode, click the **SFTP** button next to Connection Mode.

When in SFTP mode, there's comment box above the commit log. As you make changes to the codebase, the Dashboard will track your changes and you'll see all the pending changes. You can then commit them to version control once you are happy with the results without having to ever use Git.

 ![Enable SFTP mode](/source/docs/assets/images/dashboard/sftp-enabled.png)

## SFTP Connection Information

To get your SFTP login credentials, click **SFTP Connection Info**. You will see your connection credentials and a link to connect directly with your preferred client.

 ![SFTP Connection Data](/source/docs/assets/images/dashboard/sftp-connection-info.png)<br />

The connection information is a bit different than what you might be used to, and it's based on your unique "Site ID". This is the long string at the end of your Dashboard URL.

Your connection data is as follows:

**host:** `appserver.dev.site-id.drush.in`

**user:** `dev.site-id`

**port:** `2222`
 
<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p>When you set up your SFTP client, remember that SFTP is the protocol and you need to connect to your environment using port 2222.</p></div>

It is possible to connect to an environment via SFTP by using the terminal. The command is easily accessible from the Connection Information widget for the environment you are on.

There is also a one-click option so you can connect with a GUI client. The main directory listing includes Pantheon, logs, environment data and configuration. Your website is in the `code` directory. For instance, in Mac OS Cyberduck:
 ![Cyberduck Example](/source/docs/assets/images/cyberduck-example.png)<br />
Get the instructions for other [SFTP clients](/docs/sftp#sftp-clients).


## Authenticating
Follow development best practice workflows by [authenticating via SSH key for password-less access](/docs/ssh-keys). Alternatively, you may use your Pantheon Dashboard password when prompted, however larger agencies with multiple developers who login frequently may cause access issues across the organization. To avoid potential authentication failures, we strongly recommend using SSH keys. For details, see <a href="/docs/organization-faq#why-do-login-attempts-fail-for-all-users-across-my-organization-simultaneously?" data-proofer-ignore>Pantheon Organizations FAQs</a>.

## Committing SFTP Changes

Even though you are unable to use Git to push remotely with SFTP mode enabled, you still need to commit your changes to save them, or push them to Test/Live. **Commit early and commit often**.

After you have made a change to your code, you will see a message that appears below the comment box to let you know you have some changes that are not in your repository. Clicking the notification message expands the listing of the pending changes.

Write a helpful commit message to go with your changes. This will make maintaining your code a saner process, and make it easier for any other developers who pull your changes down to understand what you've done.

Once your message is ready, click **Commit**.


<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p>Your Dashboard tracks all changes made within your codebase. File change notifications will not include changes in the content files directory (e.g. <code>wp-content/uploads</code> or <code>sites/default/files/</code>) since these are not tracked in version control.</p>
</div>

## SFTP Clients

SFTP mode works with any standards-compliant SFTP client, including many GUI tools and IDEs. We have specific guides to some:

- PHPStorm with [WordPress](/docs/wordpress-phpstorm) and [Drupal](/docs/drupal-phpstorm)
- [FileZilla](/docs/filezilla/)
- [WinSCP](/docs/winscp/)

## Troubleshooting

### I can't connect via SFTP to the site.

Make sure your site has not [spun down after being idle](/docs/application-containers/#idle-containers). Simply visit the site in your web browser and let it fully load then try connecting again.

If your site is not idle and your [SFTP settings are correct](/docs/sftp/#sftp-connection-information) (including SFTP mode and port `2222`) you may be on a network that restricts what outbound ports you can access. An example may be an office or public wifi that only allows web traffic on port `80` (HTTPS)  and `443` (HTTPS).

A simple way to test for outbound network restrictions is to load a special web site that listens on all ports. To test your access outbound on port `2222`, try to load this web page in your web browser:

* [http://portquiz.net:2222/](http://portquiz.net:2222/)

If you **cannot** access that web page then your network or firewall is likely preventing you from accessing port `2222` outbound. Contact your network administrators to allow outbound access on port `2222`. Advanced users may also be comfortable [establishing an SSH tunnel through another server](/docs/port-2222/) instead.

If you **can** access that web page on port `2222` then your issue does not appear to be network or firewall related.  Be sure to double-check or re-enter your [SFTP settings](/docs/sftp/#sftp-connection-information), including SFTP mode and port `2222`. Contact Pantheon Support if you still have trouble.

### I can't write to my codebase on Test or Live.

This is by design. Please see [Using the Pantheon Workflow
](/docs/pantheon-workflow#understanding-write-permissions-in-test-and-live) to learn why.


### SFTP changes do not show up in the Site Dashboard.
Uncommitted SFTP changes may not be recognized by the Dev environment when the Site Dashboard is open in multiple tabs or windows. Close all windows and tabs then access the Site Dashboard in a single tab to resolve.

### My SFTP client takes a long time to connect.

Your SSH connection may be using a slow encryption protocol. Configuring your SSH client to use the `diffie-hellman-group1-sha1` protocol will result in the fastest connections. For OSX/Linux, add the following to your ssh config (~/.ssh/config):

    Host *.drush.in
        KexAlgorithms diffie-hellman-group1-sha1

### I am receiving errors connecting to my server with an SFTP client.
This is caused by using the SFTP application's default connection settings. We recommend you set the connection limit to **1** and then connect to your site.

Do not specify a default remote directory within your SFTP client. When application servers are migrated, which can be done at anytime, the remote directory will change.

### I can't move files from one folder to another.
This is a known limitation of using SFTP for on-server development on the platform. You can work around the limitation by transferring the files from your local machine or using rsync.

### DNS Connection Issues

    Status:	Connecting to appserver.dev.dc82c743-3088-426f-bfcf-e388e4add2b3.drush.in:2222...
    Response:	fzSftp started
    Command:	open "dev.dc82c743-3088-426f-bfcf-e388e4add2b3@appserver.dev.dc82c743-3088-426f-bfcf-e388e4add2b3.drush.in" 2222
    Error:	ssh_init: Host does not exist
    Error:	Could not connect to server

Trouble resolving the server hostname or other DNS-related issues can generally be resolved by using Google's Public DNS service in place of your ISP's name servers. See [Google's Public DNS](https://developers.google.com/speed/public-dns/) for instructions.

If you're already using Google's DNS, or you're still having connection issues after updating your name-servers, consider trying an alternative SFTP client. Many times when FileZilla won't connect, Cyberduck (or another client) will. View a list of [SFTP clients](http://en.wikipedia.org/wiki/Comparison_of_FTP_client_software).

### DNS Hijacking Issues
There have been observed cases in which Internet Service Providers (specifically Indonesian Telecom) hijack DNS, leaving you unable to connect via SFTP due to a timeout error:

    Unable to connect to host codeserver.dev.<xxx>.drush.in, or the request timed out.
    Be sure that the address is correct and that you have the necessary privileges, or try increasing the connection timeout (currently 10 seconds).

Replace `SITE_UUID` with your site's [UUID](/docs/sites/#site-uuid) and run the following to obtain the returned IP address:

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

### I registered my Pantheon account via Google. How do I connect to SFTP?
We recommend [adding an SSH Key](/docs/ssh-keys/), which allows more security than a simple password. If you've registered via social login (Connect with Google) and you'd still like to add a password to your account, logout and visit [https://dashboard.pantheon.io/reset-password](https://dashboard.pantheon.io/reset-password)
