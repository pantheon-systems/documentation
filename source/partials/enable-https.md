<h2>Provision HTTPS</h2>
<p>
The process to provision certificates kicks off automatically after the domain has been successfully routed to Pantheon, indicated by the following notice:
</p>

<blockquote class="block-info">
<h3 class="info">HTTPS</h3>
<span class="glyphicons glyphicons-history text-info"></span> Your DNS configuration is correct, and certificate provisioning is queued to start for this domain.</blockquote>


Both the bare domain and the <code>www</code> domain will be accessible over HTTPS once the HTTPS status turns green (which may take up to an hour):

<blockquote class="block-success">
<h3 class="info">HTTPS</h3>
<span class="glyphicons glyphicons-ok text-success"></span> Let’s Encrypt certificate deployed to Pantheon’s Global CDN. Certificate renews automatically with no additional cost.</blockquote>

