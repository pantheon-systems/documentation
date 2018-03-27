---
title: Using Pantheon As A Training Platform for WordPress and Drupal
description: Best practices for training a group of student using Pantheon
type: guide
permalink: docs/guides/:basename/
tags: [moreguides]
contributors:
  - stevector
  - dwayne
  - davidneedham
  - tessak22
date: 3/26/2018
---

Pantheon makes it easy for educators training students on Drupal and WordPress to spin up and manage free sandbox sites for their students. Using Pantheon allows you and your students to focus on the CMS rather than setting up local sites or remote infrastructure. [Please contact us if you need assistance using Pantheon to conduct your trainings.](https://pantheon.io/trainers)

## Initial Setup

Before preparing sites to use Pantheon for a specific class, test out the platform and make a Pantheon organization.

 1. Each trainer should [create a Pantheon account](https://pantheon.io/register) for themselves.

 2. Test that Pantheon is suitable for your training topic. [Please read our Platform Considerations](https://pantheon.io/docs/platform-considerations/) to ensure that your curriculum will work with our opinionated platform decisions. For instance, Pantheon does not support Drupal multisite and Node.js is not available on our containers.

 3. [Please contact us](https://pantheon.io/trainers) and let us know you want to use the platform as a trainer. This will ensure you have full access to all the available tools as they are developed and maintain access to enough free sandboxes for your students. We can also help guide you through the processes to ensure you have the best experience and find success.

 4. [Create a Pantheon for Agencies organization here](https://dashboard.pantheon.io/organizations/create-agency). This organization will give you a dashboard overview of all of your students' sites. Creating an organization account will require a unique homepage URL. Use a site related to your training will work here. You can read more about using the [Organization Dashboard here](https://pantheon.io/docs/organizations/).

<div class="alert alert-info">
  <h4 class="info">Note</h4>
  <p markdown="1">
	You are limited to creating one organization per unique email, so if you already have created a Pantheon for Agencies account in the past you will need to create a brand new Pantheon user account with a different email address.  
  </p>
</div>

 5. Make a new 'start-state' site (Optional). If you want your students to all start with a set of certain themes, modules/plugins, and content in the database, then please create a sample site on Pantheon. This site can later be copied for each of your students. [Contact us](https://pantheon.io/trainers) for assistance creating numerous copies of this start-state site. Alternatively, if you want your students to start with stock Drupal or WordPress core, you can simply spin up sites from one of our [standard upstreams](https://pantheon.io/docs/start-state/).

<div class="alert alert-info">
  <h4 class="info">Note</h4>
  <p markdown="1">
Trainers with a great deal of Pantheon experience may want to use our [custom upstream product](https://pantheon.io/docs/custom-upstream/) to supply a common set of code to their students. We do not recommend trainers new to Pantheon take on that additional complexity.
  </p>
</div>

## Make Sites for All Students

If you need to create many sites before a training, [contact us](https://pantheon.io/trainers) and we can assist with this process.

Otherwise, please ask each student to [create their own Pantheon account](https://pantheon.io/register) and then create a new sandbox site.  Once created they can to add your organization as a [Supporting Organization](https://pantheon.io/docs/organization-dashboard/) which will give you access to the site.

## Communicating with Students

 The key to any successful training is proper preparation. We find that successful trainers will email all students well in advance of the class and again closer to the day of the training.

 Aside from prerequisites specific to your training program, please do inform students that they will get notifications from Pantheon after the setup process. Letting them know upfront saves everyone some questions and surprises.

 Below we have included a sample email, similar to one that we use for trainings internally at Pantheon. You can adapt it as necessary for your use case.



 <div class="panel panel-drop panel-guide" id="accordion">
   <div class="panel-heading panel-drop-heading">
     <a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#sample-email">
       <h3 class="info panel-title panel-drop-title" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-question-sign"></span>Sample email to students</h3>
     </a>
   </div>
   <div id="sample-email" class="collapse" markdown="1" style="padding:10px;">
   ### Sample Email to Students {.info}
   <p>Hello,</p>

   <p>My name is [TRAINER NAME], [TITLE], and I will be leading the [CLASS NAME] training on [TRAINING DATE] at [TIME]. During the training, we will be covering [CORE TRAINING OBJECTIVE].
   </p>

   <p>This will be an interactive training. With that in mind, please complete these steps in advance:
   </p>

   <p>Make sure that you have a Pantheon account and are added to your team's organization.</p>

   <p>Please have the most recent version of <a href="https://pantheon.io/docs/terminus/">Terminus</a> installed, <a href="https://pantheon.io/docs/machine-tokens/">a machine token</a> created and an <a href="https://pantheon.io/docs/ssh-keys/">SSH key</a> uploaded to Pantheon.</p>

   <p>Be prepared to screen share and participate. We ask that everyone join from their own computer so you can view the slides, screen share, etc.</p>

   <p>We want to hear and see you. Please have a working microphone (or be prepared to dial in by phone) and a webcam to join the video.</p>

   <p>If one of your colleagues didn't receive this email and plan to join, please have them reach out to be added to the calendar invitation and so we can best prepare.</p>

   <p>Feel free to reply to this email if you have any questions about the training.</p>

  <p>[EMAIL SIGNATURE]</p>
   </div>
 </div>

## See Also

 Providing links to key documents in your follow up materials will help your students long after class ends as they start to explore Pantheon on their own. We recommend the following:

 - [Quick Start Guide](https://pantheon.io/docs/guides/quickstart/)
 - [Going live](https://pantheon.io/docs/guides/launch/)
 - [How to delete account](https://pantheon.io/docs/delete-account/)
