<Alert title="Note" type="info">

Before adjusting `enforce_https`, review and understand the configuration options and all considerations to avoid unintended consequences.

</Alert>

Ensure that your site will always use HTTPS to deliver content with `enforce_https`. Five values are available, from least to most secure:

Use of the HSTS header is defined by the `enforce_https` directive, and takes five possible values which are handled by Pantheon as shown below:

|          Value          | Redirects |  HSTS is | Strict-Transport-Security | includeSubdomains | preload |
|:-----------------------:|:---------:|:--------:|---------------------------|:-----------------:|:-------:|
|      off (default)      |     ❌     | Disabled | Not set by Pantheon       |         ❌         |    ❌    |
|       transitional      |     ✔     | Enforced | `max-age=300`             |         ❌         |    ❌    |
| transitional+subdomains |     ✔     | Enforced | `max-age=300`             |         ✔         |    ❌    |
|           full          |     ✔     | Enforced | `max-age=31622400`        |         ❌         |    ✔    |
|     full+subdomains     |     ✔     | Enforced | `max-age=31622400`        |         ✔         |    ✔    |

For example, to set `enforce_https` as `transitional`:

```yml
enforce_https: transitional
```

<Alert title="Warning" type="danger">

Once enabled, HSTS headers are cached by browsers for the duration of the max-age period (one year on Pantheon). If at any time you wish to disable HTTPS and go back to unencrypted HTTP, users who have already visited your site will receive a browser warning preventing them from accessing the site until the max-age expires or they have manually cleared their browser history related to your site.

If you are not sure that this is what you want, then you should select `enforce_https: transitional` instead, as this selection has no affect on subdomains, and has a limited (5 minute) HSTS duration.

</Alert>

**Considerations**
- Use of `full` or `full+subdomains` should be treated as a commitment. If your site is unable to serve HTTPS (e.g. by moving to a host that doesn't support HTTPS) after sending a long-duration HSTS header, visitors will be unable to access your site.
- Any option with `+subdomains` should only be used if you want to enforce HTTPS for *all subdomains, even those not connected to Pantheon*.
- To prepare your site to serve all content via HTTPS, follow the [Switching Sites from HTTP to HTTPS](/http-to-https/) doc.
