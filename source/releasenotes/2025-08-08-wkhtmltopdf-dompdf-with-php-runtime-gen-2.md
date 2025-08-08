---
title: "wkhtmltopdf will not be available on PHP Runtime Generation 2"
published_date: "2025-08-08"
categories: [infrastructure, wordpress, drupal, action-required]
---

[PHP Runtime Generation 2](/php-runtime-generation-2) will not include wkhtmltopdf.

Pantheon has included wkhtmltopdf with our PHP Runtime since 2012 as a tool for generating PDFs on-demand. This is commonly used by sites that have the [print](https://www.drupal.org/project/print) and [entity_print](https://www.drupal.org/project/entity_print) Drupal modules configured.

However, wkhtmltopdf has not been updated by its maintainers for 5 years and is considered abandoned. As a result, we are not including wkhtmltopdf with PHP Runtime Generation 2.

Sites that are using wkhtmltopdf should switch to [dompdf](https://github.com/dompdf/dompdf/). Dompdf is a PHP-based rendering engine that can be placed inside a site's codebase. Please refer to the [External Libraries documentation](/external-libraries#wkhtmltopdf) for information on how to make this switch.

PHP Runtime Generation 2 will begin rolling out September 17. If you need more time to switch to dompdf, we recommend [opting out for now](/php-runtime-generation-2#q-how-do-i-opt-out-of-the-upcoming-platform-rollout).
