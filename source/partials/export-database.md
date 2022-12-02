---
contenttype: [partial]
categories: [create]
newcms: [--]
product: [local]
integration: [--]
tags: [--]
reviewed: ""
---

### Via Dashboard

1. Navigate to the Site Dashboard.

2. Create an on-demand backup by selecting **Database / Files** > **Export** > **Export Database**.

3. Download the scheduled or on-demand backup by selecting **Backups** > **Backup Log** > **Database download link**.

4. Import the database into your local environment using your MySQL client:

  ```bash{promptUser: user}
  gunzip < database.sql.gz | mysql -uUSER -pPASSWORD DATABASENAME
  ```

  <Alert title="Note" type="info">

  Replace `database.sql.gz` with the name of the database archive downloaded from Pantheon.

  </Alert>

### Via Terminus

1. Create and get the database with Terminus commands:

    ```bash{promptUser: user}
    terminus backup:create $SITE.$ENV --element=db
    terminus backup:get $SITE.$ENV --element=db
    ```

2. Import the archive into your local MySQL database using the following command:

    ```bash{promptUser: user}
    gunzip < database.sql.gz | mysql -uUSER -pPASSWORD DATABASENAME
    ```
