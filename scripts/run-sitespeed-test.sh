#!/bin/bash

# This construction of a branch name is is copied from deploy-multidev.#!/bin/sh
# This section does not include the error handling present in that file
# because this script would not be reach if deploy-multidev.#!/bin/sh
# exited with an error on the branch name.
# @todo find out if there is a way to create the variable globally.
export normalize_branch="$CIRCLE_BRANCH"
export normalize_branch="${normalize_branch:0:11}"
#Remove - to avoid failures
export normalize_branch="${normalize_branch//[-_]}"
export url="http://"$normalize_branch"-static-docs.pantheon.io/docs"

# @todo, revisit contents of the  budget file. It copied from the
# sitespeed.io repo with little change.
sitespeed.io -u $url --budget budget.json -b firefox --skipTest=ycookiefree,avoidfont -r $CIRCLE_ARTIFACTS/sitespeed --suppressDomainFolder --outputFolderName test
