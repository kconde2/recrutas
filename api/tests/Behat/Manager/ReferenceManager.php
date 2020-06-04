<?php

namespace App\Tests\Behat\Manager;

use Behat\Gherkin\Node\PyStringNode;
use Twig\Environment;

class ReferenceManager
{
    private $references = [];

    private $twig;

    public function __construct(Environment $twig)
    {
        $this->twig = $twig;
    }

    public function renderTwigTemplate(string $string): string
    {
        $template = $this->twig->createTemplate($string);

        return $this->twig->render($template, $this->references);
    }

    public function renderPyStringNodeTemplate(PyStringNode $pyStringNode): PyStringNode
    {
        $line = $pyStringNode->getLine();
        $raw = $this->renderTwigTemplate($pyStringNode->getRaw());

        return new PyStringNode(explode("\n", $raw), $line);
    }

    public function getReference(string $reference)
    {
        return $this->references[$reference] ?? null;
    }

    public function setReference(string $reference, $value)
    {
        return $this->references[$reference] = $value;
    }

    public function removeReference(string $reference)
    {
        unset($this->references[$reference]);
    }

    public function checkReference($reference): bool
    {
        return array_key_exists($reference, $this->references);
    }

    public function cleanReferences(): void
    {
        $this->references = [];
    }

    /**
     * Get the value of references
     */
    public function getReferences()
    {
        return $this->references;
    }

    /**
     * Set the value of references
     *
     * @return  self
     */
    public function setReferences($references)
    {
        $this->references = $references;

        return $this;
    }
}
