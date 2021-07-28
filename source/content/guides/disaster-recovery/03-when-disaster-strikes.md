## File an Emergency Downtime Ticket
In all cases, the first step should be to file an emergency downtime on-call ticket; this will escalate the support process and ensure that you are able to get the best and fastest service.  These tickets can be filed from the site or organizational dashboard via the ‘emergency on-call’ ticketing button. 

In cases where the dashboard is inaccessible, a ticket can be filed via a telephone ticketing service, accessible via 1-866-415-7624. Note that this is strictly for filing a ticket, and you will not reach a support engineer via this route. 

Please include as much information as is possible given the time constraints - although the support engineers will work with you to diagnose the cause, any information that you can provide will shorten the investigation time. 

Note that these tickets should be reserved for downtime or significant functional failure on the Live environment only.

## Determine the Point of Failure

Sites can go down for various reasons, and although the support team aims to diagnose the cause of downtime, customers can perform their own diagnostics.

* Pantheon platform status is tracked at https://status.pantheon.io/, and all customers are encouraged to sign up for status page updates. Although a site can be taken down by isolated platform issues that are not systemic enough to warrant a platform status alert, these are rare. Tickets should still be filed even when the downtime is caused by an identified platform incident - we need to know who has been affected, and how it is affecting their sites. 

* New Relic will give you real-time insight into application performance, and the slowest transactions are profiled with full stack traces that can isolate specific code, query, or external services bottlenecks.


## Determine the Impact on your Site

Incidents may impact sites differently depending on the nature of the incident and the sites affected. For example, if the issue is at the infrastructure level, sites with a high cache hit rate can still be accessible by anonymous users while editors and administrators might be blocked from accessing the CMS backend
