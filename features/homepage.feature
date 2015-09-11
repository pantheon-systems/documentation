Feature: Docs
  In order to know that CI worked
  As a website user
  I need to be able to see that the homepage is correct, expected elements are present, and CTA's exist.

  Scenario: The homepage text includes expected content, such as links to all articles, etc.
    Given I am on the homepage
    Then I should see "Required Reading"
    And I should see "Getting Started"
    And I should see "Guides"
    And I should see "All Articles"
    And I should see "Changelog"
    And I should see "Power Users Group"
    And I should see "Drupal Hosting"
    And I should see "WordPress Hosting"
    And I should see "Website Management Platform"
    And I should see "All work is licensed"
    But I should not see "Join our weekly training."


  @javascript
  Scenario: Verify Contributor CTA button exists
    Given I am on the homepage
    When I follow "Required Reading"
    And I press "Contribute to Docs"
    Then I should see "Edit This Doc"
    And I should see "Report Doc Issue"
    And I should see "Suggest New Doc"
