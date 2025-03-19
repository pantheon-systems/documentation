---
title: "New Relic Synthetics IP Ranges – Update Your Allowlist"
published_date: "2025-03-19"
categories: [tools-apis, action-required]
---
New Relic is updating the IP ranges used for Synthetic Monitoring. Most Pantheon customers do not need to take action. However, if you have an allowlist set up for New Relic Synthetics traffic (in either [Advanced Global CDN](/guides/agcdn) or another edge network provider), you may need to update your configurations before **April 14, 2025**, to ensure uninterrupted monitoring.

## Who Needs to Take Action?
* If you **do not** explicitly allowlist New Relic Synthetics traffic by IP range, **no changes are needed**.
* If you **do** allowlist Synthetics traffic, you must update your allowlist with the **new IP ranges** before April 14, 2025, and remove the old IPs afterward to prevent failed connections.

## What’s Changing?
New Relic is aligning its Synthetics monitoring IPs with standard data ingestion IP ranges. The new IP ranges that should be allowlisted before April 14, 2025, are:

* `152.38.128.0/19`
* `212.32.0.0/20`
* `64.251.192.0/20`

After April 14, 2025, the [old IP ranges](https://docs.newrelic.com/whats-new/2025/02/whats-new-01-31-synthetics-ip/) will no longer be valid.

## Next Steps
1. Check if you have an allowlist for New Relic Synthetics. If you don’t, you can ignore this change.
1. If you do allowlist Synthetics traffic, update your allowlist with the new IPs before April 14, 2025.
1. After April 14, 2025, remove the old IP ranges to avoid connectivity issues.

For any questions or assistance, reach out to [New Relic support](https://support.newrelic.com/s/).
