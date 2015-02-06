---
title: Using Terminus to Create and Update Drupal Sites on Pantheon
description: Using the Terminus CLI, learn how to create new Drupal sites from scratch and update them entirely CLI.
draft: true

---

## <span style="color: red">Introduction</span>

### <span style="color: red">Create Sites Faster And More Efficiently</span>
The latest version of Pantheon's CLI, [Terminus](https://github.com/pantheon-systems/cli), incorporates not only Drush and WP-CLI, but also the vast majority of tasks available to you within the Pantheon Dashboard. You can create new sites, clone one environment to another, create branches, check for upstream updates, and more! By using Terminus in this manner, a site administrator can massively reduce the time they spend on relatively simple tasks. In this guide, we will walk through the basics of creating a completely new Drupal site on Pantheon, installing some contrib modules, commiting code and cloning from one site environment to another, all through the Terminus CLI.

#### Installing Terminus
Installing Terminus is a fairly straight forward process. Just follow the [instructions found here](https://github.com/pantheon-systems/cli/wiki/Installation).

Now that you've got Terminus installed you can get a quick status check to be sure it works. Depending on your OS, this output may vary, but here's a sample for reference:

```
$ terminus auth login
Your email address?: email@domain.com
Your dashboard password (input will not be shown):
Logging in as email@domain.com
Saving session data

        .+.
        .+?:
         .+??.
           ??? .
           +???.
      +?????????=.
      .???????????.
      .????????????.

     ########### ########
     ############.#######.
     ####### ####  .......
     ######## #### #######                50 41 4E 54 48 45 4F 4E
     #########.####.######        _____________  __  ________  ____  ______
     ######  ...                 /_  __/ __/ _ \/  |/  /  _/ |/ / / / / __/
     #######.??.##########        / / / _// , _/ /|_/ // //    / /_/ /\ \
     #######~+??.#########       /_/ /___/_/|_/_/  /_/___/_/|_/\____/___/
     ########.??..
     #########.??.#######.
     #########.+?? ######.
               .+?.
         .????????????.
           +??????????,
            .????++++++.
              ????.
              .???,
               .~??.
                 .??
                  .?,.
```

Excellent! You've installed Terminus and logged into your Pantheon with it. For a full list of commands, [please refer to this page](https://github.com/pantheon-systems/cli/wiki/Available-Commands).

## <span style="color: red">Using Terminus</span>

### List Your Current Sites, Create A New One, Update Code

Terminus can work on any Pantheon hosted website you might have, but it can also create new ones! Let's get a list of your current Pantheon based websites.

```
$ terminus sites show
+--------------------------+-----------+---------------+--------------------------+
| Site                     | Framework | Service Level | UUID                     |
+--------------------------+-----------+---------------+--------------------------+
| terminus-create          | drupal8   | free          | terminus-create          |
| git-import-example       | drupal    | free          | git-import-example       |
+--------------------------+-----------+---------------+--------------------------+
```
Now we can create a brand new site!

```
$ terminus sites create
Human readable label for the site: Terminus CLI Create
Machine name of the site; used as part of the default URL [ if left blank will be terminusclicreate]: terminus-cli-create

  1. None

Choose organization: 1

  1. Awesome Codebase
  2. Backdrop
  3. Community Media Starter Kit
  4. CiviCRM Starter Kit
  5. Commerce Kickstart
  6. DKAN
  7. Drupal 6
  8. Drupal 7
  9. Drupal 8 Beta
  10. Introduction to Theming Basics for Drupal 7
  11. FreakPress
  12. Mukurtu CMS
  13. Open Academy
  14. Open Atrium 2
  15. Open Outreach
  16. OpenAid
  17. OpenIdeaL
  18. OpenPublic
  19. OpenPublish
  20. OpenScholar
  21. Panopoly
  22. Plato Típico
  23. Pushtape
  24. Restaurant
  25. University of Texas at Austin Distribution
  26. WordPress

Select one: 8
Creating new Drupal 7 installation ...
Working ............................................
Success: Pow! You created a new site!

$ terminus sites show
+--------------------------+-----------+---------------+--------------------------+
| Site                     | Framework | Service Level | UUID                     |
+--------------------------+-----------+---------------+--------------------------+
| terminus-cli-create      | drupal    | free          | terminus-cli-create      |
| terminus-create          | drupal8   | free          | terminus-create          |
| git-import-example       | drupal    | free          | git-import-example       |
+--------------------------+-----------+---------------+--------------------------+

```

With the site created, the next step is to run a Drush install command to get a fully functional Drupal set ready to go for development. Terminus will run most available Drush commands by simply adding the word "drush", the command in question directly afterwards and the site's Pantheon machine name.

```
$ terminus drush site-install --site=terminus-cli-create
Running drush site-install  on terminus-cli-create-dev
dev.a248f559-fab9-49cd-983c-f5@appserver.dev.a248f559-fab9-49cd-983c-f5c0d11a2464.drush.in's password:
Could not find a Drupal settings.php file at ./sites/default/settings.php.
You are about to create a sites/dev-terminus-cli-create.pantheon.io/files directory and create a sites/dev-terminus-cli-create.pantheon.io/settings.php file and DROP all tables in your 'pantheon' database. Do you want to continue? (y/n): y
Starting Drupal installation. This takes a few seconds ...                  [ok]
Installation complete.  User name: admin  User password: ********         [ok]
```

You should now be able to open a web browser and see your brand new Drupal site! The status of each of the environments within the site can be seen using a "terminus site environments" command.

```
$ terminus site environments --site=terminus-cli-create
+------+------------+--------------------------------------+---------------+---------+
| Name | Created    | Domain                               | OnServer Dev? | Locked? |
+------+------------+--------------------------------------+---------------+---------+
| test | 1423175994 | test-terminus-cli-create.pantheon.io | false         | false   |
| dev  | 1423175993 | dev-terminus-cli-create.pantheon.io  | true          | false   |
| live | 1423175995 | live-terminus-cli-create.pantheon.io | false         | false   |
+------+------------+--------------------------------------+---------------+---------+
```

(insert screenshot of new Drupal site here)

While the site is still in SFTP mode, (dev environment row, OnServer Dev? true), we can use Drush to download and install some Drupal contrib modules, such as Views and Administration Menu.

```
$ terminus drush dl admin_menu --site=terminus-cli-create
Running drush dl admin_menu  on terminus-cli-create-dev
dev.a248f559-fab9-49cd-983c-f5@appserver.dev.a248f559-fab9-49cd-983c-f5c0d11a2464.drush.in's password:
Project admin_menu (7.x-3.0-rc5) downloaded to                         [success]
/srv/bindings/c183403f14224eac8471ec0000f9e653/code/sites/all/modules/admin_menu.
Project admin_menu contains 3 modules: admin_devel, admin_menu_toolbar, admin_menu.
tests-MacBook-Pro:~ erikmathy$ terminus drush en admin_menu,admin_menu_toolbar --site=terminus-cli-create
Running drush en admin_menu,admin_menu_toolbar  on terminus-cli-create-dev
dev.a248f559-fab9-49cd-983c-f5@appserver.dev.a248f559-fab9-49cd-983c-f5c0d11a2464.drush.in's password:
The following extensions will be enabled: admin_menu, admin_menu_toolbar
Do you really want to continue? (y/n): y
admin_menu was enabled successfully.                                        [ok]
admin_menu_toolbar was enabled successfully.                                [ok]
```

Not bad, eh? All without a single GUI or web browser click! If you look at the site's Dashboard, the new code will be displayed there, waiting to be committed.

![The dashboard's showing the code was deployed to the Dev environment](/docs/assets/images/terminus-cli-code-to-commit-dashboard.png)

Let's commit it all into the Git repo. This, too, can be done in Terminus using the "terminus site code commit" command.

```
$ terminus site code commit --site=terminus-cli-create --env=dev
Commit 1 changes? [y/n] y
Success: Successfully commited.
+---------------------+--------+--------+------------------------------------------+------------------+
| Time                | Author | Labels | Hash                                     | Message          |
+---------------------+--------+--------+------------------------------------------+------------------+
| 2015-02-05T22:40:14 | Root   | dev    | 4297d007d1697e1b9a90073510183149dd1c827f | "Initial Commit" |
+---------------------+--------+--------+------------------------------------------+------------------+
```

In the site's Pantheon Dashboard, the new files will now be shown in the Git commit log.

![The dashboard's showing the code was deployed to the Dev environment](/docs/assets/images/terminus-cli-code-committed-dashboard.png)

And, finally, we create the Test environment, moving the code, files and DB from Dev onwards in the Pantheon workflow using "create-env".

```
$ terminus site create-env --site=terminus-cli-create --env=test

  1. dev
  2. test
  3. live

Select Clone from?: 1
Creating branch
Creating Environment
Cloning files ...
Working ...
Cloning database ...
Working ......
Success: Succesfully created Environment!
```

## <span style="color: red">Congratulations!</span>
Congratulations! You've just created a brand new Drupal site on Pantheon, added modules, committed code AND moved it all from Dev to Test without a single checkbox, radio button or colored Ajax slider of any kind. To top it off, by using Terminus, it all happened in a third the time. There is a whole new world of possibility open to you! Go forth, and CLI!

## <span style="color: red"> Next Steps</span>
- Do you use WordPress? Try [Using WP-CLI on Pantheon]!

- After you've mastered Terminus, take it a step further with [Continuos Integration](continuous-integration-solutions)!
