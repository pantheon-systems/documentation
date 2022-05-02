The **Database** import requires a single `.sql` dump that contains the site's content and configurations.

1. Create a `.sql` dump using the [mysqldump](https://dev.mysql.com/doc/refman/5.7/en/mysqldump.html) utility.

1. Compress the resulting archive with gzip to reduce the size for a faster transfer:

  ```bash{promptUser: user}
  mysqldump -uUSERNAME -pPASSWORD DATABASENAME > ~/db.sql
  gzip ~/db.sql
  ```

   - Replace `USERNAME` with a MySQL user with permissions to access your site's database.
   - Replace `PASSWORD` with the MySQL user's password. To force a password prompt, move `-p` to the end of the command and leave it blank. This prevents your MySQL password from being visible on your terminal.
   - Replace `DATABASE` with the name of your site database within MySQL.
   - `~/db.sql` defines the output target to a file named `db.sql` in your user's home directory. Adjust to match your desired location.

  The resulting file will be named `db.sql.gz` You can use either the Pantheon Dashboard or a MySQL client to add your site's database.