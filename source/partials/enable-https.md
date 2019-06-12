<h2>Provision HTTPS</h2>
<p>
The process to provision certificates kicks off automatically after the domain has been successfully routed to Pantheon, indicated by the following notice:
</p>
{% include("content/notes/https-info.html")%}

Both the bare domain and the <code>www</code> domain will be accessible over HTTPS once the HTTPS status turns green (which may take up to an hour):

{% include("content/notes/https-success.html")%}
