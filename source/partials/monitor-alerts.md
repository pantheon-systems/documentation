## False Alarms
Availability monitoring services (e.g., Pingdom, New Relic Synthetics) function by periodically reaching out to sites to gauge availability. Some failures in availability do not require action and can be considered false alarms, such as failures due to internet routing or idle containers.

### Internet Routing
A temporary routing issue between a particular monitoring service endpoint and one of our CDN Points of Presence (POPs) can result in an alert. The internet is a big place, and there's a lot of potential for intermittent packet loss between any two points, depending in the route taken. A single loss of access from one point to another does not always correlate to an issue with the site itself.

Tools like [MTR](https://en.wikipedia.org/wiki/MTR_(software)) can help to diagnose a routing issue.

### Idle Containers
Containers on Pantheon are automatically spun down following a period of inactivity, then spun back up once a web request is made. Monitoring pings sent between the initial request and the completed spin-up may fail, but do not necessarily indicate an issue. For details, see [All About Application Containers](/application-containers/#idle-containers).

## Support for Handling Alerts
Before opening a support ticket based on an alert, take the following actions:

1. Refer to the alert message to confirm event reported (what monitor it came from, what triggered it, etc.).
1. Determine whether the event was a [false alarm](#false-alarms).
1. Once you have verified an alert to be outstanding, contact support and provide the following information:
    - Steps to reproduce the issue (including URLs or paths to files)
    - Environments affected (Multidev/Dev/Test/Live), if applicable
    - When the issue began
    - Error messages received
    - Links to screenshots or screencasts of the behavior, if necessary

  If the issue creating the alert stems from the Pantheon Platform, we will investigate and resolve. Alerts triggered by the site's code are not within Pantheon's scope of support. For details, see [Getting Support](/guides/support/#code).
