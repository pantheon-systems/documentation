---
title: Terminus Manual: Example Usage
terminuspage: true
terminustoc: true
type: terminuspage
tags: [terminus]
categories: [managing]
---
## Create Backups in Bulk
Create backups for a specific environment on all sites within an organization containing a designated tag.

Replace placeholder values for `ORG_UUID`, `TAG`, `ENV`, and `USER` within the
following script:

<div>
<button class="btn btn-default btn-clippy" data-clipboard-target="#bulk-backups"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
<figure class="highlight"><pre id="bulk-backups"><code class="bash" data-lang="bash">#!/bin/bash

#-----------------------------------------------------#
# Replace ORG_UUID, TAG, ENG, and USER values         #
#-----------------------------------------------------#
ORG_UUID="xxxxxx-xxxx-xxxx-xxxx-xxxxxxxx"
TAG="xxxxx"
ENV="xxx"
USER="dev@example.com"


echo "\nLogging into Terminus..."
terminus auth login ${USER}

# Generate list of org sites by specified tag
terminus organizations sites list --tag=${TAG} --org=${ORG_UUID} > ../org_dev_sites.txt
# Filter list down to site name only              
echo '\nCreating backups for '${ENV}' environments on sites tagged '${TAG}':\n'
tail -n +2 ../org_dev_sites.txt | cut -f1 | tee ../org_dev_sites.txt;

# Create backups of target environment for all tagged sites, discard list         
while IFS= read -r site;
do
  terminus  site backups create --element=all --env=${ENV} --site=$site
