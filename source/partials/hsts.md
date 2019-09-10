<Alert title="Note" type="info">

Before adjusting `enforce_https`, review and understand the configuration options and all considerations to avoid unintended consequences.

</Alert>


|       Value                                          | Redirect                           |  HSTS Duration | HSTS for Subdomains                  | preload                            | Easily Reversible                            |
|:-------------------------------------------------------------:|:--------:|---------------------------|:----------------------------------:|:----------------------------------:|:----------------------------------:
| transitional                                               | <span style="color:green">✔</span> | 5 min             |                                  |                                  |
| transitional+subdomains                                     | <span style="color:green">✔</span> | 5 min             | <span style="color:green">✔</span> |                                  |
| full | <span style="color:green">✔</span> | &gt; 1 yr            |                  |                                                 |❌|
| full+subdomains <Popover content="This is the recommended and most secure configuration" /> | <span style="color:green">✔</span> | &gt; 1 yr | <span style="color:green">✔</span> | <span style="color:green">✔</span> | ❌ |

For example, to set `enforce_https` as `transitional`:

```yaml
enforce_https: transitional


```

Here is an example of a HSTS header sent with `full+subdomains`:
```

Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

**Considerations**
- Use of `full` or `full+subdomains` should be treated as a commitment. Once enabled, HSTS headers are cached by browsers for the duration of the max-age period (more than one year on Pantheon). If your site is unable to serve HTTPS after sending a long-duration HSTS header, visitors will be unable to access your site.
- Any option with `+subdomains` should only be used if you want to enforce HTTPS for *all subdomains, even those not connected to Pantheon*.
- To prevent mixed content follow the [Switching Sites from HTTP to HTTPS](/http-to-https/) doc.
