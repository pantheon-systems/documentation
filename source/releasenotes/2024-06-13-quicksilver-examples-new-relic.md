---
title: "Necessary updates to New Relic scripts in quicksilver-examples repository"
published_date: "2024-06-13"
categories: [tools-apis, action-required]
---

The integration between Pantheon and New Relic is being updated to ensure compatibility with the latest changes from New Relic. These updates will be seamless for most users, except for those who are using [Quicksilver](https://docs.pantheon.io/guides/quicksilver) to interact with the New Relic API.

If you are using Quicksilver, particularly any of the three New Relic scripts in the [quicksilver-examples](https://github.com/pantheon-systems/quicksilver-examples) repository, please update your scripts by **June 20, 2024**, to ensure continued functionality.

## Action required: Get and store your user API key and update your scripts

The necessary updates are described in the README.md file for each script. The steps are:

1) Log in to the New Relic from your site dashboard.

2) Get a user key.

3) Store the user key using [Terminus Secrets Manager plugin](https://github.com/pantheon-systems/terminus-secrets-manager-plugin).

4) Update the script to the new version (don't forget to change the secret name as needed!).

5) Push your changes to your repo.

6) Test your scripts when you have a chance to ensure they are still working.

Our Support team is happy to help if you have any questions or need assistance.
