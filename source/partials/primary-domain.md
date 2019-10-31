### Set a Primary Domain via the Dashboard

1. From the environment you want to set a primary domain for (typically Test or Live), navigate to **<span class="glyphicons glyphicons-global"></span> Domains / HTTPS**.

1. Ensure that all domains have been added and are listed.

1. In the **Choose Primary Domain** section, select the domain to which traffic should be redirected, and click **Save Configuration**.

### Set a Primary Domain with Terminus

1. Install or upgrade to the [latest version of Terminus](/terminus/install).

1. Use Terminus to add the primary domain. In this example, replace `my-site` with your site name, and `live` if you'd like to set it for a different environment, and `www.example.com` with your primary domain:

  ```bash{promptUser: user}
  terminus domain:primary:add my-site.live www.example.com
  ```
