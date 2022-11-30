---
contenttype: [partial]
categories: [migrate]
newcms: [--]
product: [--]
integration: [--]
tags: [--]
reviewed: ""
---

Complete the steps in this section to copy exported configuration settings from the original site to your new Pantheon site.

1. Navigate to your Pantheon site.

1. Run the following commands:

  ```bash{promptUser: user}
  mkdir config
  cp -R ../FORMER-PLATFORM/<config folder location> config/
  git commit -m "Add site configuration."
  ```
