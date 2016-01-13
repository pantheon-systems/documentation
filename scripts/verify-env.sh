#!/bin/bash
# Note: This script uses CircleCI environment variables https://circleci.com/docs/environment-variables
# PRs from forks not yet supported, see: https://circleci.com/docs/fork-pr-builds

# Normalize branch name to adhere with Multidev requirements
export SANITIZE_CIRCLE_BRANCH="$CIRCLE_BRANCH"
export valid="^[-0-9a-z]" # allows digits 0-9, lower case a-z, and -
if [[ $SANITIZE_CIRCLE_BRANCH =~ $valid ]]; then
    export SANITIZE_CIRCLE_BRANCH="${SANITIZE_CIRCLE_BRANCH:0:11}"
    echo "Success: "$SANITIZE_CIRCLE_BRANCH" is a valid branch name."
else
    echo "Error: Multidev cannot be created due to invalid branch name: $SANITIZE_CIRCLE_BRANCH"
    exit 1
fi

# Authenticate Terminus
~/documentation/bin/terminus auth login $PANTHEON_EMAIL --password=$PANTHEON_PASS

# Write existing environments for the static docs site to a text file
~/documentation/bin/terminus site environments --site=$STATIC_DOCS > ./env_list.txt

# Filter env_list.txt into a single column for easier verification
echo "Existing environments:"
tail -n +2 env_list.txt | cut -f1 | tee ./filtered_env_list.txt

# Check env_list.txt, create environment if one does not already exist
if grep -Fxq "$SANITIZE_CIRCLE_BRANCH" ./filtered_env_list.txt; then
    echo "Existing environment found for $SANITIZE_CIRCLE_BRANCH: http://"$SANITIZE_CIRCLE_BRANCH"-"$STATIC_DOCS".pantheon.io"
else
    ~/documentation/bin/terminus site create-env --site=$STATIC_DOCS --from-env=dev --to-env=$SANITIZE_CIRCLE_BRANCH
    echo "Multidev created for $SANITIZE_CIRCLE_BRANCH: http://"$SANITIZE_CIRCLE_BRANCH"-"$STATIC_DOCS".pantheon.io"
fi
sleep 90 # Wait for multidev to be created
echo "Deploying docs to the $SANITIZE_CIRCLE_BRANCH environment"
# rsync local output_prod/docs to files dir on appserver
rsync --size-only --checksum --delete-after -rlvz --ipv4 --progress -e 'ssh -p 2222' output_prod/docs --temp-dir=../tmp/ $SANITIZE_CIRCLE_BRANCH.$STATIC_DOCS_UUID@appserver.$SANITIZE_CIRCLE_BRANCH.$STATIC_DOCS_UUID.drush.in:files/
# Dynamically set URL for Behat tests
export BEHAT_PARAMS='{"extensions":{"Behat\\MinkExtension":{"base_url":"http://'"$SANITIZE_CIRCLE_BRANCH"'-'"$STATIC_DOCS"'.pantheon.io"}}}'
