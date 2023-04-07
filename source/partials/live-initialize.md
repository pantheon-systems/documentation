After you [purchase a plan](/guides/getstarted/purchase), you can deploy your site live.  But first, you have to create the Live environment.

<Alert title="Warning" type="danger" >

When you complete this step, your site will be live for anyone to see, at the Pantheon URL. For detailed information about launching your site, refer to our [Launch Essentials](/guides/launch/) guide.

</Alert>

To create your Live environment:

1. Go to your Site Dashboard.
1. Click the <Icon icon="equalizer" text="Live"/> tab.
1. Click **Initialize Live Environment** to create your Live environment.

  ![Initialize live environment](../images/launch-initialize-live.png)

1. Select the <Icon icon="server" text="Database / Files"/> tab. Keep the default selections *except* select "Test" from **From this Environment**, then select **Clone the Database & the Files from Test into the Live Environment**.

   ![Clone test to live](../images/dashboard/clone-test-to-live.png)

1. You will be prompted to confirm you want to go live.  Type "CLONE", then click **Overwrite This Environment**.

   ![Confirm cloning](../images/launch-clone-test-live-confirm.png)

Your site is now live at the Pantheon URL.

1. Click **Visit Live Site** to view it.
