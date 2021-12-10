---
title: Determine Number of Concurrent Users in Google Analytics
description: A guide on determining concurrent users in GA for loadtest customers
categories: [performance]
tags: [measure, professional-services]
---

Pantheon offers [Pre-launch Load Testing](/guides/professional-services/onboarding#pre-launch-load-testing) to newly purchased Elite plans. For the Professional Services team to proceed with executing the load test, a [load test questionnaire form](https://implem.ps-pantheon.com/load-test/new) needs to be filled out with required information. The required information includes **Peak Page Views**, **Peak Sessions**, **Peak Users** and **Average Session Duration** which can be retrieved from your site's Google Analytics data.

This page will guide you on how to retrieve these information from your site's Google Analytics data.

1. [Login to Google Analytics account](https://analytics.google.com/analytics/web). If you are not the owner of the account, make sure that you have been invited or you have access first to the correct account as well as the correct views and property.

1. In the top left corner of the page, click the dropdown.
  
    ![loadtest-step-2](https://user-images.githubusercontent.com/38076987/145598557-fc677b69-78af-4f38-9ba9-c88f660050e2.png)

1. Find the correct Analytics Account, property and view of the site.

    ![loadtest-step-3](https://user-images.githubusercontent.com/38076987/145598652-f144a5f6-988c-4d3d-8ea6-0b76ce9e96c9.png)

1. Go to Audience > Overview.

    ![loadtest-step-4](https://user-images.githubusercontent.com/38076987/145598681-be70b798-4946-4c76-a0f2-052bcee5aab1.png)

1. Set the date filter to a year, set the metric filter to “Sessions“, set the range to “Day“. Then take note of the day with highest sessions. 

    ![loadtest-step-5](https://user-images.githubusercontent.com/38076987/145598717-0e259030-80fe-4808-a9c9-8ac61d1e0668.png)

1. Set the date filter to the day with the highest sessions from step #6. Set the range to “Hourly“. Find the highest peak.
	* **Average Session Duration**: Located below the chart.
	* **Peak Sessions**: Find the highest hourly peak.

    ![loadtest-step-6](https://user-images.githubusercontent.com/38076987/145598737-aca6989e-25c6-45f3-ad72-8b1dff4c947b.png)

1. Change the metric filter to “Users“. Set another metric filter (vs) to “Pageviews“. Then find again the highest peak and hover. You should already see the **Peak Users** and Peak **Pageviews**.

    ![loadtest-step-8](https://user-images.githubusercontent.com/38076987/145598772-0249a815-cbc5-4188-8ea2-eb398003ad1d.png)
