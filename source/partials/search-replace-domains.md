---
contenttype: partial
newcms: [wordpress]
product: []
integration: []
reviewed: ""
---

WordPress sites with custom domains configured on multiple environments may see references to the wrong platform domain after cloning the database from one environment to another.

The Site Dashboard runs `wp search-replace` during the cloning workflow to update environment URLs automatically. This operation, however, only runs once on a single set of URLs. If the target environment has a custom domain (e.g `test.example.com`), it's used to replace the source environment's custom domain (e.g. `www.example.com`). This can cause the target environment to have incorrect references to platform domains (e.g. `live-example.pantheonsite.io`).

You can resolve this using one of several methods:

<TabList>

<Tab title="Plugins" id="plugin-replace" active={true}>

There are several plugins with search and replace functionality. [WP Migrate DB](https://wordpress.org/plugins/wp-migrate-db/), for example, works well on our platform. 

Make sure you select the **Find & Replace** functionality:

<Image alt="Enable Find & Replace" path="wp-migrate-db-setting.png" />

Another popular search-replace plugin is [Better Search Replace](https://wordpress.org/plugins/better-search-replace/). However, there is an additional filter that must be added for it to work on Live, as outlined in [Plugins and Themes with Known Issues](/plugins-known-issues/#better-search-and-replace).

</Tab>

<Tab title="Terminus" id="terminus-replace-anchor">

You can use [Terminus](/terminus) to run an additional `wp search-replace` command on the target environment after cloning. 

Set or replace the variables `$site` and `$env` with your site name and the correct environment:

```bash{promptUser: user}
terminus remote:wp $site.$env -- search-replace "://live-example.pantheonsite.io" "://test.example.com" --all-tables --verbose --dry-run
```

The following example also converts the URL from HTTP to HTTPS, for situations where you might have HTTPS in one environment and not another:

```bash{promptUser: user}
terminus remote:wp $site.$env -- search-replace "http://live-example.pantheonsite.io" "https://test.example.com" --all-tables --verbose --dry-run
```

**Note:** The example code above includes `--dry-run`, which executes the command but prevents permanent changes. Remove this flag once confident that the values are correct.

</Tab>

<Tab title="Quicksilver" id="quicksilver-replace-anchor">

Consider the following example if you are using [Quicksilver](/guides/quicksilver) scripts. 

Replace `example#.pantheonsite.io` and `example.com` with the domains you want to find and replace on each `passthru` line:

```php
<?php
echo "Replacing previous environment urls with new environment urls... \n";

if ( ! empty( $_ENV['PANTHEON_ENVIRONMENT'] ) ) {
  switch( $_ENV['PANTHEON_ENVIRONMENT'] ) {
    case 'live':
      passthru('wp search-replace "://test-example.pantheonsite.io" "://example.com" --all-tables ');
      break;
    case 'test':
      passthru('wp search-replace "://example1.pantheonsite.io" "://test-examplesite.pantheonsite.io" --all-tables ');
      passthru('wp search-replace "://example2.pantheonsite.io" "://test-examplesite.pantheonsite.io" --all-tables ');
      passthru('wp search-replace "://example3.pantheonsite.io" "://test-examplesite.pantheonsite.io" --all-tables ');
      break;
  }
}
?&gt;
```

The example above replaces three URLs when cloning to the test environment with `test-examplesite.pantheonsite.io`, and replaces that domain with the example [custom domain](/guides/domains) `example.com` when cloning to the live environment.

You can find this example and many others in the [Quicksilver Examples](https://github.com/pantheon-systems/quicksilver-examples) repo.

</Tab>

</TabList>

<Alert title="Note" type="info">

In addition to the example above, URLs may be stored in an encoded format. If the example above fails to resolve all issues, search for patterns like `%3A%2F%2Fexample.com` and `:\/\/example.com`.

</Alert>
