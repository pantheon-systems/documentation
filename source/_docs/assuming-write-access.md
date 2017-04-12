---
title: Using Extensions That Assume Write Access
description: Learn how to create symbolic links from the code directory to a file.
tags: [debugfiles]
categories: []
---
Some modules and plugins create files within hard-coded paths outside of the standard path for the given framework, which can be problematic on Pantheon. WordPress stores files within `wp-content/uploads` and Drupal uses `/sites/default/files`. These directories are symbolically linked to Pantheon's cloud-based filesystem, Valhalla, which is writeable on all environments. Extensions that create files within the codebase (e.g. `wp-content/plugins/plugin-name/some-other-directory` or `/sites/all/modules/module-name/some-other-directory`) incorrectly assume write access that is not granted on the Live and Test environments.

The best solution is to communicate with the maintainer of the module or plugin and request that hard-coded, nonstandard paths be fixed. Alternatively, you can create a symbolic link as a workaround to avoid failures on Test and Live.

<div class="alert alert-info">
<h4 class="info">Note</h4>
<p>The instructions for creating a symlink are supported on Mac and Linux machines only. Windows users should create symlinks within a virtual machine.</p>
</div>
## Create a Symbolic Link

1. On your Dev environment's Dashboard, change the Connection Mode from SFTP to Git mode. [Install Git](/docs/git/#install-git) and [clone the code](/docs/git/#clone-your-site-codebase) locally if you have not done so already.
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

 Your commit can be seen in the Dev environments commit history. The plugin will now successfully write files within any environment, even when the Dev environment's connection mode is set to Git. In your previous configuration, the plugin would fail while in Git mode. You should not see the newly created files in the Dashboard as "ready to commit", as files are not version controlled.

6. Deploy to Test and confirm results.
7. Deploy to Live and perform the plugin operation that creates the desired files, then confirm results.

## Troubleshooting
Some modules and plugins verify that the target directory exists using `is_dir()` which returns bool(false) if the directory is a symlink. It may help to patch the module/plugin to use `is_link()` instead of `is_dir()`.

## See Also		
For more details on creating symbolic links on Mac/Linux, see [this thread](http://apple.stackexchange.com/questions/115646/how-can-i-create-a-symbolic-link-in-terminal).		
