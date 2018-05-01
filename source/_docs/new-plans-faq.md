---
title: New Site Plans FAQs
description: Find answers to common questions related to Pantheon's new site plans and pricing changes.
tags: [billing]
categories: []
---
## Impacted Sites
New plans and pricing will impact new and existing sites purchased online via the Site Dashboard. Plan changes described on this page do not affect annual contract customers such as EDU+, Enterprise, Pantheon One, Elites and Resellers.

For more information on the announcement of new plans, see [this related blog post](https://pantheon.io/blog/announcing-new-online-site-plans){.external}.

## List and Preferred Pricing
<dl>
  <dt>List Price</dt>
    <dd>Set price for new sites created after June 28th that aren’t tied to an agency.</dd>
  <dt>Preferred Price</dt>
    <dd>Introductory price available to the general public until June 28th, after which it will be exclusively available via qualified agency partners.</dd>
</dl>

| Plan                 | Preferred Price | List Price  |
| -------------------- | --------------- | ----------- |
| Basic                | $35             | $50         |
| Performance (Small)  | $125            | $175        |
| Performance (Medium) | $225            | $300        |
| Performance (Large)  | $450            | $600        |
| Performance (XL)     | $750            | $1,000      |

## Frequently Asked Questions
### When will prices change for new sites?
New sites purchased between April 10th and June 28th will have preferred pricing. After June 28th, preferred pricing is reserved exclusively for new sites purchased through a qualified agency partner and otherwise purchased at list price.

### When will prices change for existing sites?
There will be no impact to the current plan on your existing sites before June 28th.

After June 28th the site will be automatically switched to the equivalent plan with preferred pricing locked in, retaining all features (with the exception of New Relic on Basic plans).

### Will my existing plan still be available?
Existing sites will remain on their current legacy plan until June 28th, at which point the site will be automatically switched over to a new plan. No new sites can be created on legacy plans.

### Will I be able to keep preferred pricing after June 28th?
All existing sites as of June 28th (legacy & new) will lock in preferred pricing in perpetuity (not just agencies). After June 28th, all new online site plan purchases will be at list price unless purchased through a qualified agency.

### What action do I need to take on existing sites?
No action is required. Existing sites will automatically switch to the equivalent plan with preferred pricing locked in on June 28th.

### What new plan will my existing site translate to on June 28th?

* Personal > Basic
* Professional > Performance (Small)
* Business > Performance (Large)

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
  | PHP Memory Limit       |      256MB        |    246MB     |
  | Storage                |       5GB	       |     20GB     |
  | Custom Domain Limit (per site) <a class="pop" rel="popover" data-proofer-ignore data-toggle="popover" data-html="true" data-content="For details, see <a href='/docs/domains/#custom-domains'>Domains and Redirects</a>."><em class="fa fa-info-circle"></em></a>|        5          |      3       |
  | Free and managed HTTPS <a class="pop" rel="popover" data-proofer-ignore data-toggle="popover" data-html="true" data-content="For details, see <a href='/docs/https/'>HTTPS on Pantheon's Global CDN</a>."><em class="fa fa-info-circle"></em></a> |     ✓              |       ✓       |
  | New Relic <a class="pop" rel="popover" data-proofer-ignore data-toggle="popover" data-html="true" data-content="For details, see <a href='/docs/new-relic/'>New Relic APM Pro</a>."><em class="fa fa-info-circle"></em></a> |          ✓         |               |
  | Redis <a class="pop" rel="popover" data-proofer-ignore data-toggle="popover" data-html="true" data-content="For details, see <a href='/docs/redis/'>Installing Redis on Drupal or WordPress</a>."><em class="fa fa-info-circle"></em></a>  |                   |              |
  | Multidev <a class="pop" rel="popover" data-proofer-ignore data-toggle="popover" data-html="true" data-content="All sites associated with an organization have access to <a href='/docs/multidev/'>Multidev</a>, regardless of plan."><em class="fa fa-info-circle"> |                   |              |
  </div>

  <!-- 2nd pane content -->
  <div role="tabpanel" class="tab-pane" id="professional" markdown="1">
  |                        | Professional (Legacy) | Performance Small (New)  |
  | ---------------------- | --------------------- | ------------------------ |
  | Application Containers |          1            |            1             |
  | PHP Workers            |          8            |            8             |
  | PHP Memory Limit       |         256MB         |          512MB           |
  | Storage                |         20GB          |          30GB            |
  | Custom Domain Limit (per site) <a class="pop" rel="popover" data-proofer-ignore data-toggle="popover" data-html="true" data-content="For details, see <a href='/docs/domains/#custom-domains'>Domains and Redirects</a>."><em class="fa fa-info-circle"></em></a>|            25         |           5              |
  | Free and managed HTTPS <a class="pop" rel="popover" data-proofer-ignore data-toggle="popover" data-html="true" data-content="For details, see <a href='/docs/https/'>HTTPS on Pantheon's Global CDN</a>."><em class="fa fa-info-circle"></em></a> |          ✓             |            ✓             |
  | New Relic <a class="pop" rel="popover" data-proofer-ignore data-toggle="popover" data-html="true" data-content="For details, see <a href='/docs/new-relic/'>New Relic APM Pro</a>."><em class="fa fa-info-circle"></em></a> |             ✓ |           ✓              |
  | Redis <a class="pop" rel="popover" data-proofer-ignore data-toggle="popover" data-html="true" data-content="For details, see <a href='/docs/redis/'>Installing Redis on Drupal or WordPress</a>."><em class="fa fa-info-circle"></em></a>  |         ✓              |            ✓             |
  | Multidev <a class="pop" rel="popover" data-proofer-ignore data-toggle="popover" data-html="true" data-content="All sites associated with an organization have access to <a href='/docs/multidev/'>Multidev</a>, regardless of plan."><em class="fa fa-info-circle">|           ✓           |                          |
  </div>

  <!-- 3rd pane content -->
  <div role="tabpanel" class="tab-pane" id="business" markdown="1">
  |                        | Business (Legacy)     | Performance Large (New)  |
  | ---------------------- | --------------------- | ------------------------ |
  | Application Containers |           2           |           3              |
  | PHP Workers            |           8           |          24              |
  | PHP Memory Limit       |         512MB         |         512MB            |
  | Storage                |         30GB          |         100GB            |
  | Custom Domain Limit (per site) <a class="pop" rel="popover" data-proofer-ignore data-toggle="popover" data-html="true" data-content="For details, see <a href='/docs/domains/#custom-domains'>Domains and Redirects</a>."><em class="fa fa-info-circle"></em></a>|           100         |            25            |
  | Free and managed HTTPS <a class="pop" rel="popover" data-proofer-ignore data-toggle="popover" data-html="true" data-content="For details, see <a href='/docs/https/'>HTTPS on Pantheon's Global CDN</a>."><em class="fa fa-info-circle"></em></a> |          ✓             |            ✓           |
  | New Relic <a class="pop" rel="popover" data-proofer-ignore data-toggle="popover" data-html="true" data-content="For details, see <a href='/docs/new-relic/'>New Relic APM Pro</a>."><em class="fa fa-info-circle"></em></a> |              ✓         |            ✓             |
  | Redis <a class="pop" rel="popover" data-proofer-ignore data-toggle="popover" data-html="true" data-content="For details, see <a href='/docs/redis/'>Installing Redis on Drupal or WordPress</a>."><em class="fa fa-info-circle"></em></a>  |             ✓          |           ✓              |
  | Multidev <a class="pop" rel="popover" data-proofer-ignore data-toggle="popover" data-html="true" data-content="All sites associated with an organization have access to <a href='/docs/multidev/'>Multidev</a>, regardless of plan."><em class="fa fa-info-circle">|           ✓            |                          |
  </div>
</div>




### Am I going to lose New Relic?
Basic site plans will not have access to New Relic. If you are using New Relic on a Personal plan currently, you will lose access when your site plan migrates to a Basic plan on June 28th.

If you upgrade to a Performance plan before June 28th, you will keep New Relic access and lock in preferred pricing.

### Why are you removing New Relic access from the Basic plan?
The Basic plan is aimed at use cases concerned primarily with getting page caching working, and those sites without any high-performance goals that New Relic can help debug. If you have performance goals for your site, you should consider a Performance plan of the appropriate size.

### Will I lose Multidev?
New plans do not impact feature access for Multidev. If you have it now, you'll continue to have it on the new plans.

### As an agency, how am I affected by these plan changes?
Our new pricing and packaging was built with agencies in mind. All of your client sites will get preferred pricing locked in automatically on June 28th, so there’s no need to worry about your current sites.

After June 28th, preferred pricing will only be available via qualifying agency partners, providing clear value for purchasing a Pantheon site plan via an agency. Stay tuned for details on our soon-to-be announced Partner Program.

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
