<Alert title="Note" type="info">

Before adjusting `enforce_https`, review and understand the configuration options and all considerations to avoid unintended consequences.

</Alert>

|       Value                                          | Redirect                           |   HSTS    | HSTS Duration | includeSubdomains                  | preload                            |
|:-------------------------------------------------------------:|:----------------------------------:|:--------:|---------------------------|:----------------------------------:|:----------------------------------:|
| off                                               |     ❌                             |  ❌  | ❌       |         ❌                         |    ❌                              |
| transitional                                                | <span style="color:green">✔</span> | <span style="color:green">✔</span> | 5 min             |         ❌                         |    ❌                              |
| transitional+subdomains                                     | <span style="color:green">✔</span> | <span style="color:green">✔</span> | 5 min             | <span style="color:green">✔</span> |    ❌                              |
| full <Popover content="Needed for an A+ SSL Labs Rating" /> | <span style="color:green">✔</span> | <span style="color:green">✔</span> | > 1 yr        |         ❌                         | <span style="color:green">✔</span> <Popover content="HTTP will be forcefully redirected to HTTPS by the browser." /> |
| `full+subdomains` <Popover content="This is the recommended and most secure configuration" /> | <span style="color:green">✔</span> | <span style="color:green">✔</span> | > 1yr | <span style="color:green">✔</span> | <span style="color:green">✔</span> <Popover content="HTTP will be forcefully redirected to HTTPS by the browser." /> |

For example, to set `enforce_https` as `transitional`:

```yaml
enforce_https: transitional
```
**Considerations**
- Use of `full` or `full+subdomains` should be treated as a commitment. Once enabled, HSTS headers are cached by browsers for the duration of the max-age period (more than one year on Pantheon). If your site is unable to serve HTTPS after sending a long-duration HSTS header, visitors will be unable to access your site.
- Any option with `+subdomains` should only be used if you want to enforce HTTPS for *all subdomains, even those not connected to Pantheon*.
  - If you are not sure that this is what you want, then you should select `enforce_https: transitional` instead, as this selection has no affect on subdomains, and has a limited (5 minute) HSTS duration.

- To prepare your site to serve all content via HTTPS, follow the [Switching Sites from HTTP to HTTPS](/http-to-https/) doc.
