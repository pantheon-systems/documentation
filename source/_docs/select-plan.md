---
title: Selecting a Plan
description: Learn the various Pantheon plans offered for your Drupal or WordPress sites.
tags: [getstarted]
categories: [getstarted]
---
Pantheon offers multiple service levels, called [Plans](/pricing). You can select the plan that works best for you and your needs. In the beginning, you can start on the Personal Plan. Then once you start to grow and have more specific requirements, take a look at the Professional Plan, which can be part of the recipe to get your site or application to scale and perform better.

<div class="alert alert-info" role="alert">
<h3 class="info">Note</h3>
<p>Only the Site Owner, or if the site is owned by an Organization - the Organization's Administrators, can change the Site's Plan. If you are not the owner, you will not see the options discussed below.</p></div>

To get started, select the site you would like to associate with a plan.

## Choose a Plan and Add a Payment Method
<ol>
<li>From the Site Dashboard, select <b>Settings</b>, and click to add a credit card to the site. <br\>
<ul><li>You may add a new card or, if you have cards already associated with your account, you an select an existing card.</li>
<li>Be certain the Credit Card option you would like is selected, and click Update Payment Method </li></ul></li>
<li>Once this is done, in <b>Settings</b> go back to the <b>Plan</b> tab and select the plan level of your choice, confirming your choice by clicking <b>Update Plan</b>.</li>
<li>As the site owner, you will receive an email confirming the change to the site.</li>
<li>Once the inital site billing is processed, you will receive an updated invoice.</li>
</ol>

<!--![Select a plan from dashboard](/source/docs/assets/images/select-a-plan-and-billing.png)-->  

## Go Live
Now that you have selected a plan, continue the process of going live by [setting up a domain on your site](/docs/going-live).

## View Your Site's Plan

Identifying your site's service level is quick and easy. You can find this in the green label next your site's name.

![confirm new plan](/source/docs/assets/images/dashboard/confirm-plan-dashboard.png)

## Adjusting Your Site's Plan

You can upgrade _or downgrade_ your Pantheon site at any time from the Site Dashboard, under **Settings**.
The changes are immediate, and will not affect your site's availability. 

If you are the site owner, select the new site plan level and click Update Plan for the change to take effect.

![update site plan](/source/docs/assets/images/owner-update-site-plan.png)

If the site is owned by your Organization, select the new site plan from the dropdown and click the Update Plan button for the change to take effect.

![update site plan for Org Site](/source/docs/assets/images/org-update-site-plan.png)

You, or if the site is owned by an Organization, the Organization Administrators, will receive an email confirming the change.

### Downgrading to Sandbox 
Downgrading your site back to Sandbox takes the site offline and prevents any future billing on the site.

If you downgrade from a paid plan to Sandbox: <ul>
<li><p>the <a href="/docs/domains">domains</a> you've added in your Live environment will be removed. You will need to re-add domains if you decide to return to a paid plan.</p></li>
<li><p>any <a href="/docs/enable-https">SSL Certificates</a> that you may have uploaded will be removed. You will need to re-upload your certificate, intermediary certs, and your key if you decide to upgrade and enable HTTPS again.</p></li>
<li><p>a prorated credit will be issued to your billing account.</p></li>
</ul>

### Downgrading from Business
If you have HTTPS enabled on your site, it will be disabled. 
Any <a href="/docs/enable-https">SSL Certificates</a> that you may have uploaded will be removed. You will need to re-upload your certificate, intermediary certs, and your key if you decide to upgrade and enable HTTPS again.
<div class="alert alert-danger" role="alert">
<h3 class="info">Warning</h3>
<p>You <b>MUST</b> update your DNS records after downgrading to Professional or Personal plans.</p>
<p>Your DNS recommendations are available on the Site Dashboard, under Domains.</p></div>
You will also no longer have the ability to [create new support tickets for your site](/docs/getting-support/). 
You will retain access to your past tickets and will be able to [contact Support](/docs/getting-support/) via Chat.


## Manage Site Settings

After you get to your site's Dashboard, click the **Settings** link in the upper-right corner. This is where you can select add-ons and see your current PHP version. For more information, read more about [The Site Dashboard](/docs/sites/#settings).
