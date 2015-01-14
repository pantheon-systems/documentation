---
title: Guide Example
description: Learn how to create a great guide.
draft: true

---

## <span style="color: red">Introduction Section</span>

### <span style="color: red">Problem</span>
<span style="color: red">Give a summary of what you plan to accomplish in this guide.</span>


I'm proud of the Pantheon dashboard and all the technologies that feed it, but as a developer I am definitely in the **CLI4LIFE** camp. I can type faster than I can click, and I like being able to repeat, script and automate things. Don't make me use a browser when what I really want is a shell.

### <span style="color: red">Solution</span>

<span style="color: red">Give a summary of how you plan to solve the problem.</span>


That's why we took care to engineer a Drush interface into our [runtime matrix](https://www.getpantheon.com/blog/why-we-built-pantheon-containers-instead-virtual-machines) from the ground up; no small feat. Even though your site could be running from different locations in Pantheon's platform, you can still use Drush to control it. But if you've never used Drush before, here are 5 steps to "feeling the Drush"

### <span style="color: red">Background</span>
<span style="color: red">Here you can provide any background information as needed.</span>

## <span style="color: red">Action Section</span>

<span style="color: red">Here is where you explain what actions are necessary to complete the task or achieve the goal of the guide.</span>

#### Installing Drush

