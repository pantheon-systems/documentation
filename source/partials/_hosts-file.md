---
contenttype: partial
categories: [config]
newcms: [--]
product: [--]
integration: [--]
tags: [--]
reviewed: ""
---

Note that modifying the `hosts` file usually requires administrative privileges from the OS.

The location of the `hosts` file varies depending on your operating system:

 - **MacOS / Linux:** `/etc/hosts`
 - **Windows:** `C:\\Windows\System32\Drivers\etc\hosts`

Add lines to your operating system's `hosts` file in the following format:

```none:title=hosts
203.0.113.10    example.com
203.0.113.20    www.example.com
```

In the example above, replace the IP addresses with those provided by Pantheon, and the domains with your own.
