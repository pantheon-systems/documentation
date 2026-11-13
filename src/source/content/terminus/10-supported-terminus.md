---
title: Terminus Guide
subtitle: Supported Terminus and PHP Versions
description: Learn which versions of Terminus and PHP are currently supported.
contributors: [wordsmither, jazzsequence]
tags: [reference, cli, local, terminus, workflow]
permalink: docs/terminus/supported-terminus
categories: [git]
cms: [drupal, wordpress]
audience: [development]
product: [terminus]
showtoc: false
reviewed: "2026-11-13"
---

Each major and minor version of Terminus is fully supported for one year from the release of the subsequent version for Terminus 4.3.4 and below and six months from the release of the subsequent version for 4.3.5+. During the supported period, serious bugs and security issues that have been reported are fixed in patch releases. Refer to the documentation on [Semantic Versioning](https://semver.org/) for more information on versioning.

After this period, the version will reach End Of Life (**EOL**), and will no longer be supported. We recommend you update Terminus far in advance of the EOL schedule, so that regressions in new versions can be reported and patched in time.

| Version          | Release Date       | EOL Date           | Block Date         |
|------------------|--------------------|--------------------|--------------------|
| 4.3.5            | November 9, 2026   | November 9, 2027   | November 9, 2027   |
| 4.3.4            | November 3, 2026   | November 9, 2027   | November 9, 2027   |
| 4.3.3            | August 20, 2026    | November 3, 2027   | November 3, 2027   |
| 4.3.2            | June 23, 2026      | August 20, 2027    | August 20, 2027    |
| 4.3.1            | June 02, 2026      | June 23, 2027      | June 23, 2027      |
| 4.3.0            | May 26, 2026       | June 02, 2027      | June 02, 2027      |
| 4.2.2            | May 13, 2026       | May 26, 2027       | May 26, 2027       |
| 4.2.1            | April 30, 2026     | May 13, 2027       | May 13, 2027       |
| 4.2.0            | April 13, 2026     | April 30, 2027     | April 30, 2027     |
| 4.1.9            | April 08, 2026     | April 13, 2027     | April 13, 2027     |
| 4.1.8            | March 30, 2026     | April 08, 2027     | April 08, 2027     |
| 4.1.7            | March 23, 2026     | March 30, 2027     | March 30, 2027     |
| 4.1.6            | March 18, 2026     | March 23, 2027     | March 23, 2027     |
| 4.1.4            | February 02, 2026  | March 18, 2027     | March 18, 2027     |
| 4.1.3            | January 29, 2026   | February 02, 2027  | February 15, 2027  |
| 4.1.1            | November 04, 2025  | January 29, 2027   | February 15, 2027  |
| 4.1.0            | September 29, 2025 | November 04, 2026  | February 15, 2027  |
| 4.0.3            | September 11, 2025 | September 29, 2026 | February 15, 2027  |
| 4.0.2            | September 05, 2025 | September 11, 2026 | February 15, 2027  |
| 4.0.1            | May 19, 2025       | September 05, 2026 | February 15, 2027  |
| 4.0.0            | May 07, 2025       | May 19, 2026       | February 15, 2027  |
| 3.6.2            | March 03, 2025     | May 07, 2026       | February 15, 2027  |
| 3.6.1            | December 05, 2024  | March 03, 2026     | February 15, 2027  |
| 3.6.0 or earlier | September 19, 2024 | December 05, 2025  | February 15, 2027  |

- <span style="font-weight: bold">Release Date</span> — The initial release of the Terminus version.
- <span style="font-weight: bold">EOL Date</span> — The date the Terminus release is no longer supported. Before February 15, 2027, EOL dates were not enforced. Terminus versions before 4.3.5 are supported for 1 year from the release date of the _next version_ and 6 months from the release date of the next version for versions 4.3.5+.
- <span style="font-weight: bold">Block Date</span> — The date after which commands issued with the given Terminus release will be blocked by the platform to encourage upgrading to the latest version.

### PHP Version Compatibility Matrix

| PHP Version |            Terminus 4.x            |
| ----------- |:----------------------------------:|
| 8.5 | <span style="color:green">✔</span> |
| 8.4 | <span style="color:green">✔</span> |
| 8.3 | <span style="color:green">✔</span> |
| 8.2 | <span style="color:green">✔</span> |
| 8.1 or earlier |                 ❌                  |

## Frequently asked questions

### What happens when a Terminus version is blocked?

Commands run with a blocked Terminus version will fail to connect to Pantheon. 
Newer versions of Terminus will display a message asking you to upgrade. 
Older versions may not display the message, so automated processes, such as CI jobs, will simply fail until Terminus is upgraded.

### How is the Terminus End-of-Life schedule determined?

Prior to Terminus 4.3.5, each Terminus release (including minor point releases) was supported for a full year from the time the next version became available. 
Pantheon supports Terminus 4.3.5 and later versions for six months after the next version is released.

### How do I upgrade Terminus to the next version?

See the [Install and Upgrading Terminus guide](/terminus/install) for full instructions for upgrading via Homebrew (MacOS only) or by PHAR (MacOS, Windows, Linux).
If you are using Terminus in CI with GitHub Actions, we recommend using the [Terminus GitHub Action](https://github.com/marketplace/actions/setup-terminus), which always installs the latest version by default.

## More Resources

- [PHP on Pantheon](/guides/php)
- [Update Terminus](/terminus/updates)
