---
contenttype: partial
categories: [localdev]
newcms: [drupal9]
product: [--]
integration: [--]
tags: [--]
reviewed: ""
---

Set the temporary variable `$SITE` in your terminal session to match the name of your site.

This doc uses several commands that use the temporary command line alias, `$SITE`, to make entering command examples easier. Refer to the steps further in this doc to see which sites should be aliased (it may be more than one), then replace `anita-drupal` in this example:

```bash{promptUser:user}
export SITE=anita-drupal && echo "New alias set as $SITE"
```

<Accordion title="How to Use Terminus to Find the Site Name" id="site-name" icon="info-sign">

Use `terminus site:list` for a list of sites you have access to:

```bash{outputLines:2-8}
terminus site:list
--------------------------- --------------------- ------------- ----------------------------------- -------------------- --------------------- ------------- ------------
Name                        ID                    Plan          Framework          Region           Owner                Created               Memberships   Is Frozen?
--------------------------- --------------------- ------------- ------------------- ---------------- -------------------- --------------------- ------------- ------------
//highlight-start
anita-drupal                abdc80ce-286c-1234-   Sandbox       drupal8             Canada           3374708c-987e-1234   2020-12-15 19:40:42   d3ecc20c-395a false
//highlight-end
anita-wordpres              abdc9954-fab2-1234-   Sandbox       wordpress           United States    c96ddb25-336a-1234   2020-09-02 07:18:51   d3ecc20c-395a false
```

The site name is listed under `Name`. In this example, the site name is `anita-drupal`.

</Accordion>
