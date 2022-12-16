---
contenttype: [partial]
categories: [upgrade]
newcms: [drupal9]
product: [--]
integration: [--]
tags: [--]
reviewed: "2022-11-04"
---

1. Select the **<span class="glyphicons glyphicons-wrench"></span> Dev** environment in the Site Dashboard.

1. Select **<span class="glyphicons glyphicons-server"></span> Database / Files**.

1. Click **Import** and add your archive accordingly (based on file size):

  <TabList>

  <Tab title="Up to 100MBs" id="100mbs" active={true}>

  If your archive is under 100MB, upload the file directly:

   1. Navigate to the **MySQL database** field > click **File** > **Choose File**.

   2. Select your local archive file > click **Import**.

   ![Import MySQL database from file](../../images/dashboard/import-mysql-file.png)

   **Note**: If you recently imported the database and need to re-import, refresh the page and use a new filename for the database file.

  </Tab>

  <Tab title="Up to 500MBs" id="500mbs">

  If your archive is less than 500MB, import it from URL:

   1. Navigate to the **MySQL database** field.

   1. Click **URL**.

   1. Paste a publicly accessible URL for the `.sql.gz` file > click **Import**.

   <Alert title="Note" type="info" >

   Change the end of Dropbox URLs from `dl=0` to `dl=1` to import your archive correctly.

   </Alert>

      ![Import MySQL Database from URL](../../images/dashboard/import-mysql-url.png)

  </Tab>

  <Tab title="Over 500MBs" id="500mbsplus">

  The following instructions allow you to add database archives larger than 500MBs using the command line MySQL client. You can also use a GUI client like Sequel Ace or Navicat. For more information, see [Accessing MySQL Databases](/guides/mariadb-mysql/mysql-access).

   1. Navigate to the Pantheon Site Dashboard.

   1. Open the **<span class="glyphicons glyphicons-wrench"></span> Dev** environment.

   1. Click **Connection Info**.

   1. Copy the Database connection string.

    The Database connection string will look similar to this:

      ```bash{promptUser: user}
      mysql -u pantheon -p{random-password} -h dbserver.dev.{site-id}.drush.in -P {site-port} pantheon
      ```

   1. `cd` into the directory containing your `.sql` file in your terminal.

   1. Paste the connection string and append it with: `< database.sql`.

    Your command will look like:

      ```bash{promptUser: user}
      mysql -u pantheon -p{random-password} -h dbserver.dev.{site-id}.drush.in -P {site-port} pantheon < database.sql
      ```

     If you encounter a connection-related error, the DB server could be in sleep mode. To resolve this, load the site in your browser to wake it up, and try again. For more information, see [Troubleshooting MySQL Connections](/guides/mariadb-mysql/mysql-access/#troubleshooting-mysql-connections).

    The `.sql` file is imported to the **<span class="glyphicons glyphicons-wrench"></span> Dev** environment after you run the command.

  </Tab>

  </TabList>
