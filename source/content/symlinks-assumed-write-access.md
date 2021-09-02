---
title: Symlinks and Assumed Write Access
description: Learn how to create symbolic links from the code directory to a file.
categories: [troubleshoot]
tags: [cli, code, files]
reviewed: "2021-09-02"
---

Some modules and plugins create files within hard-coded paths outside of the standard path for the given framework, which can be problematic on Pantheon.

## Standard File Path

Pantheon provides one location for files that are part of your site's content, like those that are managed through Drupal upload forms, e.g., user profile pictures: `/sites/default/files`. For Drupal sites, this is the default location for files that are uploaded as part of your application.

For WordPress sites, `/wp-content/uploads` is the default location for files. All other locations are considered part of your codebase, and under version control.

These directories are symbolically linked to Pantheon's cloud-based filesystem, Valhalla, which is writeable on all environments.

Extensions that create files within the codebase (e.g.,`wp-content/plugins/plugin-name/some-other-directory`, or `/sites/all/modules/module-name/some-other-directory`) incorrectly assume write access that is not granted on the Live and Test environments.

Custom configurations that use non-standard file paths (e.g.,`sites/default/blogfiles`) are also incompatible with Pantheon.

The best solution is to communicate with the maintainer of the module, plugin, or custom code/configuration and request that hard-coded, nonstandard paths be fixed. Alternatively, you can create a symbolic link as a workaround to avoid failures on Test and Live.

## Create a Symbolic Link

<Alert title="Note" type="info">

We do not recommend creating symlinks over SFTP due to inconsistencies between clients.

