---
title: Git Commit Best Practices
description:
category:
  - getting-started

draft: true
---
## Commit Often
Commit your code every time you:
- install a module or theme and its dependencies
- create or modify a feature
- create or modify a sub-theme 
Example:  
drush @pantheon.site-name.dev dl views  
drush @pantheon.site-name.dev en -y views   
(Drush will download dependencies - ctools)  
commit message: install views-7.x-3.1 module and ctools-7.x-1.4 module.  
[shift+enter] Views module is used to create lists of content filtered by content type. Ctools is the only dependency of views.

## Write Clear Commit Messages
Your Git logs should become a list of instructions that someone can follow to rebuild your site. Do not write, "fixed a bunch of stuff" as it doesn't clearly articulate what changes the commit represents.   
