---
title: Automated Testing for WordPress with Behat
description: Understand how to use Behat to write automated tests for your WordPress sites.
category:
- developing
- WordPress
---
If you're developing WordPress sites, there's no doubt you've had something working only to later find it broken. Dev, Test, and Live environments help reduce the risk of breaking something in production, but it's tedious to manually test every time you make a change. Fortunately, tools like [Behat](http://docs.behat.org) let you automate quality assurance. Describe a feature once, in [plain English](http://docs.behat.org/en/latest/guides/1.gherkin.html), and every time you run Behat it will script the browser to do things like click, fill out forms, and verify certain text is present.

Before diving in to install Behat, take a look at a Behat test, which is called a feature:

```
# features/blog.feature
Feature: Blog
  In order for our website to be awesome
  As a visitor
  I need to be able to read published posts

  Scenario: As a user with the editor role I can publish blog posts
  Given I am logged in as "editor-qa"
  When I follow "Posts"
  And I follow "Add New"
  And I press "Text"
  And I fill in "post_title" with "My Awesome Blog Post"
  And I fill in "content" with "This post was made by robots."
  And I press "Publish"
  Then I should see "Post published"
```

The test is easy to understand, so designers, project managers, and even non-technical team members can collaborate on tests that ensure the site's functionality meets business expectations.

In this guide we'll show how to setup Behat on your local machine and run automated tests against a remote WordPress site.  


## Install

If you don't already have a WordPress site, you can [create one for free](https://pantheon.io/docs/articles/wordpress/starting-wordpress-site/) on Pantheon.

I love the command line and I'm using [Git](https://pantheon.io/docs/articles/local/starting-with-git/), but you can adapt the following steps if you prefer working with [SFTP](https://pantheon.io/docs/articles/sites/code/developing-directly-with-sftp-mode/).

First, I download my WordPress site's codebase by doing a `git clone` of my Pantheon site:

```
git clone <string from Pantheon Site Dashboard>
```

Next, create a new directory to install Behat and navigate to that directory:

```
cd site-name/wp-content
mkdir tests
cd tests
```

Download WordPress Behat Quickstart:

```
curl https://codeload.github.com/ari-gold/WordPress-Behat-Quickstart/zip/master > WordPress-Behat-Quickstart.zip
unzip WordPress-Behat-Quickstart.zip
mv WordPress-Behat-Quickstart-master behat
```

Now take a look at what you've downloaded:

```
cd behat
ls
```
You'll see the following output:

```
behat.local.yml.sample	behat.yml		composer.json		composer.lock		features
```

Add to the Git repo for our site:

```
git add .
git commit -m "Add WordPress Behat Quickstart"
```

Next, copy `behat.local.yml.sample` to `behat.local.yml`:

```
cp behat.local.yml.sample behat.local.yml
```
We'll return to `behat.local.yml` in a bit, where we'll add passwords to be able to log in as various WordPress users.

If you look at the `composer.json` file, you'll see a list of software packages to install with Composer. If you have [Composer](http://getcomposer.org) installed globally run:
```
composer install
```
or to download and run [Composer](http://getcomposer.org) in the current directory run:

```
curl -s http://getcomposer.org/composer.phar > composer.phar
php composer.phar install
```
Downloading everything may take a while, with a lot of output. We used Composer to install Behat, Mink, and two browser drivers for Mink. **Behat** is the testing framework, written in PHP. **Mink** extends Behat and lets you work with web applications. The two browser drivers we installed for Mink are **Goutte**, which is fast, and **Selenium**, which is slower than Goutte, but supports Javascript.

It should finish with the following output:

```
Generating autoload files
```

Now that we've installed Behat you might think it's a good time to make a commit to save our work, but everything we've installed would be ignored by Git and not added to version control because they are listed in the `.gitignore` bundled with the starter kit to keep the repo lighter weight, and to make sure passwords in `behat.local.yml` stay out of version control.

To verify Behat is installed, list the available step definitions:

```
bin/behat -dl
```

You'll see a longer list of available step definitions like the following:

```
    When /^(?:|I )follow "(?P<link>(?:[^"]|\\")*)"$/
    When /^(?:|I )fill in the following:$//
    Then /^(?:|I )should not see "(?P<text>(?:[^"]|\\")*)"$/
```
Each step definition has regex placeholders. The first, for example, allows you to include steps like `When I follow "Contact Us"` in your features that would look for the "Contact Us" link and click on it.

Now that we've installed Behat, let's move on to configure it for your WordPress site.

## Configure

The starter kit comes with a `behat.yml` file that configured Behat to use Mink, browser drivers, and a placeholder `base_url` of the site we want to run the tests.

Open up `behat.yml` with your text editor or IDE of choice (lately I've been using [vim](https://www.vim.org) or atom.io(http://atom.io/) and change the `base_url` under the `default` profile from `https://dev-mysite.pantheon.io` to the URL of the site you want to test, and save.

Verify your changes look good with `git diff` and then commit your changes:

```
git add behat.yml
git commit -m "Update base_url so Behat will test against https://example.com"
```

Open `features/homepage-works.feature` and replace "Test with Robots" with a phrase that is on your home page and you'll be ready to test to see if your homepage works!

Save, commit, and push and your team members will be able to skip this **Configure** section, since you've already done it for them:

```
git add features/homepage-works.feature`
git commit -m "Customize homepage feature for My Awesome Website"
git push origin master
```

## Write & Run Tests

### Feature: Home page works

Running Behat without any arugments will run every feature in the features directory. We'll only runs tests with a certain tag:

```
bin/behat --tags=smoke
```

In my case, I see the test fails:

```
@smoke
Feature: As a visitor I should be able to load the home page

  Scenario: Home page loads              # features/homepage_works.feature:3
    Given I am on the homepage           # FeatureContext::iAmOnHomepage()
    Then I should see "Test with Robots" # FeatureContext::assertPageContainsText()
      The text "Test with Robots" was not found anywhere in the text of the current page.

1 scenario (1 failed)
2 steps (1 passed, 1 failed)
0m0.533s
```

Although not shown above, the output will be color-coded so you can quickly see if a step passes in green, fails in red, or if there's a notice in yellow.

After seeing that the test failed, I visited the home page and realized that the test failed because WordPress isn't installed yet. Even though I created the Dev environment I never actually installed WordPress. I could visit the home page to do the famous 5-minute install, but I decide to use [terminus and wp cli](/docs/guides/create-a-wordpress-site-from-the-commandline-with-terminus-and-wp-cli/) to install from the command line:

```
terminus wp core install --url=http://test-withrobots.pantheon.io \
                           --title="Test With Robots" \
                           --admin_user=admin --admin_password=something_incredibly_secure \  
                           --admin_email=test@example.com
                           --site=withrobots \
```
I see the following output:

```
Success: WordPress installed successfully.
```

Now that WordPress is installed, run Behat again (this time instead of tag we're using the feature filename):
```
bin/behat features/homepage-works.feature
```
After installing WordPress and giving the site the title "Test with Robots" the test now passes!

```
Feature: As a visitor I should be able to load the home page

  Scenario: Home page loads              # features/homepage_works.feature:3
    Given I am on the homepage           # FeatureContext::iAmOnHomepage()
    Then I should see "Test with Robots" # FeatureContext::assertPageContainsText()

1 scenario (1 passed)
2 steps (2 passed)
0m1.482s
```

The process of writing a test before the feature has been implemented and then implementing the feature so the test will pass is the core of **Behavior Driven Development (BDD).**

### Adding @javascript

When you add `@javascript` to the beginning of a feature or scenario, a browser driver that supports Javascript will be used, in this case Selenium 2. Using Selenium requires the following:

1. Download Selenium Server from [http://www.seleniumhq.org/download/](http://www.seleniumhq.org/download/)
2. Execute Selenium Server from the commmand line:
```
cd ~/Downloads/
java -jar selenium-server-standalone-2.45.0.jar
```

**Note:**

- If you've upgraded your browser and Selenium tests stop working, try downloading a newer version of Selenium Server.
- You'll have two terminal windows open, one to run Selenium server, and one to run Behat.
- Drivers like Goutte are faster than Selenium, so don't tag your test with @javascript unless it's necessary.
- More drivers are out there, so feel free to experiment!

```
@javascript
Scenario: As a visitor I can see a recent blog post
Given I am on the homepage
Then I should see "My Awesome Blog Post"
```

Now when you run a test tagged with `@javascript`, you'll see a browser window open and the see the test run. The first time you do it, it definintely feels like magic!


### Authenticating users with a custom step defintion

While we could hard-code passwords into each and every feature that requires logging in to the WordPress site, there's a better way! The starter kit extends Behat to define new step definitions in `features/bootstrap/FeaturesContext.php`. One of our new step definitions will look up passwords in the `behat.local.yml` file for a corresponding user. We're adapting this approach from the [Drupal.org BDD](https://www.drupal.org/project/doobie) project.

Now is a good time to create a few users with various roles for testing. For the test included in the starter kit, create a user named "editor-qa", with the role of "editor" and add the password in `behat.local.yml`

```
bin/behat --tags=@wip
```

You'll see the following output:

```
@javascript @wip
Scenario: As a user with the editor role I can post to the blog
Given I am logged in as "editor-qa"
And I follow "Posts"
And I follow "Add New"
And I press "Text"
And I fill in "post_title" with "My Awesome Blog Post"
And I fill in "content" with "This post was made by robots."
And I wait for the message to appear
And I press "Publish"
Then I should see "Post published"
```

You'll also see the browser fire up and run through the test (click animated gif for full screen):

[![Feature: Editor can post to blog. Behat, Selenium Server running, automating browser](/source/docs/assets/images/automated-testing-wordpress-behat.gif)](http://recordit.co/vEFYVJq4tM.gif)


Now you should be on your way to writing and running more automated Behat tests for your WordPress sites!


## Next Steps

We ran tests from our local machine against a remote site and treated the remote site as a "black box." Even if you've already implemented a continous integration system and are ready to add Behat tests to it, running tests from your local machine can be helpful, especially when writing and debugging tests.

You can use existing step definitions to write more features. You can also get even more sophisticated with the following:

* Adding Behat tests to continuous integration / continuous deployment pipeline
* Do more than "black box" testing. Extend Behat to interact with the WordPress API or DB directly
  * The Behat [DrupalExtension](https://github.com/jhedstrom/drupalextension) is actively maintained and could serve as inspiration for a WordPress Behat Extension.

Every time you add a test you've removed the burden of needing to manually test, and added some peace of mind next time you deploy. Just one test is better than nothing. Start small, one test at a time. Progress, not perfection.

If you run just one test every time you deploy, you're likely already doing more than your competitors.  Baking automated testing into your dev process will help you deliver high quality WordPress sites and set you apart from other agencies. **Happy automated testing!**

## Related resources

* [Behat](http://behat.org)
* [Mink](http://mink.behat.org/)
* [Writing Features](http://docs.behat.org/en/latest/guides/1.gherkin.html)
* [What's in a story?](http://dannorth.net/whats-in-a-story/)
* WordPress Behat projects: [wdalmut/WordPressExtension](https://github.com/wdalmut/WordPressExtension) and [maartenJacobs/WordPress-Behat-Context](https://github.com/maartenJacobs/WordPress-Behat-Context)
* [Behat Drupal Extension](https://github.com/jhedstrom/drupalextension)
* [Drupal.org BDD](https://www.drupal.org/project/doobie)
