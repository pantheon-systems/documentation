---
title: WordPress (Composer Managed) is now in general availability
published_date: "2024-10-16"
categories: [new-feature, wordpress, documentation]
---

We are excited to announce that our [WordPress (Composer Managed)](https://github.com/pantheon-systems/wordpress-composer-managed) upstream is now in general availability. This means it is fully supported in production environments.

Historically we have provided multiple (sometimes conflicting) examples of how to use Composer with WordPress on Pantheon. This upstream unifies many of the best practices we have learned while leveraging [Roots/Bedrock](https://roots.io/bedrock/). Composer allows more fine-grained control over your site's dependencies (plugins, themes, and even WordPress core), places the power of who determines what components should be updated and when into the hands of the development teams that support it and simplifies your git repositories. We're excited to unlock this enhanced workflow for our WordPress customers.

**No action is required on your part.** You can use the WordPress (Composer Managed) upstream via Terminus or the site creation link in our [documentation](/guides/integrated-composer/create#wordpress-with-integrated-composer-and-bedrock). In a future update, you may also have the option to install a Composer-based version of WordPress directly from the Pantheon site dashboard.

Our [Integrated Composer documentation](/guides/integrated-composer) has been updated to include information about the WordPress (Composer Managed) upstream. All previous WordPress Composer documentation has been integrated into existing documentation and redirected for easier access.

As always, if you encounter any issues with the WordPress (Composer Managed) upstream, please [open an issue](https://github.com/pantheon-systems/wordpress-composer-managed/issues) on our GitHub repository or ask a question in our [Community Slack](https://slackin.pantheon.io/).
