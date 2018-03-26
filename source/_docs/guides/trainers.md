---
title: Using Pantheon As A Training Platform for WordPress and Drupal
description: Best Practices for Training with Pantheon
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



Many trainers are looking for the best way to leverage the Pantheon platform for their training classes. Since you can use the platform to spin up ready to install WordPress and Drupal sites, it offer many benefits to end users who are ready to learn how to use the CMS but not yet ready to conquer the subjects of DB configurations or other manual setup tasks. Additionally the ability to create multiple separate, isolated sites and change ownership through simple dashboard changes, it sets the students up for long term success should they wish to take their project to production in the future.  

Below we have gathered time tested best practices we have used internally as well as feedback from professional trainers already using the platform in this way and wish to share their expertise. It is broken into two sections.  First things you will need to do once, when you are first setting up Pantheon as a trainer and then things you will need to do once per training class.   


## Initial setup 

**To be done by the trainer when adopting the platform** 

 1. Each trainer should [create a Pantheon account](https://pantheon.io/register) for themselves.
	
 2. Ensure that the use case you want to train works on Pantheon. [Please read our Platform Considerations](https://pantheon.io/docs/platform-considerations/) There are certain things that will not work on Pantheon and we do not want you to be surprised or attempt curriculum that conflicts with these opinionated platform decisions. Of note you should be aware that Pantheon does not support Drupal multisite or WordPress site networks and you will not be able to run Node.js. 

 3. [Please contact us](https://pantheon.io/trainers) and let us know you want to use the platform as a trainer. This will ensure you have full access to all the available tools as they are developed and maintain access to enough free sandboxes for your students.We can also help guide you through the processes to ensure you have the best experience and find success. 

 4. [Create a Pantheon for Agencies organization here](https://dashboard.pantheon.io/organizations/create-agency). This organization will give you a dashboard overview of all of your student's sites. )
	Creating an organization account will require a unique  homepage URL. Use  a site related to your training will work here. You can read more about the [Orgnizational Dashboard here](https://pantheon.io/docs/organizations/)



<div class="alert alert-info">
  <h4 class="info">Note</h4>
  <p markdown="1">


	You are limited to creating one organization per unique email, so if you already have created a Pantheon for Agencies account in the past you will need to create a brand new Pantheon user account with a different email address.  
  </p>
</div>


 5. Make a new 'start-state' site (Optional). <br>
	If you are going to start from a vanilla Drupal or WordPress installation, you can simply spin up sites from one of our [standard upstreams](https://pantheon.io/docs/start-state/) and simply go from there.
	If you want your students to all start with a set of certain themes, modules/plugins, and content in the database, then please create a sample site on Pantheon. This site will later be copied for each of your students.

<div class="alert alert-info">
  <h4 class="info">Note</h4>
  <p markdown="1">
Trainers with a great deal of Pantheon experience may want to use our [custom upstream product](https://pantheon.io/docs/custom-upstream/) to supply a common set of code to their students. We do not recommend trainers new to Pantheon take on that additional complexity.
  </p>
</div>


## Make sites for all students

If you need to create many sites before a training, contact us and we can assist with this process.  
 
Otherwise, please ask each student to [create their own Pantheon account](https://pantheon.io/register) and then create a new Sandbox site.  Once created they will need to add your [Organization as a Supporting Organization](https://pantheon.io/docs/organization-dashboard/).  


## Communicating with students

 The key to any successful training is proper preparation. We find the trainers with the most success email all students well in advance of the class and again closer to the day of the training.  
 Aside from prerequisites specific to your training program, please do inform students that they will get notifications from Pantheon after the setup process.  Letting them know upfront saves everyone some questions and surprises. 
 Below we have included a sample email, similar to one that we use for trainings internally at Pantheon   
	
<div class="alert alert-info" role="alert">
  <p markdown="1">
<pre>
	
Hello,

My name is Trainer Name, TITLE, and I will be leading the CLASS NAME training on TRAINING DATE at TIME. During the training, we will be covering CORE TRAINING OBJECTIVE.

This will be an interactive training. With that in mind, please complete these steps in advance:

Make sure that you have a Pantheon account and are added to your team's organization. 

Please have the most recent version of Terminus installed, a machine token created and an SSH key uploaded to Pantheon

Be prepared to screen share and participate. We ask that everyone join from their own computer so you can view the slides, screen share, etc. 

We want to hear and see you. Please have a working microphone (or be prepared to dial in by phone) and a webcam to join the video.

If one of your colleagues didn't receive this email and plan to join, please have them reach out to be added to the calendar invitation and so we can best prepare.

Feel free to reply to this email if you have any questions about the training.

-- 
Trainer Name 
Pantheon.io
Phone-number-here

</pre>

</p>
</div>



## See Also

 Providing links to key documents in your follow up materials will help your students long after class ends as they start to explore Pantheon on their own.  We recommend the following at a minimum:

 - [Quick Start Guide](https://pantheon.io/docs/guides/quickstart/)
 - [Going live](https://pantheon.io/docs/guides/launch/)
 - [How to delete account](https://pantheon.io/docs/delete-account/)




