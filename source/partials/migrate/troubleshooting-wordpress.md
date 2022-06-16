### Import Failed in WordPress Migration

#### CDN Blocking POST requests

This error can occur on sites using a content delivery network (CDN) service that is not configured to allow the POST HTTP method. Resolve this issue by [temporarily setting POST as an allowed HTTP method within the CDN's configuration](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#DownloadDistValuesAllowedHTTPMethods) and restarting the migration process. Once the site has been successfully migrated, the POST HTTP method can be disabled.

#### Very Large Site Footprints

Imports can also fail for very large sites, which may time out while importing. In these cases, initiate the migration again from the source site, and the transfer should pick up where it left off.
