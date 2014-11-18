---
title: URLs in WordPress's Database
categories:
    - getting-started
permalink: documentation/getting-started/urls-in-wordpress-s-database/
Metadata
filename: source/_docs/urls-in-wordpress-s-database.md
---

## Summary

WordPress stores URLs in various places in the database, considering Pantheon's multi-environment workflow this can cause unexpected behavior. However we've integrated the WP-CLI's search & replace functionality into the workflow to assist in updating these URLs.

## Example

[Pantheon's workflow](/documentation/howto/using-the-pantheon-workflow/) for wordpress includes an additional feature to update URLs automatically! Note that the defaults that're selected when performing a clone operation aren't overidable, as we update the URL to match whatever environment you're cloning to. We do offer the option to convert http to https & vice versa; in the case you have https in one environment and not another.

![](https://pantheon-systems.desk.com/customer/portal/attachments/272464)​


