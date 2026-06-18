---
contenttype: [partial]
categories: [migrate]
cms: [drupal]
product: [--]
integration: [--]
tags: [--]
reviewed: ""
---

- Using Terminus (recommended):

  ```shell{promptUser:user}
  echo "SELECT @@version;" | $(terminus connection:info $SITE.$ENV --fields=mysql_command --format=string)
  ```

- From the Site Dashboard, find the **Workflows** <Icon icon="angleDown" /> dropdown on the Site Dashboard and confirm that the Workflows completed successfully.
