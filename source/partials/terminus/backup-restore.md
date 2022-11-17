
## Example

The `--file` flag for this command only accepts as a value a Pantheon environment backup on the platform, not a local backup file.
Use [terminus backup:list](/terminus/commands/backup-list) to identify available backups:

```bash{outputLines: 2-13}
terminus backup:list anita-drupal.live
 ----------------------------------------------------------- -------- --------------------- --------------------- -----------
  Filename                                                    Size     Date                  Expiry                Initiator  
 ----------------------------------------------------------- -------- --------------------- --------------------- -----------
  anita-drupal_live_2020-12-07T02-00-00_UTC_files.tar.gz      0.1MB    2020-12-07 02:24:25   2020-12-15 02:24:25   automated  
  anita-drupal_live_2020-12-07T02-00-00_UTC_database.sql.gz   0.9MB    2020-12-07 02:23:20   2020-12-15 02:23:20   automated  
  anita-drupal_live_2020-12-07T02-00-00_UTC_code.tar.gz       75.3MB   2020-12-07 02:27:52   2020-12-15 02:27:52   automated  
  anita-drupal_live_2020-12-06T02-00-00_UTC_files.tar.gz      0.1MB    2020-12-06 02:26:10   2020-12-14 02:26:10   automated  
  anita-drupal_live_2020-12-06T02-00-00_UTC_database.sql.gz   0.9MB    2020-12-06 02:25:39   2020-12-14 02:25:39   automated  
  anita-drupal_live_2020-12-06T02-00-00_UTC_code.tar.gz       75.3MB   2020-12-06 02:47:13   2020-12-14 02:47:13   automated  
  anita-drupal_live_2020-12-05T02-00-00_UTC_files.tar.gz      0.1MB    2020-12-05 02:37:29   2020-12-13 02:37:29   automated  
  anita-drupal_live_2020-12-05T02-00-00_UTC_database.sql.gz   0.9MB    2020-12-05 02:40:54   2020-12-13 02:40:54   automated  
  anita-drupal_live_2020-12-05T02-00-00_UTC_code.tar.gz       75.3MB   2020-12-05 02:48:08   2020-12-13 02:48:08   automated
```

In this example, we could restore the environment's code from the latest backup with:

```bash{promptUser: user}
terminus backup:restore anita-drupal.live --file=anita-drupal_live_2020-12-07T02-00-00_UTC_code.tar.gz
```
