<Alert title="Note" type="info">

Before adjusting `enforce_https`, review and understand the configuration options and all considerations to avoid unintended consequences.

</Alert>

Ensure that your site will always use HTTPS to deliver content with `enforce_https`. Five values are available, from least to most secure:

Use of the HSTS header is defined by the `enforce_https` directive, and takes five possible values which are handled by Pantheon as shown below:

| Value                   | Action                                  | Description                               |
|:-----------------------:|:--------------------------------------- |:----------------------------------------- |
| off (default)           | No redirect and no HSTS header (default) | HSTS is disabled, `Strict-Transport-Security` header is not set by Pantheon, HTTP **will not** forcefully redirect to HTTPS. |
| transitional            | HTTPS redirect with a short HSTS duration (5 minutes), which does not apply to subdomains. | HSTS is enabled, `Strict-Transport-Security: max-age=300` is set by Pantheon, HTTP **will** forcefully redirect to HTTPS. |
| transitional+subdomains | HTTPS redirect with a short HSTS duration (5 minutes), which also applies to subdomains, even those not on Pantheon. | HSTS is enabled, `Strict-Transport-Security: max-age=300; includeSubDomains;` is set by Pantheon, HTTP **will** forcefully redirect to HTTPS. |
| full                    | HTTPS redirect with a long HSTS duration (366 days, for an A+ SSL Labs rating), which does not apply to subdomains. | HSTS is enabled, `Strict-Transport-Security: max-age=31622400; preload` is set by Pantheon, HTTP **will** forcefully redirect to HTTPS. |
| full+subdomains         | HTTPS redirect with a long HSTS duration (366 days, for an A+ SSL Labs rating), which also applies to subdomains, even those not on Pantheon. | HSTS is enabled, `Strict-Transport-Security: max-age=31622400; includeSubDomains; preload` is set by Pantheon, HTTP **will** forcefully redirect to HTTPS. This is the recommended and most secure configuration. |

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
