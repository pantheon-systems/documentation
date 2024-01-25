---
title: Faster Backups
published_date: "2023-11-01"
categories: [infrastructure, performance]
---
The File System team at Pantheon achieved significant speed improvements in backup processes. The Valhalla export process was overhauled, allowing backups to be constructed from new objects, cutting down export times by 25-83%. This was accomplished by initiating object retrieval immediately after receiving MANIFEST metadata, omitting empty files, and promptly archiving received files.
