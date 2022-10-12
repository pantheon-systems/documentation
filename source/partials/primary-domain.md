### Set a Primary Domain via the Dashboard

<Alert type="danger" title="Warning">

With a Primary Domain set at the platform level, all other domains (except the [platform domain](/guides/domains)) will be pointed to your Primary domain _at the root level_. If you want to redirect secondary domains to specific pages on your site (for example, `olddomain.com` to `newdomain.com/old-landing-page`), do not set a Primary Domain. Instead use [PHP redirects](/guides/redirect/#redirect-with-php).

</Alert>

1. Navigate to the environment you want to set a primary domain for (typically Test or Live), and then select **<span class="glyphicons glyphicons-global"></span> Domains / HTTPS**.

1. Ensure that all domains have been added and are listed.

1. Navigate to the **Choose Primary Domain** section, select the domain to which traffic should be redirected, and then click **Save Configuration**.

### Set a Primary Domain with Terminus

1. Install or upgrade to the [latest version of Terminus](/terminus/install).

1. Use Terminus to add the primary domain. In this example, replace:

    - `my-site` with your site name
    - `live` if you'd like to set it for a different environment
    - `www.example.com` with your primary domain

  ```bash{promptUser: user}
  terminus domain:primary:add my-site.live www.example.com
  ```
