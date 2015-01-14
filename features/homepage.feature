Feature: Homepage
  In order to know that CI worked
  As a website user
  I need to be able to see that the homepage is correct

  Scenario: The homepage title
    Given I am on "/"
    Then I should see "Required Reading"
