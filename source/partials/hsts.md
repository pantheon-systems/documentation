Using the [`pantheon.yml`](/pantheon-yml/) file, you can set the use and duration of the HSTS header, and its affect on subdomains. You can set a short (5 minute) duration header, or a long (366 day) duration, and choose whether to affect subdomains. Using the long duration setting will help you get an A+ SSL rating from [SSL Labs](https://www.ssllabs.com/ssltest/).

Use of the HSTS header is defined by the `enforce_https` directive, and takes five possible values which are handled by Pantheon as shown below:

- `enforce_https: off` - No redirect and no HSTS header (default)
   - HSTS is disabled, `Strict-Transport-Security` header is not set by Pantheon, HTTP **will not** forcefully redirect to HTTPS
- `enforce_https: transitional` - HTTPS redirect with a short HSTS duration (5 minutes), which does not apply to subdomains.
   - HSTS is enabled, `Strict-Transport-Security: max-age=300` is set by Pantheon, HTTP **will** forcefully redirect to HTTPS
- `enforce_https: transitional+subdomains` HTTPS redirect with a short HSTS duration (5 minutes), which also applies to subdomains, even those not on Pantheon.
   - HSTS is enabled, `Strict-Transport-Security: max-age=300; includeSubDomains;` is set by Pantheon, HTTP **will** forcefully redirect to HTTPS
- `enforce_https: full` - HTTPS redirect with a long HSTS duration (366 days, for an A+ SSL Labs rating), which does not apply to subdomains.
   - HSTS is enabled, `Strict-Transport-Security: max-age=31622400; preload` is set by Pantheon, HTTP **will** forcefully redirect to HTTPS
- `enforce_https: full+subdomains` - HTTPS redirect with a long HSTS duration (366 days, for an A+ SSL Labs rating), which also applies to subdomains, even those not on Pantheon.
   - HSTS is enabled, `Strict-Transport-Security: max-age=31622400; includeSubDomains; preload` is set by Pantheon, HTTP **will** forcefully redirect to HTTPS
   - This is the recommended and most secure configuration.

See [Pantheon YAML Configuration Files](/pantheon-yml/) for more information on how to configure this file.

<Alert title="Warning" type="danger">

Once enabled, HSTS headers are cached by browsers for the duration of the max-age period (one year on Pantheon). If at any time you wish to disable HTTPS and go back to unencrypted HTTP, users who have already visited your site will receive a browser warning preventing them from accessing the site until the max-age expires or they have manually cleared their browser history related to your site.

If you are not sure that this is what you want, then you should select `enforce_https: transitional` instead, as this selection has no affect on subdomains, and has a limited (5 minute) HSTS duration.

</Alert>