done < ../org_dev_sites.txt
rm ../org_dev_sites.txt
</code></pre></figure>
</div>
## Test and Deploy Core Updates
Automate WordPress core, plugin and theme updates on [Pantheon](https://pantheon.io) with Terminus, CircleCI, WP-CLI, BackstopJS and Slack.

### Setup
1. Create a [CircleCI](https://circleci.com) project
2. Add [environment variables to CircleCI](https://circleci.com/docs/environment-variables/) for the following:
	* `SITE_UUID`: The [Pantheon site UUID](https://pantheon.io/docs/sites/#site-uuid)
	* `TERMINUS_MACHINE_TOKEN`: A [Pantheon Terminus machine token](https://pantheon.io/docs/machine-tokens/) with access to the site
	* `SLACK_HOOK_URL`: The [Slack incoming webhook URL](https://api.slack.com/incoming-webhooks)
	* `SLACK_CHANNEL`: The Slack channel to post notifications to
	* `SLACK_USERNAME`: The username to post to Slack with
3. Add an [SSH key to Pantheon](https://pantheon.io/docs/ssh-keys/) and [to the CircleCI project](https://circleci.com/docs/permissions-and-access-during-deployment/).
4. Update the site UUID in the `.env` file
5. Update _scenarios_ in `backstop.js` with URLs for pages you wish to check with visual regression
	* `url` refers to the live URL and `referenceUrl` refers to the same page on the Pantheon multidev environment
6. Ping the [CircleCI API](https://circleci.com/docs/api/) at the desired frequency, e.g. daily, to run the script

### Notes
This workflow assumes the `master` branch (dev) and test environments on Pantheon are always in a shippable state as the script will automatically deploy changes from dev to test and live.

All incomplete work should be kept in a [Pantheon multidev environment](https://pantheon.io/docs/multidev/), on a separate Git branch.
<div>
<button class="btn btn-default btn-clippy" data-clipboard-target="#core-updates"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
<figure class="highlight"><pre id="core-updates"><code class="bash" data-lang="bash">#!/bin/bash

MULTIDEV="update-wp"

UPDATES_APPLIED=false

# login to Terminus
echo -e "\nLogging into Terminus..."
terminus auth login --machine-token=${TERMINUS_MACHINE_TOKEN}

# delete the multidev environment
echo -e "\nDeleting the ${MULTIDEV} multidev environment..."
terminus site delete-env --remove-branch --yes

# recreate the multidev environment
echo -e "\nRe-creating the ${MULTIDEV} multidev environment..."
terminus site create-env --from-env=live --to-env=${MULTIDEV}

# making sure the multidev is in git mode
echo -e "\nSetting the ${MULTIDEV} multidev to git mode"
terminus site set-connection-mode --mode=git

# check for upstream updates
echo -e "\nChecking for upstream updates on the ${MULTIDEV} multidev..."
# the output goes to stderr, not stdout
UPSTREAM_UPDATES=$(terminus site upstream-updates list  --format=bash  2>&1)

if [[ ${UPSTREAM_UPDATES} == *"No updates"* ]]
then
    # no upstream updates available
    echo -e "\nNo upstream updates found on the ${MULTIDEV} multidev..."
else
    # apply WordPress upstream updates
    echo -e "\nApplying upstream updates on the ${MULTIDEV} multidev..."
    terminus site upstream-updates apply --yes --updatedb --accept-upstream
    UPDATES_APPLIED=true
fi

# making sure the multidev is in SFTP mode
echo -e "\nSetting the ${MULTIDEV} multidev to SFTP mode"
terminus site set-connection-mode --mode=sftp

# check for WordPress plugin updates
echo -e "\nChecking for WordPress plugin updates on the ${MULTIDEV} multidev..."
PLUGIN_UPDATES=$(terminus wp "plugin list --field=update" --format=bash)

if [[ ${PLUGIN_UPDATES} == *"available"* ]]
then
    # update WordPress plugins
    echo -e "\nUpdating WordPress plugins on the ${MULTIDEV} multidev..."
    terminus wp "plugin update --all"

    # committing updated WordPress plugins
    echo -e "\nCommitting WordPress plugin updates on the ${MULTIDEV} multidev..."
    terminus site code commit --message="update WordPress plugins" --yes
    UPDATES_APPLIED=true
else
    # no WordPress plugin updates found
    echo -e "\nNo WordPress plugin updates found on the ${MULTIDEV} multidev..."
fi

# check for WordPress theme updates
echo -e "\nChecking for WordPress theme updates on the ${MULTIDEV} multidev..."
THEME_UPDATES=$(terminus wp "theme list --field=update" --format=bash)

if [[ ${THEME_UPDATES} == *"available"* ]]
then
    # update WordPress themes
    echo -e "\nUpdating WordPress plugins on the ${MULTIDEV} multidev..."
    terminus wp "theme update --all"

    # committing updated WordPress themes
    echo -e "\nCommitting WordPress theme updates on the ${MULTIDEV} multidev..."
    terminus site code commit --message="update WordPress themes" --yes
    UPDATES_APPLIED=true
else
    # no WordPress theme updates found
    echo -e "\nNo WordPress theme updates found on the ${MULTIDEV} multidev..."
fi

if [[ "${UPDATES_APPLIED}" = false ]]
then
    # no updates applied
    echo -e "\nNo updates to apply..."
    SLACK_MESSAGE="scalewp.io Circle CI update check #${CIRCLE_BUILD_NUM} by ${CIRCLE_PROJECT_USERNAME}. No updates to apply, nothing deployed."
    echo -e "\nSending a message to the ${SLACK_CHANNEL} Slack channel"
    curl -X POST --data "payload={\"channel\": \"${SLACK_CHANNEL}\", \"username\": \"${SLACK_USERNAME}\", \"text\": \"${SLACK_MESSAGE}\"}" $SLACK_HOOK_URL
else
    # updates applied, carry on

    # install node dependencies
    echo -e "\nRunning npm install..."
    npm install

    # ping the multidev environment to wake it from sleep
    echo -e "\nPinging the ${MULTIDEV} multidev environment to wake it from sleep..."
    curl -I https://update-wp-wp-microsite.pantheonsite.io/

    # backstop visual regression
    echo -e "\nRunning BackstopJS tests..."

    cd node_modules/backstopjs

    npm run reference
    # npm run test

    VISUAL_REGRESSION_RESULTS=$(npm run test)

    echo "${VISUAL_REGRESSION_RESULTS}"

    cd -
    if [[ ${VISUAL_REGRESSION_RESULTS} == *"Mismatch errors found"* ]]
    then
        # visual regression failed
        echo -e "\nVisual regression tests failed! Please manually check the ${MULTIDEV} multidev..."
        SLACK_MESSAGE="scalewp.io Circle CI update check #${CIRCLE_BUILD_NUM} by ${CIRCLE_PROJECT_USERNAME}. Visual regression tests failed on <https://dashboard.pantheon.io/sites/${SITE_UUID}#${MULTIDEV}/code|the ${MULTIDEV} environment>! Please test manually."
        echo -e "\nSending a message to the ${SLACK_CHANNEL} Slack channel"
        curl -X POST --data "payload={\"channel\": \"${SLACK_CHANNEL}\", \"username\": \"${SLACK_USERNAME}\", \"text\": \"${SLACK_MESSAGE}\"}" $SLACK_HOOK_URL
        exit 1
    else
        # visual regression passed
        echo -e "\nVisual regression tests passed between the ${MULTIDEV} multidev and live."

        # enable git mode on dev
        echo -e "\nEnabling git mode on the dev environment..."
        terminus site set-connection-mode --env=dev --mode=git --yes

        # merge the multidev back to dev
        echo -e "\nMerging the ${MULTIDEV} multidev back into the dev environment (master)..."
        terminus site merge-to-dev

        # deploy to test
        echo -e "\nDeploying the updates from dev to test..."
        terminus site deploy --env=test --sync-content --cc --note="Auto deploy of WordPress updates (core, plugin, themes)"

        # backup the live site
        echo -e "\nBacking up the live environment..."
        terminus site backups create --env=live --element=all

        # deploy to live
        echo -e "\nDeploying the updates from test to live..."
        terminus site deploy --env=live --cc --note="Auto deploy of WordPress updates (core, plugin, themes)"

        echo -e "\nVisual regression tests passed! WordPress updates deployed to live..."
        SLACK_MESSAGE="scalewp.io Circle CI update check #${CIRCLE_BUILD_NUM} by ${CIRCLE_PROJECT_USERNAME} Visual regression tests passed! WordPress updates deployed to <https://dashboard.pantheon.io/sites/${SITE_UUID}#live/deploys|the live environment>."
        echo -e "\nSending a message to the ${SLACK_CHANNEL} Slack channel"
        curl -X POST --data "payload={\"channel\": \"${SLACK_CHANNEL}\", \"username\": \"${SLACK_USERNAME}\", \"text\": \"${SLACK_MESSAGE}\"}" $SLACK_HOOK_URL
    fi
fi</code></pre></figure>
</div>


<div class="terminus-pager col-md-12">
  <hr>
      <a style="float:left;" href="/docs/terminus/install"><span class="terminus-pager-lsaquo">&lsaquo;</span>Installation</a>
      <a style="float:right;" href="/docs/terminus/commands"><span class="terminus-pager-rsaquo">&rsaquo;</span>Commands</a>
</div>
