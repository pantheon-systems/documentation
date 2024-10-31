---
title: WordPress (Composer Managed) is no longer in Early Access
published_date: "2024-10-31"
categories: [new-feature, wordpress, documentation]
---

We are excited to announce that our [WordPress (Composer Managed)](https://github.com/pantheon-systems/wordpress-composer-managed) upstream is no longer considered in [Early Access](/guides/support/early-access). It is now available as an open source upstream for our customers and the community at large. Issues and pull requests are welcome on the [GitHub development repository](https://github.com/pantheon-systems/wordpress-composer-managed).

Historically, we've provided multiple (and sometimes conflicting) examples of how to use Composer with WordPress on Pantheon. This upstream unifies many of the best practices we've learned by leveraging [Roots/Bedrock](https://roots.io/bedrock/) as a base for our architecture. Composer allows for more precise control over your site's dependencies - plugins, themes, and even WordPress core. It empowers development teams to decide which components to update and when, while also simplifying Git repositories. We're excited to unlock this enhanced workflow for our WordPress teams.

**No action is required on your part.** You can use the WordPress (Composer Managed) upstream via Terminus or the site creation link in our [documentation](/guides/integrated-composer/create#wordpress-with-integrated-composer-and-bedrock). In a future update, you may also have the option to install a Composer-based version of WordPress directly from the Pantheon site dashboard.

Our [Integrated Composer documentation](/guides/integrated-composer) has been updated to include information about the WordPress (Composer Managed) upstream. All previous WordPress Composer documentation has been integrated into existing documentation and redirected for easier access.

As always, if you encounter any issues with the WordPress (Composer Managed) upstream, please [open an issue](https://github.com/pantheon-systems/wordpress-composer-managed/issues) on our GitHub repository or ask a question in our [Community Slack](https://slackin.pantheon.io/).
