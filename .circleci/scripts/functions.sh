#!/bin/bash

set -eo pipefail

testme() {
    echo "Function's imported."
}

auth-terminus() {
    printf "Authenticate Terminus \n"
    if ! terminus auth:login --machine-token $PANTHEON_TOKEN
    then
        echo "Authentiction with Terminus failed \n"
        exit 1
    else
        echo "Authenticated \n"
    fi
}

protected-branches() {
    # Deploy any branch except master, dev, test, or live
    printf "Checking $CIRCLE_BRANCH_SLUG against protected names... \n"
    if [ "$CIRCLE_BRANCH_SLUG" != "master" ] && [ "$CIRCLE_BRANCH_SLUG" != "dev" ] && [ "$CIRCLE_BRANCH_SLUG" != "test" ] && [ "$CIRCLE_BRANCH_SLUG" != "live" ] && ! [[ $CIRCLE_BRANCH_SLUG =~ (pull\/.*) ]]
    then
        echo "Not a protected branch. \n"
    else
        echo "This is a protected or invalid branch name. Stopping \n"
        exit 1
    fi
}

gatsby-tokens() {
# Set GitHub API token
    touch $BUILD_PATH/gatsby/.env.production
    echo "GITHUB_API=$GITHUB_TOKEN" > $BUILD_PATH/gatsby/.env.production
    echo "SEGMENT_KEY=$SEGMENT_KEY" >> $BUILD_PATH/gatsby/.env.production
}

getExistingTerminusEnvs() {
    existing_terminus_envs=() # Clear array
    while read -r env # Read a line
    do
        existing_terminus_envs+=( "$env" ) # Append line to the array
    done < "$1"
}

getMergedBranchMultidevName() {
    merged_branch_multidev_names=() # Clear array
    while read -r branch # Read a line
    do
        # Save the first 11 chars, then remove -'s to follow multidev naming strategy
        multidev_name="${branch:0:11}"
        multidev_name="${multidev_name//-}"
        merged_branch_multidev_names+=( "$multidev_name" ) # Append to the array
    done < "$1"
}