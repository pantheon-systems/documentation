Feature: Docs

Scenario: Find SEO links and license
    Given I am on the homepage
        Then I should see "Drupal Hosting"
        And I should see "WordPress Hosting"
        And I should see "Website Management Platform"
        And I should see "All work is licensed"
        But I should not see "Join our weekly training."

Scenario Outline: Search is available on all layouts
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

Scenario Outline: TOC exists on expected layouts
    Given I am on "<page>"
        Then I should see the CSS selector "#toc"
    Examples:
        | page                                                                                 |
        | articles                                                                             |
        | articles/required-reading-essential-pantheon-documentation                           |
        | articles/sites                                                                       |
        | changelog/2015-09-September                                                          |
        | guides/ssl-with-cloudflare                                                           |

@javascript
Scenario: CTA - All links present
    Given I am on the homepage
    When I follow "Required Reading"
    And I press "Contribute to Docs"
        Then I should see "Edit This Doc"
        And I should see "Report Doc Issue"
        And I should see "Suggest New Doc"
