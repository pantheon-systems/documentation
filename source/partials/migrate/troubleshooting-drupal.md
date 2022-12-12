---
contenttype: [partial]
categories: [migrate]
newcms: [drupal]
product: [--]
integration: [--]
tags: [--]
reviewed: ""
---

## Drupal Issues

### Multiple site directories found within the import archive

**Cause:** The migration tool found a multisite installation, which is not supported on the platform.

**Solution:** Refer to [Extracting Sites from a Drupal Multisite](/unwind-drupal-multisite).

### Drush archive missing code or files

**Cause:** If you have an existing archive (`.tgz`) file in `sites/default/files`, the `drush ard` command may generate an archive without all expected components.

**Solution:** Delete all archives and try running `drush ard` again.

### HTTP 404 error: Unable to download the archive

**Solution:** Go the to files directory of your existing site and check if the site archive was generated successfully. If you're hosting the archive on a third party like Dropbox or Google Drive, confirm that it was uploaded successfully. Visiting the archive link with a browser should download the files automatically. You may need to run the `drush ard` command again if you can't find the site archive.

### Could not import code, the import file does not appear to contain a valid code directory.

**Cause:** The migration tool could not find the core files. This prevents the migration from completing because the site modules, plugins, and/or themes cannot be imported. This error also occurs when multiple `settings.php` files are present.

**Solution:** Check that the archive includes a valid code root with all core files. If multiple `settings.php` files are present, delete them from the archive. Archives for Drupal 7 sites should include `index.php` at the code root level, along with the following directories:

```none
├── includes
├── index.php
├── misc
├── modules
├── profiles
├── scripts
├── sites
    └── all
        ├── modules
        └── themes
    └── default
        └── settings.php
└── themes
```

### Multiple file directories found within the import archive

**Cause:** The migration tool found more than one potential location for files within the archive. This error also occurs if Drupal's private files directory is not placed within the public directory: `sites/default/files/private`.

**Solution:** All files must be moved into `/sites/default/files`. For more details, see [Files](/guides/filesystem) and [Symlinks and Assumed Write Access](/symlinks-assumed-write-access).
