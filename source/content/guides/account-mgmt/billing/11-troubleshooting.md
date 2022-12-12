---
title: "Billing"
subtitle: Troubleshooting
description: Learn how to troubleshoot payment issues.
tags: [billing]
contributors: [wordsmither]
layout: guide
showtoc: true
permalink: docs/guides/account-mgmt/billing/troubleshooting
anchorid: troubleshooting
editpath: docs/guides/account-mgmt/billing/11-troubleshooting.md
reviewed: "2022-09-19"
contenttype: [guide]
categories: [billing]
newcms: [--]
audience: [business]
product: [--]
integration: [--]
---

## Declined Payment Methods

<Partial file="billing-declined-card-codes.md" />

## No Email Notification

When a billing cycle approaches, billing emails are only sent to the billing contact email. The billing contact is set by the [Site Owner](#roles-and-permissions) when they enter a credit card for payment.

To update the email to which notifications are sent, follow the steps in [Replace or Update an Old or Expired Credit Card](#replace-or-update-an-old-or-expired-credit-card). Use the same card information with a new email address in the **Add Payment Method** modal to receive emails at a different address while continuing to bill the same card.

If you are the billing contact for an online site plan, check your spam folder, and try adding `cse-billing@pantheon.io` and `noreply@getpantheon.com` to your contacts. You can also reach out to your IT department to see if the emails are in quarantine.
