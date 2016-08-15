Feature: Changelog
  In order to review platform improvements and new resources
  As a visitors
  I need to be able to read changelogs

  Scenario: Preview a list of all available changelogs
    Given I am on the homepage
    When I follow "Changelogs"
    Then I should see "Platform Improvements"
    And I should see "Older"
    And I should see "Newer"
