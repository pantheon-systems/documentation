---
title: Hotfixes
description: Learn how to deploy and test hot fixes and preserve orphan commits on your Pantheon Drupal or WordPress site.
categories: [troubleshoot]
tags: [code, collaborate, git, webops, workflow]
---
For Experts only. You should not need to attempt this if you use [Multidev](/multidev) and keep commits from reaching Dev that you do not intend on deploying.

<Alert title="Warning" type="danger">

We do not recommend hotfixing. Hotfixes should be the exception, not the norm. Pushing a hotfix via Git is the only way to push code directly to Live without having to go through Dev and Test. Hotfixing is not a best practice and any damage to the source code will be the responsibility of the user and should be avoided whenever possible.

</Alert>


## Requirements

- A working knowledge of Git tools.
- An up-to-date clone of your Pantheon Git repository.

## Get Into the Right Tag

1. From within your Git clone, get a quick list of the existing Git tags:

   ```bash{outputLines: 2-7}
   git tag
   pantheon.initialize
   pantheon_live_1
   pantheon_test_1
   pantheon_test_2
   pantheon_test_3
   pantheon_test_4
   ```

 To get only the highest `live` tag, use the following:

 ```bash{promptUser: user}
 git tag | grep pantheon_live_ | sort -k1.15n | tail -1
 ```

2. Select the highest `live` tag and check it out:

   ```bash{outputLines: 2-16}
   git checkout pantheon_live_1
   Note: checking out 'pantheon_live_1'.
   
    
   You are in 'detached HEAD' state. You can make experimental
   changes and commit them, and you can discard any commits you make without impacting any branches by performing another checkout.
    
    
   If you want to create a new branch to retain commits you create, you can
   do so by using -b with the checkout command again. Example:
    
    
     git checkout -b new_branch_name
    
   
   HEAD is now at ....
   ```

   You are now ready to start work based on the state of the live site.

3. Create new branch and start working:

   ```bash{outputLines: 2}
   git checkout -b hotfix

   git commit -a -m "Hotfix issue xyz"
   ```

## Generate a New Hotfix Test Tag

1. Make your hotfixes and commit them locally. Once you're done, find the latest tag deployed to test:

   ```bash{promptUser: user}
   git tag | grep pantheon_test_ | sort -k1.15n | tail -1
   ```

2. Tag and push them to test by creating a _new_ test tag with a higher number value:

   ```bash{promptUser: user}
   git tag -a pantheon_test_5 -m "Preparing a hotfix"
   git push origin pantheon_test_5
   ```

   <Alert title="Note" type="info">

   Your tag numbers will vary. We are showing 5 because in the list of tags above the highest number was 4. Be sure you have the right number before pushing. The commands above should tell you the appropriate tag number.

   </Alert>

## Test and Deploy

<Alert title="Warning" type="danger">

Because we use caching on our Git logs, you may not see your hotfix commit listed in the test commit log. However, if you've pushed it up, you should be able to test your changes. Once you've verified that your code hotfix is there, you should pull the database back from Live to Test to be sure you're looking at a good test case before finally pulling it into the Live environment.

</Alert>

If your tests pass, you will need to repeat the process to deploy your changes to the Live environment. Currently, the deploys interface does not enable hotfix tags on test to be deployed directly to live.

```bash{promptUser: user}
git tag -a pantheon_live_2 -m "Deploying my hotfix"
git push origin pantheon_live_2
```

## Orphan Commits

On Pantheon an orphan commit is any commit that exists on the Test or Live environment, but not in the master branch.

Even when making hotfixes, your workflow should push those changes into the master branch. Since we have no way of knowing which future commit will contain those changes, we want you to be aware of potential code loss.

If you do want to preserve the orphan commits, follow these Git commands to make a clean merge:

```bash{promptUser: user}
git checkout master
git checkout -b hotfix
git cherry-pick 0f230b0ef9fdce5d794cb1a4b6cf26a8052ba92a
git checkout master
git merge hotfix
```

Make sure to cherry-pick the commits in chronological order to avoid issues with your integration and replace the hash code in the example above with the actual hash of the commit you are trying to preserve.
