Feature: Changelog
  In order to review platform improvements and new resources
  As a visitors
  I need to be able to read changelogs

  Scenario Outline: Preview a list of all available changelogs
    Given I am on the homepage
    When I follow "Changelog"
    Then I should see "<page>"
    Examples:
      | page |
      | January |
      | February |
      | March |
      | April     |
      | May       |
      | June      |
      | July      |
      | August    |
      | September |
      | October   |
      | December  |
  Scenario: Use pagination to review newer and older changelogs
    When I follow "December"
    And I follow "Older"
    Then I should see "October 2015"
    And I follow "Newer"
    Then I should see "December 2015"
