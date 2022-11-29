---
contenttype: partial
categories: [migrate]
newcms: [--]
product: [--]
integration: [--]
tags: [--]
reviewed: "2022-11-03"
---

Now that you've committed your code additions locally, push the commits to Pantheon to deploy them to your Dev environment:

```bash{promptUser: user}
terminus connection:set $SITE.dev git
git push origin master
```
