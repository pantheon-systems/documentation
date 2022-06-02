## Autopilot Webhooks

Webhooks allows you to set up integrations from third-party applications and subscribe to different events in the [New Dashboard](/guides/new-dashboard). When an event is triggered, you will receive a notification. This feature is workspace-specific, so anyone who has Admin permissions to a particular workspace has access.

### Create A Webhook

1. Navigate to the workspace where you want to set up a webhook > Click <span class="glyphicons glyphicons-cogwheel"></span> **Settings** > Click **Webhooks**.

1. Click **+ Create New Webhook**.

1. Name your Webhook.

1. Fill in your Callback URL. This is provided by whichever third-party app you are using to create your webhook.

1. **Optional** Add a Secret Token. Some applications will require this, some will not; for those that do not require it, you can still choose to add one.

1. Choose a webhook event- either Visual Regression Tests (VRT) or Site Deployments. Please note that if you want to set up both webhook events, you need to repeat the process for both options.

1. Click **Create Webhook**.

On the Webhooks page, you have the option to enable or disable your Webhook, edit your Webhook, or delete it.

After you create your webhook, the app you used is automatically subscribed to it and you now have access to the output of the payload. The payload can be modified in several ways. For example, you can:
	
    - Hook into a Slack channel and get a notification whenever a site was deployed or a VRT result comes back.
    - Email a specific person when the VRT result comes through.
    - Trigger an alert every time Autopilot runs.

Access to Webhooks deployment alerts is available to all tiers. Gold Accounts and higher can subscribe to Autopilot events. Check out our [pricing page](https://pantheon.io/pricing?docs) and contact [Sales](https://pantheon.io/earlyaccess/autopilot?docs) to talk through what plan is best for your needs.