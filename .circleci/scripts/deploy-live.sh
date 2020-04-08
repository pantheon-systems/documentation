#!/bin/bash
# Deploy to Live
# Note: This script uses CircleCI environment variables https://circleci.com/docs/environment-variables

# Authenticate Terminus
auth-terminus

# Change to working directory
cd $BUILD_PATH

# Deploy modified files to production
touch ./deployment-log.txt
rsync --delete-delay -chrltzv --ipv4 --info=BACKUP,DEL -e 'ssh -p 2222 -oStrictHostKeyChecking=no' public/ --temp-dir=../../tmp/ live.$PROD_UUID@appserver.live.$PROD_UUID.drush.in:files/docs/ | tee deployment-log.txt;
if [ "$?" -eq "0" ]
then
    echo "Success: Deployed to https://pantheon.io/docs"
else
    # If rsync returns an error code the build will fail and send notifications for review
    echo "Error: Deploy failed, review rsync status"
    exit 1
fi


#=====================================================#
# Delete Multidev environment from static-docs site   #
#=====================================================#

# Identify existing environments for the static-docs site
terminus env:list --format list --field=ID docs-preview > ./env_list.txt
echo "Existing environments:" && cat env_list.txt

# Create array of existing environments on Static Docs
getExistingTerminusEnvs "env_list.txt"

# Update vm with current remote branches
echo "running `git remote update origin --prune`" #DEBUG
git remote update origin --prune

# Identify merged remote branches, ignoring Pantheon defaults and master
echo "Identifying merged branches" #DEBUG
git branch -r --merged master | awk -F'/' '/^ *origin/{if(!match($0, /(>|master)/) && (!match($0, /(>|dev)/)) && (!match($0, /(>|test)/)) && (!match($0, /(>|live)/))){print $2}}' | xargs -0 > merged-branches.txt

# Delete empty line at the end of txt file produced by awk
sed '/^$/d' merged-branches.txt > merged-branches-clean.txt

# Create an array of remote branches merged into master
echo "running function getMergedBranchMultidevName" #DEBUG
getMergedBranchMultidevName "merged-branches-clean.txt"

# Compare existing environments and merged branches, delete only if the environment exists
merged_branch=" ${merged_branch_multidev_names[*]} "
for env in ${existing_terminus_envs[@]}; do
  if [[ $merged_branch =~ " $env " ]] && [ "$env" != "sculpin" ] ; then
    echo "deleting Multidev environment $env" #DEBUG
    terminus multidev:delete docs-preview.$env --delete-branch --yes
  fi
done

getMergedBranchMultidevName "merged-branches-clean.txt"

# Delete merged branches from GH Repo
  for branch in ${merged_branch_array[@]}; do
    if [ "$branch" != "sculpin" ] ; then
    git push origin --delete "$branch"
    fi
  done
