---
title: "Improved error handling for edge cache purge failures"
published_date: "2026-03-25"
categories: [bugfix, infrastructure]
---

Edge cache purge failures could previously cause a **502 Bad Gateway** error. These failures are now handled gracefully across all CMS frameworks and PHP versions.