Installing Drush is easier than ever, and there are [instructions for many platforms](https://drupal.org/node/1791676). As a MacOS user, my personal favorite is to to it via [homebrew](https://drupal.org/node/954766):

```
brew install drush
```

But if you're not a brew user, you can do it directly via your terminal:

```
wget https://github.com/drush-ops/drush/archive/5.10.0.tar.gz
tar -xzvf 5.10.0.tar.gz
ln -s $HOME/drush-5.10.0/drush /usr/local/bin/drush
```

See [this documentation](https://drupal.org/node/1674222) or [this video](http://youtu.be/TCg02d4am_Q) for more.

Windows users have the option of [an exe installer](http://drush.ws/drush_windows_installer). On Linux you can install [via PEAR](https://drupal.org/node/2132447), or by using essentially the same instructions as on MacOS.

Now that you've got Drush installed you can get a quick status check to be sure it works. Depending on your OS, this output may vary, but here's mine for reference:

### <span style="color: red">Test your work as you progress</span>
<span style="color: red">Show a code snipet or screenshot demonstrating that your instructions and/or code works.</span>
```
drush status
 PHP executable        :  /usr/local/bin/php
 PHP configuration     :  /usr/local/etc/php/5.4/php.ini
 PHP OS                :  Darwin
 Drush version         :  6.1.0
 Drush configuration   :
 Drush alias files     :
```

Checkpoint! You've installed Drush, a Drupal developer's best friend. I guarantee that within a week, you won't know how you lived without it.

#### Grab Your Pantheon Alias File

Drush can work on any local installation you might have, but better yet it's ready to work against sites out there on the internet too, including Pantheon. There's a system called "aliases" that lets you direct Drush commands "at" remote sites using the **@sign**
, and Pantheon gives you pre-baked alias files with everything you need to use them.

This part is pretty easy. you just log into your Pantheon account and click the "Download all Drush Aliases" link from your account screen:

![Get your aliases right here](https://www.getpantheon.com/sites/default/files/aliases.jpg)


Then drop it into your home Drush directory like so, and then run the **drush sa** command (short for "site-aliases") to insure you're aliases are at the ready:

```
mv $HOME/Downloads/pantheon.aliases.drushrc.php $HOME/.drush/
drush sa
none
pantheon
pantheon.your-site.dev
pantheon.your-site.live
pantheon.your-site.test
...
```

For every site you have on Pantheon, you'll see an entry for dev, test and live. If you're running any sites with [MultiDev](https://www.getpantheon.com/multidev), there will be an entry for each Cloud Development Environment as well. This lets you target your commands specifically.

To verify that everything is working correctly, try using the **drush status** command in conjunction with one of your aliases. If you don't have an SSH key installed, you'll be prompted for your dashboard password. You'll also be asked to accept the SSH RSA key fingerprint whenever you connect to a new point in the runtime matrix, but it's ok to say yes.

Here's an example of me using it with my personal blog:

```
drush @pantheon.outlandish-josh.live status
The authenticity of host '[appserver.live.3ecd4d40-bdf2-4e52-a519-7e697ecdfe20.drush.in]:2222 ([173.203.36.163]:2222)' can't be established.
RSA key fingerprint is b5:ea:23:eb:7b:7b:0d:17:c7:13:47:92:ea:70:c1:b5.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '[appserver.live.3ecd4d40-bdf2-4e52-a519-7e697ecdfe20.drush.in]:2222,[173.203.36.163]:2222' (RSA) to the list of known hosts.
 Drupal version         :  7.23
 Site URI               :  outlandishjosh.com
 Database driver        :  mysql
 Database hostname      :  xxx.xxx.xxx.xxx
 Database username      :  pantheon
 Database name          :  pantheon
 Database               :  Connected
 Drupal bootstrap       :  Successful
 Drupal user            :  Anonymous
 Default theme          :  meedjum
 Administration theme   :  seven
 PHP configuration      :  /srv/bindings/af12454fa2374c6e96a9da839815d649/php53.ini
 Drush version          :  5.10.0
 Drush configuration    :  /srv/bindings/af12454fa2374c6e96a9da839815d649/drushrc.php
 Drupal root            :  /srv/bindings/af12454fa2374c6e96a9da839815d649/code
 Site path              :  sites/default
 File directory path    :  sites/default/files
 Private file           :  sites/default/files/private
 directory path
 Temporary file         :  /srv/bindings/af12454fa2374c6e96a9da839815d649/tmp
 directory path
```

Checkpoint! You now have alias files for your Pantheon site installed, and are ready to run remote commands against your sites.

## <span style="color: red"> Next Steps Section </span>
<span style="color: red">Include intermediate to advanced topics, as well as tips and tricks.</span>

#### Warm Up With Simple Time-Savers

This is where it gets good. Here are some uber-useful Drush commands that can change the way you develop.</p>

**uli - user log in**

Never worry about sharing easy-to-guess (or confusing) login credentials again. Drush lets you get admin access quickly and easily.
```
drush @pantheon.outlandish-josh.dev uli
http://dev-outlandish-josh.gotpantheon.com/user/reset/1/1385492216/UkQTo1v2uT_LAK5p1KG37oSB3AIqnRFDGpH5QZhTOXQ/login
```

Note, you don't just have to use this for admin access. You can specify a user id, name or email, and get a one-time login link for any user in the Drupal user database, which can be super helpful for testing.

**ws - watchdog show**

Debugging Drupal often involves adding code in themes, modules or even core to determine what's happening. Sometimes I'll use a browser and just **print_r();exit;** to get the output I want. There's also the [devel](https://drupal.org/project/devel) module and its indispensable **dsm()** function.

However, when tracing complex operations, you sometimes end up with a bunch of **watchdog()** logging calls in different places, and then you're stuck running an operation, and then reloading the watchdog to see the results. Klunky, right? Not with Drush on your side! Tail the watchdog log in your terminal so you'll get the messages in real-time:
### <span style="color: red">Keep showing your work as you progress...</span>

```
drush @pantheon.outlandish-josh.live ws --tail
 Id    Date          Severity  Type           Message
 1395  25/Nov 13:39  notice    cron           Cron run completed.
 1396  25/Nov 14:28  warning   access denied  node/3
 1397  25/Nov 15:34  notice    cron           Cron run completed.
 1398  25/Nov 16:36  notice    cron           Cron run completed.
 1399  25/Nov 20:17  notice    cron           Cron run completed.
 1400  25/Nov 21:36  notice    cron           Cron run completed.
 1401  25/Nov 23:34  notice    cron           Cron run completed.
 1402  26/Nov 00:36  notice    cron           Cron run completed.
 1403  26/Nov 02:39  notice    cron           Cron run completed.
 1404  26/Nov 07:24  notice    cron           Cron run completed.
```

The command **ws** is short for "watchdog-show", and it does just that. Adding the **--tail** flag tells Drush to maintain its connection and check for any new entries. This cuts dead-time out of your debug cycle, and really improve the pace for finding and fixing troublesome bugs.

**cc - keep calm and clear cache**

If you need to force something to refresh, or are trying to eliminate uncertainty when debugging, as we all know clearing the caches is the first thing to try. Drush makes it easy. There's an interactive option to choose which cache to clear:

```
drush @pantheon.outlandish-josh.live cc
Enter a number to choose which cache to clear.
 [0]  :  Cancel
 [1]  :  all
 [2]  :  drush
 [3]  :  theme-registry
 [4]  :  menu
 [5]  :  css-js
 [6]  :  block
 [7]  :  module-list
 [8]  :  theme-list
 [9]  :  registry
```

Or you can just cut to the chase with a **cc all**, which is equivalent to going to the performance settings and clicking "clear all caches":

```
drush @pantheon.outlandish-josh.live cc all
'all' cache was cleared in                                             [success]
/srv/bindings/af12454fa2374c6e96a9da839815d649/code#outlandishjosh.com
```

There are many many more time-saving Drush functions, and like everything else in Drupal it's built with a modular structure and solid APIs, so creating your own commands is just like writing a custom module. You can get a full list of commands from **drush help**, and detailed help with **drush help [command]**.

#### Pick Up Speed Installing Modules

One of my favorite combinations is Drush with Pantheon's SFTP mode. This lets you bootstrap up a site on Pantheon and install your favorite stack of modules in no time.

1. Put your dev environment in SFTP mode, so it's ready to take new code inputs.
2. Use **drush dl** to snag your favorite modules, for instance:
```
drush @pantheon.your-site.dev dl views ctools panels
```
3. Use the Pantheon dashboard to commit your changes.



Once that's done, you can enable (and disable) modules you've just added to the site as well; no more wading through the admin/modules interface:

```
drush @pantheon.sftp-mode-ftw.dev en views panels
The following extensions will be enabled: views, panels, ctools
Do you really want to continue? (y/n): y
ctools was enabled successfully.                                            [ok]
panels was enabled successfully.                                            [ok]
views was enabled successfully.                                             [ok]
```

Notice how Drush detected ctools as a dependency and told me this would be enabled too? Nice. This kind of workflow can really speed up a new project start: you can have a one-line copy/paste command that installs your favorite suite of modules in seconds.

Checkpoint! You've now used Drush to enable new functionality for your site on Pantheon.

#### Hit the Turbo with Terminus

[Terminus](https://github.com/pantheon-systems/terminus) is the Pantheon command-line interface. It lets you do everything possible in the Pantheon dashboard via your terminal, and is implemented as an extension to Drush. If you'd like to install it with all dependencies, you can use composer:

```
composer create-project pantheon-systems/terminus $HOME/.drush/terminus -s dev --no-dev -n
drush cc drush
```

You can also install it with git (see the README) or by grabbing the latest tarball:

```
wget https://github.com/pantheon-systems/terminus/archive/latest.tar.gz
tar -xzvf latest.tar.gz
mv terminus-latest  $HOME/.drush/terminus
drush cc drush
```

Once installed, your first step is to authenticate your install of Terminus using the **pauth** (short for "pantheon-authenticate") command:

```
drush pauth outlandish.josh@gmail.com
Pantheon dashboard password for outlandish.josh@gmail.com:
Authenticating as outlandish.josh@gmail.com                    [ok]
Success!                                                       [ok]
```

Now you can list your sites, create new sites, deploy code, connect to databases... almost anything you like! Check out this amazing demo script from the README file:

```
# Specify the site name...
SITE_NAME=REPLACEME
# And a description...
SITE_DESC="Building a site with drush_make and Terminus"
# Authenticate.
drush pauth YOUR@EMAIL.COM --password=TOOMANYSECRETS
# Create the site using Drupal 7 (drops-7) as the base.
drush psite-create $SITE_NAME --label="$SITE_DESC" --product=21e1fada-199c-492b-97bd-0b36b53a9da0
# Update your aliases.
drush paliases
# Determine the site_uuid of the newly created site.
SITE_UUID=$(drush psite-uuid $SITE_NAME)
# Change the connection mode of the dev environment to SFTP.
drush psite-cmode $SITE_UUID dev sftp
# Use a public URL as the source for drush_make to download a few modules.
drush -y @pantheon.$SITE_NAME.dev make --no-core https://raw.github.com/pantheon-systems/terminus/master/demo.make
# Install the site. Remember to grab the password, or use drush uli later.
drush -y @pantheon.$SITE_NAME.dev si --site-name="$SITE_DESC" pantheon
# Commit the changes.
drush psite-commit $SITE_UUID dev --message="Base tools from drush_make"
# Change the connection mode back to git.
drush psite-cmode $SITE_UUID dev git
# Disable unnecessary modules.
drush -y @pantheon.$SITE_NAME.dev dis overlay comment rdf toolbar
# Enable new modules.
drush -y @pantheon.$SITE_NAME.dev en admin_menu module_filter features views views_ui ctools generate_errors admin_menu_toolbar devel_generate
# Generate test content.
drush @pantheon.$SITE_NAME.dev generate-content 50
# Deploy code to test environment.
drush psite-deploy $SITE_UUID test
# Deploy content to test environment.
drush psite-clone $SITE_UUID dev test
```

## <span style="color: red"> Conclusion Section</span>

<span style="color: red">Include a summary of what you've just accomplished.</span>

Congratulations! You're now the proud owner of a lean, mean, command-line scriptable Drupal development machine. Best of luck with your projects, and feel free to drop your favorite Drush tips and tricks in the comments.
