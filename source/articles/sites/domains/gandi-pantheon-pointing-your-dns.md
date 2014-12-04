---
title: Gandi & Pantheon: Pointing your DNS
parent_guide:
  - going-live

filename: source/_guides/gandi-pantheon-pointing-your-dns.md
---

 **NOTE:** This guide assumes you have already registered your domain through Gandi.net.
#### Your Domains

Gandi provides you with a nice, clean list of your domains. Click on the domain that you are interested in pointing to Pantheon.

 ![]()
#### Domain Configuration Page

The domain portal contains all relevant registration information for your domain. For pointing DNS, we are concerned with the DNS configuration section on the right.

In traditional webhosting, you could often times just point your domain name to your hosts nameservers and, after propagation, all would resolve as desired. Proper resolution for your Pantheon site depends on CNAMEs and A records. To configure these entries, you'll have to edit the DNS Zone Record. Click "Edit the Zone" to proceed to the configuration page.

 ![]() ![](https://pantheon-systems.desk.com/customer/portal/attachments/198816)​
#### Configuring Zone Records on Gandi

Gandi requires you to make a copy of your default Zone Record to ensure that you don't botch your default configuration. Click "Make New Version" to create a new version to edit.

Gandi has two edit modes: "Normal" and "Expert". For this tutorial, we'll be using "Expert" editing mode, which simply allows us to edit the Zone Record like a text file instead of inputting values into the Gandi fields and letting them do the formatting.

We are concerned with two lines here. The A record, which reads something to the tune of:

    @ 10800 IN A 217.70.184.38

And the www CNAME:

    www 10800 IN CNAME webredir.vip.gandi.net.

 

We will be pointing our A record to 50.56.49.247, as per the [Pantheon DNS document](/documentation/running-drupal/going-live-and-launching-your-site/#updating-DNS). You will need to change the A record line in the zone file to the following:

    @ 300 IN A 50.56.49.247

Change the www CNAME to match the following ( **NOTE:** Be sure to include the trailing "." . ):

    www 300 IN CNAME edge.live.getpantheon.com.

TO DO: -how to test with Dig -understanding and setting a TTL -Insert pics
