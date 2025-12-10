---
title: Log Forwarding with Splunk
contenttype: [doc]
innav: [true]
integration: [--]
reviewed: "2025-12-10"
permalink: docs/log-forwarding/splunk
---
<Partial file="log-forwarding-beta.md" />

## Setup Steps: Requesting Activation
To enable log forwarding to Splunk, you must first configure a secure HTTP Event Collector (HEC) and provide the necessary credentials to your Pantheon team.

### Step 1: Configure an HTTP Event Collector (HEC) in Splunk
1. In your Splunk instance, navigate to **Settings > Data Inputs > HTTP Event Collector**.
1. Create a New Token (e.g., named `pantheon_logs`).
1. Configure the token settings, ensuring you set the appropriate **Index**.
  
   * _**Note:** Pantheon forwards logs as raw text (or JSON, depending on the internal format). Consult your Splunk administrator for the ideal Source Type setting._

1. Once created, copy the **HEC Token** (this is a GUID).
1. Note the **Splunk HEC Endpoint** (the host and port, e.g., `https://my-splunk.com:8088`).



### Step 2: Contact Your Pantheon Team
Contact your **Customer Success Manager (CSM)** or **open a Support** ticket with the following information:

1. **Site UUID(s) and Environment(s):** Specify which sites and environments (e.g., live, test) require log forwarding.
1. **Splunk HEC Endpoint URL:** The host and port (e.g., https://my-splunk.com:8088).
1. **HEC Token:** The unique GUID copied in Step 1.

The Pantheon team will configure the forwarding for the requested environments.

## Verification
Once Pantheon confirms that forwarding is active, use the Splunk search interface (e.g., `index=<your_index> token="<HEC_token>"`) to verify that log events are being ingested.
