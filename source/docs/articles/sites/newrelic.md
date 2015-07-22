---
title: New Relic
description: Learn about the New Relic tool in your Pantheon Website Management Platform dashboard
category:
- developing
keywords: new relic,
---
[New Relic](http://newrelic.com) offers a wide array of metrics that provide a nearly real-time look into the performance of a web application.

Using New Relic on Pantheon not only makes it easy for you to monitor to your performance, but it can also speed-up the support process by helping out support team visualize corresponding performance and symptoms.

##Enabling New Relic
Enable New Relic on your Pantheon site by clicking **Settings** in the upper-right corner of your Site Dashboard. Go to the Add Ons tab, and click **Add** next to New Relic.
![New Relic Add On](/source/docs/assets/images/new-relic-add-on-image.png)

## Remove Multidev Environments in New Relic
The applications are added automatically, but after deletion, you'll need to manually [remove them in New Relic](https://docs.newrelic.com/docs/apm/new-relic-apm/maintenance/remove-applications-servers).  

1. From your Dashboard, select the **New Relic** tab, and **Open New Relic**.  
  * To delete an app: From the New Relic menu bar, select **APM** > **Applications**.  
  * To delete a server: From the New Relic menu bar, select **Servers** > **Servers**.
2. Wait until the color-coded health status to turn gray, then select the app's or server's gear icon.
3. Select **Delete app** from New Relic APM or **Delete server** from New Relic Servers, and then select the confirmation button.

![Remove New Relic](/source/docs/assets/images/remove-new-relic.png)

##See Also
- [New Relic Performance Analysis on Pantheon](/docs/articles/sites/newrelic/new-relic-performance-analysis/)  
- [MySQL Troubleshooting With New Relic Pro](/docs/articles/sites/newrelic/mysql-troubleshooting-with-new-relic-pro/)
