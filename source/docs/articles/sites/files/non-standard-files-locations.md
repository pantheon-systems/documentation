---
title: Non-Standard Files Locations
description: Learn how to address non-standard file locations from within the Pantheon filesystem.
category:
    - developing
---
Pantheon provides one location for files that are part of your sites content, those that are managed through Drupal upload forms, e.g. user profile pictures: `/sites/default/files`. For Drupal sites, this is the _only_ location you can use for files that are uploaded as part of your application. For WordPress sites, `/wp-content/uploads` is the only acceptable location for files. All other locations will be in your codebase.

If you are importing a site which has files in another location (e.g. "/files") you will need to move the files into the standard location, and add, commit and push a symlink from that location to the new location via Git:  

You can read how to clone your site to your local machine at [Getting Started with GIT](/docs/articles/local/starting-with-git/).

Once you have your site cloned, you will want to open a terminal window, browse to here your repo is and run `cd code`. Now you will be in the /code root and can run the commands below.

**Drupal Sites**
```
    $> ln -s .././sites/default/files ./files
    $> git add files
    $> git commit files -m "adding legacy files location symlink"
    $> git push origin master
```
**WordPress Sites**
```
    $> ln -s ../wp-content/uploads ./files/newfolder
    $> git add files
    $> git commit files -m "adding legacy files location symlink"
    $> git push origin master
```

Your legacy file paths should now work, and your files will be stored in our cloud files location.

As long as the path you've chosen for your symlink does not conflict with a future core update to your application, this link will persist indefinitely.

**Note:** Adding a symlink for a legacy directory path will _not_ work with private files. If you have a private files use case, you will need to migrate the file paths and drop references to the legacy location.
