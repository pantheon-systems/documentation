#!/bin/bash
# Deploy to Live
# Note: This script uses CircleCI environment variables https://circleci.com/docs/environment-variables

# Authenticate Terminus
auth-terminus

# Change to working directory
cd $BUILD_PATH

# Deploy modified files to production
touch ./deployment-log.txt
try3 rsync --delete-delay -chrltzv --ipv4 --info=BACKUP,DEL -e 'ssh -p 2222 -oStrictHostKeyChecking=no' public/ --temp-dir=../../tmp/ live.$PROD_UUID@appserver.live.$PROD_UUID.drush.in:files/docs/ | tee deployment-log.txt;
if [ "$?" -eq "0" ]
then
    echo "Success: Deployed to https://pantheon.io/docs"
else
    # If rsync returns an error code the build will fail and send notifications for review
    echo "Error: Deploy failed, review rsync status"
    exit 1
fi



#=====================================================#
# Delete merged branches on GitHub                    #
#=====================================================#

# Update vm with current remote branches
echo "running `git remote update origin --prune`" #DEBUG
git remote update origin --prune

# Identify merged remote branches, ignoring Pantheon defaults and main
echo "Identifying merged branches" #DEBUG
git branch -r --merged main | awk -F'/' '/^ *origin/{if(!match($0, /(>|main)/) && (!match($0, /(>|dev)/)) && (!match($0, /(>|test)/)) && (!match($0, /(>|live)/))){print $2}}' | xargs -0 > merged-branches.txt

# Delete empty line at the end of txt file produced by awk
sed '/^$/d' merged-branches.txt > merged-branches-clean.txt

# Delete merged branches from GH Repo
  for branch in ${merged_branch_array[@]}; do
    if [ "$branch" != "sculpin" ] ; then
    git push origin --delete "$branch"
    fi
  done
