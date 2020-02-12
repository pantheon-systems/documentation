### Update or Remove Primary Domain

Update the Primary Domain using either method provided in [the previous section](#set-a-primary-domain-via-the-dashboard).

Remove an existing selection for the Primary Domain on any environment using [Terminus](/terminus):

```bash{promptUser: user}
terminus domain:primary:remove my-site.live
```

Replace `my-site` with your site name, and `live` with the environment you're removing a primary domain from.
