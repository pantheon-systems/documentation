---
title: "axios npm supply chain compromise (versions 1.14.1 and 0.30.4)"
published_date: "2026-03-31"
status: not-affected
cves: []
advisories: []
affects: Projects that installed axios 1.14.1 or 0.30.4
customer_action: None
description: "Two malicious versions of the axios npm package were published on March 30 and 31, 2026. Pantheon's Security Operations team investigated and determined that Pantheon isn't vulnerable to the supply chain attack."
---

## What is the vulnerability?

On March 30 and 31, 2026, attackers published two malicious versions of the axios npm package, 1.14.1 and 0.30.4, through a compromised maintainer account. Both versions install a remote access trojan. No CVE was assigned.

## Are sites on Pantheon affected?

No. Pantheon's Security Operations team investigated the attack and determined that Pantheon isn't vulnerable to it.

## What Pantheon has done

Pantheon's Security Operations team investigated the attack against the Pantheon platform.

## What you need to do

No action is needed for the Pantheon platform. The malicious versions affect any project or build environment that installed them, including your own. If any of your builds installed axios 1.14.1 or 0.30.4, downgrade to axios 1.14.0 or 0.30.3, remove the `plain-crypto-js` package from `node_modules`, treat the build environment as potentially compromised, and rotate any credentials it could access.

## References

- [Help Net Security: axios npm package backdoored](https://www.helpnetsecurity.com/2026/03/31/axios-npm-backdoored-supply-chain-attack/)
- [Snyk: axios npm package compromised](https://snyk.io/blog/axios-npm-package-compromised-supply-chain-attack-delivers-cross-platform/)
