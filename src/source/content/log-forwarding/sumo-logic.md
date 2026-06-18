---
title: Log Forwarding with Sumo Logic
contenttype: [doc]
innav: [true]
integration: [--]
reviewed: "2025-12-10"
permalink: docs/log-forwarding/sumo-logic
---
<Partial file="log-forwarding-beta.md" />

## Requirements
* Access granted for the [Log Forwarding Private Beta Program](/log-forwarding#access--availability)
* A Sumo Logic user role with the [`manageCollectors` capability](https://www.sumologic.com/help/docs/manage/users-roles/roles/role-capabilities/#data-management) granted.

## Add Sumo Logic configuration
Configure a specific endpoint in Sumo Logic:

1. Log into your Sumo Logic account.
1. Navigate to **Manage Data** > **Collection**.
1. Add or select a **Hosted Collector**.
1. Under the Collector, add a new **HTTP Logs and Metrics Source**.
1. Configure the source (e.g., name it `Pantheon Log Forwarding`) and set any necessary metadata (e.g., `_sourceCategory=pantheon/logs`).
1. Once the source is created, **copy the unique HTTP Source URL** provided by Sumo Logic. This URL is your specific endpoint for receiving the logs.

## Request Pantheon configuration
Reply to your beta program welcome email, or reach out to your Customer Success Manager (CSM), with the following information: 

1. **Workspace UUID:** Specify which workspace you want enabled.
1. **Sumo Logic HTTP Source URL:** The unique URL copied in Step 1.

### Test log streaming
Once Pantheon confirms that forwarding is active, you should see log data appear in your Sumo Logic search dashboard within minutes.
