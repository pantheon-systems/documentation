---
title: Going Live
subtitle: Upgrade Site Plan
layout: guide
anchorid: plans
golive: true
generator: pagination
pagination:
    provider: data.goinglivepages
use:
    - goinglivepages
permalink: docs/guides/going-live/plans/
nexturl: guides/going-live/domains-https/
nextpage: Domains & HTTPS
previousurl: guides/going-live/
previouspage: Introduction
editpath: going-live/02-plans.md
---
The first step to launching your site on Pantheon is to upgrade from a free Sandbox service level to a paid plan. Once the site has been upgraded, you'll have access to features like Custom Domains and Free & Automated HTTPS.

You can either invite a business owner to pay or you can use your own credit card to pay for the monthly subscription:

<!-- Nav tabs -->
<ul class="nav nav-tabs" role="tablist">
  <li class="active" role="presentation"><a href="#selfpay" aria-controls="selfpay" role="tab" data-toggle="tab">Use Your Own Card</a></li>
  <li role="presentation"><a href="#invite" aria-controls="invite" role="tab" data-toggle="tab">Invite a Business Owner to Pay</a></li>
</ul>

<!-- Tab panes -->
<div class="tab-content">
  <div role="tabpanel" class="tab-pane active" id="selfpay">
    <div markdown="1">
      If you plan to pay for the site or if you want to wait to transfer ownership, you can skip the invite process and add your own payment method to the site.

      1. From the Site Dashboard, click **<span class="glyphicons glyphicons-cogwheel"></span> Settings**.
      2. Go to the **Billing** tab and select a payment method, then click **Update Payment Method**. You can add a new card or choose from cards already associated with your User account.
      3. Select the desired service level from the **Plan** tab, then click **Update Plan**.

        As the site owner, you will receive an email confirming the change to the site. After the site billing is processed, you will receive an updated invoice.
    </div>
  </div>
  <div role="tabpanel" class="tab-pane" id="invite">
    <div markdown="1">
      This is the most common way agencies handle billing. The invitation will guide the recipient through adding their payment method to the site for the designated service level.

      The user who pays for the site is the owner thereafter. Agencies maintain access by being associated as a Supporting Organization.  

      <div class="alert alert-info">
      <h4 class="info">Note</h4>
      <p markdown="1">We recommend communicating with the business owner well in advance of sending the invitation. It's a good idea to have them notify you once they've upgraded so you can continue the going live procedure. Feel free to share the [Site Owner FAQ](/docs/site-owner-faq/) guide with them.</p>
      </div>


      1. From the Site Dashboard, click **<span class="glyphicons glyphicons-cogwheel"></span> Settings**:

        ![Invite a business owner to pay](/source/docs/assets/images/dashboard/invite-business-owner.png)

      2. Click **Invite a business owner to pay for this site**.
      3. Enter the intended site owner’s email and select the desired plan.

        The business user will get an email that directs them to create a Pantheon account or to sign into an existing account. Once they've logged in, they'll need to provide their contact and billing info:

        ![Payment invite form](/source/docs/assets/images/dashboard/payment-form-invite.png)

      4. Ask the new site owner to add your agency as a [Supporting Organization](/docs/team-management/#add-a-supporting-organization) so you can continue the going live procedure on their behalf.
    </div>
  </div>
</div>

<div class="panel panel-drop panel-guide" id="accordion">
  <div class="panel-heading panel-drop-heading">
    <a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#host-specific1"><h3 class="panel-title panel-drop-title" style="cursor:pointer;"><i class="fa fa-graduation-cap" style="line-height:.9"></i> Level Up: Load and Performance Test (Optional)</h3></a>
  </div>
  <div id="host-specific1" class="collapse" style="padding:10px;">
    <div markdown="1">
## Ready to launch like the pros?
Now that you've upgraded your site's service plan, it's the perfect time to run some tests to see how things play in the wild.

### [Activate New Relic Pro](/docs/new-relic/#activate-new-relic-apm-pro)
In preparation for these tests, you'll want to activate New Relic APM Pro so you can observe your site's performance like a maverick. This free service is bundled in the Site Dashboard and offers a nearly real-time look into the performance of a web application.

### [Performance Testing](/docs/load-and-performance-testing/#performance-testing)
Measure your site's response time to proactively expose bottlenecks. We recommend running performance tests before you run load tests.

### [Load Testing](/docs/load-and-performance-testing/#load-testing)
Make sure your site can withstand peak traffic spikes after launch. This test should be done on the Live environment before the site has launched, after performance testing.
    </div>
  </div>
</div>
