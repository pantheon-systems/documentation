---
title: Terminus 2.0
description: Learn what's new with the Terminus 2.0 release.
contributors: [alexfornuto]
categories: [platform]
tags: [cli, drush, local, wp-cli, terminus]
---

<Alert title="Note" type="info" >

Terminus 3.0 has been released; we suggest you read the [Terminus 3.0](/terminus/terminus-3-0) page as well.

</Alert>

Terminus 2.0 is the first major version release of Terminus in over two years. Following [Semantic Versioning](https://semver.org/) standards, this means there are updates in 2.0 that are incompatible with previous implementations. Before upgrading to Terminus 2.0, you should be aware of what changes could require updates to your scripting and implementation.

<Alert title="Warning" type="danger">

**Do not** upgrade production environments to Terminus 2.x without first testing in development and/or continuous integration environments.

</Alert>

## Updated Commands

These commands or their output have changed in a significant way that may affect your existing scripting of Terminus.

### New Warnings

In the previous version of Terminus, the following commands would emit no output when returning empty results. As of Terminus 2.0, these commands will instead emit a warning when the output is empty:

 - `backups:list`
 - `branch:list`
 - `domain:list`
 - `env:list`
 - `upstream:list`
 - `site:team:list`

### Progress Bars

The following commands now display progress bars while executing:

 - `backup:restore`
 - `connection:set`
 - `env:clear-cache`
 - `env:clone-content`
 - `env:commit`
 - `env:deploy`
 - `env:wipe`
 - `https:remove`
 - `https:set`
 - `import:complete`
 - `import:database`
 - `import:files`
 - `import:site`
 - `lock:disable`
 - `lock:enable`
 - `multidev:create`
 - `multidev:delete`
 - `multidev:merge-from-dev`
 - `multidev:merge-to-dev`
 - `new-relic:disable`
 - `new-relic:enable`
 - `org:people:add`
 - `org:people:list`
 - `org:people:remove`
 - `org:people:role `
 - `org:site:remove`
 - `owner:set`
 - `payment-method:add`
 - `payment-method:remove`
 - `redis:disable`
 - `redis:enable`
 - `service-level:set`
 - `site:create`
 - `site:delete`
 - `site:org:add`
 - `site:team:add`
 - `site:team:remove`
 - `site:team:role`
 - `site:updates:apply`
 - `site:upstream:clear-cache`
 - `site:upstream:set`
 - `solr:disable`
 - `solr:enable`

To omit the progress bar, scripts that use these commands can add the `-n` flag for "non-interactive mode".

Additionally, `remote:drush` and `remote:wp` now have the option to enable progress bars with the flag `--progress`.

## Deprecated Commands

The command `service-level:set` has been replaced with `plan:set`. An example usage is:

```bash
terminus plan:set $SITE.$PLAN
```

In the example above, `$SITE` can be set to the site name, and `$PLAN` can be a plan SKU or UUID. Available plans are listed using `terminus plan:list $SITE`.

## New Commands

The following commands are new to Terminus as of version 2.0:

 - `plan:list`: Requiring a site name or UUID as a value, this returns a list of plans available to that site.
 - `plan:set`: Requiring a site name or UUID and a plan name or SKU as values, this changes the named site to the plan size named.

## Additional Changes

The changes to these commands' behavior may affect existing integrations. For a complete list of all changes, see the [Terminus changelog](/terminus/updates/#changelog).

 - `env:clone-content`
   - Now checks its target environment for initialization and will emit an error instead of showing an error after the operation fails.
   - New flags `--cc` to clear the cache, and `--updatedb` to update the database (Drupal only).
 - `site:team:remove`
   - Now emits an error upon failure. It formerly emitted a notice.
 - `site:upstream:set`
   - Now emits an error if your user doesn't have the authority sufficient to run it, and will not attempt to run the operation.
 - `upstream:updates:list`
   - Orders the pending updates in chronological order.
 - `upstream:updates:apply`
   - No longer gives a second, redundant log.
 - `org:site:list`
   - Has new `plan_name` field.
   - No longer returns `service_level`.
   - Now emits a warning when empty. It previously emitted a notice-level log when empty.
   - Output can be filtered with the flags `--upstream` and `--plan`.
 - `site:org:list`
   - Now emits a warning when empty. It previously emitted a notice-level log when empty.
 - `payment-method:list` now emits a warning when empty. It previously emitted a notice-level log when empty.
 - `site:create`
   - Has a new `--region` option.
 - `site:info`
   - Has new `plan_name` field being returned.
   - No longer returns `service_level`.
 - `site:list`
   - Has new `region` and `plan_name` fields.
   - No longer returns `service_level`.
   - Now emits a warning when empty. It previously emitted a notice-level log when empty.
   - Output can be filtered with the flags `--upstream` and `--plan`.
 - `site:team:list`
   - Now emits a new field showing which team member is the owner of the site.

## More Resources

 - [The Terminus Manual](/terminus)
 - [Terminus on GitHub](https://github.com/pantheon-systems/terminus)
