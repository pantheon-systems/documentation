---
title: Using Pantheon As A Training Platform for WordPress and Drupal
description: Best Practices for Training with Pantheon
type: guide
permalink: docs/guides/:basename/
contributors: [stevector, dwayne, davidneedham, tessak]
  - 
  - 
  - 
  - 
---



Many trainers are looking for the best way to leverage the Pantheon platform for their training classes. Since you can use the platform to spin up ready to install WordPress and Drupal sites, it offer many benefits to end users who are ready to learn how to use the CMS but not yet ready to conquer the subjects of DB configurations or other manual setup tasks. Additionally the ability to create multiple separate, isolated sites and change ownership through simple dashboard changes, it sets the students up for long term success should they wish to take their project to production in the future.  

Below we have gathered time tested best practices we have used internally as well as feedback from professional trainers already using the platform in this way and wish to share their expertise. It is broken into two sections.  First things you will need to do once, when you are first setting up Pantheon as a trainer and then things you will need to do once per training class.   


## Initial setup 

**To be done by the trainer when adopting the platform** 

 1. Each trainer should create a Pantheon account for themselves.
	
 2. Ensure that the use case you want to train works on Pantheon. [Please read our Platform Considerations](https://pantheon.io/docs/platform-considerations/) There are certain things that will not work on Pantheon and we do not want you to be surprised or attempt curriculum that conflicts with these opinionated platform decisions. Of note you should be aware that Pantheon does not support Drupal multisite or WordPress site networks and you will not be able to run Node.js. 

 3. [Please contact us](https://pantheon.io/trainers) and let us know you want to use the platform as a trainer. This will ensure you have full access to all the available tools as they are developed and maintain access to enough free sandboxes for your students.We can also help guide you through the processes to ensure you have the best experience and find success. 

 4. [Create a Pantheon for Agencies organization here](https://dashboard.pantheon.io/organizations/create-agency). This organization will give you a dashboard overview of all of your student's sites. )
	Creating an organization account will require a unique  homepage URL. Use  a site related to your training will work here. 



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


## Setup Per Class	

 ## Make sites for all students

 Make copies of your 'start-state' site per student and make the individual student the owner of their site.  

 For those starting from the default installation you might consider having the students spin up their own sites by following the (standard guide, which includes a video of the process)[https://pantheon.io/docs/guides/quickstart/create-new-site/] 

 For those wishing to copy their site the best results can be found by using terminus to clone the site
	
 I. Create a new site on Pantheon using a unique name such as studentfirstname-studentlastname-date-of-class (dwayne-mcdaniel-3-1-2018 for example) and add this site to your training organization

```html
 terminus site:create --org=ORG-UUID-FOUND-IN-DASHBOARD-URL -- unique-sitename unique-sitename upstream
``` 
 
 example
```html
 terminus site:create --org=f43f78ff-e89e-4835-8896-14f7583706fa -- demo03-1-18 demo03-1-18 WordPress
```
	
 For a full list of upstreams available on Pantheon, run the following command

```
 terminus upstream:list
```

 II.  To sync the code for each student site from your 'start-state' site you have a a few options.  

 A. Git clone your site locally and add each student's site as a remote target and `git push --force TARGET master` to make sure all code bases match what is on your local.  

 B. Use SFTP client of choice to copy your 'start-state' site code locally and then connect to each of the student sites via their SFTP credentials and overwrite the existing repositories with your code.  

 C. Leverage the CLI for your CMS, Drush or WP-CLI, to recreate the 'start-state' site.  For example			

```html
 terminus wp unique-sitename.dev -- theme delete twentyten 
 terminus wp unique-sitename.dev -- theme update --all
 terminus wp unique-sitename.dev -- plugin delete akismet hello
 terminus wp unique-sitename.dev -- plugin install wp-cfm --activate
```
		
 III. Take a backup of your DB and Files and copy the URL for the S3 buckets where they are stored.  You can accomplish this through the Site Dashboard under Backups but clicking the download arrow beside each backup element.  Then Import these zips to the target student site by using the dashboard tools under Database / Files or using Terminus

```html
 terminus import:database unique-sitename.dev URL-OF-YOUR-DB-BACKUP

 terminus import:files unique-sitename.dev URL-OF-YOUR-FILES-BACKUP
```

 IV. Add the student as a [Pantheon Site Team Member](https://pantheon.io/docs/team-management/) Then make them the Site Owner.  For Sandbox sites this can be done at will.  

 V. Add the students as an administrator on the site.  We strongly encourage using Drush or WP-CLI for this



 Drush
```html		
 terminus drush unique-sitename.dev -- user-create STUDENT-NAME --mail="STUDENT@EMAIL" --password="UserPw" 
 terminus drush unique-sitename.dev -- user-add-role "administrator" STUDENT-NAME 
```
 
 WP-CLI
```html		
 terminus wp unique-sitename.dev -- user create STUDENT-NAME STUDENT@EMAIL --role=administrator

```


 ## Communicating with students

 The key to any successful training is proper preparation. We find the trainers with the most success email all students well in advance of the class and again closer to the day of the training.  
 Aside from prerequisites specific to your training program, please do inform students that they will get notifications from Pantheon after the setup process.  Letting them know upfront saves everyone some questions and surprises. 
 Below we have included a sample email, similar to one that we use for trainings internally at Pantheon   
	
<div class="alert alert-info" role="alert">
  <p markdown="1">

Hello,
<br>
My name is Trainer Name, TITLE, and I will be leading the CLASS NAME training on TRAINING DATE at TIME. During the training, we will be covering CORE TRAINING OBJECTIVE.
<br>
This will be an interactive training. With that in mind, please complete these steps in advance:
<br>
Make sure that you have a Pantheon account and are added to your team's organization. 
<br>
Please have the most recent version of Terminus installed, a machine token created and an SSH key uploaded to Pantheon
<br>
Be prepared to screen share and participate. We ask that everyone join from their own computer so you can view the slides, screen share, etc. 
<br>
We want to hear and see you. Please have a working microphone (or be prepared to dial in by phone) and a webcam to join the video.
 <br>
If one of your colleagues didn't receive this email and plan to join, please have them reach out to be added to the calendar invitation and so we can best prepare.
<br>
Feel free to reply to this email if you have any questions about the training.
<br>
-- <br>
Trainer Name <br>
Pantheon.io<br>
Phone-number-here<br>
<br>
</p>
</div>



## See Also

 Providing links to key documents in your follow up materials will help your students long after class ends as they start to explore Pantheon on their own.  We recommend the following at a minimum:

 - [Quick Start Guide](https://pantheon.io/docs/guides/quickstart/)
 - [Going live](https://pantheon.io/docs/guides/launch/)
 - [How to delete account](https://pantheon.io/docs/delete-account/)




