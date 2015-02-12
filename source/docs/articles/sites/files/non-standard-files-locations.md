---
title: Non-Standard Files Locations
description: Learn how to address non-standard file locations from within the Pantheon filesystem.
category:
    - developing

---

Pantheon provides one location for files that are part of your sites content — those that are managed through Drupal upload forms, e.g. user profile pictures: `/sites/default/files`. This is the _only_ location you can use as the Drupal "files" directory.

If you are importing a site which has files in another location (e.g. "/files") you will need to move the files into the standard location, then add, commit and push a symlink from that location to the new location via git:

    $> ln -s ./sites/default/files ./files
    $> git add files
    $> git commit files -m "adding legacy files location symlink"
    $> git push origin master

Your legacy file paths should now work, and your fies will be stored in our cloud files location!

So long as the path you've chosen for your symlink does not conflict with a future Drupal core update, this link will persist indefinitely.

**Note**: adding a symlink for a legacy directory path will _not_ work with private files. If you have a private files use-case, you will need to migrate the file paths and drop references to the legacy location.
