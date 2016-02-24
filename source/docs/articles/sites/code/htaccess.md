---
title: htaccess workarounds on Pantheon
description: Common questions regarding .htaccess alternatives
---
We run NGINX and not Apache on Pantheon.  This causes developers who are used to using the .htaccess file some confusion as to what can be accomplished (or not) without it.
As a rule of thumb, you will use PHP to accomplish anything that you would have done using .htaccess.
nginx.conf is not editable at the site level.  It is standard across all Pantheon sites.

## Examples

TO DO

 - links to Redirects
 - preventing image hotlinking (https://www.maketecheasier.com/prevent-people-from-hotlinking-your-images/)
