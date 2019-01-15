---
title: New Site Plans FAQs
description: Find answers to common questions related to Pantheon's new site plans and pricing changes.
tags: [billing]
categories: []
searchboost: 70
---
## Impacted Sites
New plans and pricing will impact new and existing sites purchased online via the Site Dashboard. Plan changes described on this page do not affect annual contract customers such as EDU+, Enterprise, Pantheon One, Elites and Resellers.

For more information on the announcement of new plans, see [this related blog post](https://pantheon.io/blog/announcing-new-online-site-plans){.external}.

## List and Preferred Pricing
<dl>
  <dt>List Price</dt>
    <dd>Set price for new sites created after November 15, 2018 that aren’t purchased via a qualified agency partner.</dd>
  <dt>Preferred Price</dt>
    <dd>Introductory price available to the general public until November 15, 2018, after which it will be exclusively available via qualified <a href="https://pantheon.io/agencies/partner-program" data-proofer-ignore>Agency Partners</a>. Visit our <a href="https://pantheon.io/plans/agency-preferred-pricing" data-proofer-ignore>Preferred Pricing page</a> for more information.</dd>
</dl>

| Plan                 | Preferred Price | List Price  |
| -------------------- | --------------- | ----------- |
| Basic                | $35             | $50         |
| Performance (Small)  | $125            | $175        |
| Performance (Medium) | $225            | $300        |
| Performance (Large)  | $450            | $600        |
| Performance (XL)     | $750            | $1,000      |

### Annual Billing
Pantheon offers [annual billing plans at lower rates](/docs/annual-billing/), giving up to two month's worth of savings.

| Plan                 | Preferred Annual Price | Annual Savings  |
| -------------------- | ---------------------- | --------------- |
| Basic                | $350                   | $70             |
| Performance (Small)  | $1375                  | $125            |
| Performance (Medium) | $2475                  | $225            |
| Performance (Large)  | $4950                  | $450            |
| Performance (XL)     | $8250                  | $750            |

## Frequently Asked Questions

### How do I get Preferred Pricing?
For sites purchased before August 1, 2018, Preferred Pricing will be locked in as long as the site remains on that plan. Otherwise, Preferred Pricing is available for sites purchased through a qualified agency partner.

### When will prices change for existing sites?
During the month of August, 2018, sites on legacy plans were automatically switched to a new equivalent plan. All sites switched over should have retained Preferred Pricing for the new plan for as long as they remain on that plan.

### What new plan did my existing site migrate to in August?
All existing sites will have Preferred Pricing locked in for the plan they migrate to, and will retain the preferred price as long as they stay on that plan.

| Legacy Plan | New Plan            | Preferred Price  |
| ------------| --------------------| ---------------- |
| Personal    | Basic               | $35              |
| Pro         | Performance (Small) | $125             |
| Business    | Performance (Large) | $450             |
| Business XL | Performance (XL)    | $750             |


<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p markdown="1">Sites retaining [Legacy SSL](/docs/https/#technical-specifications) services will be migrated to Performance Large plans or above.</p>
</div>

### Are legacy plans still available?
No new sites can be created on legacy plans outside of existing contracted agreements. The legacy plans are no longer available for purchase online.

### Will I be able to keep Preferred Pricing after November?
All existing sites as of early November (legacy & new) will lock in Preferred Pricing, regardless of whether they are associated with a qualified agency partner.

In late November all new online site plan purchases will be at list price unless purchased through a qualified agency.

### What action do I need to take on existing sites?
No action is required. Existing sites will automatically switch to the equivalent plan with Preferred Pricing locked in August. There is no downtime or maintenance window associated with this change.

### What are the resource comparisons between new and legacy plans?
<!-- Nav tabs -->
<ul class="nav nav-tabs" role="tablist">
  <!-- Active tab -->
  <li id="personal-id" role="presentation" class="active"><a href="#personal" aria-controls="basic-anchor" role="tab" data-toggle="tab">Personal</a></li>

  <!-- 2nd Tab Nav -->
  <li id="professional-id" role="presentation"><a href="#professional" aria-controls="professional" role="tab" data-toggle="tab">Professional</a></li>

  <!-- 3rd Tab Nav -->
  <li id="business-id" role="presentation"><a href="#business" aria-controls="business" role="tab" data-toggle="tab">Business</a></li>
</ul>

<!-- Tab panes -->
<div class="tab-content">
  <!-- Active pane content -->
  <div role="tabpanel" class="tab-pane active" id="personal" markdown="1">
  |                        | Personal (Legacy) | Basic (New)  |
  | ---------------------- | ----------------- | ------------ |
  | Application Containers |        1          |      1       |
  | PHP Workers            |        4          |      4       |
  | PHP Memory Limit       |      256MB        |    256MB     |
  | Storage                |       5GB	       |     20GB     |
  | Custom Domain Limit (per site) <a class="pop" rel="popover" data-proofer-ignore data-toggle="popover" data-html="true" data-content="For details, see <a href='/docs/domains/#custom-domains'>Domains and Redirects</a>."><em class="fa fa-info-circle"></em></a>   | 5 | 5 |
  | Free and managed HTTPS <a class="pop" rel="popover" data-proofer-ignore data-toggle="popover" data-html="true" data-content="For details, see <a href='/docs/https/'>HTTPS on Pantheon's Global CDN</a>."><em class="fa fa-info-circle"></em></a>                   | <span style="color:green">✔</span> | <span style="color:green">✔</span> |
  | New Relic <a class="pop" rel="popover" data-proofer-ignore data-toggle="popover" data-html="true" data-content="For details, see <a href='/docs/new-relic/'>New Relic APM Pro</a>."><em class="fa fa-info-circle"></em></a>                                         | <span style="color:green">✔</span> | <span style="color:red">❌</span> |
  | Redis <a class="pop" rel="popover" data-proofer-ignore data-toggle="popover" data-html="true" data-content="For details, see <a href='/docs/redis/'>Installing Redis on Drupal or WordPress</a>."><em class="fa fa-info-circle"></em></a>                           | <span style="color:red">❌</span> | <span style="color:red">❌</span> |
  | Solr <a class="pop" rel="popover" data-proofer-ignore data-toggle="popover" data-html="true" data-content="For details, see <a href='/docs/solr/'>Apache Solr on Pantheon</a>."><em class="fa fa-info-circle"></em></a>                                             | <span style="color:red">❌</span> | <span style="color:red">❌</span> |
  | Multidev <a class="pop" rel="popover" data-proofer-ignore data-toggle="popover" data-html="true" data-content="<a href='/docs/multidev/'>Multidev</a> is available to all Enterprise organizations, EDU organizations, Pantheon Partners, and Direct Online customers with Gold support."><em class="fa fa-info-circle"> | <span style="color:red">❌</span> | <span style="color:red">❌</span> |
  </div>

  <!-- 2nd pane content -->
  <div role="tabpanel" class="tab-pane" id="professional" markdown="1">
  |                        | Professional (Legacy) | Performance Small (New)  |
  | ---------------------- | --------------------- | ------------------------ |
  | Application Containers |          1            |            1             |
  | PHP Workers            |          8            |            8             |
  | PHP Memory Limit       |         256MB         |          256MB           |
  | Storage                |         20GB          |          30GB            |
  | Custom Domain Limit (per site) <a class="pop" rel="popover" data-proofer-ignore data-toggle="popover" data-html="true" data-content="For details, see <a href='/docs/domains/#custom-domains'>Domains and Redirects</a>."><em class="fa fa-info-circle"></em></a>| 25 | 10 |
  | Free and managed HTTPS <a class="pop" rel="popover" data-proofer-ignore data-toggle="popover" data-html="true" data-content="For details, see <a href='/docs/https/'>HTTPS on Pantheon's Global CDN</a>."><em class="fa fa-info-circle"></em></a>                | <span style="color:green">✔</span> | <span style="color:green">✔</span> |
  | New Relic <a class="pop" rel="popover" data-proofer-ignore data-toggle="popover" data-html="true" data-content="For details, see <a href='/docs/new-relic/'>New Relic APM Pro</a>."><em class="fa fa-info-circle"></em></a>                                      | <span style="color:green">✔</span> | <span style="color:green">✔</span> |
  | Redis <a class="pop" rel="popover" data-proofer-ignore data-toggle="popover" data-html="true" data-content="For details, see <a href='/docs/redis/'>Installing Redis on Drupal or WordPress</a>."><em class="fa fa-info-circle"></em></a>                        | <span style="color:green">✔</span> | <span style="color:green">✔</span> |
  | Solr <a class="pop" rel="popover" data-proofer-ignore data-toggle="popover" data-html="true" data-content="For details, see <a href='/docs/solr/'>Apache Solr on Pantheon</a>."><em class="fa fa-info-circle"></em></a>                                          | <span style="color:green">✔</span> | <span style="color:green">✔</span> |
  | Multidev <a class="pop" rel="popover" data-proofer-ignore data-toggle="popover" data-html="true" data-content="<a href='/docs/multidev/'>Multidev</a> is available to all Enterprise organizations, EDU organizations, Pantheon Partners, and Direct Online customers with Gold support."><em class="fa fa-info-circle">| <span style="color:red">❌</span> | <span style="color:red">❌</span> |
  </div>

  <!-- 3rd pane content -->
  <div role="tabpanel" class="tab-pane" id="business" markdown="1">
  |                        | Business (Legacy)     | Performance Large (New)  |
  | ---------------------- | --------------------- | ------------------------ |
  | Application Containers |           2           |           3              |
  | PHP Workers            |           16          |          24              |
  | PHP Memory Limit       |         512MB         |         512MB            |
  | Storage                |         30GB          |         100GB            |
  | Custom Domain Limit (per site) <a class="pop" rel="popover" data-proofer-ignore data-toggle="popover" data-html="true" data-content="For details, see <a href='/docs/domains/#custom-domains'>Domains and Redirects</a>."><em class="fa fa-info-circle"></em></a>| 100 | 35 |
  | Free and managed HTTPS <a class="pop" rel="popover" data-proofer-ignore data-toggle="popover" data-html="true" data-content="For details, see <a href='/docs/https/'>HTTPS on Pantheon's Global CDN</a>."><em class="fa fa-info-circle"></em></a>                | <span style="color:green">✔</span> | <span style="color:green">✔</span> |
  | New Relic <a class="pop" rel="popover" data-proofer-ignore data-toggle="popover" data-html="true" data-content="For details, see <a href='/docs/new-relic/'>New Relic APM Pro</a>."><em class="fa fa-info-circle"></em></a>                                      | <span style="color:green">✔</span> | <span style="color:green">✔</span> |
  | Redis <a class="pop" rel="popover" data-proofer-ignore data-toggle="popover" data-html="true" data-content="For details, see <a href='/docs/redis/'>Installing Redis on Drupal or WordPress</a>."><em class="fa fa-info-circle"></em></a>                        | <span style="color:green">✔</span> | <span style="color:green">✔</span> |
  | Solr <a class="pop" rel="popover" data-proofer-ignore data-toggle="popover" data-html="true" data-content="For details, see <a href='/docs/solr/'>Apache Solr on Pantheon</a>."><em class="fa fa-info-circle"></em></a>                                          | <span style="color:green">✔</span> | <span style="color:green">✔</span> |
  | Multidev <a class="pop" rel="popover" data-proofer-ignore data-toggle="popover" data-html="true" data-content="<a href='/docs/multidev/'>Multidev</a> is available to all Enterprise organizations, EDU organizations, Pantheon Partners, and Direct Online customers with Gold support."><em class="fa fa-info-circle">| <span style="color:green">✔</span> | <span style="color:red">❌</span> |
  </div>
</div>

<div class="alert alert-info" role="alert">
  <h4 class="info">Note</h4>
  <p markdown="1">If the number of custom domains on a site exceeds that allowed by the new site plan, the site will be migrated to the next largest site plan that matches the number of custom domains used.</p>
</div>

### Am I going to lose New Relic?
Basic site plans will not have access to New Relic. If you are using New Relic on a Personal plan currently, you will lose access when your site plan migrates to a Basic plan on your monthly billing date, on or after August 1st.

If you upgrade to a Performance plan before August 1st, you will keep New Relic access and lock in Preferred Pricing.

### Why are you removing New Relic access from the Basic plan?
The Basic plan is aimed at use cases concerned primarily with getting page caching working, and those sites without any high-performance goals that New Relic can help debug. If you have performance goals for your site, you should consider a Performance plan of the appropriate size.

### Will I lose Multidev?
New plans do not impact feature access for Multidev. If you have it now, you'll continue to have it on the new plans.

### As an agency, how am I affected by these plan changes?
Our new pricing and packaging was built with agencies in mind. All of your client sites will get Preferred Pricing locked in automatically on August 1st, so there’s no need to worry about your current sites.

After August 1st, Preferred Pricing will only be available via qualifying agency partners, providing clear value for purchasing a Pantheon site plan via an agency. Stay tuned for details on our soon-to-be announced Partner Program.

### As a contract customer, how am I affected by these plan changes?
Current contract customers such as EDU+, Enterprise, Pantheon One, Elites and Resellers are not affected. Stay tuned for details on our soon-to-be announced Partner Program.

### Is Elite Pricing changing in any way?
No. These new pricing changes only affect online site plans (previously named Personal, Professional, and Business). If you have a contract with Pantheon, your contract will not change.

### Can I host more than one site on an individual plan?
No. Each online site plan is tied to a single install of the CMS.

### Does Pantheon offer discounting for buying sites in bulk?
Yes. If you are interested in bulk pricing, [Contact our sales team](https://pantheon.io/contact-us?docsplanFAQ){.external} or your dedicated account manager to discuss.

### How do I purchase one of the new plans?
For details, see [Manage Plans in the Site Dashboard](/docs/site-plan/).

## See Also
- [Manage Plans in the Site Dashboard](/docs/site-plan/)
- [Traffic Limits and Overages](/docs/traffic-limits/)
- [Metrics in the Site Dashboard](/docs/metrics/)
