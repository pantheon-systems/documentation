---
title: Creating Symbolic Links from Code Directories to Files
description: Learn how to create symbolic links from the code directory to a file.
keywords: symbolic links
categories: [developing]
tags: [code]
---
There are times when plugins need write permissions to the code directory. This article walks you through creating a symbolic link for the Dev environment.

## Create a Symbolic Link

1. On your Dev environment's Dashboard, change the Connection Mode from SFTP to Git mode. If you do not have Git installed locally, [follow these instructions](https://pantheon.io/docs/articles/local/starting-with-git/) to install it.  
2. From your terminal, cd to the site code repository, make a copy of the writeable directory, and delete it from the code repository:
```
ln -s ./wp-content/uploads/new-directory ./wp-content/path/plugin-expects-to-write-to
git add .
```
3. Run `git status` and you should see the symlink in green and all of the language files in red.
4. Commit your changes:
```
git commit -m "create symlink to writeable directory"
```
5. Push the changes to Pantheon:
```
git push origin master
```
Your symlink will exist on the Dev environment, and when the plugin creates the files, it should continue to work even with the Dev environment in Git mode. In your previous configuration, the plugin would fail while in Git mode. You should not see the newly created files in the Dashboard as "ready to commit".

6. Deploy your code changes to Test and test them there.  
7. Deploy your code changes to Live and create the files again there. If you do not want the Live environment to have to recreate the files, you can upload the the files you created in step 2 to the Live environment's `/wp-content/uploads/new-directory` directory via SFTP prior to deploying.

## See Also
To learn how to create symbolic links on Mac/Linux, see [this article](http://apple.stackexchange.com/questions/115646/how-can-i-create-a-symbolic-link-in-terminal).
