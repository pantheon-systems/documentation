---
title: Git commit best practices
description: 
categories:
  - getting-started
permalink: documentation/advanced-topics/git-commit-best-practices/
Metadata
filename: source/_common-tasks/git-commit-best-practices.md
tools:
  -
---

## Commit often
Commit your code every time you:
- Install a module or theme and its dependencies,
- create or modify a feature,
- create or modify a sub-theme. 
ex:  
drush @pantheon.site-name.dev dl views  
drush @pantheon.site-name.dev en -y views   
(Drush will download dependencies - ctools)  
commit message: install views-7.x-3.1 module and ctools-7.x-1.4 module.  
[shift+enter] views module will be used to create lists of content filtered by content type. Ctools is the only dependency of views.
## Write clear commit messages
Do not write, "fixed a bunch of stuff" - it doesn't clearly articulate what changes the commit represents.   


Your git logs should become a list of instructions that someone can follow to rebuild your site. Having small, m
