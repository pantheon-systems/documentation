---
title: Terminus Manual
subtitle: Scripting Terminus
description: Automate your workflow with Terminus.
terminuspage: true
type: terminuspage
layout: terminuspage
nexturl: terminus/plugins/
previousurl: terminus/commands/
permalink: docs/terminus/:basename/
image: terminus-thumbLarge
searchboost: 100
---

While Terminus makes it easy to directly interact with Pantheon from your command line, its real value is in scripting. By adding Terminus to your automated tasks, you can truly make Pantheon a part of your standardized workflow.

Consider the repetitive tasks you perform using the Pantheon Dashboard:

 - Can those tasks be executed by Terminus commands?
 - Can the values required by the commands be derived programmatically?

If so, you consider how you can turn the task into a script.

## Authentication

Terminus needs to be authenticated in order to execute most commands. Before running any script you must ensure Terminus is authenticated with a [machine token](/docs/terminus/install#machine-token) that has the proper permissions

## Examples

 - The [Pantheon Example Terminus Auto Update Script](https://github.com/pantheon-systems/example-terminus-auto-update-script){.external} demonstrates how you can use Terminus to automate plugin and theme updating for multiple sites.


 - The [Example WordPress Composer](https://github.com/pantheon-systems/example-wordpress-composer){.external} repository (used by our [Build Tools](/docs/guides/build-tools/) guide) uses Terminus to [deploy staged changes](https://github.com/pantheon-systems/example-wordpress-composer/blob/46ff34e2b9f421a1c0eae72ade80376e8dd42f31/.circleci/deploy-to-pantheon.sh){.external} to multidev environments.



## Bash Variables

One of the ways Terminus can be used in scripting is the generation of variables. In the example below, we use the output of `terminus multidev:list` to create an environment variable with all our multidev environments:

```bash
PANTHEON_MULTIDEV_LIST="$(terminus multidev:list -n ${TERMINUS_SITE} --format=list --field=Name)"
```

This example assumes the variable `TERMINUS_SITE` is already set. Now you can iterate through `$PANTHEON_MULTIDEV_LIST` using something like a `while read` loop to perform tasks on each multidev environment.


Here's a more complete example. This script goes through every site in an organization, skips any that are frozen, and takes a backup of the Live environment:

```bash
#!/bin/bash

# Exit on error
set -e

# Stash org UUID
ORG_UUID="722c5f3b-....-6c8a"

# Stash list of all Pantheon sites in the org
PANTHEON_SITES="$(terminus org:site:list -n ${ORG_UUID} --format=list --field=Name)"

# Loop through each site in the list
while read -r PANTHEON_SITE_NAME; do
    # Check if the site is frozen
    IS_FROZEN="$(terminus site:info $PANTHEON_SITE_NAME --field=frozen)"

    # If the site is frozen
    if [[ "true" == "${IS_FROZEN}" ]]
    then
        # Then skip it
        echo -e "Skipping a backup of the site '$PANTHEON_SITE_NAME' because it is frozen...\n"
    else
        # Otherwise create a backup of the live environment of the site
        echo -e "Creating a backup of the live environment for the site '$PANTHEON_SITE_NAME'...\n"
        terminus backup:create $PANTHEON_SITE_NAME.live
    fi
done <<< "$PANTHEON_SITES"
```

This script requires that you set the variable `ORG_UUID` within the script itself. You can find the UUID using `terminus org:list`.

