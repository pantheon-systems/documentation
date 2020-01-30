<Alert title="Note" type="info">

Before adjusting `enforce_https`, review and understand the configuration options and all considerations to avoid unintended consequences.

If you use a plugin or module to set your HSTS header, it will create a duplicate header. Disable `enforce_https` in `pantheon.yml` to avoid an invalid policy.

</Alert>

Use of the HSTS header is defined by the `enforce_https` directive, and takes five possible values which are handled by Pantheon as shown below:

|       enforce_https:                                          | Redirect                           |   HSTS   | Strict-Transport-Security | includeSubdomains                  | preload                            |
|:-------------------------------------------------------------:|:----------------------------------:|:--------:|---------------------------|:----------------------------------:|:----------------------------------:|
| `off`                                                         |     ❌                              | Disabled | Not set by Pantheon       |         ❌                          |    ❌                              |
| `transitional` (default)                                      | <span style="color:green">✔</span> | Enforced | `max-age=300`             |         ❌                          |    ❌                              |
| `transitional+subdomains`                                     | <span style="color:green">✔</span> | Enforced | `max-age=300`             | <span style="color:green">✔</span> |    ❌                              |
| `full` <Popover content="Needed for an A+ SSL Labs Rating" /> | <span style="color:green">✔</span> | Enforced | `max-age=31622400`        |         ❌                          |    ❌                              |
| `full+subdomains` <Popover content="This is the recommended and most secure configuration" /> | <span style="color:green">✔</span> | Enforced | `max-age=31622400` | <span style="color:green">✔</span> | <span style="color:green">✔</span> <Popover content="HTTP will be forcefully redirected to HTTPS by the browser." /> |

For example, to set `enforce_https` as `off`:

```yaml
enforce_https: off
```

**Considerations**
- Use of `full` or `full+subdomains` should be treated as a commitment. HSTS headers are cached by browsers for the duration of the max-age period. If your site is unable to serve HTTPS (e.g. by moving to a host that doesn't support HTTPS), visitors will be unable to access your site.
- Any option with `+subdomains` should only be used if you want to enforce HTTPS for *all subdomains, even those not connected to Pantheon*.
- To prepare your site to serve all content via HTTPS, follow the [Switching Sites from HTTP to HTTPS](/http-to-https/) doc.
