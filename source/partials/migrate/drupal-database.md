The **Database** import requires a single `.sql` dump that contains the site's content and configurations.

1. Create a `.sql` dump using the [mysqldump](https://dev.mysql.com/doc/refman/5.7/en/mysqldump.html) utility. To reduce the size for a faster transfer, compress the resulting archive with gzip:

  ```bash{promptUser: user}
  mysqldump -uUSERNAME -pPASSWORD DATABASENAME > ~/db.sql
  gzip ~/db.sql
  ```

   - Replace `USERNAME` with a MySQL user with permissions to access your site's database.

   - Replace `PASSWORD` with the MySQL user's password. You can also move `-p` to the end of the command to leave it blank if you want to be prompted for your password. This prevents your MySQL password from being visible on your terminal.

   - Replace `DATABASE` with the name of your site database within MySQL.

   - `~/db.sql` defines the output target to a file named `db.sql` in your user's home directory. Adjust to match your desired location.

  The resulting file will be named `db.sql.gz`. You can use the Pantheon Dashboard or a MySQL client to add your site's database.

1. Navigate to the Site Dashboard and select the **<span class="fa fa-wrench"></span> Dev** environment.

1. Select **<span class="fa fa-server"></span> Database / Files**.

1. Click **Import** and add your archive (based on file size):

    <TabList>

    <Tab title="Up to 100MBs" id="100mbs" active={true}>

    If your archive is under 100MB, you can upload the file directly:

    1. Click **File** in the **MySQL database** field > **Choose File**.

    1. Select your local archive file and click **Import**.

      ![Import MySQL database from file](../../images/dashboard/import-mysql-file.png)

    **Note:** If you recently imported the database and need to re-import, refresh the page and use a new filename for the database file.

    </Tab>

    <Tab title="Up to 500MBs" id="500mbs">

    If your archive is less than 500MB, you can import it from the URL:

    1. Click **URL** in the **MySQL database** field.

    1. Paste a publicly accessible URL for the `.sql.gz` file and click **Import**.

       - Change the end of the Dropbox URLs from `dl=0` to `dl=1` to ensure that your archive imports correctly.

        ![Import MySQL database from file](../../images/dashboard/import-mysql-file.png)

    </Tab>

    <Tab title="Over 500MBs" id="500mbsplus">

    The following instructions will allow you to add database archives larger than 500MBs using the command line MySQL client. You can also use a GUI client like Sequel Ace or Navicat. For more information, refer to [Accessing MySQL Databases](/mysql-access).

    1. Navigate to the **<span class="glyphicons glyphicons-wrench"></span> Dev** environment on the Pantheon Site Dashboard.

    1. Click **Connection Info** and copy the database connection string.

       Your command will look similar to the example below:

       ```bash{promptUser: user}
       mysql -u pantheon -p{random-password} -h dbserver.dev.{site-id}.drush.in -P {site-port} pantheon
       ```

    1. Use the `cd` command to change into the directory containing your `.sql` file.

    1. Paste the connection string and append it with: `< database.sql`

       - This imports the `.sql` file to the **<span class="fa fa-wrench"></span> Dev** environment.

       - Your command will look similar to the example below:

         ```bash{promptUser: user}
         mysql -u pantheon -p{random-password} -h dbserver.dev.{site-id}.drush.in -P {site-port} pantheon < database.sql
         ```

       If you encounter a connection-related error, the DB server could be in sleep mode. To resolve this, load the site in your browser to wake it up, and try again. For more information, refer to [Troubleshooting MySQL Connections](/mysql-access/#troubleshooting-mysql-connections).

    </Tab>

    </TabList>
