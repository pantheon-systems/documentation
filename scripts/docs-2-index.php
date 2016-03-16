<?php
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/users/access-management') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/access-management'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/local/accessing-mysql-databases') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/mysql-access'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/users/access-account-after-owner-leaves') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/settings/add-a-credit-card-to-a-site') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/site-access'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/all-about-application-containers') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/application-containers'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/apache-solr') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/solr'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/code/applying-upstream-updates') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/upstream-updates'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/logs/downloading-live-error-logs') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  '); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/quicksilver') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/quicksilver'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/backups/backup-creation') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/create-backups'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/backups') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/backups'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/code/bots-and-indexing') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/bots-and-indexing'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/drupal/caching-in-drupal-modules') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/drupal-caching-modules'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/create/choosing-start-state') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/start-state'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/wordpress/clone-a-wordpress-site-with-duplicator-plugin') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/wordpress-duplicator'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/backups/cloning-an-existing-site-from-a-dashboard-backup') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/clone-new-site-backups'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/cloudflare-cdn-and-dns') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/cloudflare'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/wordpress/cloudFront-setup-for-wordpress') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/wordpress-cloudfront'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/drupal/drupal8/configuration-management') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/drupal-8-configuration-management'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/drupal/configuring-jetbrains-phpstorm-ide-with-pantheon') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/drupal-phpstorm'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/wordpress/configuring-phpstorm-on-pantheon-for-wordpress') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/wordpress-phpstorm'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/drupal/configuring-settings-php') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/settings-php'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/wordpress/configuring-wp-config-php') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/wp-config-php'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/varnish/pantheon_stripped-get-parameter-values') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/pantheon_stripped'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/drupal/content-delivery-network-cdn-for-file-distribution') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/content-delivery-network'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/local/continuous-integration-solutions') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/continuous-integration'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/database/myisam-to-innodb') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/myisam-to-innodb'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/organizations/adding-a-custom-upstream') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/custom-upstream'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/create') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/create-sites'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/local/cli/machine-tokens') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/machine-tokens'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/drupal/drupal8/create-services-yml-file') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/services-yml'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/drupal/cron') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/drupal-cron'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/wordpress/cron-for-wordpress') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/wordpress-cron'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/database/database-connection-errors') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/database-connection-errors'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/database') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/database-workflow'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/date-and-time') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/date-and-time'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/debugging-connectivity-issues') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/debug-connections'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/logs/debugging-sites-with-log-files') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/debug-log-files'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/code/debugging-slow-performance') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/debug-slow-performance'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/users/deleting-your-pantheon-account') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/delete-account'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/deleting-a-site') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/delete-site'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/code/developing-directly-with-sftp-mode') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/sftp'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/domains/developing-with-https') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/build-https'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/domains/fastly-domain-masking') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/fastly-domain'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/domains') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/domains'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/drupal/drupal8/drupal-8-performance-and-caching-settings') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/drupal-8-cache'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/drupal/drupal8') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/drupal-8'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/local/drupal-drush-command-line-utility') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/drush'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/drupal/drupal-performance-and-caching-settings') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/drupal-cache'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/drupal') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/drupal'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/code/dynamic-outgoing-ip-addresses') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/outgoing-ips'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/code/email') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/email'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/organizations/https-for-sites-using-a-custom-vanity-domain') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/enable-https-vanity-domain'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/domains/adding-a-ssl-certificate-for-secure-https-communication') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/enable-https'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/wordpress/solr') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/wordpress-solr'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/drupal/solr') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/solr-drupal'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/wordpress/environment-specific-config') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/environment-specific-config'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/errors-and-server-responses') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/errors-and-server-responses'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/migrate/export-an-existing-drupal-site') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/drupal-export'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/migrate/export-an-existing-wordpress-site') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/wordpress-export'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/external-libraries') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/external-libraries'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/drupal/unwind-a-multisite') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/unwind-multisite'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/local/filezilla') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/filezilla'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/files/filesystem-faqs') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/filesystem-faq'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/wordpress/fix-broken-links-in-wordpress') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/wordpress-broken-links'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/frequently-asked-questions') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/faq'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/domains/gandi-pantheon-pointing-your-dns') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/gandi-domain'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/users/generating-ssh-keys') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/generate-ssh-key'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/getting-started') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/getting-started'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/wordpress/site-networks/getting-started') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/create-wordpress-site-networks'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/getting-support') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/getting-support'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/drupal/getting-the-client-ip-address') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/client-ip'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/local/git-faq') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/git-faq'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/going-live') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/going-live'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/horizontal-scalability') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/horizontal-scalability'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/code/hot-fixes') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/hot-fixes'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/database/kill-mysql-queries') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/kill-mysql-queries'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/migrate/importing-drush-site-archives-with-terminus') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/drush-import'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/local/installing-cygwin-on-windows') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/cygwin-windows'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/wordpress/installing-redis-on-wordpress') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/wordpress-redis'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/code/ldap-and-ldaps') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/ldap-and-ldaps'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/drupal/launch-check-drupal-performance-and-configuration-analysis') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/drupal-launch-check'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/wordpress/launch-check-wordpress-performance-and-configuration-analysis') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/wordpress-launch-check'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/wordpress/starting-wordpress-site') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/launch-wordpress'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/load-and-performance-testing') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/load-and-performance-testing'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/users/loading-ssh-keys') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/add-ssh-key'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/local') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/local-development'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/security/locking-your-site') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/lock-environment'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/logs') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/logs'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/mime-types') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/mime-types'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/drupal/major-version-drupal-upgrades') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/drupal-updates'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/domains/multiple-sites-single-domain') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/single-application-sites'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/local/drush-versions') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/drush-versions'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/organizations/dashboard') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/organization-dashboard'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/organizations/managing-upstreams') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/managing-upstreams'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/wordpress/site-networks/managing') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/managing-wordpress-site-networks'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/migrate') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/migrate'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/migrate/manual-site-import') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/manual-import'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/migrate/wordpress-site-networks') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/migrate-wordpress-site-networks'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/migrate/migrating-from-wpengine') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/migrate-from-wpengine'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/code/more-ways-of-managing-code-in-sftp-mode') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/more-sftp'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/drupal/drupal8/moving-out-of-testing') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/drupal-8-testing'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/multidev') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/multidev'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/drupal/multilingual-best-practices') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/multilingual'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/logs/mysql-slow-log') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/mysql-slow-log'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/newrelic/mysql-troubleshooting-with-new-relic-pro') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/debug-mysql-new-relic'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/newrelic') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/new-relic'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/newrelic/new-relic-performance-analysis') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/new-relic-analysis'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/new-site-owner') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/site-owner-faq'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/files/non-standard-files-locations') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/non-standard-file-paths'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/optimizing') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/cloud-optimization'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/drupal/optimizing-the-image-cache-module-in-drupal-6') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/drupal-6-image-cache'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/organizations') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/organizations'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/php-errors-and-exceptions') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/php-errors'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/logs/php-slow-log') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/php-slow-log'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/code/pantheon-enterprise-gateway') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/pantheon-enterprise-gateway'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/files') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/files'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/organizations/faq') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/organization-faq'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/wordpress/pantheon-plugins') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/plugins'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/security/SSL-TLS') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/ssl-tls'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/settings') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/settings'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/logs/nginx-access-log') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/nginx-access-log'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/platform-considerations') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/platform-considerations'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/domains/platform-domains') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/platform-domains'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/plan-configurations') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/platform-resources'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/local/port-2222-blocked-workaround') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/port-2222'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/private-files') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/private-files'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/code/reading-pantheon-environment-configuration') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/read-environment-config'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/code/redirect-incoming-requests') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/redirects'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/redis-as-a-caching-backend') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/redis'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/local/refreshing-dns-records-on-your-local-machine') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/local-dns'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/drupal/fix-broken-links-that-reference-ip-port-instead-of-domain-name') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/drupal-broken-links'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/required-reading-essential-pantheon-documentation') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/required-reading'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/resetting-passwords') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/resetting-passwords'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/backups/restoring-an-environment-from-a-backup') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/restore-environment-backup'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/organizations/change-management') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/change-management'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/organizations/running-a-custom-upstream') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/running-custom-upstream'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/code/server_name-and-server_port') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/server_name-and-server_port'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/local/ssh-tunnels-for-secure-connections-to-pantheon-services') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/ssh-tunnels'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/code/sso-and-identity-federation') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/sso'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/wordpress/hyperdb') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/hyperdb'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/scope-of-support') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/scope-of-support'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/secure-phpinfo') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/phpinfo'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/security') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/security'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/settings/selecting-a-plan') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/select-plan'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/drupal/session-and-cookie-handling') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/sessions-and-cookies'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/drupal/cdn-setting-up-cloudfront') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/drupal-cloudfront'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/domains/setting-up-a-domain-with-godaddy') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/godaddy-domain'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/organizations/sso') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/sso-organizations'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/local/starting-with-git') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/git'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/domains/switching-dns') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/switching-dns'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/team-management') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/team-management'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/files/temp-files') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/temp-files'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/local/cli') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/terminus'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/varnish/testing-varnish') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/testing-varnish'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/wordpress/wordpress-development-versions') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/wordpress-development-versions'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/deploys') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/deploys'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/power-users') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/power-users'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/sites'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/local/terminus-the-pantheon-command-line-interface') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/terminus-deprecated'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/code/pantheon-yml') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/pantheon-yml'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/timeouts') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/timeouts'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/varnish/debugging-cache') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/debug-cache'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/local/undo-git-commits-like-overwriting-drupal-core') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/undo-commits'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/code/unsupported-modules-plugins') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/unsupported-modules-plugins'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/code/update-core-for-sites-running-outdated-versions-custom-distributions') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/custom-distribution-updates'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/drupal/updating-modules-through-drupal') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/drupal-module-updates'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/updating-payment-methods') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/update-payment-method'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/settings/upgrade-php-versions') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/php-versions'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/users') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/user-dashboard'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/code/using-indexdepot-with-pantheon-sites') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  '); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/local/using-mysql-workbench-to-access-a-database') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/mysql-workbench'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/code/htaccess') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/htaccess'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/drupal/using-simplesamlphp-with-shibboleth-sso') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/shibboleth-sso'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/wordpress/using-wp-cli-pantheon') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/wp-cli'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/local/using-winscp') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/winscp'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/code/using-the-pantheon-workflow') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/pantheon-workflow'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/organizations/vanity-domains') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/vanity-domains'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/varnish/caching-advancedtopics') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/caching-advanced-topics'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/varnish') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/varnish'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/what-is-apc-and-what-is-it-used-for') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/alternative-php-cache'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/code/what-is-the-pantheon_api-module') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/pantheon_api-module'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/wordpress') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/wordpress'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/wordpress/wordpress-best-practices') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/wordpress-best-practices'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/wordpress/configuration-management-plugin') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/wp-cfm'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/wordpress/wordpress-faq') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/wordpress-faq'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/wordpress/wordpress-known-issues') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/wordpress-known-issues'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/wordpress/wordpress-pantheon-cache-plugin-configuration') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/wordpress-cache-plugin'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/wordpress/site-networks') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/wordpress-site-networks'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/wordpress/wordpress-and-php-sessions') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/wordpress-sessions'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/sites/code') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/code'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/articles/local/rsync-and-sftp') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/rsync-and-sftp'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/guides/ssl-with-cloudflare') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/guides/cloudflare-enable-https'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/guides/automated-testing-wordpress-behat') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/guides/wordpress-automated-testing'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/guides/collaborative-development-github-pantheon') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/guides/collaborative-development'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/guides/create-a-wordpress-site-from-the-commandline-with-terminus-and-wp-cli') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/guides/wordpress-commandline'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/guides/using-sendgrid-to-deliver-email-with-wordpress-and-drupal') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/guides/sendgrid'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/changelog/2016-01-January') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/changelog/2016/01'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/changelog/2016-02-February') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/changelog/2016/02'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/changelog/2015-01-January') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/changelog/2015/01'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/changelog/2015-02-February') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/changelog/2015/02'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/changelog/2015-03-March') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/changelog/2015/03'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/changelog/2015-04-April') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/changelog/2015/04'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/changelog/2015-05-May') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/changelog/2015/05'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/changelog/2015-06-June') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/changelog/2015/06'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/changelog/2015-07-July') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/changelog/2015/07'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/changelog/2015-08-August') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/changelog/2015/08'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/changelog/2015-09-September') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/changelog/2015/09'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/changelog/2015-10-October') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/changelog/2015/10'); exit();
}
if (strpos($_SERVER['REQUEST_URI'], '/docs/changelog/2015-12-December') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location:  /docs/changelog/2015/12'); exit();
}
