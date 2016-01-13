#!/bin/bash
# Note: This script uses CircleCI environment variables https://circleci.com/docs/environment-variables
# PRs from forks not yet supported, see: https://circleci.com/docs/fork-pr-builds

# Normalize branch name to adhere with Multidev requirements
SANITIZE_CIRCLE_BRANCH = $CIRCLE_BRANCH
valid='-0-9a-z' # allows digits 0-9, lower case a-z, and -
if [[ ! $SANITIZE_CIRCLE_BRANCH =~ [^$valid] ]]; then
SANITIZE_CIRCLE_BRANCH=${x:0:11}
echo "Success: "$SANITIZE_CIRCLE_BRANCH" is a valid branch name."
else
    echo "Error: Multidev cannot be created due to invalid branch name: $SANITIZE_CIRCLE_BRANCH"
fi

# Authenticate Terminus
vendor/bin/terminus auth login $PANTHEON_EMAIL --password=$PANTHEON_PASS

# Write existing environments for the static docs site to a text file
vendor/bin/terminus site environments --site=$STATIC_DOCS > ./env_list.txt

# Filter env_list.txt into a single column for easier verification
echo "Existing environments for $STATIC_DOCS:"
tail -n +2 env_list.txt | cut -f1 | tee ./filtered_env_list.txt

# Check env_list.txt, create environment if one does not already exist
if grep -Fxq "$SANITIZE_CIRCLE_BRANCH" ./filtered_env_list.txt; then
    echo "Existing environment found for $SANITIZE_CIRCLE_BRANCH: http://"$SANITIZE_CIRCLE_BRANCH"-"$STATIC_DOCS".pantheon.io"
    # Dynamically set URL for Behat tests
else
    vendor/bin/terminus site create-env --site=$STATIC_DOCS --from-env=dev --to-env=$SANITIZE_CIRCLE_BRANCH
    echo "Multidev created for $SANITIZE_CIRCLE_BRANCH: http://"$SANITIZE_CIRCLE_BRANCH"-"$STATIC_DOCS".pantheon.io"
    # Dynamically set URL for Behat tests
    export BEHAT_PARAMS='{"extensions":{"Behat\\MinkExtension":{"base_url":"http://'"$SANITIZE_CIRCLE_BRANCH"'-'"$STATIC_DOCS"'.pantheon.io"}}}'
fi
