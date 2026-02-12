---
contenttype: [partial]
categories: []
cms: [drupal]
product: [front-end]
integration: []
tags: [--]
reviewed: ""
---

Variable names *can* include:

- Uppercase letters
- Numbers
- Underscores

Variable names *cannot* include:

- Special characters (other than underscores)
- Lowercase letters
- Commas
- Reserved words. Reserved words include:

    - `PORT`
    - `K_SERVICE`
    - `K_REVISION`
    - `K_CONFIGURATION`
    - `CLOUD_RUN_JOB`
    - `CLOUD_RUN_EXECUTION`
    - `CLOUD_RUN_TASK_INDEX`
    - `CLOUD_RUN_TASK_ATTEMPT`
    - `CLOUD_RUN_TASK_COUNT`
    - `PANTHEON_*`

Pantheon can use environment variables as the mechanism to opt-in to new enhancements like:

- `FLAG_V1_PIPELINE` to opt-in to the [V1 build pipeline](/guides/decoupled/overview/v1-pipeline)
