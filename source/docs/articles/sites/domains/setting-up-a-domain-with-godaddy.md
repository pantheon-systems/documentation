---
title: Setting up a domain with GoDaddy
description: Learn how to point a new GoDaddy domain name to your Pantheon site.
category:
  - going-live
keywords: godaddy dns, dns records, point your domain, point godaddy domain to pantheon, pointing your godaddy domain to your pantheon site, godaddy dns host, godaddy dns configuration, add domain to a site, godaddy, point godaddy domain to pantheon, redirect godaddy domain to pantheon, godaddy domain dns
---
When you have searched for your domain name you can go ahead and add it to your cart. It is important to note that if you purchase more than one domain that you will be required to configure the A records or CNAME for each one.  
 ![Select your domin](/source/docs/assets/images/desk_images/49493.png)
## Domain Registration Info
To complete the checkout process you will need to create a user account if you do not have one. If you are already a GoDaddy customer, log into your account and proceed to the next step.  
 ![Login or Create your godaddy account](/source/docs/assets/images/desk_images/49494.png)
## Domain Settings
Make sure the domain name you are about to purchase is correct, then chooseTo continue you will need to read and accept the License by click the **Next** button.  
 ![Edit your domain settings](/source/docs/assets/images/desk_images/49495.png)
## Activate Your Domain (Optional)
In the event that you need to get email setup to work with your new domain you can select the option that works for you. Pantheon does not provide email hosting services so you will need to make sure to look at the option that best suits your needs.  
 ![Activate your domain](/source/docs/assets/images/desk_images/49496.png)
## Review Your Cart
This is the last time you will be able to make any corrections before you become the owner a brand new domain. You should review the cart to make sure everything is correct before you proceed.  
 ![Review your order](/source/docs/assets/images/desk_images/49497.png)
## Go to Your Account Page
After you complete the purchase process you can begin configuring your domain and you will be presented with the order summary. Click the **My Account** button that will take you to your global GoDaddy Account page.
 ![Sign in to your Godaddy account](/source/docs/assets/images/desk_images/49498.png)
#### Launch the Domain Control Panel
Now you can get to the next stage and click on the **Launch** button which will give you access to your GoDaddy domain control panel. We have instructions if you are using either the [Old](#old-dns-dashboard) or the [New](#new-dns-dashboard) versions of the DNS manager.  
 ![Launch your control panel](/source/docs/assets/images/desk_images/49499.png)  
### Old DNS dashboard
Click the name of the domain that you want to edit and this will take you to the domain manager.  
 ![](/source/docs/assets/images/desk_images/49521.png)  
Next you will see the Zone summary screen that will give you the information associated with this domain. Click on the **Launch** button to be taken to the GoDaddy Zone config tool.  
 ![Edit the DNS information](/source/docs/assets/images/desk_images/49502.png)
### New DNS Dashboard
If you are using the New Standard DNS dashboard you can click on the **Edit Zone** link which will take you directly to the GoDaddy Zone configuration tool.  
 ![DNS dashboard](/source/docs/assets/images/desk_images/49520.png)
#### Setting Up the Zone Record
The last step on GoDaddy is to make sure you have correctly setup your A record or CNAME for your domain. Make sure you have put in the I.P. address or the CNAME to point your domain to Pantheon. You can get more information about this on our [Going Live](/docs/articles/going-live/) documentation page. 
<div class="alert alert-warning" role="alert">
<strong>Note</strong>: If you have SSL enabled on your site, you have been given a unique I.P. address. This is the I.P. that you should point the A record to.</div>  
 ![Configure the A records](/source/docs/assets/images/desk_images/49503.png)  
### Add Your Domain to Pantheon

The final step is logging in to your site's dashboard and going to the Live environment's tab. Proceed by clicking the **Edit** button and enter you custom domain name for you site.  
 ![](/source/docs/assets/images/desk_images/49505.png)  
