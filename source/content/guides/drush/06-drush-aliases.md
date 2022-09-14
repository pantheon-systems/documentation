---
title: Drupal Drush Command-Line Utility on Pantheon
subtitle: Use Drush Aliases
description: Learn how to use Drush aliases.
cms: "Drupal"
categories: [get-started]
tags: [migrate, terminus, drush]
layout: guide
showtoc: true
permalink: docs/guides/drush/drush-aliases
anchorid: drush-aliases
---

This section provides information on how to use Drush aliases.

## Download Drush Aliases Locally

Downloading the Pantheon aliases to your local Drush aliases file allows you to run Drush calls against your Pantheon site environments. Use [Terminus](/terminus) to download your Drush aliases.

Authenticate Terminus with [machine tokens](/machine-tokens) or your Pantheon Dashboard credentials, then update your local aliases file in a single step:

```bash{promptUser: user}
terminus aliases
```

This command will write both Drush 8 and Drush 9 aliases into the directory `$HOME/.drush` for your sites that you are a direct member of. To create aliases for all sites that you can use, including sites that you have access to via team membership, run:

```bash{promptUser: user}
terminus aliases --all
```

If you add a site to your account, you will have to download a new copy of your Drush aliases. You do not need to update your Drush aliases when you add new Mulitdev environments to your sites.

<Alert type="info" title="Note">

You must use Drush 8.3.0 or 9.6.0 or later to use Drush aliases directly. Earlier versions are not compatible.

</Alert>

### Structure of Site Aliases

The form Pantheon Drush aliases take depends on the version of Drush being used. Drush 8 aliases are all written to a single file, `$HOME/.drush/pantheon.aliases.drushrc.php`. A single alias record looks something like the example below:

```php:title=pantheon.aliases.drushrc.php
$aliases['example.*'] = array(
  'uri' => '${env-name}-example.pantheonsite.io',
  'remote-host' => 'appserver.${env-name}.3eb7b5dd-8b90-4272-8a80-5474015c37f1.drush.in',
  'remote-user' => '${env-name}.3eb7b5dd-8b90-4272-8a80-5474015c37f1',
  'ssh-options' => '-p 2222 -o "AddressFamily inet"',
  'path-aliases' => array(
    '%files' => 'files',
   ),
);
```

Drush 9 aliases are written one file per site to the directory `$HOME/.drush/sites/pantheon`. The site name is used to generate the filename, e.g. `example.site.yml`. The contents of a Drush 9 alias file looks something like the following example:

```yaml
'*':
  host: appserver.${env-name}.3eb7b5dd-8b90-4272-8a80-5474015c37f1.drush.in
  paths:
    files: files
  uri: ${env-name}-example.pantheonsite.io
  user: ${env-name}.3eb7b5dd-8b90-4272-8a80-5474015c37f1
  ssh:
    options: '-p 2222 -o "AddressFamily inet"'
    tty: false
```

<Alert type="info" title="Note">

You must be a [site team member](/team-management/#manage-site-team-members) of the site for it to be included within your local alias file. Organization administrators will not see all associated sites within their alias file, but only sites for which they are site team members. The alternative is to execute Drush commands via [Terminus](/terminus) for sites in which you are not a direct site team member.

</Alert>

Note that these are both "wildcard" aliases. The same wildcard alias is used for every environment available for a given site. The variable `${env-name}` is replaced with the appropriate environment name when used.

Pantheon also uses "policy files" to validate aliases before they are used. The policy files are written by the `terminus aliases` command; the Drush 8 policy file is written to `$HOME/.drush/pantheon/drush8/pantheon_policy.drush.inc`, and the Drush 9 policy file is written to `$HOME/.drush/pantheon/Commands/PantheonAliasPolicyCommands.php`. These files should not be deleted.

### List Available Site Aliases

Once the Pantheon Drush aliases have been copied, verify that the site aliases are available by listing every site alias known to Drush:

```bash{promptUser: user}
drush sa
```

## Drush Alias Strict Control

Create a file called `policy.drush.inc`, and place in in the `.drush` folder of your home directory. You can create a new file or use the example policy file in Drush’s `examples` folder to get started.

If your live site is associated with multiple domains, Pantheon will select an arbitrary one to include in the alias file that you download with Terminus. In some instances, it can cause problems in Drupal if the wrong URI is used, and Drush will not allow you to override the URI value in the alias with a command line `--uri` option.

To avoid editing the generated Pantheon aliases file every time it is downloaded, use a `hook_drush_sitealias_alter` function in `policy.drush.inc` to change the URI for your specific Pantheon site:

```php:title=policy.drush.inc
function policy_drush_sitealias_alter(&$alias_record) {
  // Provide the correct 'uri' for a specific site
  if ($alias_record['#name'] == 'pantheon.SITENAME.live') {
    $alias_record['uri'] = 'example.com';
  }:title=settings.php
}
```

Replace `SITENAME` with your Pantheon site name, and `example.com` with the correct URI for that site.

## More Resources

- [The Terminus Manual](/terminus)
- [Pantheon YAML Configuration Files](/pantheon-yml)