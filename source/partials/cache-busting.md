The following is the "Cache-Busting Cookie Patterns" section from Pantheon's Varnish configuration (`.vcl`) file for your reference. Advanced Drupal and WordPress developers should reference this if they have any questions regarding what cookie patterns the Global CDN will not cache:

```none
NO_CACHE
S+ESS[a-z0-9]+
fbs[a-z0-9_]+
SimpleSAML[A-Za-z]+
PHPSESSID
wordpress[A-Za-z0-9_]*
wp-[A-Za-z0-9_]+
comment_author_[a-z0-9_]+
duo_wordpress_auth_cookie
duo_secure_wordpress_auth_cookie
bp_completed_create_steps # BuddyPress cookie used when creating groups
bp_new_group_id # BuddyPress cookie used when creating groups
wp-resetpass-[A-Za-z0-9_]+
(wp_)?woocommerce[A-Za-z0-9_-]+
amazon_Login_[A-Za-z0-9_]+
```
