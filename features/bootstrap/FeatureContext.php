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
