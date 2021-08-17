---
title: Pantheon Disaster Recovery Playbook
subtitle: What to Do When Your Site Goes Down
description: Working with Pantheon support during emergencies
generator: pagination
layout: guide
categories: [platform]
tags: [webops]
contributors: [joshlieb, joa-pan]
reviewed: "2021-07-26"
layout: guide
permalink: docs/guides/disaster-recovery/when-disaster-strikes/
anchorid: disaster-recovery/when-disaster-strikes
editpath: disaster-recovery/03-when-disaster-strikes.md
---

## Open an Emergency Downtime Ticket
In all cases, the first step is to file an emergency downtime on-call ticket. Even if you escalate the incident to your Account Manager or Customer Success Manager, the support engineers will be the ones diagnosing the cause of downtime and working to get your site back up, and a ticket is the fastest way to get them up to speed and engaged.  

These tickets can be filed from the Site or Organizational Dashboard. To create a ticket, navigate to the Support tab in the Dashboard and click **Trigger Pantheon On-Call** in the Escalate with Pantheon On-Call box. Note that these tickets should only be reserved for downtime or significant functional failures on the Live environment.

In cases where the dashboard is inaccessible, a ticket can be filed using a telephone ticketing service, accessible at **1(866)415-7624**. Note that this is strictly for filing a ticket, and you will not reach a support engineer by using this method. 

Please include as much information as possible. A support engineer will work with you to diagnose the cause, and any information that you can provide will shorten the investigation time. 

Note that these tickets should be reserved for downtime or significant functional failure in the Live environment, only.


## Check for Ongoing Platform Incidents

Sites can go down for various reasons, and although the support team aims to diagnose the cause of downtime, customers can perform their own diagnostics.

Pantheon platform status is tracked at https://status.pantheon.io/, and all customers are encouraged to sign up for status page updates. Although a site can be taken down by isolated platform issues that are not systemic enough to warrant a platform status alert, these are rare. Tickets should still be filed even when the downtime is caused by an identified platform incident - we need to know who has been affected, and how it is affecting their sites. 

If you receive a notification ahead of discovering that the incident has affected your site, you can still file a ticket - even if we are already working to fix an identified issue, we need to know who has been affected and how it is affecting their sites.

Because incidents are declared when a platform issue meets a minimal downtime or service degradation threshold, it is possible that you will receive a notification for an incident that is not affecting your site. Conversely, there are cases where a site is affected by an issue with the platform, but this issue is isolated to resources specific to the site, and a platform incident is not declared. 



## Incident Escalation

Although filing an emergency on-call ticket will escalate your downtime incident within the support team and ensure you receive the fastest response, you may also want to alert your broader Pantheon account team. Depending on the situation, your escalation path may differ.

Note that tickets and chat have tier-specific response time objectives, while email, phone, and Slack channels do not. Refer to [Support Features and Response Times](https://pantheon.io/docs/support#support-features-and-response-times) for details.


#### Support Channels

* Ticketing: If your Elite site is suffering downtime on the Live environment, your first step should be to open an emergency on-call ticket. Chat normally has a quicker response time, but emergency on-call tickets are absolutely escalated and response times to these tickets should be comparable. 

* Slack: Diamond tier accounts can have access to a dedicated Slack channel in which customers can interact directly with their CSM, AM, and primary support resources. This is primarily intended as a means for quick communication and collaboration, and should not be used in lieu of the ticketing system, as there are no SLOs associated with Slack channels.

* Phone/teleconference: A phone call or teleconference can be requested for emergency support. This can be done either when filing the emergency ticket, or in the ticket thread once open.

Note that tickets and chat have tier-specific response time objectives, while email, phone, and Slack channels do not. See https://pantheon.io/docs/support for details.


#### Escalation Paths

Depending on the account tier, your escalation path may differ. Escalation paths include the following:

* Dedicated Customer Success Engineer: All Diamond tier accounts have a named senior support engineer, and tickets and issues are routed preferentially to them. 

* Customer Success Manager: Serves as a coordinator when support involves multiple teams, or when additional subject matter experts need to be brought into the process. The CSM is also responsible for any post-incident RCA or performance reviews.

* Account Manager: Also serves as a coordinator of support efforts.

* Managed Updates: If the issue arises from a Managed Updates deployment, the first point of escalation is the MU Engagement Manager currently involved in deploying the updates, and secondarily the Manager of the Managed Updates team.


### Phone and Teleconference Support

A phone call or teleconference can be requested for emergency support. This can be done while filing the emergency ticket, or in the open ticket thread. The available resources depend on the current staffing situation, but named resources can be requested and can join when available.

### Escalation to Your Dedicated Customer Success Engineer

All Diamond tier accounts have a named Senior Support Engineer, and tickets and issues are routed preferentially to them. If the designated engineer is not available (i.e. if the incident happens during non-business hours), there are fallback assignment paths to ensure that Diamond tickets are quickly assigned to senior support staff. This escalation should be an automatic part of the intake process.

### Account Team Escalation

During an active incident, the support engineers will be the primary parties engaged in bringing the site back to health. The Account Manager and Customer Success Manager are escalation points for the following scenarios:

* **Pantheon Support is not responsive**: In the event that Pantheon support is either unresponsive or unhelpful, your account team can escalate the issue internally and use additional resources. 

* **Coordination across multiple teams is required**: The support engineers will loop in resources from other teams as needed, but where there are multiple workstreams required to remedy an issue, the Account Manager ot Customer Success Manager can assist in coordinating across teams.

* **Post-incident review**: Where a formal review is required to produce a Root Cause Analysis, your Customer Success Manager can produce a customer-specific version in addition to any RCA published on the Status portal. 

### Professional Services Escalation

Incidents may involve managed services like the Advanced Global CDN, Signal Sciences Integration, and Managed Updates. Support for these layers is handled by the core Support team, and escalation to the appropriate Professional Services team is at the discretinon of the support engineers. The support engineers have been trained to handle many AGCDN issues and have tooling that gives them access directly to edge configurations, but there are aspects that may need to be handled by Professional Services. 

### Executive Escalation

In cases where regular emergency support is not resolving the issues,  and the incident is causing significant customer business impact, Pantheon executive involvement may become necessary. Note that these parties may already be notified and involved through internal escalation by the Account team.

## Ongoing Diagnosis

Incident management is a collaboration between Pantheon Support and the customer, and we will work with you on recovery. 

Key tools that you can use for ongoing diagnosis of issues include:

* New Relic gives you real-time insight into application performance, and the slowest transactions are profiled with full stack traces that can isolate specific code, query, or external services bottlenecks.The New Relic Application Performance Monitor (APM) can be used to track current-state performance and dig into transaction traces to isolate bottlenecks and break points. Refer to the [New Relic](https://pantheon.io/docs/new-relic) documentation for more information.

* MySQL, PHP, and Nginx logs provide forensic data for incident review. Refer to [Log Files on Pantheon](https://pantheon.io/docs/logs)

* ACDN logs can be piped directly into customer-managed log management applications. Setup by Professional Services is required.


The Customer Success Engineering team will work with you through the existing emergency ticket. If additional issues are uncovered you may want to open a new ticket to allow for a cleaner set of interactions, especially if additional Pantheon resources are brought in for review and assistance.  
