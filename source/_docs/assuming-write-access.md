---
title: Using Extensions That Assume Write Access
description: Learn how to create symbolic links from the code directory to a file.
keywords: symbolic links, write access
categories: [developing]
tags: [code]
---
Some modules and plugins rely on hard coded file paths outside of the standard files path for the given framework. WordPress stores files within `wp-content/uploads` and Drupal uses `/sites/default/files`. A WordPress plugin that writes files to `wp-content/plugins/plugin-name/some-other-directory` incorrectly assumes the path is writeable on any given environment. However, the codebase on Live and Test environments is not writeable on Pantheon by design.

The best solution for this issue would be to communicate with the maintainer of the module/plugin in use and request that hard coded non-standard paths be fixed. Alternatively, you can create a symbolic link as a workaround for non-standard file paths to avoid failures on Test and Live.

<div class="alert alert-info">
<h4>Note</h4>
The following local instructions for creating a symlink is supported on Mac and Linux machines only. Windows users should create symlinks within a virtual machine.
</div>
## Create a Symbolic Link

1. On your Dev environment's Dashboard, change the Connection Mode from SFTP to Git mode. [Install Git](/docs/git/#install-git) and [clone the code](/docs/git/#clone-your-site-codebase) locally if you have not done so already
2. From your terminal, `cd` to the site code repository, and create a symlink for the standard files path:

 ```bash
 # The first path will be used as the new file destination instead of whatever path the plugin assumed write access to
 ln -s ./wp-content/uploads/new-directory ./wp-content/path/plugin-expects-to-write-to
 # Stage your changes
 git add .
 ```

3. Run `git status` to review your current index.
4. Commit your changes:

 ```
 git commit -m "symlink non-standard files path to wp-content/uploads"
 ```

5. Push the changes to Pantheon:

 ```
 git push origin master
 ```

 Your commit can be seen from within the Dev environments commit history. The plugin will now successfully write files within any environment, even when Dev's connection mode is set to Git. In your previous configuration, the plugin would fail while in Git mode. You should not see the newly created files in the Dashboard as "ready to commit", as files are not version controlled.

6. Deploy to Test and confirm results.
7. Deploy to Live and perform the plugin operation which creates the desired files, then confirm results.

## See Also		
For more details on creating symbolic links on Mac/Linux, see [this thread](http://apple.stackexchange.com/questions/115646/how-can-i-create-a-symbolic-link-in-terminal).		
