---
title: Log Forwarding with Splunk
contenttype: [doc]
innav: [true]
integration: [--]
reviewed: "2025-12-10"
permalink: docs/log-forwarding/splunk
---
<Partial file="log-forwarding-beta.md" />

## Requirements
* Access granted for the [Log Forwarding Private Beta Program](/log-forwarding#access--availability)
* A Splunk user role with the [`edit_token_http` capability](https://help.splunk.com/en/splunk-enterprise/administer/manage-users-and-security/10.0/manage-splunk-platform-users-and-roles/define-roles-on-the-splunk-platform-with-capabilities#ariaid-title3) granted.

## Add Splunk configuration
Configure a secure HTTP Event Collector (HEC) in Splunk:

1. In your Splunk instance, navigate to **Settings > Data Inputs > HTTP Event Collector**.
1. Create a New Token (e.g., named `pantheon_logs`).
1. Configure the token settings, ensuring you set the appropriate **Index**.

   <Alert type="info" title="Note">

   Pantheon forwards logs as raw text (or JSON, depending on the internal format). Consult your Splunk administrator for the ideal Source Type setting.

   </Alert>

1. Once created, copy the **HEC Token** (this is a GUID).
1. Copy the **Splunk HEC Endpoint** including both the hostname and port (e.g., `https://my-splunk.com:8088`).

## Request Pantheon configuration
Reply to your beta program welcome email, or reach out to your Customer Success Manager (CSM), with the following information: 

1. **Workspace UUID:** Specify which workspace you want enabled.
1. **Splunk HEC Endpoint URL:** The host and port (e.g., https://my-splunk.com:8088).
1. **HEC Token:** The unique GUID copied in [the previous section](#add-splunk-configuration).

### Test log streaming
Once Pantheon confirms that forwarding is active, use the Splunk search interface (e.g., `index=<your_index> token="<HEC_token>"`) to verify that log events are being ingested.
