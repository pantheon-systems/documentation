---
title: Timeouts on Pantheon
description: Detailed information about timeout errors on your Drupal site.
tags: [debugcode, services]
categories: []
---
Rules are for the good of the group, and timeouts are no exception. We've configured timeouts to fit normal program execution. Sometimes timeouts can be reached when working with a particularly inefficient bit of code, or when attempting to run a long-running job that would be better suited for [Terminus](/docs/terminus/).


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
    <td>Maximum time a script can run before being terminated by the parser. Helps prevent poorly written scripts from tying up your application container's PHP workers.
    <br/><br/>
     You can reduce this timeout to be less than 120 seconds via <code>settings.php</code> or <code>wp-config.php</code>, but you cannot increase it beyond 120 seconds.</td>
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
	</thead><tbody>
			<tr>
				<td>Connection Timeout <a rel="popover" data-toggle="tooltip" data-proofer-ignore data-html="true" data-content="For sites upgraded to the new Pantheon Global Edge (invite only)."><em class="fa fa-info-circle"></em></a></td>
				<td>60 seconds</td>
				<td>Number of seconds to wait for a timeout.</td>
			</tr>
			<tr>
				<td>First Byte Timeout <a rel="popover" data-toggle="tooltip" data-proofer-ignore data-html="true" data-content="For sites upgraded to the new Pantheon Global Edge (invite only)."><em class="fa fa-info-circle"></em></a></td>
				<td>60 seconds</td>
				<td>Number of seconds to wait for the first byte.</td>
			</tr>
			<tr>
			<td>Between Bytes Timeout <a rel="popover" data-toggle="tooltip" data-proofer-ignore data-html="true" data-content="For sites upgraded to the new Pantheon Global Edge (invite only)."><em class="fa fa-info-circle"></em></a></td>
			<td>60 seconds</td>
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

#### Can I manually run Drupal cron for longer than the Pantheon executed Drupal cron?

Yes, just use `terminus drush <site>.<env> -- cron` using [Terminus](/docs/terminus/). With that said, most slow cron executions are due to PHP errors or a slow external service. Rather than throwing more resources at an inefficient process, determine why it's slow and fix the root cause.

#### What if I run into a timeout when using the Drupal Migrate UI?

As [strongly recommended by the Migrate module](https://www.drupal.org/node/1806824), use Drush, which can be invoked through [Terminus](/docs/terminus/). You can also configure Migrate to [trigger Drush imports from the UI](https://www.drupal.org/node/1958170) by configuring the `migrate_drush_path` variable to:
```
$conf['migrate_drush_path'] = $_ENV['HOME'] .'/drush';
```

#### Can Pantheon change the non-configurable timeouts for my site?

No, these settings apply to every site on Pantheon. One of the ways Pantheon scales so well is by avoiding one-off configurations. We run a highly tuned universal configuration for optimized performance.


#### How do I change the Solr timeout on Drupal?

Edit the `pantheon_apachesolr` module within your Drupal site installation and enjoy your voided warranty (we can't support user modifications). Seriously, this treats a symptom and not the problem; you should reduce the batch size instead and avoid indexing large binary files.
