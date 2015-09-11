Feature: Docs

  Scenario Outline: Homepage 1 - Verify 200 status code for pages linked from the homepage
    Given I am on the homepage
    When I send a GET request to "<end-point>"
    And the response status code should be 200
  Examples:
    | end-point                                                                            |
    | articles                                                                             |
    | guides                                                                               |
    | changelog                                                                            |
    | articles/power-users                                                                 |
    | articles/getting-started                                                             |
    | articles/required-reading-essential-pantheon-documentation                           |

  Scenario: Homepage 2 - SEO links exist, License does exist
    Given I am on the homepage
    Then I should see "Drupal Hosting"
    And I should see "WordPress Hosting"
    And I should see "Website Management Platform"
    And I should see "All work is licensed"
    But I should not see "Join our weekly training."

  Scenario: Search
    Given I am on the homepage
    Then I should see the CSS selector "#search"
    When I follow "All Articles"
    Then I should see the CSS selector "#search"
    Given I am on "articles/required-reading-essential-pantheon-documentation"
    Then I should see the CSS selector "#search"
    Given I am on the homepage
    And I follow "Guides"
    Then I should see the CSS selector "#search"
    Given I am on "guides/automated-testing-wordpress-behat"
    Then I should see the CSS selector "#search"
    Given I am on the homepage
    And I follow "Changelog"
    Then I should see the CSS selector "#search"
    Given I am on "changelog/2015-09-September"
    Then I should see the CSS selector "#search"

  @javascript
  Scenario: CTA - All links present
    Given I am on the homepage
    When I follow "Required Reading"
    Then I press "Contribute to Docs"
    And I should see "Edit This Doc"
    And I should see "Report Doc Issue"
    And I should see "Suggest New Doc"
