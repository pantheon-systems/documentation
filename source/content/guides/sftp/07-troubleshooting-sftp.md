---
title: SFTP on Pantheon
subtitle: Troubleshooting SFTP
description: Get solutions to common SFTP troubleshooting scenarios.
tags: [files, sftp, code]
reviewed: "2020-02-18"
categories: [sftp]
newcms: [drupal, wordpress]
audience: [development]
product: [dashboard]
integration: [--]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/sftp/troubleshooting-sftp
anchorid: troubleshooting-sftp
---

This section provides solutions to common troubleshooting scenarios.

### I can't connect via SFTP to the site

Make sure your site has not [spun down after being idle](/application-containers/#idle-containers). Visit the site in your web browser and let it fully load then try connecting again.

If your site is not idle and your [SFTP settings are correct](/guides/sftp/sftp-connection-info) (including SFTP mode and port `2222`) you may be on a network that restricts what outbound ports you can access. An example may be an office or public wifi that only allows web traffic on port `80` (HTTPS)  and `443` (HTTPS).

A simple way to test for outbound network restrictions is to load a special web site that listens on all ports. To test your access outbound on port `2222`, try to load this web page in your web browser:

- [http://portquiz.net:2222/](http://portquiz.net:2222/)

If you **cannot** access that web page then your network or firewall is likely preventing you from accessing port `2222` outbound. Contact your network administrators to allow outbound access on port `2222`. Advanced users may also be comfortable [establishing an SSH tunnel through another server](/port-2222) instead.

If you **can** access that web page on port `2222` then your issue does not appear to be network or firewall related. Be sure to double-check or re-enter your [SFTP settings](/guides/sftp/sftp-connection-info), including SFTP mode and port `2222`. Contact Pantheon Support if you still have trouble.

### I registered my Pantheon account via Google. How do I connect to SFTP?

We recommend [adding an SSH Key](/ssh-keys), which allows more security than a simple password. If you've registered via social login (Connect with Google) and you'd still like to add a password to your account, logout and visit [https://dashboard.pantheon.io/reset-password](https://dashboard.pantheon.io/reset-password)

### I can't write to my codebase on Test or Live.

This is part of the [Pantheon WebOps workflow](/pantheon-workflow) that keeps code and content safe. Please see [Using the Pantheon Workflow](/pantheon-workflow#understanding-write-permissions-in-test-and-live) to learn more about why.

### SFTP changes do not show up in the Site Dashboard.

Uncommitted SFTP changes may not be recognized by the Dev environment when the Site Dashboard is open in multiple tabs or windows. Close all windows and tabs then access the Site Dashboard in a single tab to resolve.

### How do I find my site's remote path?

<Alert title="Note" type="info">

You should *not* manually set the "Remote Path" in your SFTP client's settings, as this path changes from time to time due to the platform architecture. It is strongly recommended that you leave the Remote Path blank, and you will automatically be redirected to the proper directory when logging in.

</Alert>

You can find the Remote Path, also known as the **binding path**, after [connecting to SFTP](#sftp-connection-information) via command line, using the `pwd` (print working directory) command:

```bash
sftp> pwd
Response: Remote working directory: /srv/bindings/daa068ccf4f8414596cddf5xxxxx
```

### I am receiving errors connecting to my server with an SFTP client.

This is caused by using the SFTP application's default connection settings. We recommend you set the connection limit to **1** and then connect to your site.

Do not specify a default remote directory within your SFTP client. When application containers are migrated, which can be done at anytime, the remote directory will change.

### I can't move files or folders from one directory to another.

This is a known limitation of using SFTP for on-server development on the platform. Our SFTP mode doesn't support the `mv` command, which most SFTP applications use when moving or renaming files. You can work around the limitation by transferring the files from your local machine or using rsync.

### DNS Connection Issues

```none
Status: Connecting to appserver.dev.dc82c743-3088-426f-bfcf-e388e4add2b3.drush.in:2222...
Response:    fzSftp started
Command:    open "dev.dc82c743-3088-426f-bfcf-e388e4add2b3@appserver.dev.dc82c743-3088-426f-bfcf-e388e4add2b3.drush.in" 2222
Error:  ssh_init: Host does not exist
Error:  Could not connect to server
```

Trouble resolving the server hostname or other DNS-related issues can generally be resolved by using Google's Public DNS service in place of your ISP's name servers. See [Google's Public DNS](https://developers.google.com/speed/public-dns/) for instructions.

If you're already using Google's DNS, or you're still having connection issues after updating your name-servers, consider trying an alternative SFTP client. Many times when FileZilla won't connect, Cyberduck (or another client) will. View a list of [SFTP clients](https://en.wikipedia.org/wiki/Comparison_of_FTP_client_software).

### DNS Hijacking Issues

There have been observed cases in which Internet Service Providers (specifically Indonesian Telecom) hijack DNS, leaving you unable to connect via SFTP due to a timeout error:

```none
Unable to connect to host codeserver.dev.<xxx>.drush.in, or the request timed out.
Be sure that the address is correct and that you have the necessary privileges, or try increasing the connection timeout (currently 10 seconds).
```

Replace `SITE_UUID` with your site's [UUID](/guides/account-mgmt/workspace-sites-teams/sites#retrieve-the-site-uuis) and run the following to obtain the returned IP address:

```bash{promptUser: user}
dig codeserver.dev.<SITE_UUID>.drush.in
```

The returned IP is found within the ANSWER portion of the output:

```bash
;; ANSWER SECTION:
codeserver.dev.<SITE_UUID>.drush.in. 188 IN A xx.xx.xx.xxx
```

Run the address through [IP WHOIS Lookup](https://www.whatismyip.com/ip-whois-lookup/) and review the results. The following is an example of DNS hijacking:

```none
% [whois.apnic.net]
% Whois data copyright terms    https://www.apnic.net/manage-ip/using-whois/bulk-access/copyright/

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
```

Unfortunately, no permanent solution has been found aside from changing Internet Service Providers. In some cases, you may be able troubleshoot the issue with your ISP or connect using a VPN.

## More Resources

- [Domain Name System](/guides/domains/dns)
- [Port 2222 Blocked Workaround](/port-2222)
- [SERVER_NAME and SERVER_PORT on Pantheon](/server_name-and-server_port)