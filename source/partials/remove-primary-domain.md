### Update or Remove Primary Domain

Update the Primary Domain using either method provided in [the previous section](#set-a-primary-domain-via-the-dashboard).

Remove an existing selection for the Primary Domain on any environment using [Terminus](/terminus):

```bash{promptUser: user}
terminus domain:primary:remove my-site.live
```

Replace `my-site` with your site name, and `live` with the environment you're removing a primary domain from.

#### Verify

You can confirm that the Primary Domain has been removed with cURL pointed at one of your other custom domains, which would previously have been redirected:

```bash{outputLines:2-15}
curl -I https://example.com
HTTP/2 301
retry-after: 0
server: Pantheon
location: https://www.example.com/
x-pantheon-redirect: primary-domain-policy-doc //highlight-line
date: Wed, 05 Feb 2020 16:43:21 GMT
x-served-by: cache-mdw17355-MDW
x-cache: HIT
x-cache-hits: 0
x-timer: S1580921002.586800,VS0,VE1
age: 0
accept-ranges: bytes
via: 1.1 varnish
content-length: 0
```

The presence of `x-pantheon-redirect: primary-domain-policy-doc` indicates that the domain is still being pointed at the former Primary Domain. [Contact support](/guides/support/contact-support/) if this value persists.