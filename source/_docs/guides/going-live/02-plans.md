---
title: Going Live
subtitle: Set Service Plan Level
layout: guide
anchorid: plans
golive: true
generator: pagination
pagination:
    provider: data.goinglivepages
use:
    - goinglivepages
permalink: docs/guides/going-live/plans/
nexturl: guides/going-live/domains/
nextpage: Connect a Domain
previousurl: guides/going-live/
previouspage: Introduction
editpath: going-live/02-plans.md
---
In this lesson, we’re going to set the service level, also referred to as paid subscription plan, for your website.  

<div class="panel panel-video panel-guide" id="accordion">
  <div class="panel-heading panel-video-heading">
    <a class="accordion-toggle panel-video-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#select-plan"><h3 class="panel-title panel-video-title" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-facetime-video"></span> Watch (Optional)</h3></a>
  </div>
  <div id="select-plan" class="collapse" style="padding:10px;">
    <script src="//fast.wistia.com/embed/medias/2wcmrvrwlw.jsonp" async></script><script src="//fast.wistia.com/assets/external/E-v1.js" async></script><div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><div class="wistia_embed wistia_async_2wcmrvrwlw videoFoam=true" style="height:100%;width:100%">&nbsp;</div></div></div>
  </div>
</div>


1. Determine who will pay for the site.

  * There are 2 different ways developers can enable payment for a monthly subscription plan for their site on Pantheon. You can either put your own credit card on file or invite a business owner or other stakeholder to pay for the site.  This is important to determine first since the person who pays for the site will be the site owner.  Changing billing information is the main way this ownership is transferred.  If you want to initially pay for the site yourself and later hand off billing, this is simple as well and uses the same process outlined below for inviting a site owner to pay.   

2. Entering your own billing info:

  * Go to the Site Dashboard and click ‘Settings’ in the upper right hand corner
  * Select ‘Billing’
  * Enter new credit card information or select a card already on file
  * Select ‘Plan’ from the ‘Settings’ menu
  * Select the plan and click Update plan level you want to purchase for this site

3. Inviting a site owner to pay - this is the most common way agencies handle billing.  It is a guided process which automatically sets the selected service level as part of process. Agency retains access via Supporting Organization

  * Go to the Site Dashboard and click ‘Settings’ in the upper right hand corner
  * Click on the dropdown labeled “Invite a business owner to pay for this site”
  * Enter the intended site owner’s email and select the intended plan level

    * The business user will get an email that first requires them to create a Pantheon User account and then enter their billing information in a guided process.  

<div class="alert alert-info">
<h4 class="info">Note</h4>
<p markdown="1">It is a good idea to have communicated with the business owner well in advance of this email and have them tell you when it is completed so you can continue with making the site live.  While the process is generally quick it is a great idea to get billing in place well before launch time.  
It is also best practice to share the [Site Owner FAQ](/docs/site-owner-faq/) guide with them.</p>
</div>
