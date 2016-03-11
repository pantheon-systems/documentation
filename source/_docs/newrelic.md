---
title: New Relic
description: Learn about the New Relic tool in your Pantheon Website Management Platform dashboard
categories:
- developing
keywords: new relic,
---
[New Relic](http://newrelic.com) offers a wide array of metrics that provide a nearly real-time look into the performance of a web application.

Using New Relic on Pantheon not only makes it easy for you to monitor to your performance, but it can also speed-up the support process by helping out support team visualize corresponding performance and symptoms.

##Enabling New Relic
Enable New Relic on your Pantheon site by clicking **Settings** in the upper-right corner of your Site Dashboard. Go to the Add Ons tab, and click **Add** next to New Relic.
![New Relic Add On](/source/assets/images/new-relic-add-on-image.png)

For two weeks, you'll receive a trial of New Relic's Pro plan for the site. New relic monitoring is automatically enabled for all application servers added to the site, including Multidev environments.

## Remove Multidev Environments in New Relic
After deleting a Multidev environment from your site, you'll need to manually [remove them in New Relic](https://docs.newrelic.com/docs/apm/new-relic-apm/maintenance/remove-applications-servers).  

1. From your Dashboard, select the **New Relic** tab, and **Open New Relic**.  
2. From the New Relic menu bar, select **APM** > **Applications**.  
3. Wait until the color-coded health status to turn gray, then select the app's gear icon.
4. Select **Delete app**, and click the confirmation button.

##See Also
- [New Relic Performance Analysis on Pantheon](/docs/new-relic-performance-analysis/)  
- [MySQL Troubleshooting With New Relic Pro](/docs/mysql-troubleshooting-with-new-relic-pro/)