The following is for Mac and Linux only. Windows users may refer to Microsoft documentation for opening [Command Prompt as an Administrator](https://technet.microsoft.com/en-us/library/cc947813(v=ws.10).aspx) and [creating symlinks using mklink](https://technet.microsoft.com/en-us/library/cc753194.aspx) or create symlinks within a virtual machine.

</Alert>

1. On your Dev environment's Dashboard, change the [Connection Mode](/guides/quickstart/connection-modes) from SFTP to Git mode. [Install Git](/git#install-git) and [clone the code](/git#clone-your-site-codebase) locally if you have not done so already.

1. From your terminal, `cd` to the site code repository:

    ```bash{promptUser: user}
    cd ~/sites/myawesomesite/ #Change this to your project directory.
    ```

1. Move the directory you want to replace with a symlink. This serves to both back up any data that may otherwise be lost, and to prevent the symlink from being nested inside the existing directory:

    ```bash{promptUser: user}
    mv ./wp-content/path/plugin-expects-write-to ~/backups
    ```

    The command above moves the directory to a local `backups` directory in your home folder. Replace this with your preferred backup location. Note that this backup is now outside and separate from your site's codebase, and is only a safety measure to prevent data loss. Once you've confirmed that the symlink works across all environments and no data has been lost, you can remove this backup.

1. `cd` to the location where you want to place the symlink. The symlink command (`ln`) is sensitive to the **working directory**, the folder your command line prompt is currently in. Working from the location of the symlink allows for correct relative paths:

   ```bash{promptUser: user}
   cd wp-content/path/
   ```

1. Create a symlink for the standard files path:

    ```bash{promptUser: user}
    # The first path will be used as the new file destination instead of whatever path the plugin assumed write access to
    ln -s ../uploads/new-directory #The last nested directory should mirror the directory name the plugin expects to write to
    ```

    <Accordion title="About ln Arguments" id="example-panel" icon="education">

    The most common usage of `ln` is the form `ln -s path/to/source.file path/to/destination.file`. The `-s` flag creates a **symbolic** link, which is more like a redirect to the source, whereas a **hard link** is a new file sharing the same inode<Popover title="inode" content="An inode (index node) is a data structure in a Unix-style file system that describes a file-system object such as a file or a directory." /> in the file system.

    By default, `ln` creates a file in the current working directory with the same name as the source. In the example above, we don't provide a destination file name as an argument. This simplifies the command when the link doesn't need a different name.

    </Accordion>

1. Stage your changes:

    ```bash{promptUser: user}
    git add .
    ```

1. Run `git status` to review your current index, then commit your changes:

    ```bash{promptUser: user}
    git commit -m "symlink non-standard files path to wp-content/uploads"
    ```

1. Push the changes to Pantheon:

    ```bash{promptUser: user}
    git push origin master
    ```

 Your commit can be seen in the Dev environment's commit history. Once this commit is synced to all environments, the plugin will successfully write files within any environment, even when the Dev environment's connection mode is set to Git.

 You should not see the newly created files in the Dashboard as "ready to commit," as files are not version controlled. Only the symlink to the new path is in the codebase.

  <Alert title="Note" type="info">

  In our example, we set the target directory of the symlink as `./wp-content/uploads/new-directory`. Make sure this directory is created via SFTP if it does not exist yet.

  </Alert>

1. Deploy to Test and confirm results.
1. Deploy to Live and perform the plugin operation that creates the desired files, then confirm results.

## Examples

<Accordion title="Divi theme version 4.0.6 and above" id="divi-panel" icon="wrench">

As discussed in [Modules and Plugins with Known Issues](/modules-plugins-known-issues#divi-wordpress-theme--visual-page-builder), [Divi WordPress Theme & Visual Page Builder version 4.0.6 and above](https://www.elegantthemes.com/gallery/divi) is assumes write access to the codebase where the `et-cache` folder is located.

<Alert  title="Note" type="info">

You must manually create the target folders `wp-content/et-cache` for Dev, Test, Live, and any Multidev environments.

</Alert>

#### For MacOS & Linux

From the `wp-content` directory:

```bash{promptUser: user}
ln -s ./uploads/et-cache ./et-cache
```

To verify, use `ls -al`:

```none{promptUser: user}
et-cache -> ./uploads/et-cache
```

#### For Windows

Note that the syntax for Windows Command Prompt is opposite from MacOS and Linux, requiring the symlink path *before* the target. From the root of your installation, run `mklink` as an admin:

```bash{promptUser: winshell}
mklink /d ./wp-content/et-cache ./uploads/et-cache
```

Each command will return the following upon success:

```none
symbolic link created for ./wp-content/et-cache <<===>> ./uploads/et-cache
```

To verify that you have done it correctly, you should have these when you list your folders in `wp-content` directory:
You can also verify success using `dir`:

```powershell
<SYMLINKD>        et-cache [./uploads/et-cache]
```

</Accordion>

<Accordion title="Nitropack" id="nitropack-panel" icon="wrench">

As discussed in [WordPress Plugins and Themes with Known Issues](/plugins-known-issues), [Nitropack](https://wordpress.org/plugins/nitropack/) assumes write access to the `wp-content/nitropack` folder and to `advanced.cache.php`.

<Alert  title="Note" type="info">

You must manually create the target folders `code/wp-content/uploads/nitropack` and `code/wp-content/uploads/advanced-cache.php` for Dev, Test, and Live environments.

</Alert>

1. In the command line, navigate to `code/wp-content/uploads` in your Dev environment. Or, if you are using an SFTP client (such as [FileZilla](https://filezilla-project.org/)), navigate to `files/`.

1. Create a `nitropack` folder and an `advanced-cache.php` file, using the following command: `mkdir ./nitropack​ && touch ./advanced-cache.php`.

    **Note:** Be sure to delete any `advanced-cache.php` file that is present in the `./uploads` directory before creating the file.

1. Repeat steps 1 and 2 for your Test and Live environments.

1. Create a symlink in your `code/wp-content` directory:  
    `ln -s ./uploads/nitropack/ ./nitropack`  
    `ln -s ./uploads/advanced-cache.php ./advanced-cache.php`

1. Commit changes to Live environment.

</Accordion>

<Accordion title="WP-Rocket" id="wp-rocket-panel" icon="wrench">

As discussed in [WordPress Plugins and Themes with Known Issues](/plugins-known-issues), [WP-Rocket](https://wp-rocket.me/) assumes write access to the codebase.

<Alert  title="Note" type="info">

You must manually create the target folders `wp-content/uploads/cache` and `wp-content/uploads/wp-rocket-config` for Dev, Test, Live, and any Multidev environments.

</Alert>

#### For MacOS & Linux

From the `wp-content` directory:

```bash{promptUser: user}
ln -s ./uploads/cache ./cache
ln -s ./uploads/wp-rocket-config ./wp-rocket-config
```

To verify, use `ls -al`:

```none
cache -> ./uploads/cache
wp-rocket-config -> ./uploads/wp-rocket-config
```

#### For Windows
Note that the syntax for Windows is opposite from MacOS and Linux, requiring the symlink path *before* the target:

```bash{promptUser: winshell}
mklink /d ./wp-content/cache ./uploads/cache
mklink /d ./wp-content/wp-rocket-config ./uploads/wp-rocket-config
```

Each command will return the following upon success:

```none
symbolic link created for ./wp-content/cache <<===>> ./uploads/cache
symbolic link created for ./wp-content/wp-rocket-config <<===>> ./uploads/wp-rocket-config
```

To verify that you have done it correctly, you should have these when you list your folders in `wp-content` directory:
You can also verify success using `dir`:

```powershell
<SYMLINKD>        cache [./uploads/cache]
<SYMLINKD>        wp-rocket-config [./uploads/wp-rocket-config]
```

</Accordion>

<Accordion title="Uncode Theme" id="uncode-panel" icon="wrench">

As discussed in [WordPress Plugins and Themes with Known Issues](/plugins-known-issues), [Uncode theme](https://undsgn.com/uncode/) assumes write access to its CSS files and the codebase.

1. Manually move the target folders:

  `wp-content/themes/uncode/core/assets/css`

  To: `wp-content/uploads/uncode/assets/css`

  And:

  `wp-content/themes/uncode/library/css`

  To: `wp-content/uploads/uncode/library/css` in Dev.

1. Copy the files generated from:

  `wp-content/themes/uncode/library/css`

  To:

  `wp-content/uploads/uncode/library/css`

  In Test, Live, and any Multidev environments after deploying codes for the theme to take effect in different environments.

#### For MacOS & Linux

From the `wp-content` directory:

```bash{promptUser: bash}
ln -s ../../../../uploads/uncode/assets/css ./themes/uncode/core/assets
ln -s ../../../uploads/uncode/library/css ./themes/uncode/library
```

To verify, use `ls -al` in the `wp-content/themes/uncode/core/assets` folder:

```none
css -> ../../../../uploads/uncode/assets/css
```

As well as in the `wp-content/themes/uncode/library` folder :

```none
css -> ../../../uploads/uncode/library/css
```

#### For Windows

Note that the syntax for Windows is opposite from MacOS and Linux, requiring the symlink path *before* the target and backslash is used to denote folders. In the `wp-content` folder create the symlinks by:

```bash{promptUser: winshell}
mklink /d ./themes/uncode/core/assets ../../../../uploads/uncode/assets/css
mklink /d ./themes/uncode/library ../../../uploads/uncode/library/css
```

Each command will return the following upon success:

```none
symbolic link created for ./themes/uncode/core/assets <<===>> ../../../../uploads/uncode/assets/css
symbolic link created for ./themes/uncode/library <<===>> ../../../uploads/uncode/library/css
```

To verify that you have done it correctly, you should have these when you list your folders in `wp-content/themes/uncode/core/assets` directory:
You can also verify success using `dir`:

```powershell
<SYMLINKD>        css [../../../../uploads/uncode/assets/css]
```

And in the `themes/uncode/library` directory:

```powershell
<SYMLINKD>        css [../../../uploads/uncode/library/css]
```

</Accordion>

## Troubleshooting

### Removing a Symlink

If a site no longer needs a symlink, because you uninstalled the plugin that required it for example, you can simply remove the symlink file from your codebase using `rm`. Move back any folders from the public files folder that should be tracked by version control.

### Modules That Verify Directories

Some modules and plugins verify that the target directory exists using `is_dir()` which returns bool(false) if the directory is a symlink. It may help to patch the module/plugin to use `is_link()` instead of `is_dir()`.

### Incorrect Symlink Paths

If a symlinked folder doesn't show the proper contents, double-check that the path is correct. In Bash, `ls -l` will show symlinks paths:

```bash{outputLines:2-3}
ls -l

lrwxr-xr-x  1 user  group     39 Sep 13 14:29 images -> ../plugins/some-plugin/images/
```

Try changing the working directory in which you create the symlink, using `../` to refer to directories above the working directory, and `./` to refer to the current directory.

## See Also
For more details on creating symbolic links on Mac/Linux, see [this thread](https://apple.stackexchange.com/questions/115646/how-can-i-create-a-symbolic-link-in-terminal).
