---
title: "Terminus end-of-life dates and version blocking announced"
published_date: "2026-11-16"
published_at: "2026-11-16T00:00:00Z"
categories: [tools-apis, action-required, deprecated]
description: "Starting February 15, 2027, Pantheon blocks Terminus versions that have reached end of life."
---

Starting *February 15, 2027*, Pantheon will block Terminus versions that have reached end of life (EOL) from connecting to the platform. The initial affected versions are:

| Terminus version | EOL date | Blocked starting |
| ---------------- | -------- | ---------------- |
| 4.1.3 | February 2, 2027 | February 15, 2027 |
| 4.1.1 | January 29, 2027 | February 15, 2027 |
| 4.1.0 | November 4, 2026 | February 15, 2027 |
| 4.0.3 | September 29, 2026 | February 15, 2027 |
| 4.0.2 | September 11, 2026 | February 15, 2027 |
| 4.0.1 | September 5, 2026 | February 15, 2027 |
| 4.0.0 | May 19, 2026 | February 15, 2027 |
| 3.6.2 | May 7, 2026 | February 15, 2027 |
| 3.6.1 | March 03, 2026 | February 15, 2027  |
| 3.6.0 or earlier | December 05, 2025  | February 15, 2027  |

## Upcoming EOL and block dates for other versions

Versions still in support will be blocked on their EOL date. These dates have already been published and are *unchanged*:

| Terminus version | EOL and block date |
| ---------------- | ------------------ |
| 4.3.5 | November 9, 2027 |
| 4.3.4 | November 9, 2027 |
| 4.3.3 | November 3, 2027 |
| 4.3.2 | August 20, 2027 |
| 4.3.1 | June 23, 2027 |
| 4.3.0 | June 2, 2027 |
| 4.2.2 | May 26, 2027 |
| 4.2.1 | May 13, 2027 |
| 4.2.0 | April 30, 2027 |
| 4.1.9 | April 13, 2027 |
| 4.1.8 | April 8, 2027 |
| 4.1.7 | March 30, 2027 |
| 4.1.6 | March 23, 2027 |
| 4.1.4 | March 18, 2027 |

See [Supported Terminus and PHP Versions](/terminus/supported-terminus) for the current schedule.

## Action required

Upgrade to the latest version of Terminus before February 15, 2027. 
To check which version you’re running, use `terminus --version`. 
For update steps on macOS (Homebrew), Windows and Linux (PHAR), see [Install and Update Terminus](/terminus/install). 

If you are using Terminus in CI with GitHub Actions, we recommend using the [Terminus GitHub Action](https://github.com/marketplace/actions/setup-terminus), which always installs the latest version by default.

## Why we're making this change

Pantheon set the EOL schedule for Terminus several years ago, but up until now has not enforced the requirement to use supported Terminus versions. 
Terminus runs on your computer or in your CI environment, so Pantheon can’t remove an old version. 
Customers who continue to use EOL versions of Terminus cause friction for support, as the interaction of some older versions with the platform can be unpredictable. 
Ensuring that Terminus clients in the field remain up to date will allow Pantheon to strengthen platform security and compliance, and evolve the platform more smoothly.

## What happens when a version is blocked?

Commands run with a blocked Terminus version will fail to connect to Pantheon. 
Newer versions of Terminus will display a message asking you to upgrade. 
Older versions may not display the message, so automated processes, such as CI jobs, will simply fail until Terminus is upgraded.

## What to expect going forward

* Pantheon will announce each Terminus block at least 90 days in advance and will send reminders multiple times as the block date approaches.
* Beginning with Terminus 4.3.5, each version will be supported for *six months* after the next version is released, down from one year. To prevent a newer version from reaching EOL before an older one, new versions will share the previous version's EOL date until the six-month window is reached. After that, the EOL date is the block date.
* Dates already published are unchanged.
