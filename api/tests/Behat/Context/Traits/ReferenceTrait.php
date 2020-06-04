<?php

namespace App\Tests\Behat\Context\Traits;

use App\Tests\Behat\Manager\ReferenceManager;
use Behat\Gherkin\Node\PyStringNode;

trait ReferenceTrait
{
    private ReferenceManager $referenceManager;

    /**
     * @Given /^I set a variable "([^"]*)" with value :value$/
     */
    public function iSetVariableWithValue(string $name, string $value): void
    {
        $value = $this->referenceManager->renderTwigTemplate($value);
        $this->referenceManager->setReference($name, $value);
    }

    /**
     * @Given /^I set a variable "([^"]*)" with value:$/
     */
    public function iSetVariableWithPyStringNodeValue(string $name, PyStringNode $value): void
    {
        $value = $this->referenceManager->renderPyStringNodeTemplate($value);

        $this->referenceManager->setReference($name, $value->getRaw());
    }

    /**
     * @Given /^I set a last payload as "([^"]*)"$/
     */
    public function iSetLastResponse(string $name): void
    {
        $payload = $this->getScopePayload();

        $this->referenceManager->setReference($name, $payload);
    }
}
