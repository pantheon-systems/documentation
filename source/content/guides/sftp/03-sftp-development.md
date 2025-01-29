---
title: SFTP on Pantheon
subtitle: Commit or Discard SFTP Changes
description: Learn how to commit or discard and abandon your SFTP changes.
tags: [files, sftp, code]
reviewed: "2020-02-18"
innav: [false]
categories: [sftp]
cms: [drupal, wordpress]
audience: [development]
product: [dashboard]
integration: [--]
contributors: [whitneymeredith]
showtoc: true
permalink: docs/guides/sftp/sftp-development
---

This section provides information on how to commit or discard and abandon changes when developing in SFTP Mode.

## SFTP Mode

You can switch between SFTP and Git modes in your Dev environment. This prevents you from accidentally overwriting changes from a different source. 

SFTP mode has a comment box above the commit log. The Dashboard automatically tracks your pending changes as you make updates to the codebase. You can then commit your changes to version control- without having to use Git directly- when you are happy with the results.

### Enable SFTP Mode

1. Navigate to your **Dev** environment.

1. Click **SFTP** next to the **Development Mode** toggle to enable SFTP mode.

 ![Enable SFTP mode](../../../images/dashboard/new-dashboard/2024/sftp-enabled.png)

## SFTP Changes

You cannot use Git to push changes remotely with SFTP mode enabled. You must commit your changes in the comment box located above the commit log to push changes to the Test and Live environments. **Commit early and commit often**. Keep in mind:

- SFTP changes to code that have not been committed *are not saved in backups, and are not included in deployments* as these updates are not part of your code repository.
- Changing your site's connection mode from SFTP to Git will discard all uncommitted file changes. Commit your updates before toggling the connection mode if you want to keep your work.
- Containers are migrated as a regular part of maintenance. This can delete uncommitted changes.
- You won't be able to save anything that's been excluded from version control via `.gitignore`.

### Commit SFTP Changes

1. Make a change to your code. There will be a message on the Dashboard, below the comment box, letting you know you have uncommitted changes.

1. Click the notification message to expand the listing of pending changes.

    ![A snapshot of a Pantheon Site Dashboard showing 119 uncommitted changes to the code](../../../images/dashboard/pantheon-dashboard-uncommitted-changes.png)

1. Write a helpful commit message to go with your changes. This makes it easier for other developers to understand changes you've made.

1. Click **Commit** when your message is ready.

    - Large sets of code changes that take longer than two minutes to commit may timeout and fail. To resolve this, temporarily remove some of your code changes (new modules or plugins), and then try again.

<Alert title="Note" type="info">

Your Dashboard tracks all changes made within your codebase. File change notifications do not include changes in the content files directory (e.g. `wp-content/uploads` or `sites/default/files/`) because these files are not tracked in version control. Refer to [Use the Pantheon WebOps Workflow](/pantheon-workflow) for more information.

</Alert>

## Discard and Abandon SFTP Changes

You can discard and abandon SFTP changes that you don't want to commit. This is a useful action when you have several changes you want to undo and you don't want to manually revert the changes.

1. Toggle the **Connection Mode** from **SFTP** to **Git** to *permanently* discard all SFTP changes that have not been committed.

1. Toggle back to **SFTP** mode when you're ready to resume SFTP development.

## More Resources

- [Using Git with SFTP & WordPress](/guides/wordpress-git/)
- [Git on Pantheon](/guides/git)
