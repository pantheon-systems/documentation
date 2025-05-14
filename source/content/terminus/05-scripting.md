---
title: Terminus Guide
subtitle: Scripting with Terminus
description: Automate your workflow with scripting via Terminus.
terminuspage: true
type: terminuspage
layout: terminuspage
tags: [reference, cli, local, terminus, workflow]
permalink: docs/terminus/scripting
contenttype: [guide]
innav: [false]
categories: [cli]
cms: [drupal, wordpress]
audience: [development]
product: [terminus]
integration: [--]
---

This section provides information on how to automate your workflow with Terminus scripting.

Terminus makes it easy to directly interact with Pantheon from your command line, and provides additional value with scripting abilities. You can make Pantheon a part of your standardized workflow by adding Terminus to your automated tasks.

Consider the repetitive tasks you perform using the Pantheon Dashboard:

- Can those tasks be executed by Terminus commands?
- Can the values required by the commands be derived programmatically?

If so, consider how you can turn the task into a script.

## Authentication

Terminus must be authenticated before you can execute most commands. You must authenticate Terminus with a [machine token](/terminus/install#machine-token) that has the correct permissions before running a script.

### Authenticate Terminus for Continuous Integration

You can run a complete backend authorization in Terminus by accessing Auth0 behind the scenes to positively identify the Terminus client with an OAuth token. Auth0 places limits on how many times this can be done in a given time period. Use your machine token to authorize Terminus sparingly to avoid exceeding Auth0 rate limits.

1. Running `terminus auth:login --machine-token=${TOKEN}` to run a complete backend authorization. This process:

    - Logs in your `machine-token`
    - Allows Terminus to create a cached session in the local user's $HOME folder (for example, `$HOME/.terminus/cache/session`). Use this cached session token for repeated logins. The session file takes the following format:

        ```json
        {
        "session": "${PANTHEON_USER_ID}:${CURRENT_SESSION_ID}:${OAUTH_SESSION_TOKEN}",
        "expires_at": ${EXPIRE_DATETIME},
        "user_id": "${PANTHEON_USER_ID}"
        }
        ```

1. Restore the session file in a CI context to stay logged in without re-authenticating every time. Instructions for specific CI pipelines are listed below.

    - [Bitbucket](/terminus/ci/bitbucket)
    - [CircleCI](/terminus/ci/circleci)
    - [GitHub](/terminus/ci/github-actions)
    - [GitLab](/terminus/ci/gitlab)


## Example Repositories

- The [Pantheon Example Terminus Auto Update Script](https://github.com/pantheon-systems/example-terminus-auto-update-script) demonstrates how you can use Terminus to automate plugin and theme updates for multiple sites.

- The [Example WordPress Composer](https://github.com/pantheon-systems/example-wordpress-composer) repository (used by our [Build Tools](/guides/build-tools) guide) uses Terminus to [deploy staged changes](https://github.com/pantheon-systems/example-wordpress-composer/blob/46ff34e2b9f421a1c0eae72ade80376e8dd42f31/.circleci/deploy-to-pantheon.sh) to Multidev environments.

## Bash Variables

Terminus can generate variables for scripting. In the example below, `terminus multidev:list` is used to create an environment variable with all Multidev environments:

```bash
PANTHEON_MULTIDEV_LIST="$(terminus multidev:list -n ${TERMINUS_SITE} --format=list --field=Name)"
```

This example assumes the variable `TERMINUS_SITE` is already set. You can iterate through `$PANTHEON_MULTIDEV_LIST` using a `while read` loop to perform tasks on each Multidev environment.

## Interactive Prompts

Commands that normally require user interaction must be bypassed with the appropriate flag. The flags `-y` or `--yes` will bypass requests to confirm actions for most Terminus commands. Also, `-n` flag could be used for non interactive mode.

## Example Bash Scripts

### Take a backup of the Live environment of all sites in a Workspace

The script in this example goes through every site in a Workspace, skips any sites that are frozen, and creates a backup of the Live environment. This script requires that you set the variable `ORG_UUID` within the script itself. You can find the UUID using `terminus org:list`.


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
    if [[ "1" == "${IS_FROZEN}" ]]
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

### Save the PHP version of the Live environment of all sites in a Workspace to a CSV file

This example saves the output of various Terminus commands to variables for reuse, similar to the example above.

This script requires that you set the variable `PANTHEON_ORG` within the script itself. This can be either the Workspace name or UUID, both of which can be found using `terminus org:list`. Optionally, you can also update the name and path of the CSV file if you prefer something other than `pantheon-site-php-versions.csv`.

```bash
#!/bin/bash

# Save the desired org UUID or name
PANTHEON_ORG="722c5f3b-....-6c8a"

# Get a list of all sites in the org
PANTHEON_SITES="$(terminus org:site:list -n ${PANTHEON_ORG} --format=list --field=Name)"

# Name the CSV output file
CSV_FILE='pantheon-site-php-versions.csv'

# Add heading to the CSV file
# > is overwrite
echo 'site name,php version,frozen' > $CSV_FILE

# Loop through each site in the list
while read -r PANTHEON_SITE_NAME; do
	# Check if the site is frozen
	IS_FROZEN="$(terminus site:info $PANTHEON_SITE_NAME --field=frozen)"
	# If the site is frozen
    if [[ "1" == "${IS_FROZEN}" ]]
    then
		# The PHP version is unknown
		PHP_VERSION='FROZEN'
	else
		# Get the site's PHP version
		PHP_VERSION=$(terminus env:info $PANTHEON_SITE_NAME.live --field php_version)
	fi

	# Save the info to the CSV file
	# >> is append
	echo "$PANTHEON_SITE_NAME,$PHP_VERSION,$IS_FROZEN" >> $CSV_FILE
done <<< "$PANTHEON_SITES"

# All done
echo "Site PHP information has been saved to $CSV_FILE"
```



## More Resources

- [Install Quicksilver Scripts](/guides/quicksilver/install-script)
- [Cron for WordPress](/guides/wordpress-developer/wordpress-cron)
- [Cron for Drupal](/drupal-cron)
- [Continuous Integration Solutions on Pantheon](/continuous-integration)
- [WordPress Composer Continuous Integration](/guides/wordpress-composer/create-wp-site-composer-ci-auto-test#continuous-integration)
- [Build Tools Continuous Integration](/guides/wordpress-composer/create-wp-site-composer-ci-auto-test#continuous-integration)
