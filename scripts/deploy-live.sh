#!/bin/bash
# Deploy to Live
# Note: This script uses CircleCI environment variables https://circleci.com/docs/environment-variables

#=====================================================#
# Build prod env and create backup dirs on Circle     #
#=====================================================#
bin/sculpin generate --env=prod
# Creates dir and log file on the virtual machine so the log can be generated and then rsync'd to Valhalla for debugging purposes
mkdir ../docs-rsync-logs
echo "rsync log - deploy to Live environment on `date +%F-%I%p`" > ../docs-rsync-logs/rsync-`date +%F-%I%p`.log


#===============================================================#
# Deploy modified files to production, create log   #
#===============================================================#
rsync --log-file=../docs-rsync-logs/rsync-`date +%F-%I%p`.log --human-readable --size-only --checksum --delete-after -rlvz --ipv4 --progress -e 'ssh -p 2222' output_prod/docs/* --temp-dir=../../tmp/ live.$PROD_UUID@appserver.live.$PROD_UUID.drush.in:files/docs/
if [ "$?" -eq "0" ]
then
    echo "Success: Deployed to https://pantheon.io/docs"
else
    # If rsync returns an error code the build will fail and send notifications for review
    echo "Error: Deploy failed, review rsync status"
    exit 1
fi
# Upload log to Valhalla on Live
rsync -vz --progress --temp-dir=../../../tmp/ -e 'ssh -p 2222' ../docs-rsync-logs/rsync-`date +%F-%I%p`.log live.$PROD_UUID@appserver.live.$PROD_UUID.drush.in:files/docs-rsync-logs/
if [ "$?" -eq "0" ]
then
    echo "Success: Log file uploaded to files/docs-backups/"
else
    echo "Error: Log file failed to upload"
    exit 1
fi


#===============================================================#
# Authenticate Terminus and clear caches on panther Live env    #
#===============================================================#
~/documentation/bin/terminus auth login --machine-token=$PANTHEON_TOKEN

#=====================================================#
# Delete Multidev environment from static-docs site   #
#=====================================================#
# Identify existing environments for the static-docs site
~/documentation/bin/terminus site environments --site=static-docs > ./env_list.txt
echo "Existing environments:"
tail -n +2 env_list.txt | cut -f1 | tee ./filtered_env_list.txt
# Create array of existing environments on Static Docs
getExistingTerminusEnvs() {
    existing_terminus_envs=() # Clear array
    while read -r env # Read a line
    do
        existing_terminus_envs+=( "$env" ) # Append line to the array
    done < "$1"
}
getExistingTerminusEnvs "filtered_env_list.txt"

# Update vm with current remote branches
git remote update origin --prune
# Identify merged remote branches, ignoring Pantheon defaults and master
git branch -r --merged master | awk -F'/' '/^ *origin/{if(!match($0, /(>|master)/) && (!match($0, /(>|dev)/)) && (!match($0, /(>|test)/)) && (!match($0, /(>|live)/))){print $2}}' | xargs -0 > merged-branches.txt
# Delete empty line at the end of txt file produced by awk
sed '/^$/d' merged-branches.txt > merged-branches-clean.txt
# Create an array of remote branches merged into master
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
getMergedBranchMultidevName "merged-branches-clean.txt"

# Compare existing environments and merged branches, delete only if the environment exists
merged_branch=" ${merged_branch_multidev_names[*]} "
for env in ${existing_terminus_envs[@]}; do
  if [[ $merged_branch =~ " $env " ]] ; then
    ~/documentation/bin/terminus site delete-env --env=$env --site=static-docs --yes
  fi
done

getMergedBranch() {
    merged_branch_array=() # Clear array
    while read -r branch # Read a line
    do
        # Save the first 11 chars, then remove -'s to follow multidev naming strategy
        merged_branch_array+=( "$branch" ) # Append to the array
    done < "$1"
}
getMergedBranch "merged-branches-clean.txt"

# Delete merged branches from GH Repo
for branch in ${merged_branch_array[@]}; do
  git push origin --delete "$branch"
done
