---
title: Timeouts on Pantheon
parent_guide:
  - supporting
  - debugging
framework:
  - Drupal
slug:
filename: source/_guides/timeouts-on-pantheon.md
---

Rules are for the good of the group, and timeouts are no exception. At Pantheon, we've configured our timeouts to fit normal program execution. Sometimes, these limits can be reached when working with a particularly inefficient bit of code. In order to set expectations, the following chart describes the various user-facing timeouts on Pantheon.

<thead>
		<tr>
			<th>Name</th>
			<th>Limit</th>
			<th>Description</th>
			<th>User configurable</th>
		</tr>
	</thead><tbody>
		<tr>
			<td>Pantheon executed Drupal cron</td>
			<td>180 seconds</td>
			<td>Only applies to Pantheon's automatic hourly execution of drush cron</td>
			<td>No</td>
		</tr>
		<tr>
			<td><a href="http://php.net/manual/en/info.configuration.php#ini.max-execution-time">PHP max_execution_time</a></td>
			<td>120 seconds</td>
			<td>Sets the maximum time in seconds a script is allowed to run before it is terminated by the parser.</td>
			<td>Yes</td>
		</tr>
		<tr>
			<td><a href="http://www.php.net/manual/en/function.set-time-limit.php">PHP set_time_limit</a></td>
			<td>120 seconds</td>
			<td>Set the number of seconds a script is allowed to run. If this is reached, the script returns a fatal error.</td>
			<td>Yes</td>
		</tr>
		<tr>
			<td>Load Balancer</td>
			<td>120 seconds</td>
			<td>Applies to HTTPS requests and requests to a DNS A record (raw IP).<br>
			Requests using the Pantheon CNAME for HTTP requests are not limited.</td>
			<td>No</td>
		</tr>
		<tr>
			<td>SSH</td>
			<td>10 minutes with no communication<br>
			60 minutes hard limit</td>
			<td>Applies to remote Drush commands, SSH tunneling, SFTP, rsync</td>
			<td>No</td>
		</tr>
		<tr>
			<td>Solr</td>
			<td>5 seconds</td>
			<td>Typically happens if you try to index too much at once (use a reasonable batch size and avoid indexing large binary files).</td>
			<td>Yes</td>
		</tr>
		<tr>
			<td><a href="http://dev.mysql.com/doc/refman/5.5/en/server-system-variables.html#sysvar_net_write_timeout">MySQL net_write_timeout</a></td>
			<td>90 seconds</td>
			<td>The number of seconds to wait for a block to be written to a connection before aborting the write.</td>
			<td>No</td>
		</tr>
		<tr>
			<td><a href="http://dev.mysql.com/doc/refman/5.5/en/server-system-variables.html#sysvar_net_read_timeout">MySQL net_read_timeout</a></td>
			<td>90 seconds</td>
			<td>The number of seconds to wait for more data from a connection before aborting the read.</td>
			<td>No</td>
		</tr>
		<tr>
			<td><a href="http://dev.mysql.com/doc/refman/5.5/en/server-system-variables.html#sysvar_wait_timeout">MySQL wait_timeout</a></td>
			<td>420 seconds</td>
			<td>The number of seconds the server waits for activity on a noninteractive connection before closing it.</td>
			<td>No</td>
		</tr>
		<tr>
			<td><a href="http://dev.mysql.com/doc/refman/5.5/en/server-system-variables.html#sysvar_interactive_timeout">MySQL interactive_timeout</a></td>
			<td>420 seconds</td>
			<td>The number of seconds the server waits for activity on an interactive connection before closing it.</td>
			<td>No</td>
		</tr>
		<tr>
			<td>Nginx fastcgi_read_timeout</td>
			<td>900 seconds</td>
			<td>PHP won't run forever.</td>
			<td>No</td>
		</tr>
	</tbody>

## Frequently Asked Questions

### Can I manually run Drupal cron for longer than the Pantheon executed Drupal cron?

Yes; just use <tt>drush @pantheon.SITENAME.env cron</tt> to execute cron. With that said, most slow cron executions are due to PHP errors or a slow external service. Rather than throwing more resources at an efficient process, determine why it's slow and fix the root cause.

### Can Pantheon change the non-configurable timeouts for my site?

Sorry, no; these settings apply to every site on Pantheon. One of the factors that allows Pantheon to scale is avoiding exceptions, which includes individual process configuration.

### Can Pantheon change the user-configurable timeouts for my site for me?

Nope, but you can in your settings.php file using the PHP functions linked in the table.

### How can I change the Solr timeout?

Edit the pantheon\_apachesolr module within your Drupal site installation and enjoy your voided warranty (we can't support user modifications). Seriously, this treats a symptom and not the problem; you should reduce the batch size instead and avoid indexing large binary files.
