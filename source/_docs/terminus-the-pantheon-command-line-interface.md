---
title: The Terminus Drush Extension (Deprecated)
description: Detailed information on the Terminus drush extension for Pantheon.
categories:
  - developing
keywords: terminus, drush, drush extension, terminus commands
---
The Original Terminus project was a Drush extension and is now **deprecated**. It has been replaced with a stand-alone command-line utility, which you can read about in the [Terminus article](/docs/cli/ "Pantheon documentation article on the CLI project") and its [GitHub repository](https://github.com/pantheon-systems/cli "Pantheon's CLI Repository on github").

## Terminus 1 Project

You can still see the original, unmaintained Drush extension at [https://github.com/pantheon-systems/terminus-deprecated](https://github.com/pantheon-systems/terminus-deprecated).

## Terminus Support

This software is now deprecated and unsupported.

<table>
<thead>
<th style="font-size:24px;"> Terminus Commands</th>
</thead>
<tbody>
		<tr>
			<td><a href="#pantheon-aliases">pantheon-aliases</a></td>
			<td>Update the Pantheon Drush alias file at ~/.drush/pantheon.aliases.drushrc.php.</td>
		</tr>
		<tr>
			<td><a href="#pantheon-auth">pantheon-auth</a></td>
			<td>Authenticate against the Pantheon dashboard. Required before doing anything else.</td>
		</tr>
		<tr>
			<td><a href="#pantheon-hostname-add">pantheon-hostname-add</a></td>
			<td>Add a hostname to a site you control.</td>
		</tr>
		<tr>
			<td><a href="#pantheon-hostname-remove">pantheon-hostname-remove</a></td>
			<td>Remove a hostname from a site you control.</td>
		</tr>
		<tr>
			<td><a href="#pantheon-logout">pantheon-logout</a></td>
			<td>Clear any stored session data.</td>
		</tr>
		<tr>
			<td><a href="#pantheon-organization-sites">pantheon-organization-sites</a></td>
			<td>List the sites for an organization. Org admins only.</td>
		</tr>
		<tr>
			<td><a href="#pantheon-organizations">pantheon-organizations</a></td>
			<td>List your organization affiliations.</td>
		</tr>
		<tr>
			<td><a href="#pantheon-pp">pantheon-pp</a></td>
			<td>Direct pseudo-proxy interface. JSON only. For debugging.</td>
		</tr>
		<tr>
			<td><a href="#pantheon-products">pantheon-products</a></td>
			<td>Get the list of available Drupal product start-states.</td>
		</tr>
		<tr>
			<td><a href="#pantheon-site-attributes">pantheon-site-attributes</a></td>
			<td>Get attributes for a particular site.</td>
		</tr>
		<tr>
			<td><a href="#pantheon-site-backups">pantheon-site-backups</a></td>
			<td>List site backups (and exports).</td>
		</tr>
		<tr>
			<td><a href="#pantheon-site-branch-create">pantheon-site-branch-create</a></td>
			<td>Create Git branch of master for a particular site.</td>
		</tr>
		<tr>
			<td><a href="#pantheon-site-branch-delete">pantheon-site-branch-delete</a></td>
			<td>Delete a Git branch from a particular site.</td>
		</tr>
		<tr>
			<td><a href="#pantheon-site-branch-list">pantheon-site-branch-list</a></td>
			<td>List Git branches for a particular site.</td>
		</tr>
		<tr>
			<td><a href="#pantheon-site-change-owner">pantheon-site-change-owner</a></td>
			<td>Change the owner of a site.</td>
		</tr>
		<tr>
			<td><a href="#pantheon-site-clone">pantheon-site-clone</a></td>
			<td>Clone content from one site environment to another.</td>
		</tr>
		<tr>
			<td><a href="#pantheon-site-commit">pantheon-site-commit</a></td>
			<td>Commit changes in an on-server-dev environment.</td>
		</tr>
		<tr>
			<td><a href="#pantheon-site-connection-mode">pantheon-site-connection-mode</a></td>
			<td>Set or retrieve the connection mode of a specific site/environment.</td>
		</tr>
		<tr>
			<td><a href="#pantheon-site-create">pantheon-site-create</a></td>
			<td>Create a new site on Pantheon</td>
		</tr>
		<tr>
			<td><a href="#pantheon-site-dashboard">pantheon-site-dashboard</a></td>
			<td>Get the dashboard link for a site.</td>
		</tr>
		<tr>
			<td><a href="#pantheon-site-delete">pantheon-site-delete</a></td>
			<td>Delete a site from Pantheon.</td>
		</tr>
		<tr>
			<td><a href="#pantheon-site-deploy">pantheon-site-deploy</a></td>
			<td>Deploy code to a particular environment.</td>
		</tr>
		<tr>
			<td><a href="#pantheon-site-diffstat">pantheon-site-diffstat</a></td>
			<td>Get a list of changes (diffstat) to be commited in a remote on-server-dev environment.</td>
		</tr>
		<tr>
			<td><a href="#pantheon-site-download-backup">pantheon-site-download-backup</a></td>
			<td>Download a backup file from a specific site.</td>
		</tr>
		<tr>
			<td><a href="#pantheon-site-environment-create">pantheon-site-environment-create</a></td>
			<td>Create a new multidev site environment.</td>
		</tr>
		<tr>
			<td><a href="#pantheon-site-environment-delete">pantheon-site-environment-delete</a></td>
			<td>Delete a multidev site environment.</td>
		</tr>
		<tr>
			<td><a href="#pantheon-site-environment-list">pantheon-site-environment-list</a></td>
			<td>Get a list of site environments.</td>
		</tr>
		<tr>
			<td><a href="#pantheon-site-environment-redis-clear">pantheon-site-environment-redis-clear</a></td>
			<td>Clear redis cache of a site environment.</td>
		</tr>
		<tr>
			<td><a href="#pantheon-site-get-backup">pantheon-site-get-backup</a></td>
			<td>Get a download link to a specific site backup.</td>
		</tr>
		<tr>
			<td><a href="#pantheon-site-import">pantheon-site-import</a></td>
			<td>Import an existing site to Pantheon</td>
		</tr>
		<tr>
			<td><a href="#pantheon-site-load-backup">pantheon-site-load-backup</a></td>
			<td>Load db with a backup file from a specific site.</td>
		</tr>
		<tr>
			<td><a href="#pantheon-site-make-backup">pantheon-site-make-backup</a></td>
			<td>Trigger an on-demand backup for a site/environment.</td>
		</tr>
		<tr>
			<td><a href="#pantheon-site-mount">pantheon-site-mount</a></td>
			<td>Mounts an environment file system to a local directory.</td>
		</tr>
		<tr>
			<td><a href="#pantheon-site-name">pantheon-site-name</a></td>
			<td>Get the site name based on the UUID.</td>
		</tr>
		<tr>
			<td><a href="#pantheon-site-notifications">pantheon-site-notifications</a></td>
			<td>Get a list of notifications for a site to track ongoing jobs.</td>
		</tr>
		<tr>
			<td><a href="#pantheon-site-service-level">pantheon-site-service-level</a></td>
			<td>Update the service level for the site.</td>
		</tr>
		<tr>
			<td><a href="#pantheon-site-team">pantheon-site-team</a></td>
			<td>Get the team for a site.</td>
		</tr>
		<tr>
			<td><a href="#pantheon-site-team-add">pantheon-site-team-add</a></td>
			<td>Add someone to the team for a site.</td>
		</tr>
		<tr>
			<td><a href="#pantheon-site-team-remove">pantheon-site-team-remove</a></td>
			<td>Remove someone from the team for a site.</td>
		</tr>
		<tr>
			<td><a href="#pantheon-site-tunnel">pantheon-site-tunnel</a></td>
			<td>Opens a tunnel to a specific site/environment/service.</td>
		</tr>
		<tr>
			<td><a href="#pantheon-site-tunnel-close">pantheon-site-tunnel-close</a></td>
			<td>Closes the tunnel to a specific site/environment/service.</td>
		</tr>
		<tr>
			<td><a href="#pantheon-site-tunnels">pantheon-site-tunnels</a></td>
			<td>Get a list of open tunnels.</td>
		</tr>
		<tr>
			<td><a href="#pantheon-site-uuid">pantheon-site-uuid</a></td>
			<td>Get the site UUID based on the name.</td>
		</tr>
		<tr>
			<td><a href="#pantheon-site-wake">pantheon-site-wake</a></td>
			<td>Ensure a site environment is online and not suspended due to inactivity.</td>
		</tr>
		<tr>
			<td><a href="#pantheon-sites">pantheon-sites</a></td>
			<td>List your Pantheon sites.</td>
		</tr>
    </tbody>
	</table>
  <br />
  <dl>
  <dt id="pantheon-aliases">pantheon-aliases</dt>
	<dd>
	<pre>
Update the Pantheon Drush alias file at ~/.drush/pantheon.aliases.drushrc.php.


Options:
 --destination Specify the destination to save the alias file.


 --json Return raw JSON if possible.


 --nocache Force a refresh of cached authentication session.


 --onebox Use onebox (Pantheon dev only).


Aliases: paliases
</pre>
	</dd>
</dl>
<dl>
<dt id="pantheon-auth">pantheon-auth</dt>
	<dd>
	<pre>
Authenticate against the Pantheon dashboard. Required before doing anything
else.


Examples:
 drush pauth josh@getpantheon.com Get authentication token.


 --password=mypassword


Arguments:
 email Email address of dashboard account


Options:
 --json Return raw JSON if possible.


 --nocache Force a refresh of cached authentication session.


 --onebox Use onebox (Pantheon dev only).


 --password=<mypassword> Optional: include password for script-friendly use.


Aliases: pauth
</mypassword></pre>
	</dd>
</dl><dl>
	<dt id="pantheon-hostname-add">pantheon-hostname-add</dt>
	<dd>
	<pre>
Add a hostname to a site you control.


Arguments:
 site The site UUID you are working on.


 environment The environment (e.g. "live").


 hostname The hostname (e.g. "www.mysite.com")


Options:
 --json Return raw JSON if possible.


 --nocache Force a refresh of cached authentication session.


 --onebox Use onebox (Pantheon dev only).


Aliases: psite-hostname-add
</pre>
	</dd>
</dl><dl>
	<dt id="pantheon-hostname-remove">pantheon-hostname-remove</dt>
	<dd>
	<pre>
Remove a hostname from a site you control.


Arguments:
 site The site UUID you are working on.


 environment The environemnt (e.g. "live").


 hostname The hostname (e.g. "www.mysite.com")


Options:
 --json Return raw JSON if possible.


 --nocache Force a refresh of cached authentication session.


 --onebox Use onebox (Pantheon dev only).

Aliases: psite-hostname-remove
</pre>
	</dd>
</dl><dl>
	<dt id="pantheon-logout">pantheon-logout</dt>
	<dd>
	<pre>
Clear any stored session data.


Examples:
 0 drush plogout


Options:
 --json Return raw JSON if possible.


 --nocache Force a refresh of cached authentication session.


 --onebox Use onebox (Pantheon dev only).

Aliases: plogout
</pre>
	</dd>
</dl><dl>
	<dt id="pantheon-organization-sites">pantheon-organization-sites</dt>
	<dd>
	<pre>
List the sites for an organization. Org admins only.


Examples:
 drush porg-sites --nocache Get a fresh list of sites.

Arguments:
 organization UUID of the organization you want to  use.


Options:
 --json Return raw JSON if possible.


 --nocache Force a refresh of cached authentication session.


 --onebox Use onebox (Pantheon dev only).


Aliases: porg-sites
</pre>
	</dd>
</dl><dl>
	<dt id="pantheon-organizations">pantheon-organizations</dt>
	<dd>
	<pre>
List your organization affiliations.


Examples:
 drush porgs --nocache Get a fresh list of sites.


Options:
 --json Return raw JSON if possible.


 --nocache Force a refresh of cached authentication session.


 --onebox Use onebox (Pantheon dev only).

Aliases: porgs
</pre>
	</dd>
</dl><dl>
	<dt id="pantheon-pp">pantheon-pp</dt>
	<dd>
	<pre>
Direct pseudo-proxy interface. JSON only. For debugging.


Arguments:
 realm Are you asking about users or sites?


 uuid The unique id of the thing you want to know about.


 path Optional: path extension for more specific commands.


Options:
 --json Return raw JSON if possible.


 --nocache Force a refresh of cached authentication session.


 --onebox Use onebox (Pantheon dev only).


Aliases: pp
</pre>
	</dd>
</dl><dl>
	<dt id="pantheon-products">pantheon-products</dt>
	<dd>
	<pre>
Get the list of available Drupal product start-states.


Options:
 --json Return raw JSON if possible.


 --nocache Force a refresh of cached authentication session.


 --onebox Use onebox (Pantheon dev only).

Aliases: pproducts
</pre>
	</dd>
</dl><dl>
	<dt id="pantheon-site-attributes">pantheon-site-attributes</dt>
	<dd>
	<pre>
Get attributes for a particular site.


Arguments:
 site The site UUID in question.

Options:
 --attribute=<label> Specific attribute that you want to get.


 --json Return raw JSON if possible.


 --nocache Force a refresh of cached authentication session.


 --onebox Use onebox (Pantheon dev only).


Aliases: psite-attr
</label></pre>
	</dd>
</dl><dl>
	<dt id="pantheon-site-backups">pantheon-site-backups</dt>
	<dd>
	<pre>
List site backups (and exports).


Arguments:
 site UUID of the site you want to get backups for.


 environment The environment (e.g. "live") you want to back up.

Options:
 --json Return raw JSON if possible.


 --nocache Force a refresh of cached authentication session.


 --onebox Use onebox (Pantheon dev only).


Aliases: psite-backups
</pre>
	</dd>
</dl><dl>
	<dt id="pantheon-site-branch-create">pantheon-site-branch-create</dt>
	<dd>
	<pre>
Create Git branch of master for a particular site.


Arguments:
 site The site UUID in question.


Options:
 --json Return raw JSON if possible.


 --name=<feature-123> Branch name to be created.


 --nocache Force a refresh of cached authentication session.


 --onebox Use onebox (Pantheon dev only).

Aliases: psite-bcreate
</feature-123></pre>
	</dd>
</dl><dl>
	<dt id="pantheon-site-branch-delete">pantheon-site-branch-delete</dt>
	<dd>
	<pre>
Delete a Git branch from a particular site.


Arguments:
 site The site UUID in question.

Options:
 --json Return raw JSON if possible.


 --name=<feature-123> Branch name to be deleted.


 --nocache Force a refresh of cached authentication session.


 --onebox Use onebox (Pantheon dev only).

Aliases: psite-bdel
</feature-123></pre>
	</dd>
</dl><dl>
	<dt id="pantheon-site-branch-list">pantheon-site-branch-list</dt>
	<dd>
	<pre>
List Git branches for a particular site.


Arguments:
 site The site UUID in question.


Options:
 --json Return raw JSON if possible.


 --nocache Force a refresh of cached authentication session.


 --onebox Use onebox (Pantheon dev only).


Aliases: psite-blist
</pre>
	</dd>
</dl><dl>
	<dt id="pantheon-site-change-owner">pantheon-site-change-owner</dt>
	<dd>
	<pre>
Change the owner of a site.


Examples:
 drush psite-set-owner mysite Make josh the site owner.


 josh@getpantheon.com


Arguments:
 site uuid of the site


 user team member you would like to make the new owner: uuid or email

Options:
 --json Return raw JSON if possible.


 --nocache Force a refresh of cached authentication session.


 --onebox Use onebox (Pantheon dev only).

Aliases: psite-change-owner
</pre>
	</dd>
</dl><dl>
	<dt id="pantheon-site-clone">pantheon-site-clone</dt>
	<dd>
	<pre>
Clone content from one site environment to another.


Examples:
 drush psite-clone SITE_UUID dev test Clone both database and files from dev to test.


 drush psite-clone SITE_UUID dev test Clone only database from dev to


 --db --update test, then run update.php.


 drush psite-clone SITE_UUID dev test Clone only user files from dev to  


 --files test.



Arguments:
 site UUID of the site containing content.


 source The source environment (e.g. "live") from which content will be cloned.


 target The target environment (e.g. "live") to which content will be cloned.

Options:
 --db Clone database content.


 --files Clone files content.


 --json Return raw JSON if possible.


 --nocache Force a refresh of cached authentication session.


 --onebox Use onebox (Pantheon dev only).


 --update Run update.php after cloning database.

Aliases: psite-clone
</pre>
	</dd>
</dl><dl>
	<dt id="pantheon-site-commit">pantheon-site-commit</dt>
	<dd>
	<pre>
Commit changes in an on-server-dev environment.


Arguments:
 site UUID or name of the site.


 environment Environment to commit: a dev or multidev environment


Options:
 --json Return raw JSON if possible.


 --message Commit message


 --nocache Force a refresh of cached authentication session.


 --onebox Use onebox (Pantheon dev only).


Aliases: psite-commit
</pre>
	</dd>
</dl><dl>
	<dt id="pantheon-site-connection-mode">pantheon-site-connection-mode</dt>
	<dd>
	<pre>
Set or retrieve the connection mode of a specific site/environment.


Arguments:
 site UUID or name of the site.


 environment The dev or multidev environment you would like to target.


 mode Connection mode like to set (e.g., "sftp" or "git"). Leave blank to retrieve the current mode.

Options:
 --json Return raw JSON if possible.


 --nocache Force a refresh of cached authentication session.


 --onebox Use onebox (Pantheon dev only).


Aliases: psite-cmode
</pre>
	</dd>
</dl><dl>
	<dt id="pantheon-site-create">pantheon-site-create</dt>
	<dd>
	<pre>
Create a new site on Pantheon


Arguments:
 name Short name of the site to create.  Will be part of the URL.

Options:
 --json Return raw JSON if possible.


 --label Human-friendly site label.


 --nocache Force a refresh of cached authentication session.


 --nopoll Do not hang around and wait for the site to be ready. Useful for scripting a lot of installations.


 --onebox Use onebox (Pantheon dev only).


 --organization UUID of an organization you want the site to be a part of.


 --product UUID of the product you want to start with (see pantheon-products).

Aliases: psite-create
</pre>
	</dd>
</dl><dl>
	<dt id="pantheon-site-dashboard">pantheon-site-dashboard</dt>
	<dd>
	<pre>
Get the dashboard link for a site.


Examples:
 drush psite-dash mysite -y Open the dashboard for a site.

Arguments:
 site UUID of the site.

Options:
 --json Return raw JSON if possible.


 --nocache Force a refresh of cached authentication session.


 --onebox Use onebox (Pantheon dev only).

Aliases: psite-dash
</pre>
	</dd>
</dl><dl>
	<dt id="pantheon-site-delete">pantheon-site-delete</dt>
	<dd>
	<pre>
Delete a site from Pantheon.


Arguments:
 site UUID of the site you want to delete.

Options:
 --json Return raw JSON if possible.


 --nocache Force a refresh of cached authentication session.


 --onebox Use onebox (Pantheon dev only).

Aliases: psite-delete
</pre>
	</dd>
</dl><dl>
	<dt id="pantheon-site-deploy">pantheon-site-deploy</dt>
	<dd>
	<pre>
Deploy code to a particular environment.


Examples:
 drush psite-deploy SITE_UUID live Deploy latest code changes to live.


 drush psite-deploy SITE_UUID test Deploy latest code changes to test,


 --update --cc the run update.php and clear cache.

Arguments:
 site UUID of the site.


 target The target environment (e.g. "live") to which code will be deployed.

Options:
 --cc Clear cache after deploying code.


 --json Return raw JSON if possible.


 --nocache Force a refresh of cached authentication session.


 --onebox Use onebox (Pantheon dev only).


 --update Run update.php after deploying code.

Aliases: psite-deploy
</pre>
	</dd>
</dl><dl>
	<dt id="pantheon-site-diffstat">pantheon-site-diffstat</dt>
	<dd>
	<pre>
Get a list of changes (diffstat) to be commited in a remote on-server-dev
environment.


Arguments:
 site UUID or name of the site.


 environment Environment to commit: a dev or multidev environment

Options:
 --json Return raw JSON if possible.


 --nocache Force a refresh of cached authentication session.


 --onebox Use onebox (Pantheon dev only).

Aliases: psite-diffs
</pre>
	</dd>
</dl><dl>
	<dt id="pantheon-site-download-backup">pantheon-site-download-backup</dt>
	<dd>
	<pre>
Download a backup file from a specific site.


Arguments:
 site UUID of the site you want to get backups for.


 environment The environment (e.g. "live") you want to download a backup from.


 bucket Bucket for the backup. Use "latest" for the most recent.


 element Which part of the backup do you want? (e.g. database, files, code)  


 destination Where would you like the backup?

Options:
 --json Return raw JSON if possible.


 --nocache Force a refresh of cached authentication session.


 --onebox Use onebox (Pantheon dev only).

Aliases: psite-dl-backup
</pre>
	</dd>
</dl><dl>
	<dt id="pantheon-site-environment-create">pantheon-site-environment-create</dt>
	<dd>
	<pre>
Create a new multidev site environment.


Arguments:
 site UUID or name of the site.


 environment Name of multidev site environment. If branch does not exist, it will be  created.

Options:
 --json Return raw JSON if possible.


 --nocache Force a refresh of cached authentication session.


 --onebox Use onebox (Pantheon dev only).


 --source The source environment (e.g. "live") from which content will be cloned. If omitted, will default to dev.

Aliases: psite-ecreate
</pre>
	</dd>
</dl><dl>
	<dt id="pantheon-site-environment-delete">pantheon-site-environment-delete</dt>
	<dd>
	<pre>
Delete a multidev site environment.


Arguments:
 site UUID or name of the site.


 environment Name of multidev site environment.

Options:
 --json Return raw JSON if possible.


 --nocache Force a refresh of cached authentication session.


 --onebox Use onebox (Pantheon dev only).

Aliases: psite-edelete
</pre>
	</dd>
</dl><dl>
	<dt id="pantheon-site-environment-list">pantheon-site-environment-list</dt>
	<dd>
	<pre>
Get a list of site environments.


Arguments:
 site UUID or name of the site.

Options:
 --json Return raw JSON if possible.


 --nocache Force a refresh of cached authentication session.


 --onebox Use onebox (Pantheon dev only).

Aliases: psite-elist
</pre>
	</dd>
</dl><dl>
	<dt id="pantheon-site-environment-redis-clear">pantheon-site-environment-redis-clear</dt>
	<dd>
	<pre>
Clear redis cache of a site environment.


Arguments:
 site UUID or name of the site.


 environment Name of site environment.

Options:
 --json Return raw JSON if possible.


 --nocache Force a refresh of cached authentication session.


 --onebox Use onebox (Pantheon dev only).

Aliases: psite-erc
</pre>
	</dd>
</dl><dl>
	<dt id="pantheon-site-get-backup">pantheon-site-get-backup</dt>
	<dd>
	<pre>
Get a download link to a specific site backup.


Arguments:
 site UUID of the site you want to get backups for.


 environment The environment (e.g. "live") you want to back up.


 bucket Bucket for the backup.


 element Which part of the backup do you want?

Options:
 --json Return raw JSON if possible.


 --nocache Force a refresh of cached authentication session.


 --onebox Use onebox (Pantheon dev only).

Aliases: psite-get-backup
</pre>
	</dd>
</dl><dl>
	<dt id="pantheon-site-import">pantheon-site-import</dt>
	<dd>
	<pre>
Import an existing site to Pantheon


Arguments:
 name Short name of the site to create. Will be part of the URL.


 url URL of Drush Archive.

Options:
 --json Return raw JSON if possible.


 --label Human-friendly site label.


 --nocache Force a refresh of cached authentication session.


 --nopoll Do not hang around and wait for the site to be ready. Useful for scripting a lot of installations.


 --onebox Use onebox (Pantheon dev only).


 --organization UUID of an organization you want the site to be a part of.

Aliases: psite-import
</pre>
	</dd>
</dl><dl>
	<dt id="pantheon-site-load-backup">pantheon-site-load-backup</dt>
	<dd>
	<pre>
Load db with a backup file from a specific site.


Arguments:
 site UUID or name of the site you want to get backups for.


 environment The environment (e.g. "live") you want to use a backup from.


 bucket Bucket for the backup. Use "latest" for the most recent.

Options:
 --json Return raw JSON if possible.


 --nocache Force a refresh of cached authentication session.


 --onebox Use onebox (Pantheon dev only).

Aliases: psite-load-backup
</pre>
	</dd>
</dl><dl>
	<dt id="pantheon-site-make-backup">pantheon-site-make-backup</dt>
	<dd>
	<pre>
Trigger an on-demand backup for a site/environment.


Arguments:
 site UUID of the site you want to make a backup for.


 environment The environment (e.g. "live") you want to back up.

Options:
 --json Return raw JSON if possible.


 --nocache Force a refresh of cached authentication session.


 --onebox Use onebox (Pantheon dev only).

Aliases: psite-backup
</pre>
	</dd>
</dl><dl>
	<dt id="pantheon-site-mount">pantheon-site-mount</dt>
	<dd>
	<pre>
Mounts an environment file system to a local directory.


Arguments:
 site UUID or name of the site. If left empty, all tunnels will be closed.


 environment The target environment (e.g. "live"). If left empty, all site tunnels will be closed.


 destination Where would you like to mount the file system?

Options:
 --json Return raw JSON if possible.


 --nocache Force a refresh of cached authentication session.


 --onebox Use onebox (Pantheon dev only).

Aliases: psite-mount
</pre>
	</dd>
</dl><dl>
	<dt id="pantheon-site-name">pantheon-site-name</dt>
	<dd>
	<pre>
Get the site name based on the UUID.


Examples:
 drush psite-name Get the name of your site.


 12345678-1234-abcd-9876-fedcba09


 --nocache

Arguments:
 uuid UUID of the site.

Options:
 --json Return raw JSON if possible.


 --nocache Force a refresh of cached authentication session.


 --onebox Use onebox (Pantheon dev only).

Aliases: psite-name
</pre>
	</dd>
</dl><dl>
	<dt id="pantheon-site-notifications">pantheon-site-notifications</dt>
	<dd>
	<pre>
Get a list of notifications for a site to track ongoing jobs.


Arguments:
 site UUID or name of the site.

Options:
 --count Number of notifications to show


 --json Return raw JSON if possible.


 --nocache Force a refresh of cached authentication session.


 --onebox Use onebox (Pantheon dev only).


 --type Filter notifications by type

Aliases: psite-notifications
</pre>
	</dd>
</dl><dl>
	<dt id="pantheon-site-service-level">pantheon-site-service-level</dt>
	<dd>
	<pre>
Update the service level for the site.


Examples:
 drush psite-upgrade <site> Open the dashboard for a site.


 <service-level>

Arguments:
 site UUID of the site.


 service-level Service level to upgrade to.

Options:
 --json Return raw JSON if possible.


 --nocache Force a refresh of cached authentication session.


 --onebox Use onebox (Pantheon dev only).

Aliases: psite-upgrade
</service-level></site></pre>
	</dd>
</dl><dl>
	<dt id="pantheon-site-team">pantheon-site-team</dt>
	<dd>
	<pre>
Get the team for a site.


Examples:
 drush psite-team Get the team of your site.


 12345678-1234-abcd-9876-fedcba09


 --nocache

Arguments:
 site uuid of the site

Options:
 --json Return raw JSON if possible.


 --nocache Force a refresh of cached authentication session.


 --onebox Use onebox (Pantheon dev only).

Aliases: psite-team
</pre>
	</dd>
</dl><dl>
	<dt id="pantheon-site-team-add">pantheon-site-team-add</dt>
	<dd>
	<pre>
Add someone to the team for a site.


Examples:
 drush psite-team-add mysite Add josh to your site team.


 josh@getpantheon.com

Arguments:
 site uuid of the site


 user user you would like to make a part of the team: uuid or email

Options:
 --json Return raw JSON if possible.


 --nocache Force a refresh of cached authentication session.


 --onebox Use onebox (Pantheon dev only).

Aliases: psite-team-add
</pre>
	</dd>
</dl><dl>
	<dt id="pantheon-site-team-remove">pantheon-site-team-remove</dt>
	<dd>
	<pre>
Remove someone from the team for a site.


Examples:
 drush psite-team-remove mysite Remove josh to your site team.


 josh@getpantheon.com

Arguments:
 site uuid of the site


 user user you would like to remove: uuid or email

Options:
 --json Return raw JSON if possible.


 --nocache Force a refresh of cached authentication session.


 --onebox Use onebox (Pantheon dev only).

Aliases: psite-team-remove
</pre>
	</dd>
</dl><dl>
	<dt id="pantheon-site-tunnel">pantheon-site-tunnel</dt>
	<dd>
	<pre>
Opens a tunnel to a specific site/environment/service.


Arguments:
 site UUID or name of the site.


 environment The target environment (e.g. "live").


 service The service (e.g., "mysql" or "redis") to open a tunnel for. Defaults to "mysql".


 port Local port to connect to.

Options:
 --json Return raw JSON if possible.


 --nocache Force a refresh of cached authentication session.


 --onebox Use onebox (Pantheon dev only).

Aliases: psite-tunnel
</pre>
	</dd>
</dl><dl>
	<dt id="pantheon-site-tunnel-close">pantheon-site-tunnel-close</dt>
	<dd>
	<pre>
Closes the tunnel to a specific site/environment/service.


Arguments:
 site UUID or name of the site. If left empty, all tunnels will be closed.  


 environment The target environment (e.g. "live"). If left empty, all site tunnels will be closed.


 service The service (e.g., "mysql" or "redis") to open a tunnel for. If empty, all site/environment tunnels will be closed.

Options:
 --json Return raw JSON if possible.


 --nocache Force a refresh of cached authentication session.


 --onebox Use onebox (Pantheon dev only).

Aliases: psite-tclose
</pre>
	</dd>
</dl><dl>
	<dt id="pantheon-site-tunnels">pantheon-site-tunnels</dt>
	<dd>
	<pre>
Get a list of open tunnels.


Options:
 --json Return raw JSON if possible.


 --nocache Force a refresh of cached authentication session.


 --onebox Use onebox (Pantheon dev only).

Aliases: psite-tunnels
</pre>
	</dd>
</dl><dl>
	<dt id="pantheon-site-uuid">pantheon-site-uuid</dt>
	<dd>
	<pre>
Get the site UUID based on the name.


Examples:
 drush psite-uuid mysite --nocache Get the UUID of your site.

Arguments:
 site Name of the site.

Options:
 --json Return raw JSON if possible.


 --nocache Force a refresh of cached authentication session.


 --onebox Use onebox (Pantheon dev only).

Aliases: psite-uuid
</pre>
	</dd>
</dl><dl>
	<dt id="pantheon-site-wake">pantheon-site-wake</dt>
	<dd>
	<pre>
Ensure a site environment is online and not suspended due to inactivity.


Arguments:
 site UUID or name of the site.


 environment The target environment (e.g. "live").

Options:
 --json Return raw JSON if possible.


 --nocache Force a refresh of cached authentication session.


 --onebox Use onebox (Pantheon dev only).

Aliases: psite-wake
</pre>
	</dd>
</dl><dl>
	<dt id="pantheon-sites">pantheon-sites</dt>
	<dd>
	<pre>
List your Pantheon sites.


Examples:
 drush psites --nocache Get a fresh list of sites.

Options:
 --json Return raw JSON if possible.


 --nocache Force a refresh of cached authentication session.


 --onebox Use onebox (Pantheon dev only).

Aliases: psites
</pre>
	</dd>
</dl>
