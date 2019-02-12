---
title: Terminus 2.0
description: Learn what's new with the latest Terminus major version upgrade.
contributors: [alexfornuto]
---

Terminus 2.0 is the first major version release of Terminus in over two years. Following [Semantic Versioning](https://semver.org/){.external} standards, this means there are updates in 2.0 that are incompatible with previous implementations. Before upgrading to Terminus 2.0, you should be aware of what changes could require updates to your scripting and implementation.


<div class="alert alert-info" markdown="1">
#### Note {.info}
If you're not already familiar with Terminus, we suggest you read the [Terminus Manual](/docs/terminus/) instead. This doc is specifically geared at existing Terminus users who need to update existing implementations.
</div>

## Before You Begin

Upgrade Options
Installing Side-by-Site


## Updated Commands 

These commands have changed in a significant way that may affect your existing scripting of Terminus.

### New Warnings

The following commands would emit no output when returning empty results. As of Terminus 2.0, these commands will instead emit a warning when the output is empty.

 - `backups:list`
 - `backup:restore`
 - `branch:list`
 - `domain:list`
 - `env:list`
 - `upstream:list`
 - `site:team:list`


### Progress Bars

The following commands now display progress bars while executing. Scripts using these commands can add the `-n` flag for "non-interactive mode".

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

In the example above, `$SITE` can be set to the site name, and `$PLAN` can be a plan SKU or UUID. Available plans are listed using `terminus plan:list $SITE`

## New Commands

##See Also

If you can, end your doc with links to external resources that can be used to improve the reader's comprehension, or to guides on logical next steps in a common development workflow.

 - [An internal guide with a relative link](/docs/get-started)  
 - [An external guide with a full URL](http://writing.rocks/)
