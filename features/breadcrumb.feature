Feature: Breadcrumb
  In order to navigate the documentation site easily
  As a visitor
  I need to be able to utilize breadcrumbs

  Scenario: Use breadcrumbs as a nav point of reference when browsing articles
    Given I am on the homepage
    And I follow "All Articles"
    And I follow "Sites"
    And I follow "Choosing Your Start State"
    Then I should see "Docs › Articles › Sites › Create › Choosing Your Start State"
  Scenario: Navigate to path related articles using breadcrumbs
    Given I am on the homepage
    And I follow "All Articles"
    And I follow "Sites"
    And I follow "Choosing Your Start State"
    And I follow "Create"
    Then I should see "Creating Sites"
    When I follow "Sites"
    Then I should see "The Site Dashboard"
  Scenario: Use breadcrumbs as a nav point of reference when browsing guides
    Given I am on the homepage
    And I follow "Guides"
    And I follow "Using Wraith for Visual Regression Testing"
    Then I should see "Docs › Guides › Using Wraith for Visual Regression Testing"
  Scenario: Navigate to path related articles using breadcrumbs
    Given I am on the homepage
    And I follow "Guides"
    And I follow "Using Wraith for Visual Regression Testing"
    And I follow "Guides"
    Then I should see "All Guides"
