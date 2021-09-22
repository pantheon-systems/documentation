To verify the site's upstream, use the Terminus command `terminus site:info $SITE`. 

<Accordion title="Use Terminus to Confirm the Site Upstream" id="framework" icon="info-sign">

  This example shows a shortened version of the output:

  ```bash{outputLines:2-18}
  terminus site:info $SITE
  ------------------ -------------------------------------------------------------------------------------
  ID                 abdc3ea1-fe0b-1234-9c9f-3cxeAA123f88
  Name               anita-drupal
  Label              AnitaDrupal
  Created            2019-12-02 18:28:14
  Framework          drupal8
  ...
  Upstream           8a129104-9d37-4082-aaf8-e6f31154644e: git://github.com/pantheon-systems/drops-8.git
  ...
  ------------------ -------------------------------------------------------------------------------------
  ```
  #### Common Pantheon Upstreams
| Name              | Framework            | Upstream                      | 
|:------------------ |:-------------------- |:-------------------------------- |
| `drops-8` | drupal8 | `git://github.com/pantheon-systems/drops-8.git` |
| `drupal9` Integrated Composer | drupal8 | `git://github.com/pantheon-systems/drupal-project.git` |
| `empty` | drupal8 | `` |

Use the Terminus [upstream:list](/terminus/commands/upstream-list) command to retrieve a list of upstreams accessible to you.  
  </Accordion>
  