---
title: Terminus 2.0
description: Learn what's new with the latest Terminus major version upgrade.
contributors: [alexfornuto]
---

Terminus 2.0 is the first major version release of Terminus in over two years. Following [Semantic Versioning](https://semver.org/){.external} standards, this means there are updates in 2.0 that are incompatible with previous implementations. Before upgrading to Terminus 2.0, you should be aware of what changes could require updates to your scripting and implementation.

<div class="alert alert-danger" role="alert" markdown="1">
#### Warning {.info}
**Do not** upgrade production environments to Terminus 2.x without first testing in development and/or continuous integration environments.
</div>

<div class="alert alert-info" markdown="1">
#### Note {.info}
If you're not already familiar with Terminus, we suggest you read the [Terminus Manual](/docs/terminus/) instead. This doc is specifically geared at existing Terminus users who need to update existing implementations.
</div>

## Updated Commands 

These commands have changed in a significant way that may affect your existing scripting of Terminus.

### New Warnings

The following commands would emit no output when returning empty results. As of Terminus 2.0, these commands will instead emit a warning when the output is empty.

 - `backups:list`
 - `branch:list`
 - `domain:list`
 - `env:list`
 - `upstream:list`
 - `site:team:list`


### Progress Bars

The following commands now display progress bars while executing. Scripts using these commands can add the `-n` flag for "non-interactive mode".

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
 - `remote:drush`
 - `remote:wp`
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

The changes to these commands' behavior may affect existing integrations. For a complete list of all changes, see the [changelog](/docs/terminus/updates/#changelog).

 - `env:clone-content`
   - Now checks its target environment for initialization and will emit an error instead of erring after the operation fails.
 - `site:team:remove`
   - Now emits an error upon failure. It formerly emitted a notice.
 - `site:upstream:set`
   - Now emits an error if your user hasn't sufficient authority to run it, and will not attempt to run the operation.
 - `upstream:updates:list`
   - Orders the pending updates in chronological order.
 - `upstream:updates:apply`
   - No longer gives a second, redundant log.
 - `org:site:list`
   - Has new `plan_name` field being emitted.
   - No longer returns `service_level`.
   - Now emits a warning when empty. It previously emitted a notice-level log when empty.
 - `site:org:list`
   - Now emits a warning when empty. It previously emitted a notice-level log when empty.
 - `payment-method:list` now emits a warning when empty. It previously emitted a notice-level log when empty.
 - `site:create`
   - Has a new `--region` option.
 - `site:info`
   - Has new `plan_name` field being returned.
   - No longer returns `service_level`.
 - `site:list`
   - Has new `region` and `plan_name` fields being emitted.
   - No longer returns `service_level`.
   - Now emits a warning when empty. It previously emitted a notice-level log when empty.

## See Also

 - [The Terminus Manual](/docs/terminus/)
 - [Terminus on GitHub](https://github.com/pantheon-systems/terminus){.external}
