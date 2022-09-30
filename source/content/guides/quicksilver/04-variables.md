---
title: Quicksilver on Pantheon
subtitle: Quicksilver Variables
description: Learn how to use variables with Quicksilver.
categories: [automate]
tags: [quicksilver, webops, workflow]
layout: guide
permalink: docs/guides/quicksilver/variables
anchorid: variables
---

This section provides information on Quicksilver variables.

Variables are made available through the `$_POST` global variable, and the `$_ENV` and `$_SERVER` objects. These variables include the following:


|Variable Name|Description|Hooks Available|Notes|
|--|--|--|--|
|`trace_id`|The unique ID of the workflow|All| |
|`site_id`|UUID of the site instance|All| |
|`environment`|Environment name that the workflow is running on|All|Matches the `PANTHEON_ENVIRONMENT` environment variable
|`stage`|`before` or `after` indicator for when the workflow is running|All|| |
|`qs_description`|Description of the workflow as defined in `pantheon.yml`|All| |
|`wf_type`|ID of the workflow hook that is running|All| |
|`wf_description`|Label of the workflow hook that is running|All| |
|`user_id`|UUID of the user account that initiated the task|All|If the task is initiated by Pantheon, `user_id` is `None`|
|`user_firstname`|First name of the user account that initiated the task|All|If the task is initiated by Pantheon, `user_firstname` is `Pantheon`|
|`user_lastname`|Last name of the user account that initiated the task|All|If the task is initiated by Pantheon, `user_lastname` is `Pantheon`|
|`user_fullname`|UUID of the user account that initiated the task|All|If the task is initiated by Pantheon, `user_fullname` is `Pantheon`|
|`user_email`|Email of the user account that initiated the task|All|If the task is initiated by Pantheon, `user_email` is `root@getpantheon.com`|
|`user_role`|UUID of the user that initiated the task|All| |
|`to_environment`|Target environment where the database is being cloned to|`clone_database`| |
|`from_environment`|Source environment where the database is being cloned from|`clone_database`| |
|`deploy_message`|Deploy message provided as part of a test of live deployment|`deploy`|This is only available if a deploy message is provided|
|`vrt_status`|Result of the visual regression test|`autopilot_vrt`| |
|`vrt_result_url`|Page URL associated with an Autopilot VRT result|`autopilot_vrt`|[Autopilot](/guides/autopilot) is only available in the new Pantheon Dashboard|
|`updates_info`|List of the plugins/modules/themes that were updated prior to the VRT|`autopilot_vrt`|Returns JSON data structure|

Refer to the [Quicksilver Examples](https://github.com/pantheon-systems/quicksilver-examples) repository for examples on how to use these variables.

## More Resources

- [Pantheon YAML Configuration Files](/pantheon-yml)
- [Autopilot](/guides/autopilot)