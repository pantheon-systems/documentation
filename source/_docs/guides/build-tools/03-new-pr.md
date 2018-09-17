---
title: Build Tools
subtitle: Start a Pull Request
description: In step three of the Build Tools guide, learn how to use GitHub as part of your workflow.
buildtools: true
anchorid: new-pr
generator: pagination
layout: guide
type: guide
pagination:
    provider: data.buildtoolspages
use:
    - buildtoolspages
permalink: docs/guides/build-tools/new-pr/
nexturl: guides/build-tools/configure/
previousurl: guides/build-tools/create-project/
editpath: build-tools/03-new-pr.md
image: buildToolsGuide-thumb
---
This section demonstrates GitHub's Pull Request workflow for Pantheon by making a simple code change on a feature branch then opening a Pull Request to accept that change into master.

The master branch is automatically built and deployed to the Dev environment. Feature branches are automatically built and deployed to individual Multidev environments:

<p class="text-center" markdown="1">![Continuous delivery diagram](/source/docs/assets/images/pr-workflow/github-circle-pantheon.png)</p>


<div class="panel panel-drop panel-guide" id="accordion">
  <div class="panel-heading panel-drop-heading">
     <a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#understand-cd"><h3 class="panel-title panel-drop-title" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-lightbulb"></span> Continuous Delivery</h3></a>
   </div>
   <div id="understand-cd" class="collapse">
     <div class="panel-inner" markdown="1">
     Continuous delivery requires a consistently clear deployment pipeline from development to production. That is to say, an application must be able to deploy code to production at any given time regardless of current work in progress. Anything that keeps your application from deploying code to production is considered a blocker.

     Production code is tracked by the master branch on GitHub and it is assumed to be production ready. Development work is done on a feature branch first, then proposed to master in the form of a Pull Request so it can be tested and reviewed before it's accepted.
    </div>
   </div>
 </div>


1. From your GitHub project page, click on the `config` directory. Select the file named `system.site.yml` and click <span class="glyphicon glyphicon-pencil"></span> to open an editor:

    ![system.site.yml Configuration](/source/docs/assets/images/pr-workflow/system-site-config.png)

2. Change the slogan to something inspiring:

    ![Edit slogan](/source/docs/assets/images/pr-workflow/edit-slogan.png)

3. Scroll down and enter a message describing this change in the **Commit changes** area. Then, click on the radio button to create a **new branch** and give it a short name, like `slogan`, then click **Propose file change**:

    ![Create slogan branch](/source/docs/assets/images/pr-workflow/create-slogan-branch.png)

    <div class="panel panel-drop panel-guide" id="accordion">
      <div class="panel-heading panel-drop-heading">
         <a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#understand-branch-names"><h3 class="panel-title panel-drop-title" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-lightbulb"></span> Branch Naming Conventions</h3></a>
       </div>
       <div id="understand-branch-names" class="collapse">
         <div class="panel-inner" markdown="1">
         Be sure to use unique branch names for each feature branch; the Multidev environment created on Pantheon is named after your branch. Since there is a limit to the number of characters that may be used in a Pantheon Multidev name, your environments may conflict if you always use the branch name that GitHub suggests. For details, see <a href="/docs/multidev/#what-are-the-naming-conventions-for-branches" data-proofer-ignore>Multidev</a>).
        </div>
       </div>
     </div>


4. Click **Create Pull Request**:

    ![Slogan Pull Request](/source/docs/assets/images/pr-workflow/slogan-pull-request.png)

    <div class="panel panel-drop panel-guide" id="accordion">
      <div class="panel-heading panel-drop-heading">
         <a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#understand-builds"><h3 class="panel-title panel-drop-title" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-watch"></span> Builds</h3></a>
       </div>
       <div id="understand-builds" class="collapse">
         <div class="panel-inner" markdown="1">
         As soon as you commit changes to a feature branch, CircleCI builds a new Multidev environment on Pantheon to preview the change. Once the Multidev environment has been created, the build script will add a comment to the commit with links to the Multidev environment of the Pantheon Site Dashboard and a button to visit the Multidev site URL (e.g., `ci-4-my-pantheon-project.pantheonsite.io`). The Pull Request page conveniently shows the messages from each commit on the branch:

         ![Passed Pull Request](/source/docs/assets/images/pr-workflow/slogan-pr-starting.png)

         ### Automated Tests
         It is also common to set up automated tests to confirm that the project is working as expected; when tests are available, GitHub will run them and display the results of the tests with the pull request. Working on projects with comprehensive tests increases the development team's confidence that submitted pull requests will work correctly when they are integrated into the main build.


        </div>
       </div>
     </div>

5. Wait for the build on CircleCI to leave a comment, then click on the **Visit Site** button to access the Multidev site URL. Note that the slogan you entered in your Pull Request branch has been imported and is visible in the site header:

    ![Site initial login](/source/docs/assets/images/pr-workflow/pr-slogan-site.png)

    This Multidev environment will persist for as long as the Pull Request remains open in GitHub.

6. Click **Log in** and to access the admin account for this site using the password you provided to the `build-env:create-project` command:

  ![Site admin log in](/source/docs/assets/images/pr-workflow/admin-log-in.png)
