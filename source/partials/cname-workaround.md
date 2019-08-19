###  CNAME Record Workaround

If your domain's DNS configuration relies on an existing MX or TXT record that intentionally disallows CNAME records, you'll need to use `A` and `AAAA` records to configure DNS for subdomains (e.g., `www.example.com`) instead of CNAMEs.


<Alert title="Note" type="info">

Replace `live-example.pantheonsite.io` in the following URLs with the target environment's [platform domain](/domains/#platform-domains).

</Alert>

1. Identify the required `A` record value by querying the target environment's platform domain using a free online tool, such as [https://www.whatsmydns.net/#A/live-example.pantheonsite.io](https://www.whatsmydns.net/#A/live-example.pantheonsite.io).

1. Do the same for the required `AAAA` values. For example, [https://www.whatsmydns.net/#AAAA/live-example.pantheonsite.io](https://www.whatsmydns.net/#AAAA/live-example.pantheonsite.io).

1. Log in to your DNS host and create two AAAA records and one A record for the desired subdomain (e.g., `www`) using the values returned in the steps above.
