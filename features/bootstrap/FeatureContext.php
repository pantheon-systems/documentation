<?php
use Behat\MinkExtension\Context\MinkContext;
use Behat\Behat\Context\ClosuredContextInterface,
    Behat\Behat\Context\TranslatedContextInterface,
    Behat\Behat\Context\BehatContext,
    Behat\Behat\Exception\PendingException;
use Behat\Gherkin\Node\PyStringNode,
    Behat\Gherkin\Node\TableNode;

// Require 3rd-party libraries here:
//
//   require_once 'PHPUnit/Autoload.php';
//   require_once 'PHPUnit/Framework/Assert/Functions.php';
//

/**
 * Features context.
 */
class FeatureContext extends MinkContext
{
    /**
     * @Then /^I should see the css selector "([^"]*)"$/
     * @Then /^I should see the CSS selector "([^"]*)"$/
     */
    public function iShouldSeeTheCssSelector($css_selector)
    {
        $element = $this->getSession()->getPage()->find("css", $css_selector);
        if (empty($element)) {
            throw new \Exception(sprintf("The page '%s' does not contain the css selector '%s'", $this->getSession()->getCurrentUrl(), $css_selector));
        }
    } 
    /**
     * @When /^I send a ([^"]*) request to "([^"]*)"$/
     */
    public function iSendARequestTo($method, $url)
    {
        $client = $this->getSession()->getDriver()->getClient();
        $client->request($method, $url);
    }
    /**
     * Verify contributor CTA button
     *
     * @Then /^I find the element with ID "([^"]*)"$/
     *
     * @param $elementId ID attribute of an element
     * @throws \InvalidArgumentException
     */
    public function clickElementWithGivenId($elementId)
    {
        $this->getSession()->getPage()->findById($elementId);
        if (null === $elementId) {
        throw new \InvalidArgumentException(sprintf('Could not evaluate find', $elementId));
    }
        return true;
    }
}
