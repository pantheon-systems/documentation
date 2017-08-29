---
title: Build Tools
subtitle: Create a Pull Request
buildtools: true
anchorid: create-pr
generator: pagination
layout: guide
pagination:
    provider: data.buildtoolspages
use:
    - buildtoolspages
permalink: docs/guides/build-tools/create-pr/
nexturl: guides/build-tools/configure/
previousurl: guides/build-tools/create-project/
editpath: build-tools/03-create-pr.md
---
This section demonstrates a Composer based Pull Request workflow on Pantheon by making a simple code change on a feature branch then opening a request to accept that change into master.

<div class="panel panel-drop panel-guide" id="accordion">
  <div class="panel-heading panel-drop-heading">
     <a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#understand-cd"><h3 class="panel-title panel-drop-title" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-lightbulb"></span> Continuous Delivery</h3></a>
   </div>
   <div id="understand-cd" class="collapse">
     <div class="panel-inner" markdown="1">
     Continuous delivery requires a consistently clear deployment pipeline from development to production. That is to say, an application must be able to deploy code to production at any given time regardless of current work in progress. Anything that keeps your application from deploying code to production is considered a blocker.

     Production code is tracked by the master branch on GitHub and it is assumed to be production ready. Development work is done on a feature branch first, then proposed to master in the form of a pull request so it can be tested and reviewed before it's accepted.

     The master branch is automatically built and deployed to the Dev environment. Feature branches are automatically built and deployed to individual Multidev environments:

    ![Continuous delivery diagram](/source/docs/assets/images/pr-workflow/cd-diagram.png)

    </div>
   </div>
 </div>


1.  From your GitHub project page, click on the 'config' directory. Find the file named `system.site.yml`, click on it, and use the edit pencil to open an editor:

    ![system.site.yml Configuration](/source/docs/assets/images/pr-workflow/system-site-config.png)

2.  change the slogan to something inspiring:

    ![Edit slogan](/source/docs/assets/images/pr-workflow/edit-slogan.png)

3.  Once you are finished editing the configuration file, describe the change you made in the "Commit Changes" area. Then, click on the radio button to create a new branch and give it a short name, like `slogan`. Click on `Propose file change`:

    ![Create slogan branch](/source/docs/assets/images/pr-workflow/create-slogan-branch.png)

    Always select a unique branch name; the multidev environment created will be named after your branch. Since there is a limit to the number of characters that may be used in a Pantheon multidev name, your environments may conflict if you always use the branch name that GitHub suggests.

4.  On the pull request page, click on `Create pull request`.

    ![Slogan pull request](/source/docs/assets/images/pr-workflow/slogan-pull-request.png)

    As soon as you commit your change to a new branch, CircleCI builds a new multidev environment and begins installing a site that you can use to preview the change. Once the multidev environment has been created, the build script will add a comment to the commit with links to the dashboard panel for the environment, and to the test site created on Pantheon. The pull request page conveniently shows the messages from each commit on the branch:

    ![Passed pull request](/source/docs/assets/images/pr-workflow/slogan-pr-starting.png)

5.  Click on the **Visit Site** button and you will be brought to the test site. You can log on to the admin account for this site using the password you provided to the `build-env:create-project` command. Note that the slogan you entered in your pull request branch has been imported and is therefore visible in the site header.

    ![Site initial login](/source/docs/assets/images/pr-workflow/pr-slogan-site.png)

    This site will persist for as long as the pull request remains open.
