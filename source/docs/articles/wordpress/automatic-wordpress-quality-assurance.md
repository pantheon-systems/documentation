---
title: Automatic Quality Assurance for WordPress sites
description: Understand how to use Behat to write automated tests for your WordPress sites. 
category:
  - developing

---

If you're desiging WordPress sites, there's no doubt you got something working only to have it break later. It's tedious to test the same features again and again, especially when it requires clicking, filling out forms, and verifying everything looks the way it should. Fortunately with Behat, it's easy to write automated tests in plain English and add them to your WordPress projects.

## Before You Begin
Make sure that you have:
* knowledge of the command line
* Installed [Composer](https://getcomposer.org/)
* A WordPress site (free to create on Pantheon)

## Key Terms
* **Behat**: Testing framework built in PHP.
* **Mink**: Works with Behat and lets you script the browser with various drivers.
For example:
    - Goutte: Fast driver, but doesn't support testing functionality that requires JavaScript
    - Selenium: slower, but supports JavaScript.
* Feature: A test - may have several scenarios
* Gherkin: Language that uses structured, plain English 


## Sample Test


We're treating the site as a black box and we won't be interacting with the WordPress API or your site's database at all. You can actually use Behat to test *any* website, not just a WordPress site.
 
 
Feature: As a visitor I should be able to load the home page
Scenario: Homepage loads  
Given I am on the homepage
Then I should see "Test With Robots"

##Install Behat and Mink

Create a composer.json file in a new directory. This is a plain text file that describes a list of software packages
we'll install. Composer will resolve any dependencies, and download those as well.


```
git clone <url from Pantheon site dashboard> withrobots
cd withrobots/wp-content
mkdir -p tests/behat
cd tests
atom composer.json

{
    "require": {  
        "behat/behat": "2.4.*@stable",  
        "behat/mink": "1.4.*@stable",  
        "behat/mink-extension": "*",  
        "behat/mink-goutte-driver": "*",  
        "behat/mink-selenium2-driver": "*"  
    },  
    "minimum-stability": "dev",  
    "config": {  
        "bin-dir": "bin/"  
    }  
}  
```
Install Behat, Mink, and the specificied Mink drivers using composer:

`composer install`

Look in the directory after running composer install to see what's changed.


`git status`


Now from the command line run:

```
 ./bin/behat
```

Behat will look for the automated tests in the `features` directory.

## Create a New Feature

Now let's create our first feature:

```
vim behat.yml


# behat.yml
default:
    extensions:
        Behat\MinkExtension\Extension:
            base_url:    'http://dev-withrobots.pantheon.io'
            goutte:      ~
            selenium2: ~
            show_cmd: "firefox %s"


```
Feature: Blog

Scenario: As a visitor, I do not see "My Awesome Blog Post"
Given I am on the homepage
Then I should not see "My Awesome Blog Post"

Scenario: As an admin I can post to the blog
Given I am on the homepage
When I follow "Log in"
Then I should see "Lost your password?"
And I fill in "Username" with "Ari"
And I fill in "Password" with ""  ## TODO update this to lookup password from file not in version control
And I press "Log In"
Then I should see "Dashboard"
And I follow "Posts"
And I follow "Add New"
And I fill in "post_title" with "My Awesome Blog Post"
And I fill in "content" with "This post was made by robots."
And I press "Publish"
Then I should see "Post published"

Scenario: As a visitor I can see recent blog post
Given I am on the homepage
Then I should see "My Awesome Blog Post"

```


Feature: As a visitor I should be able to load the home page
Scenario: Home page loads
Given I am on the homepage
Then I should see "Test With Robots"

http://docs.behat.org/en/v2.5/cookbook/behat_and_mink.html



@javascript

TODO:

USe following in Bootstrap/FeatureContext.php and lookup password from behat.local.yml. Put behat.sample.yml in repo that needs to be copied to
behat.local.yml and not in version control

/**
* @} End of defgroup "drupal.org"
*/

/**
* Authenticates a user.
*
* @Given /^I am logged in as the "([^"]*)" with the password "([^"]*)"$/
*/
public function iAmLoggedInAsWithThePassword($username, $passwd) {
  $user = $this->whoami();
  if (strtolower($user) == strtolower($username)) {
    // Already logged in.
    return;
  }

  $element = $this->getSession()->getPage();
  if (empty($element)) {
    throw new Exception('Page not found');
  }
  if ($user != 'User account') {
    // Logout.
    $this->getSession()->visit($this->locatePath('/user/logout'));
  }

  // Go to the user page.
  $this->getSession()->visit($this->locatePath('/user'));
  // Get the page title.
  $title_element = $element->findByID('page-title');
  if (empty($title_element)) {
    throw new Exception ('No page title found at ' . $this->getSession()
    ->getCurrentUrl());
  }
  $page_title = $title_element->getText();

  if ($page_title == 'User account') {
    // If I see this, I'm not logged in at all so log in.
    $element->fillField('Username', $username);
    $element->fillField('Password', $passwd);
    $submit = $element->findButton('Log in');
    if (empty($submit)) {
      throw new Exception('No submit button at ' . $this->getSession()
      ->getCurrentUrl());
    }
    // Log in.
    $submit->click();
    $user = $this->whoami();
    if (strtolower($user) == strtolower($username)) {
      HackyDataRegistry::set('username', $username);
      $link = $this->getSession()->getPage()->findLink("Your Dashboard");
      // URL format: /user/{uid}/dashboard
      preg_match("/\/user\/(.*)\//", $link->getAttribute('href'), $match);
      if (!empty($match[1])) {
        HackyDataRegistry::set('uid:' . $username, trim($match[1]));
      }
      return;
    }
  }
  else {
    throw new Exception("Failed to reach the login page.");
  }

  throw new Exception('Not logged in.');
}

/**
* Authenticates a user with password from configuration.
*
* @Given /^I am logged in as the "([^"]*)"$/
*/
public function iAmLoggedInAs($username) {
  $password = $this->fetchPassword('drupal', $username);
  $this->iAmLoggedInAsWithThePassword($username, $password);
}
