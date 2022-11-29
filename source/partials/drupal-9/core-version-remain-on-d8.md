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
  composer require --no-update drupal/core-recommended:^8.9
  composer require --dev drupal/core-dev:^8.9
  git add composer.*
  git commit -m "Remain on Drupal 8"
  ```
