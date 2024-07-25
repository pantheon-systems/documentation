---
title: Pantheon Disaster Recovery Playbook
subtitle: What to Do If Your Site Goes Down
description: Working with Pantheon support during emergencies
tags: [webops]
contributors: [joshlieb, joan-ing]
reviewed: "2024-07-25"
type: guide
permalink: docs/guides/disaster-recovery/site-goes-down
editpath: disaster-recovery/03-site-goes-down.md
contenttype: [guide]
innav: [false]
categories: [help]
cms: [--]
audience: [sysadmin]
product: [--]
integration: [--]
---

## Open a Support Ticket

In cases of downtime or significant functional failure in the Live environment, the first step is to open a support ticket. Even if you escalate the incident to your dedicated Customer Success Manager (included for all Enterprise contract customers), our support engineers will be the ones diagnosing the cause of downtime and working to get your site back up, and a ticket is the fastest way to get them up to speed and engaged.

Diamond and Platinum Account customers can report and escalate site downtime by clicking **Trigger Pantheon On-Call** from the Support tab. In cases where the dashboard is inaccessible, a ticket can be filed using a telephone ticketing service, accessible at **1(866)415-7624**. Note that this is strictly for filing a ticket, and you will not reach a support engineer by using this method.

All other account types should click **Open Ticket** to open a support interaction to report site downtime.

![Show platinum support features in the site dashboard](../../../images/dashboard/new-dashboard/platinum-support-site-dashboard.png)

Please include as much information as possible. A support engineer will work with you to diagnose the cause, and any information that you can provide will shorten the investigation time.

## Check for Ongoing Platform Incidents

Sites can go down for various reasons, and although the support team aims to diagnose the cause of downtime, customers can perform their own diagnostics.

Pantheon platform status is tracked at https://status.pantheon.io/, and all customers are encouraged to sign up for status page updates. Although a site can be taken down by isolated platform issues that are not systemic enough to warrant a platform status alert, these are rare. Tickets should still be filed even when the downtime is caused by an identified platform incident - we need to know who has been affected, and how it is affecting their sites.

If you receive a notification ahead of discovering that the incident has affected your site, you can still file a ticket - even if we are already working to fix an identified issue, we need to know who has been affected and how it is affecting their sites.

Because incidents are declared when a platform issue meets a minimal downtime or service degradation threshold, it is possible that you will receive a notification for an incident that is not affecting your site. Conversely, there are cases where a site is affected by an issue with the platform, but this issue is isolated to resources specific to the site, and a platform incident is not declared.

## Incident Escalation

Although filing an emergency on-call ticket will escalate your downtime incident within the support team and ensure you receive the fastest response, you may also want to alert your broader Pantheon account team. Depending on the situation, your escalation path may differ.

Note that tickets and chat have tier-specific response time objectives, while email, phone, and Slack channels do not. Refer to [Support Features and Response Times](/guides/support/#support-features-and-response-times) for details.

### Support Channels

* **Ticketing**: If your site is suffering downtime on the Live environment, your first step should be to open a support ticket. Chat normally has a quicker response time, but emergency on-call tickets are absolutely escalated and response times to these tickets should be comparable.

* **Slack**: Diamond tier accounts can have access to a dedicated Slack channel in which customers can interact directly with their CSM, AM, and primary support resources. This is primarily intended as a means for quick communication and collaboration, and should not be used in lieu of the ticketing system, as there are no SLOs associated with Slack channels.

* **Phone/teleconference**: A phone call or teleconference can be requested for emergency support. This can be done either when filing the emergency ticket, or in the ticket thread once open.

  <Alert title="Note" type="info" >

  Tickets and chat have tier-specific response time objectives, while email, phone, and Slack channels do not. Refer to the [Support Features and Response Times](/guides/support/#support-features-and-response-times) table for details.

  </Alert>

* **Diamond and Platinum Account customers** can call Pantheon's premium technical support line directly for any technical issues, escalations, site, billing, or overages queries. The phone number can be found in your Workspace, in the Support tab.

### Escalation Paths

Depending on the account tier, your escalation path may differ. Escalation paths include the following:

* Dedicated Support Team: All Diamond tier accounts have a dedicated support team, and tickets and issues are routed preferentially to them. This escalation is an automatic part of the intake process once a ticket is opened.

* Customer Success Manager (CSM): Included for all Enterprise (contract) customers, CSMs serve as a coordinator when support involves multiple teams, or when additional subject matter experts need to be brought into the process. The CSM is also responsible for any post-incident RCA or performance reviews.

* Managed Updates: If the issue arises from a [Managed Updates](/guides/professional-services/managed-updates) deployment, the first point of escalation is the MU Engagement Manager currently involved in deploying the updates, and secondarily the Manager of the Managed Updates team.

### Professional Services Escalation

Incidents may involve managed services like the Advanced Global CDN, Signal Sciences Integration, and Managed Updates. Support for these layers is handled by the core Support team, and escalation to the appropriate Professional Services team is at the discretion of the support engineers. The support engineers have been trained to handle many AGCDN issues and have tooling that gives them access directly to edge configurations, but there are aspects that may need to be handled by Professional Services.

Dedicated CSMs (included for all Enterprise contract customers) have the ability to escalate these issues and have access to resources that can assist with expediting the triaging and remediation of issues. If you need to speak with additional teammates at Pantheon that work in our professional services team, CSMs can facilitate those conversations.

### Executive Escalation

In cases where regular emergency support is not resolving the issues and the incident is causing significant customer business impact, Pantheon executive involvement may become necessary. Note that these parties may already be notified and involved through internal escalation by the Account team.

## Ongoing Diagnosis

Incident management is a collaboration between Pantheon Support and the customer, and we will work with you on recovery.

Key tools that you can use for ongoing diagnosis of issues include:

* New Relic gives you real-time insight into application performance, and the slowest transactions are profiled with full stack traces that can isolate specific code, query, or external services bottlenecks.The New Relic Application Performance Monitor (APM) can be used to track current-state performance and dig into transaction traces to isolate bottlenecks and break points. Refer to the [New Relic](/guides/new-relic) documentation for more information.

* MySQL, PHP, and Nginx logs provide forensic data for incident review. Refer to [Log Files on Pantheon](/guides/logs-pantheon)

* ACDN logs can be piped directly into customer-managed log management applications. Setup by Professional Services is required.

The Customer Success Engineering team will work with you through the existing emergency ticket. If additional issues are uncovered you may want to open a new ticket to allow for a cleaner set of interactions, especially if additional Pantheon resources are brought in for review and assistance.
