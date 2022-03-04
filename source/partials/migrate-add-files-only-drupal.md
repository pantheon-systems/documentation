**Files** refer to anything within `sites/default/files`, which typically includes uploaded images, along with generated stylesheets, aggregated scripts, etc. Files are not under Git version control and are stored separately from the site's code.

You can use the Pantheon Dashboard, SFTP, or Rsync to upload your site's files.

1. Export a `tar.gz` or `.zip` file of your files directory:

  Navigate to your Drupal site's root directory to run this command, which will create an archive file in your user's home directory:

  ```bash{promptUser: user}
  cd sites/default/files
  tar -czf ~/files.tar.gz .
  ```

1. From the Site Dashboard, select the **<span class="glyphicons glyphicons-wrench"></span> Dev** environment.
1. Select **<span class="glyphicons glyphicons-server"></span> Database / Files**.
1. Click **Import** and add your archive accordingly (based on file size):

  <TabList>

  <Tab title="Up to 100MBs" id="100mbsfiles-id" active={true}>

  If your archive is under 100MB, you can upload the file directly:

   1. In the **Archive of site files** field, click **File**, then **Choose File**.

   1. Select your local archive file, then press **Import**.

  </Tab>

  <Tab title="Up to 500MBs" id="500mbsfiles">

  If your archive is less than 500MB, you can import it from URL:

   1. In the **Archive of site files** field, click **URL**.

   1. Paste a publicly accessible URL for the archive, and press **Import**. Change the end of Dropbox URLs from `dl=0` to `dl=1` so we can import your archive properly.

  </Tab>

  <Tab title="Over 500MBs" id="500mbsplusfiles">

  Rsync is an excellent method for transferring a large number of files. After performing an initial rsync, subsequent jobs will only transfer the latest changes. This can help minimize the amount of time a site is in an unpredictable state (or offline) during the final step of migration, as it allows you to bring over only new content rather than re-copying every single file.

  We recommend looking into the [Terminus Rsync Plugin](https://github.com/pantheon-systems/terminus-rsync-plugin) as a helper when doing these operations, as the number of command line arguments and specifics of directory structure make it easy for human error to impact your operation.

  To sync your current directory to Pantheon:

  ```bash{promptUser: user}
  terminus rsync . my_site.dev:files
  ```

  When using Rsync manually, the script below is useful for dealing with transfers being interrupted due to connectivity issues. It uploads files to your Pantheon site's **<span class="glyphicons glyphicons-wrench"></span> Dev** environment. If an error occurs during transfer, it waits 180 seconds and picks up where it left off:

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

  </Tab>

  </TabList>
