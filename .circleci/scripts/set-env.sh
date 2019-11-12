#!/bin/bash

set -eo pipefail

# Set Multidev branch name
printf "Create a slug from $CIRCLE_BRANCH: \n"
CIRCLE_BRANCH_SLUG=$(echo "$CIRCLE_BRANCH" | iconv -t ascii//TRANSLIT | sed -r s/[^a-zA-Z0-9]+/-/g | sed -r s/^-+\|-+$//g | tr A-Z a-z)
printf "slug created as: "
echo $CIRCLE_BRANCH_SLUG

printf "Normalizing for Multidev \n"
export MULTIDEV_NAME="$CIRCLE_BRANCH_SLUG"
export valid="^[-0-9a-z]" # allows digits 0-9, lower case a-z, and -

if [[ $MULTIDEV_NAME =~ $valid ]]; then
    # Use only the first 12 chars
    export MULTIDEV_NAME="${MULTIDEV_NAME:0:11}"

    #Remove breaking characters
    export MULTIDEV_NAME="${MULTIDEV_NAME//[-_]}"
    export MULTIDEV_NAME="${MULTIDEV_NAME,,}"
    echo "$MULTIDEV_NAME is a valid multidev name."
else
    echo "$MULTIDEV_NAME is not a valid branch name, deployment to Multidev will fail"
    exit 1
fi


# Export Variables
echo "export MULTIDEV_NAME=$MULTIDEV_NAME" >> $BASH_ENV
echo "export MULTIDEV_SITE_URL='https://${MULTIDEV_NAME}-static-docs.pantheonsite.io'" >> $BASH_ENV
echo "export CI_BUILD_URL='${CIRCLE_BUILD_URL}'" >> $BASH_ENV
echo "export CI_NODE_INDEX='${CIRCLE_NODE_INDEX}'" >> $BASH_ENV
echo "export CI_REPOSITORY_URL='${CIRCLE_REPOSITORY_URL}'" >> $BASH_ENV
echo "export ARTIFACTS_DIR_URL='${CIRCLE_BUILD_URL}/artifacts/${CIRCLE_NODE_INDEX}/artifacts'" >> $BASH_ENV

# Export functions
echo "source $BUILD_PATH/.circleci/scripts/functions.sh" >> $BASH_ENV
