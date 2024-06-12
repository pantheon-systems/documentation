---
title: "Necessary updates to New Relic scripts in quicksilver-examples repository."
published_date: "2024-06-13"
categories: [tools-apis, action-required]
---

The internals of the integration between Pantheon and New Relic are changing due to some updates we should do on Pantheon's side to stay up-to-date with updates on New Relic side. These changes will be transparent for most of our users except:

- Those who are using [quicksilver](https://docs.pantheon.io/guides/quicksilver) to interact with New Relic API.

If you are using quicksilver, more specifically any of the 3 New Relic scripts in the [quicksilver-examples](https://github.com/pantheon-systems/quicksilver-examples) repository, then you should make some updates before [INSERT DATE HERE] for those scripts to keep working.

## Action Required: Get and store your user API key and update your scripts

The changes you need to do are described in the README.md file for each of the scripts; they basically are:

1) Login to New Relic from your site dashboard
1) Get a user key
1) Store that user key using [Terminus Secrets Manager plugin](https://github.com/pantheon-systems/terminus-secrets-manager-plugin)
1) Update the script to the new version (don't forget to change the secret name as needed!)
1) Push your changes to your repo
1) Test your scripts when you have a chance to make sure they are still working

Our support team is happy to help if you have any questions or need assistance.
