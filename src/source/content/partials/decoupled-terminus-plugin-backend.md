---
contenttype: [partial]
categories: []
cms: [drupal]
product: [front-end]
integration: []
tags: [--]
reviewed: ""
---

[Terminus](/terminus) is a command line interface that provides advanced interaction with Pantheon. You can create your project with the [Terminus Decoupled Kit Plugin](https://decoupledkit.pantheon.io/docs/backend-starters/terminus-decoupled-kit) if you prefer to work in the terminal.

The Terminus Decoupled Kit plugin provides commands useful for creating decoupled projects on Pantheon using pre-configured starter kits.

<Alert title="Note"  type="info" >

Note that the Terminus plugin creates your frontend codebase, but does not automatically deploy it to Pantheon. Deploy your frontend codebase to Pantheon using the [import repository workflow](/guides/decoupled/no-starter-kit/import-repo).

</Alert>

The steps in this section show how to use the Front-End Sites Terminus plugin to:

- Create a new site on Pantheon for the CMS backend of your choice.
- Optionally install your CMS.
- Create a frontend codebase that sources data from your newly created CMS project. This codebase will be automatically configured for local development, and can later be deployed to Pantheon using the import repository workflow.

Before you continue, make sure you have:

- Installed [Terminus](/terminus/install)
- Installed [Node.js](https://nodejs.org/en/download)
- Created a [Machine Token](/machine-tokens#create-a-machine-token)

1. Open your terminal and run the command below to install the Terminus Decoupled Kit plugin.

   ```bash{promptUser:user}
   terminus self:plugin:install pantheon-systems/terminus-decoupled-kit-plugin
   ```

   - You should see a message, such as `Installed pantheon-systems/terminus-decoupled-kit-plugin`

1. Run `terminus decoupled-kit:create`, updating `$SITE-NAME` and `$LABEL` with your own information, to create your project:

    ```bash{promptUser:user}
    terminus decoupled-kit:create $SITE-NAME $LABEL
    ```

    - Additional optional commands:

        - `--org[=ORG]`: Organization name, label, or ID.
        - `--region[=REGION]`: The region in which you want to create your site. Refer to the [Pantheon regions documentation](/regions) for more information.
        - `--cms[=CMS]`: This selects the CMS you want to use. Current supported CMS options are: `drupal` and `wordpress`.
        - `--install-cms[=INSTALL-CMS]`: This instructs the plugin to install your CMS or not. The default value is `true`. You can set this value to `false` if you do not want to install a CMS for your project.

1. When prompted, select the CMS you want to use. This option does not appear if you used the optional `--cms[=CMS]` command. The options should look similar to:

    ```bash{outputLine}
    Choose your CMS back-end:
    [0] Drupal-10
    [1] Drupal-9
    [2] WordPress
    ```

    - CMS installation will take several minutes. You should see a message similar to the following example to let you know your project is deploying:

      ```bash{outputLine}
      Creating a new site...
      [notice] Deploying CMS...
      ```

1. Enter your password when prompted and enter `y` to proceed:

    ```bash{outputLines}
    Now let's create your front-end project...
    [Exec] Running npm init pantheon-decoupled-kit@canary -- --cmsType d10 --cmsEndpoint=https://dev-donnerstag.pantheonsite.io
    Need to install the following packages:
    create-pantheon-decoupled-kit@0.9.2-canary.2
    Ok to proceed? (y)
    ```

1. Select the framework generator you want to use:

    ```bash{outputLines}
    Which generator(s) would you like to run? (Press <space> to select, <a> to toggle all, <i> to
    invert selection, and <enter> to proceed)
    ◯ next-drupal
    ◯ next-drupal-umami-addon
    ◯ tailwindcss-addon
    ◯ next-drupal-search-api-addon
    ```

1. Enter a name for your project:

    ```bash{outputLines}
    What is the name of your project?
    ```

1. Enter the location where you want your output to go. For example, `/Users/anitapantheon/anita-site/anita-portfolio`:

    ```bash{outputLines}
    Where should the output go?
    ```

1. Select if you want to include additional frameworks, such as Tailwind CSS:

    ```bash{outputLines}
    Would you like to include tailwindcss? (Y/n) selected y
    ```

1. Select if you want to continue with your selected changes. You will see a list of the changes you selected.

    ```bash{outputLines}
    Listing changes for /Users/anitapantheon/anitasite/anita-portfolio/.env.development.local:

    - BACKEND_URL=https://dev-anita-portfolio.pantheonsite.io
    - CLIENT_ID=
    - CLIENT_SECRET=
    - PREVIEW_SECRET=
    - #DEBUG_MODE=true
    ? About to overwrite /Users/anitapantheon/anitasite/anita-portfolio/.env.development.local with
    the changes listed above.
    Would you like to continue? (Use arrow keys)
    yes
    skip
    yes to all
    abort
    ```

    If you select `yes to all`, you'll receive a message similar to:

    ```bash{outputLines}
    Your project was generated with:
    next-drupal
    cd into /Users/anitapantheon/anitasite/anita-portfolio to start developing!
    (node:53117) ExperimentalWarning: Importing JSON modules is an experimental feature and might change at any time
    Goodbye.
    [Exec] Done in 07:44
    [notice] Next steps: import your repository to create a Front-End Site https://docs.pantheon.io/guides/decoupled/no-starter-kit/import-repo
    Your Decoupled Kit project has been created!
    ```

    - You can see this backend project in your Pantheon account. Go to your Pantheon dashboard and select **Sites**. You will see your backend project listed with the **label** name you entered in the steps above.

1. [Import your repository](/guides/decoupled/no-starter-kit/import-repo) to create the frontend of your Pantheon Front-End Site.
