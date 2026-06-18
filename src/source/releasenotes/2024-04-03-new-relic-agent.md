---
title: Upcoming New Relic PHP Agent update changes Drupal hooks default behavior [Action Required]
published_date: "2024-04-03"
categories: [action-required, tools-apis]
---

We are thrilled to announce that on April 23, 2024, we will upgrade the New Relic PHP agent to the latest version (v10.19.0.9). This update is part of our ongoing commitment to enhancing your experience with Pantheon and ensuring that our offerings meet your evolving needs.

By staying up-to-date with the latest agent, you will benefit from improved performance and enhanced troubleshooting capabilities for your WordPress and Drupal instances. This means smoother experiences for your site visitors and more efficient workflows for you. This new version also fully supports PHP 8.3, providing you with the latest features and compatibility.

[Learn More about New Relic®](https://docs.pantheon.io/guides/new-relic), real-time performance monitoring for your Pantheon web applications. 

## Action Required: Default behavior of New Relic Drupal Hooks is changing

After the release of this agent update, Pantheon will no longer support Drupal Hooks reporting by default. However, the functionality is still available. If this is crucial for troubleshooting your sites, please add these lines to your site’s `pantheon.yml` file to enable this reporting:

```
new_relic:
  drupal_hooks: true
```

The parameter above will take effect when the New Relic PHP agent is updated for your site.

If your site currently reports Drupal Hooks information to New Relic, you will need to add the above line to your `pantheon.yml` file before the April 23 update to maintain this reporting moving forward. 

Our support team is happy to help if you have any questions or need assistance.
