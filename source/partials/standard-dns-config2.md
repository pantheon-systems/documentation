<Accordion title="Standard DNS Configurations" id="dns-config2" icon="info-sign">

 Standard DNS configurations utilize the following:

  - Bare Domain (`example.com` or `@`):
      -  Two AAAA records pointing to unique IPv6 addresses
      -  One A record pointing to an IPv4 address
  -  Subdomain (`www`):
      -  One CNAME record pointing to the Live environment's platform domain (e.g. `live-site-name.pantheonsite.io`)

</Accordion>
