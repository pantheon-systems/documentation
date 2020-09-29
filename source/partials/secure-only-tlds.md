<Accordion title="Google Top Level Domains and HSTS" id="google-tlds" icon="wrench">

In September 2017, Google [announced](https://security.googleblog.com/2017/09/broadening-hsts-to-secure-more-of-web.html) that is was planning to make [HSTS](/pantheon-yml/#enforce-https-+-hsts) preloading mandatory for the Top-Level Domains (**TLD**s) available exclusively through [Google Registry](https://www.registry.google/#!). That means that, moving forward, some TLDs will automatically redirect to HTTPS, and will be unable to load insecure sites or site pages. When selecting a domain to use as a custom or vanity domain, it's important to note the 45 TLDs that are subject to mandatory HSTS preloading:

```none
.gle .prod .docs .cal .soy .how .chrome .ads .mov .youtube .channel .nexus .goog
.boo .dad .drive .hangout .new .eat .app .moto .ing .meme .here .zip .guge .car
.foo .day .dev .play .gmail .fly .gbiz .rsvp .android .map .page .google .dclk
.search .prof .phd .esq .みんな .谷歌 .グーグル
```

When using one of the above domains as a vanity domain, keep in mind that every environment domain must have HTTPS provisioned or that environment's domain will be inaccessible. Because Pantheon doesn't provision HTTPS for vanity domains, this will need to be set up and managed using a [custom certificate](/custom-certificates). You should also keep in mind that any Multidev environments created using a secure only TLD will need to have HTTPS provisioned before the site domain will work.

When using one of the above TLDs as a custom domain for your site, Pantheon will provision the necessary certificates if you are using Pantheon's automated Global CDN. If the site is using a custom certificate, then each custom domain needs to have the certificate provisioned by the 3rd party used to manage HTTPS for the site.

</Accordion>
