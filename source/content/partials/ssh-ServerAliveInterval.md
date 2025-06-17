---
contenttype: [partial]
categories: [ssh]
cms: [--]
product: [--]
integration: [--]
tags: [--]
reviewed: ""
---

### "Connection to server closed by remote host" notice when running search-replace
 
Sites with large databases may encounter a timeout when trying to run `terminus wp search-replace` on all tables. This is due to the [idle timeout limit](/timeouts) on SSH connections.

You can avoid this by configuring your local machine to send an SSH `keepalive` packet every 60 seconds. Add this to your `$HOME/.ssh/ssh_config` file:

```ini
Host *.drush.in
  ServerAliveInterval 60
```

