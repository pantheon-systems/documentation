---
contenttype: [partial]
categories: [migrate]
newcms: [--]
product: [--]
integration: [--]
tags: [--]
reviewed: ""
---

1. Navigate to the Site Dashboard and click the **<span class="fa fa-wrench"></span> Dev** environment.

1. Set the site's **Development Mode** to Git:

  ![Git connection mode](../../images/dashboard/connection-mode-git.png)

1. Copy the `git clone` command for the site repository.

  The command should look similar to the following:

  ```shell{promptUser:user}
  git clone ssh://codeserver.dev.{site-id}@codeserver.dev.{site-id}.drush.in:2222/~/repository.git
  ```

1. Run the `git clone` command in the working folder.
