---
title: Bug fix for Pantheon release notes RSS feed
published_date: "2024-09-12"
categories: [documentation]
---
Previously, our release note publishing process used Markdown and Git with dates set only by year, month, and day. This caused RSS readers, including our Community Slack integration, to ignore multiple release notes with the same date. To address this, we now include an arbitrary hour, minute, and second for each release note in the RSS feed, derived from a hash of the note.
