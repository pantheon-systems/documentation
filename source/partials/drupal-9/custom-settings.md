---
contenttype: partial
categories: [upgrade]
newcms: [drupal9]
product: [--]
integration: [--]
tags: [--]
reviewed: ""
---

Your existing site may have customizations to `settings.php` or other configuration files. Review these carefully and extract relevant changes from these files to copy over. Always review any file paths referenced in the code, as these paths may change in the transition to Composer.

We don't recommend that you completely overwrite the `settings.php` file with the old one, as it contains customizations for moving the configuration directory that shouldn't be overwritten, as well as platform-specific customizations.

<TabList>

<Tab title="With Nested Docroot" id="code-docroot" active={true}>

```bash{promptUser:user}
git status # Ensure working tree is clean
git show master:web/sites/default/settings.php > web/sites/default/original-settings.php
diff -Nup --ignore-all-space web/sites/default/settings.php web/sites/default/original-settings.php
# edit web/sites/default/settings.php and commit as needed
rm web/sites/default/original-settings.php
```

</Tab>

<Tab title="Without Nested Docroot" id="code-nodocroot">

<Partial file="drupal-9/custom-settings-no-docroot.md" />

</Tab>

</TabList>

The resulting `settings.php` should have no `$databases` array.

Commit your changes as needed.
