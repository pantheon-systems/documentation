**Files** refer to everything stored inside `sites/default/files`. This usually consists of uploaded images, generated stylesheets, aggregated scripts, etc. Files are not under Git version control and are stored separately from the site's code.

You can use the Pantheon Dashboard, SFTP, or Rsync to upload your site's files.

Follow the steps below to export a `tar.gz` or `.zip` file of your directory files.

1. Navigate to your Drupal site's root directory to run this command: 

  ```bash{promptUser: user}
  cd sites/default/files
  tar -czf ~/files.tar.gz .
  ```

  Now you have created an archive file in your user's home directory.

1. Select the **<span class="glyphicons glyphicons-wrench"></span> Dev** environment in the Site Dashboard.

1. Select **<span class="glyphicons glyphicons-server"></span> Database / Files**.

1. Click **Import** and then add your archive (based on file size) by following the steps below.

  <TabList>

  <Tab title="Up to 100MBs" id="100mbsfiles-id" active={true}>

  If your archive is under 100MB, upload the file directly:

   1. Navigate to the **Archive of site files** field > click **File** > **Choose File**.

   1. Select your local archive file > click **Import**.

  </Tab>

  <Tab title="Up to 500MBs" id="500mbsfiles">

  If your archive is less than 500MB, import it from URL:

   1. Navigate to the **Archive of site files** field > click **URL**.

   1. Paste a publicly accessible URL for the archive > click **Import**. 
   
   <Alert title="Note"  type="info" >

    You must change the end of Dropbox URLs from `dl=0` to `dl=1` to import your archive correctly.

   </Alert>

  </Tab>

  <Tab title="Over 500MBs" id="500mbsplusfiles">

   We recommend using the [Terminus Rsync Plugin](https://github.com/pantheon-systems/terminus-rsync-plugin) to transfer a large number of files. This allows you to avoid using multiple command line arguments and specific directory structures, which make it easy to introduce mistakes.

   Rsync only transfers the new changes to the directory after the initial rsync runs. This minimizes the time a site is in an unpredictable state (or offline) during the final step of migration, and allows you to bring over only new content rather than re-copying every single file.

   1. Run the following command to sync your current directory to Pantheon:

      ```bash{promptUser: user}
      terminus rsync . my_site.dev:files
      ```

   1. Run the following command if you experience interrupted transfers due to connectivity issues, which can occur when using Rsync manually.

      ```bash
      ENV='dev'
      SITE='SITEID'

      read -sp "Your Pantheon Password: " PASSWORD
      if [[ -z "$PASSWORD" ]]; then
      echo "Whoops, need password"
      exit
      fi

      while [ 1 ]
      do
      sshpass -p "$PASSWORD" rsync --partial -rlvz --size-only --ipv4 --progress -e 'ssh -p 2222' ./files/* --temp-dir=../tmp/ $ENV.$SITE@appserver.$ENV.$SITE.drush.in:files/
      if [ "$?" = "0" ] ; then
      echo "rsync completed normally"
      exit
      else
      echo "Rsync failure. Backing off and retrying..."
      sleep 180
      fi
      done
      ```

   Your files will be uploaded to your Pantheon site's **<span class="glyphicons glyphicons-wrench"></span> Dev** environment. If an error occurs during transfer, the command waits 180 seconds before continuing where it left off.

  </Tab>

  </TabList>
