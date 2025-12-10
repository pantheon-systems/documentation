---
title: Log Forwarding with Sumo Logic
contenttype: [doc]
innav: [true]
integration: [--]
reviewed: "2025-12-10"
permalink: docs/log-forwarding/sumo-logic
---
<Partial file="log-forwarding-beta.md" />

## Setup Steps: Requesting Activation
To enable log forwarding to Sumo Logic, you must first create a specific endpoint in Sumo Logic and then provide the URL to your Pantheon team.

### Step 1: Configure an HTTP Source in Sumo Logic
1. Log into your Sumo Logic account.
1. Navigate to **Manage Data** > **Collection**.
1. Add or select a **Hosted Collector**.
1. Under the Collector, add a new **HTTP Logs and Metrics Source**.
1. Configure the source (e.g., name it `Pantheon Log Forwarding`) and set any necessary metadata (e.g., `_sourceCategory=pantheon/logs`).
1. Once the source is created, **copy the unique HTTP Source URL** provided by Sumo Logic. This URL is your specific endpoint for receiving the logs.

### Step 2: Contact Your Pantheon Team
Contact your **Customer Success Manager (CSM)** or **open a Support** ticket with the following information:

1. **Site UUID(s) and Environment(s):** Specify which sites and environments (e.g., `live`, `test`) require log forwarding.
1. **Sumo Logic HTTP Source URL:** The unique URL copied in Step 1.

The Pantheon team will configure the forwarding for the requested environments.

## Verification
Once Pantheon confirms that forwarding is active, you should see log data appear in your Sumo Logic search dashboard within minutes.
