---
title: Guide Example
description: Learn how to create a great guide.
draft: true

---

## <span style="color: red">Introduction Section</span>

### <span style="color: red">Problem Scenario</span>
<span style="color: red">Give a 3-5 sentence intro, with a summary of what you plan to accomplish or problem you want to solve in this guide. The introduction section should not be Pantheon specific, but rather a statement to introduce the problem and solution. Do not reference Pantheon in the intro--focus solely on the problem and goal.</span>

I'm proud of the Pantheon dashboard and all the technologies that feed it, but as a developer I am definitely in the **CLI4LIFE** camp. I can type faster than I can click, and I like being able to repeat, script and automate things. Don't make me use a browser when what I really want is a shell.

### <span style="color: red">Solution</span>

<span style="color: red">Give a summary of how you plan to solve the problem. Include any known limitations that you can anticipate. If you're presenting a solution for mail, discuss whether the solution will be for incoming, outgoing, or both.</span>

That's why we took care to engineer a Drush interface into our [runtime matrix](https://www.getpantheon.com/blog/why-we-built-pantheon-containers-instead-virtual-machines) from the ground up; no small feat. Even though your site could be running from different locations in Pantheon's platform, you can still use Drush to control it. But if you've never used Drush before, here are 5 steps to "feeling the Drush"

### <span style="color: red">Background</span>
<span style="color: red">Here you can provide any background information as needed. Any additional technical info or context. Optional, but this is highly valuable if done well. Include how the solution plays into the general infrastructure of a website.

<span style="color: red">Things to consider including:

<span style="color: red">Environment: things you'll need in order to follow this guide.

<span style="color: red">Key Concepts: stuff you'll need to understand; may link to external references. This is a great place to include a diagram to help the reader work with a solid "mental model" of the situation.</span>

## <span style="color: red">Action Section</span>

<span style="color: red">Here is where you explain what actions are necessary to complete the task or achieve the goal of the guide. Whenever possible give several examples or use cases. Be as verbose as possible to set the readers expectations for each step taken. </span>

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


## <span style="color: red"> Conclusion Section</span>

<span style="color: red">Prove the solution works as intended and put the user in a position where they can see results. Include a summary of what you've just accomplished.</span>

Congratulations! You're now the proud owner of a lean, mean, command-line scriptable Drupal development machine. Best of luck with your projects, and feel free to drop your favorite Drush tips and tricks in the comments.

## <span style="color: red"> Next Steps</span>

<span style="color: red">Show links to related or more advanced guides.</span>

Next Steps: Using drush for local development

Using terminus for common dashboard commands
