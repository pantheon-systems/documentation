---
title: Bug fix for Pantheon release notes RSS feed
published_date: "2024-09-12"
categories: [documentation]
---
RSS readers will now detect multiple release notes from the same date.

Our release note publishing process runs through Markdown and Git with published dates set manually only at the granularity of year, month, and day. RSS readers (like our Community Slack integration) ignore multiple items with identical dates and times. We have worked around this limitation by setting an arbitrary hour, minute, and second for each release note within the RSS feed by deriving a hash of the note.
