---
title: Quick Start
subtitle: Create Test & Live
description: In part five of our Quick Start guide, learn how to create your Test and Live environments.
quickstart: true
anchorid: create-test-live
generator: pagination
layout: guide
category: [get-started]
tags: [dashboard, iterate, launch, workflow]
type: guide
pagination:
  provider: data.quickstartpages
use:
  - quickstartpages
permalink: docs/guides/quickstart/create-test-live
nexturl: guides/quickstart/clone-live-to-dev/
nextpage: Clone Live to Dev
previousurl: guides/quickstart/site-dashboard/
previouspage: Site Dashboard
editpath: quickstart/05-create-test-live.md
image: launchGuide-twitterLarge
---

In this lesson, we’re going to to create our Test site and our Live site, which we just learned about in the previous lesson.

**Watch the video:**

<Youtube src="7mu76KTKHf0" title="Create Test & Live Environments" />

**Try it yourself:**

<Alert title="Warning" type="danger">

If you haven’t completed the installation of your Dev site, return to [Create New Site](/guides/quickstart/create-new-site), and complete the installation before proceeding with the rest of this guide.

</Alert>

1. Navigate to your Site Dashboard and click the <Icon icon="equalizer" text="Test"/> tab. Here you’ll have access to your Test environment, but it hasn’t been created yet. Click **Create Test Environment** to create one.

  This takes a few moments.

1. Now click <Icon icon="new-window-alt" text="Visit Test Site"/>. This will open your Test site in a new browser tab with the URL `test-YOURSITE.pantheonsite.io`.

1. Navigate back to your Site Dashboard, and click the <Icon icon="cardio" text="Live"/> tab. Click **Create Live Environment** to create the environment.

1. This time, while we wait, let’s click on **Workflows** <Icon icon="chevron-down" />. In the dropdown you’ll find your active workflow as well as the workflows we’ve completed to this point.

Congratulations! You now have three copies of your site running in three separate environments: Dev, Test, and Live.
