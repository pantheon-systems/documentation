---
title: Adding a services.yml File
description: Learn how to add a services.yml file for Drupal 8.
category:
  - developing
  - drupal
keywords: drupal, services.yml, yml file
---
With Drupal 8, you may receive a "permission denied" error when trying to add a services.yml file under the `sites/default` folder.

This happens when you are trying to add it in while you're in SFTP mode. You need to switch to Git mode to add the file. This is because the `sites/default` directory has the permissions of 555, even if you toggle SFTP mode on and off.

## Add a services.yml File in Git

1. On the Code tab of your Dashboard, click **Git**.  
2. Create the file locally.  
3. Open your terminal and run `git add .`.  
4. Run `commit -m "enter a commit message`.  
5. Push the file by running `git push origin origin-name`.
