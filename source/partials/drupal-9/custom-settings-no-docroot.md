---
contenttype: partial
categories: [upgrade]
newcms: [drupal9]
product: [--]
integration: [--]
tags: [--]
reviewed: ""
---

```bash{promptUser:user}
git status # Ensure working tree is clean
git show master:sites/default/settings.php > web/sites/default/original-settings.php
diff -Nup --ignore-all-space web/sites/default/settings.php web/sites/default/original-settings.php
# edit web/sites/default/settings.php and commit as needed
rm web/sites/default/original-settings.php
```
