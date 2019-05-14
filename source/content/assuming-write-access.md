---
title: Using Extensions That Assume Write Access
description: Learn how to create symbolic links from the code directory to a file.
tags: [debugfiles]
categories: []
---
Some modules and plugins create files within hard-coded paths outside of the standard path for the given framework, which can be problematic on Pantheon. WordPress stores files within `wp-content/uploads` and Drupal uses `/sites/default/files`. These directories are symbolically linked to Pantheon's cloud-based filesystem, Valhalla, which is writeable on all environments. Extensions that create files within the codebase (e.g. `wp-content/plugins/plugin-name/some-other-directory` or `/sites/all/modules/module-name/some-other-directory`) incorrectly assume write access that is not granted on the Live and Test environments.

The best solution is to communicate with the maintainer of the module or plugin and request that hard-coded, nonstandard paths be fixed. Alternatively, you can create a symbolic link as a workaround to avoid failures on Test and Live.

## Create a Symbolic Link

1. On your Dev environment's Dashboard, change the Connection Mode from SFTP to Git mode. [Install Git](/docs/git/#install-git) and [clone the code](/docs/git/#clone-your-site-codebase) locally if you have not done so already.

    <Alert title="Note" type="info">

    We do not recommend creating symlinks over SFTP due to inconsistencies amongst clients.

    The following is for Mac and Linux only. Windows users may refer to Microsoft documentation for opening [Command Prompt as an Administrator](https://technet.microsoft.com/en-us/library/cc947813(v=ws.10).aspx) and [creating symlinks using mklink](https://technet.microsoft.com/en-us/library/cc753194.aspx) or create symlinks within a virtual machine.

    </Alert>

2. From your terminal, `cd` to the site code repository:

    ```bash
    cd ~/sites/myawesomesite/ #Change this to your project directory.
    ```

3. Move the directory you want to replace with a symlink. This serves two purposes; backing up any data that may otherwise be lost, and preventing the symlink from being nested inside the existing directory:

    ```bash
    mv ./wp-content/path/plugin-expects-write-to ~/backups/
    ```

    The command above moves the directory to a folder named backups in your home directory. `~/`. Replace this with an existing backup location.

4. Create a symlink for the standard files path:

    ```bash
    # The first path will be used as the new file destination instead of whatever path the plugin assumed write access to
    ln -s ./wp-content/uploads/new-directory ./wp-content/path/plugin-expects-to-write-to
    ```

    <Alert title="Note" type="info">

    The `ln` command is sensitive to the **working directory**, the folder your prompt is currently sitting in. The example above assumes you're in the main directory of your local git repository.

    </Alert>

5. Stage your changes

    ```bash
    git add .
    ```

6. Run `git status` to review your current index, then commit your changes:

    ```bash
    git commit -m "symlink non-standard files path to wp-content/uploads"
    ```

7. Push the changes to Pantheon:

    ```bash
    git push origin master
    ```

 Your commit can be seen in the Dev environments commit history. The plugin will now successfully write files within any environment, even when the Dev environment's connection mode is set to Git. In your previous configuration, the plugin would fail while in Git mode. You should not see the newly created files in the Dashboard as "ready to commit", as files are not version controlled.

  <Alert title="Note" type="info">

  In our example, we created the target directory of the symlink as `./wp-content/uploads/new-directory`. Make sure this directory is created via SFTP if it does not exist yet.

  </Alert>

7. Deploy to Test and confirm results.
8. Deploy to Live and perform the plugin operation that creates the desired files, then confirm results.

## Examples

## Symlinking files: Making the WP debug log file write in the uploads folder

### For MacOS & Linux:
From the root directory or where your `wp-config.php` is:

```bash
ln -s ./uploads/debug.log ./wp-content/debug.log
```

To verify, use `ls -al` in the `wp-content` folder and you should have:

```nohighlight
debug.log -> ./uploads/debug.log
```

### For Windows:
Note that the syntax for Windows is opposite from MacOS and Linux, requiring the symlink path *before* the target:

```bash
mklink .\wp-content\debug.log .\uploads\debug.log
```

The command will return the following upon success:

```nohighlight
symbolic link created for .\wp-content\debug.log <<===>> .\uploads\debug.log
```

To verify that you have done it correctly, you should have these when you list your folders in `wp-content` directory:
You can also verify success using `dir`:

```nohighlight
<SYMLINKD>        debug.log [.\uploads\debug.log]
```

## Symlinking folder example

As discussed in [Modules and Plugins with Known Issues](/docs/modules-plugins-known-issues/), [WP-Rocket](https://wp-rocket.me/){.external} assumes write access to a couple of folders in the code base.

<Alert  title="Note" type="alert">

You must manually create the target folders `wp-content\uploads\cache` and `wp-content\uploads\wp-rocket-config` for Dev, Test, Live, and any Multidev environments.

</Alert>

### For MacOS & Linux:
From the `wp-content` directory:

```bash
ln -s ./uploads/cache ./wp-content/cache
ln -s ./uploads/wp-rocket-config ./wp-content/wp-rocket-config
```


To verify, use `ls -al` in the `wp-content` folder and you should have:

```
cache -> ./uploads/cache
wp-rocket-config -> ./uploads/wp-rocket-config
```

### For Windows:
Note that the syntax for Windows is opposite from MacOS and Linux, requiring the symlink path *before* the target:

```bash
mklink /d .\wp-content\cache .\uploads\cache
mklink /d .\wp-content\wp-rocket-config .\uploads\wp-rocket-config
```

Each command will return the following upon success:

```
symbolic link created for .\wp-content\cache <<===>> .\uploads\cache
symbolic link created for .\wp-content\wp-rocket-config <<===>> .\uploads\wp-rocket-config
```

To verify that you have done it correctly, you should have these when you list your folders in `wp-content` directory:
You can also verify success using `dir`:

```
<SYMLINKD>        cache [.\uploads\cache]
<SYMLINKD>        wp-rocket-config [.\uploads\wp-rocket-config]
```

## Troubleshooting

### Removing a Symlink

If a site no longer needs a symlink, because you uninstalled the plugin that required it for example, you can simply remove the symlink file from your codebase using `rm`. Move back any folders from the public files folder that should be tracked by version control.

### Modules That Verify Directories

Some modules and plugins verify that the target directory exists using `is_dir()` which returns bool(false) if the directory is a symlink. It may help to patch the module/plugin to use `is_link()` instead of `is_dir()`.

### Incorrect Symlink Paths

If a symlinked folder doesn't show the proper contents, doublecheck that the path is correct. In Bash, `ls -l` will show symlinks paths:

```bash
$ ls -l

lrwxr-xr-x  1 user  group     39 Sep 13 14:29 images -> ../plugins/some-plugin/images/
```

Try changing the working directory in which you create the symlink, using `../` to refer to directories above the working directory, and `./` to refer to the currect directory.

## See Also
For more details on creating symbolic links on Mac/Linux, see [this thread](https://apple.stackexchange.com/questions/115646/how-can-i-create-a-symbolic-link-in-terminal).
