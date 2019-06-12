<div class="panel panel-drop panel-guide" id="accordion">
<div class="panel-heading panel-drop-heading">
<a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#unique-anchor">
<h3 class="info panel-title panel-drop-title" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-wrench"></span> Google Top Level Domains & HSTS</h3>
</a>
</div>
<div id="unique-anchor" class="collapse" markdown="1" style="padding:10px;">
  <p>In September 2017, Google <a href="https://security.googleblog.com/2017/09/broadening-hsts-to-secure-more-of-web.html" class="external">announced</a> that is was planning to make <a href="/docs/hsts/">HSTS</a> preloading mandatory for the Top-Level Domains (<strong>TLD</strong>s) available exclusively through <a href="https://www.registry.google/#!/" class="external">Google Registry</a>. That means that, moving forward, some TLDs will automatically redirect to HTTPS, and will be unable to load insecure sites or site pages. When selecting a domain to use as a custom or vanity domain, it's important to note the 45 TLDs that are subject to mandatory HSTS preloading:</p>

<pre><code>.gle .prod .docs .cal .soy .how .chrome .ads .mov .youtube .channel .nexus .goog
.boo .dad .drive .hangout .new .eat .app .moto .ing .meme .here .zip .guge .car
.foo .day .dev .play .gmail .fly .gbiz .rsvp .android .map .page .google .dclk
.search .prof .phd .esq .みんな .谷歌 .グーグル</code></pre>

<p>When using one of the above domains as a vanity domain, keep in mind that every environment domain must have HTTPS provisioned or that environment's domain will be inaccessible. Because Pantheon doesn't provision HTTPS for vanity domains, this will need to be set up and managed using a <a href="/docs/custom-certificates/">custom certificate</a>. You should also keep in mind that any Multidev environments created using a secure only TLD will need to have HTTPS provisioned before the site domain will work.</p>

<p>When using one of the above TLDs as a custom domain for your site, Pantheon will provision the necessary certificates if you are using Pantheon's automated Global CDN. If the site is using a custom certificate, then each custom domain needs to have the certificate provisioned by the 3rd party used to manage HTTPS for the site.</p>
</div>
</div>
