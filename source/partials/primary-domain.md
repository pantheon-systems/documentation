1. Install or upgrade to the [latest version of Terminus](/terminus/install).

1. Use Terminus to add the primary domain. In this example, replace `my-site` with your site name, and `live` if you'd like to set it for a different environment, and `www.example.com` with your primary domain:

  ```bash
  terminus domain:primary:add my-site.live www.example.com
  ```

