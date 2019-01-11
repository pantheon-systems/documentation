---
title: Timeouts on Pantheon
description: Detailed information about timeout errors on your site.
tags: [debugcode, services]
categories: []
---
Rules are for the good of the group, and timeouts are no exception. We've configured timeouts to fit normal program execution. Sometimes timeouts can be reached when working with a particularly inefficient bit of code or when attempting to execute a long-running job that would be better suited for [Terminus](/docs/terminus/).


## User-Configurable Timeouts


<table class=table>
<thead>
		<tr>
			<th>Name</th>
			<th>Timeout</th>
			<th>Description</th>
		</tr>
	</thead><tbody>
  <tr>
    <td><a href="https://secure.php.net/manual/en/info.configuration.php#ini.max-execution-time">PHP max_execution_time</a></td>
    <td>120 seconds</td>
    <td>Maximum time a script can run before being terminated by the parser. This includes Drush & WP-CLI commands. Helps prevent poorly written scripts from tying up your application container's PHP workers.
    <br/><br/>
     You can edit this timeout via <code>settings.php</code> or <code>wp-config.php</code>. Scripts executed through the GlobalCDN will still be restricted by the 59 second connection timeout.</td>
  </tr>
  <tr>
    <td>Solr</td>
    <td>5 seconds</td>
    <td>Typically reached if you try to index too much at once (use a reasonable batch size and avoid indexing large binary files).</td>
  </tr>
</table>

## Timeouts That are not Configurable

<table class=table>
<thead>
		<tr>
			<th>Name</th>
			<th>Maximum</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Connection Timeout</td>
			<td>59 seconds</td>
			<td>Number of seconds to wait for a timeout.</td>
		</tr>
		<tr>
			<td>First Byte Timeout</td>
			<td>59 seconds</td>
			<td>Number of seconds to wait for the first byte.</td>
		</tr>
		<tr>
			<td>Between Bytes Timeout</td>
			<td>59 seconds</td>
			<td>Number of seconds to wait for between bytes.</td>
		</tr>
		<tr>
			<td>Pantheon executed Drupal cron</td>
			<td>180 seconds</td>
			<td>Only applies to Pantheon's automatic hourly execution of drush cron</td>
		</tr>
		<tr>
			<td><a href="https://secure.php.net/manual/en/function.set-time-limit.php">PHP set_time_limit</a></td>
			<td>120 seconds</td>
			<td>Number of seconds a script can run. If reached, the script returns a fatal error.</td>
		</tr>
		<tr>
			<td>Load Balancer</td>
			<td>120 seconds</td>
			<td>Applies to HTTPS requests and requests to a DNS A record.
			Requests using the Pantheon CNAME for HTTP requests <em>are not</em> limited.</td>
		</tr>
		<tr>
			<td>SSH</td>
			<td>10 minutes with no communication<br>
			60 minutes hard limit</td>
			<td>Applies to remote Drush commands, SSH tunneling, SFTP, rsync</td>
		</tr>
		<tr>
			<td><a href="https://dev.mysql.com/doc/refman/5.5/en/server-system-variables.html#sysvar_net_write_timeout">MySQL net_write_timeout</a></td>
			<td>90 seconds</td>
			<td>Number of seconds to wait for a block to be written to a connection before aborting the write.</td>
		</tr>
		<tr>
			<td><a href="https://dev.mysql.com/doc/refman/5.5/en/server-system-variables.html#sysvar_net_read_timeout">MySQL net_read_timeout</a></td>
			<td>90 seconds</td>
			<td>Number of seconds to wait for more data from a connection before aborting the read.</td>
		</tr>
		<tr>
			<td><a href="https://dev.mysql.com/doc/refman/5.5/en/server-system-variables.html#sysvar_wait_timeout">MySQL wait_timeout</a></td>
			<td>420 seconds</td>
			<td>Number of seconds the server waits for activity on a noninteractive connection before closing it.</td>
		</tr>
		<tr>
			<td><a href="https://dev.mysql.com/doc/refman/5.5/en/server-system-variables.html#sysvar_interactive_timeout">MySQL interactive_timeout</a></td>
			<td>420 seconds</td>
			<td>Number of seconds the server waits for activity on an interactive connection before closing it.</td>
		</tr>
		<tr>
			<td><a href="https://nginx.org/en/docs/http/ngx_http_fastcgi_module.html#fastcgi_read_timeout">Nginx fastcgi_read_timeout</a></td>
			<td>900 seconds</td>
			<td>PHP won't run forever.</td>
		</tr>
	</tbody>
</table>
## Frequently Asked Questions

### Can I manually run Drupal cron for longer than the Pantheon executed Drupal cron?

Yes, just use `terminus drush <site>.<env> -- cron` using [Terminus](/docs/terminus/). With that said, most slow cron executions are due to PHP errors or a slow external service. Rather than throwing more resources at an inefficient process, determine why it's slow and fix the root cause.

### What if I run into a timeout when using the Drupal Migrate UI?

As [recommended in the Migrate module documentation](https://www.drupal.org/node/1806824){.external}, use Drush, which can be invoked through [Terminus](/docs/terminus/).

If you're migrating to a Drupal 7 site, you can also configure Migrate to [trigger Drush imports from the UI](https://www.drupal.org/node/1958170){.external} by configuring the `migrate_drush_path` variable to:

```
$conf['migrate_drush_path'] = $_ENV['HOME'] . '/bin/drush';
```

### Can Pantheon change the non-configurable timeouts for my site?

No, these settings apply to every site on Pantheon. One of the ways Pantheon scales so well is by avoiding one-off configurations. We run a highly tuned universal configuration for optimized performance.


### How do I change the Solr timeout on Drupal?

Edit the `pantheon_apachesolr` module within your Drupal site installation and enjoy your voided warranty (we can't support user modifications). Seriously, this treats a symptom and not the problem; you should reduce the batch size instead and avoid indexing large binary files.

### How do I install a theme or plugin that keeps timing out?

If you receive a `The application did not respond in time` error when trying to install a theme or plugin, your experience may be affected by a combination of large files and a poor internet connection. Extract the files locally and upload them [via SFTP](/docs/rsync-and-sftp/).

Agencies that frequently deploy sites using a common set of themes and plugins should consider creating a [custom upstream](/docs/custom-upstream/).
