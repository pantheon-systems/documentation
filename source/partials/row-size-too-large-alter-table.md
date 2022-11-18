1. Log in with [Terminus](/terminus) and [find the site UUID](/terminus/commands/site-list):

   ```shell{promptUser: user}
   terminus auth:login --email <email>
   terminus site:list
   ```

1. Optionally, set the UUID from step 1 as the local alias (replace `site-uuid` in this example):

   ```shell{promptUser: user}
   export SITE=site-uuid
   ```

1. Run a SQL command to set `ROW_FORMAT=DYNAMIC`. Replace `$ENV` with the Multidev or environment, and `$SITE` with the site UUID:

   ```shell{promptUser: user}
   echo "SELECT CONCAT('ALTER TABLE \`', table_name, '\` ROW_FORMAT=DYNAMIC;') AS aQuery FROM information_schema.tables WHERE table_schema = 'pantheon';" | $(terminus connection:info $SITE.$ENV --fields=mysql_command --format=string) | grep -vE 'aQuery|_pt_heartbeat|_pantheon_heartbeat' | $(terminus connection:info $SITE.$ENV --fields=mysql_command --format=string)
   ```
