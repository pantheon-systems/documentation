You should now have the three major components (contrib and custom code, database, and files) of your site imported to your Pantheon account. 

1. Clear your caches in the [Pantheon Dashboard](/clear-caches#pantheon-dashboard) or with Terminus by running the following command:

  ```bash{promptUser: user}
  terminus drush $SITE.dev cr
  ```

1. Review the site, then proceed to launch using the [Launch Essentials](/guides/launch) documentation.
