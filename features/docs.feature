Feature: Docs

  Scenario Outline: Homepage 1 - Verify 200 status code for pages linked from the homepage
    Given I am on the homepage
    When I send a GET request to "<page>"
    Then the response status code should be 200
  Examples:
    | page                                                                                 |
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

  Scenario Outline: Search
    Given I am on the homepage
    Then I should see the CSS selector "#search"
    Given I am on "<page>"
    Then I should see the CSS selector "#search"
  Examples:
    | page                                                                                 |
    | articles                                                                             |
    | articles/required-reading-essential-pantheon-documentation                           |
    | guides                                                                               |
    | guides/automated-testing-wordpress-behat                                             |
    | changelog                                                                            |
    | changelog/2015-09-September                                                          |


  @javascript
  Scenario: CTA - All links present
    Given I am on the homepage
    When I follow "Required Reading"
    And I press "Contribute to Docs"
    Then I should see "Edit This Doc"
    And I should see "Report Doc Issue"
    And I should see "Suggest New Doc"
