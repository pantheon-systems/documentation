Disasters are sometimes unavoidable, but steps can be taken to ensure that these incidents are rare, reversible, and not destructive.

## Monitor and Optimize Performance
Keep ahead of performance issues by regularly reviewing performance with the [New Relic Application Performance Monitor](https://pantheon.io/docs/new-relic)(APM), included with all non-Basic site plans. For more information, refer to the [Pantheon New Relic documentation](https://pantheon.io/docs/new-relic).

New Relic also provides a performance monitoring service that can send notification of downtime or degraded performance by email and other channels. See https://docs.newrelic.com/docs/alerts/new-relic-alerts/getting-started/introduction-new-relic-alerts for more information.

If you have been assigned a Customer Success Manager, you will receive periodic technical reviews, and these sessions include training in how to use New Relic to proactively address performance issues.

All sites are different, and there are many different performance issues that could emerge. Review our ‘Optimizing Performance’ documentation https://pantheon.io/docs/performance for tips and troubleshooting techniques for all layers of the platform. 


## Optimize your Cache Hit Rate
The Pantheon Global CDN delivers pages directly to users from the Varnish edge page cache, and this layer serves both as insulation against unexpected traffic spikes as well as against application and infrastructure issues. 

### Process

. Determine the extent to which your site usesis utilizing the edge cache by requesting a cache hit rate report from Support. This shows the cache hit rate for the full site on a daily basis.

. Test the cacheability of individual pages by examining the page headers using CURL or developer tools: https://pantheon.io/docs/test-global-cdn-caching 

. Optimize your caching strategy by checking cookies, application configurations, and session management: https://pantheon.io/docs/debug-cache 


## Notify Support of Potential Risk
There are a number of development activities and external events that carry inherent risk, and the risk of downtime can be minimized by notifying the support team ahead of time. Events that can be escalated ahead of time include:

* Traffic Events
    If your site has an Elite site plan and it is expecting elevated traffic, submit a ticket with details about the expected volume, duration, and nature of the traffic. The support engineers will review current performance and determine whether to add additional application servers to support a higher level of concurrent traffic.

* Deployments
    If you are deploying code to your Live environment and are concerned about potential issues, you can notify support, with Chat being the best option for getting eyes on your site quickly.

* Launches or Relaunches
    These processes can involve many actors, and with advance notice Customer Success Managers can join launch calls to provide an immediate escalation point should something go wrong. 


## Develop a Disaster Recovery Playbook

Your website may be part of a broader and interconnected ecosystem of web services, apps, and other integrations, and you may be required to develop your own institutional playbook for disaster recovery. These plans will ensure that you (and Pantheon) are not operating in a vacuum, but also ensure that you have thought through various scenarios and understand the actions that are appropriate to the situation.  

