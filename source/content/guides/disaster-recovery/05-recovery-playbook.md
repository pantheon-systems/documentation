Bringing a site back from downtime and remediating the cause of downtime to ensure that the site stays up post-recovery is a multistep process. Once you have engaged support and determined the cause of the issue, the recovery process will include the steps below, although the precise playbook will depend on the nature of the issues and the configuration of the site. 

## Edge failover
(Note that this section addresses features that have not yet been implemented).

Recovery of a site that has gone down may take a matter of minutes, but time to recovery can be uncertain, so additional features have been implemented at the Global CDN level to provide a more immediate solution. Ideally, these features will minimize downtime while the specific issues are remediated.

### Persistent Cache
The Global CDN will natively provide a layer of protection via the Varnish full-page cache, but even with a high cache hit rate, there will be requests that bypass the cache when the TTL expires, and requests will fail in these cases. Persistent cache will ensure that these requests are fulfilled using stale cache, sending back pages that have technically expired. This will only apply, however, to requests that normally would be cacheable - sites with a low cache hit rate will not be as protected.

### Synthetic Responses
A set of static pages can be hosted directly on Fastly, and when certain failure conditions are detected, traffic can be redirected to this placeholder, which will provide a minimally acceptable user experience rather than error messages and a completely unreachable site.

### Failover to Static Site
If the site is persistently unreachable, traffic can be directed to a static site hosted externally (in an S3 bucket, for example). The routing logic that dictates how traffic is shifted to these pages is handled with edge dictionary configurations that can be updated either by Pantheon support or directly by the customer, assuming that they have access to the ACDN configuration tools. 


## Infrastructure Failover
In cases where the Google Cloud Platform infrastructure becomes compromised, Pantheon support can trigger a multizone failover to redirect traffic at the load-balancing layer to a backup cluster of appservers on an alternate zone. 

Documentation: https://pantheon.io/docs/multizone-failover    

Multizone failover is not designed to protect against issues on the Global CDN, on the load balancing layer, or at the application level. The automated monitoring that triggers a failover condition is entirely focused on infrastructure issues. Because the zonal redundancy has an identical codebase, a continually replicated database, and uses a common filesystem, application issues would cause the same failure conditions regardless of zone.

Failover has an impact on the Redis object cache service - the cache will be automatically rebuilt in the new zone on failover, but this is transactionally heavy, and the site should be tested to ensure that it can handle a mass cache rebuild.

Sites using Pantheon’s Solr search indexing service require Support intervention as well as reindexing on the application side, and is not a supported integration.

Customer playbook should include:

* If are using Redis: Test application for ability to handle a mass Redis cache rebuild

* If are using Solr: Consult with your Pantheon CSM to determine an appropriate monitoring and recovery strategy.


## Remediating Application Issues
In cases where the site code, database, or assets have become corrupted or compromised, determine which aspects of the site require restoration, as recovery processes will differ, and recovery time is dependent on enacting the correct playbook.

### Code Issues

#### Managed Updates Deployment Issue
As part of the Managed Updates deployment process, a multidev will be cloned from the Live environment to be used primarily for testing but also as a backup. If the Live deployment fails, results in a regression, or otherwise compromises the site, this multidev will be used as the source to restore Live to a pre-deploy state.


#### Codebase is Unrecoverable
The codebase can be restored from a selected backup via Terminus - the dashboard ‘restore’ tools restore all aspects of the site, and cannot be used to restore selectively.

Documentation: https://pantheon.io/docs/terminus/commands/backup-restore 


#### Reverting a Bad Commit to Pantheon
If a bad commit has been deployed to your Pantheon site, you can roll back the commit via git, with the process depending on the nature of the change, whether it involves core updates or upstream updates, etc. 

Documentation: https://pantheon.io/docs/undo-commits  


### Database or Filesystem Issues

#### Restoring a database from a different environment
The ‘database/files’ tools on the site dashboard can be used to clone either the files or database from a different environment (Test to Live, for example). 

Documentation: https://pantheon.io/docs/database-workflow 

#### Restoring a Database from a Backup
The database can be restored from a selected backup via Terminus - the dashboard ‘restore’ tools restore all aspects of the site, and cannot be used to restore selectively.

Documentation: https://pantheon.io/docs/terminus/commands/backup-restore 

#### Restoring a Database from an External Dump
The database can be restored from an external dump via the ‘database/files’ tools on the site dashboard. An archive file can be uploaded, or a MySQL archive accessed on a remote location.

Documentation: https://pantheon.io/docs/database-workflow 

#### Full Environment Restoration
If an environment - Dev, Test, or Live - becomes unusable, corrupted, or otherwise broken, the entire environment can be restored either from a backup or from another environment. 

+ WARNING: 
We do not recommend directly restoring a Live environment from a backup; instead, restore to Dev or Test, then pull the code change and clone the content to Live. This will minimize user-facing downtime.

Documentation: https://pantheon.io/docs/restore-environment-backup

