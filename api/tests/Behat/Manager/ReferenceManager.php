<?php

namespace App\Tests\Behat\Manager;

use Behat\Gherkin\Node\PyStringNode;
use Symfony\Component\HttpKernel\KernelInterface;

class ReferenceManager
{
    private $values = [];

    private $twig;

    public function __construct(KernelInterface $kernel)
    {
        $container = $kernel->getContainer();

        if (!$container->has('twig')) {
            throw new \LogicException(
                "Could not find 'twig' service. Try running 'composer req --dev twig/twig symfony/twig-bundle' or 'composer require template' if you prefer using flex."
            );
        }

        $twig = $container->get('twig');
        $this->twig = $twig;
    }

    public function renderTwigTemplate(string $string): string
    {
        $template = $this->twig->createTemplate($string);

        return $this->twig->render($template, $this->values);
    }

    public function renderPyStringNodeTemplate(PyStringNode $pyStringNode): PyStringNode
    {
        $line = $pyStringNode->getLine();
        $raw = $this->renderTwigTemplate($pyStringNode->getRaw());

        return new PyStringNode(explode("\n", $raw), $line);
    }

    public function getReference(string $reference) {
        return $this->values[$reference];
    }

    public function addReference(string $reference, $value) {
        return $this->values[$reference] = $value;
    }

    public function removeReference($reference) {
        unset($this->values[$reference]);
    }

    public function checkReference($reference): bool
    {
        return array_key_exists($reference, $this->values);
    }

    /**
     * Get the value of values
     */
    public function getValues()
    {
        return $this->values;
    }

    /**
     * Set the value of values
     *
     * @return  self
     */
    public function setValues($values)
    {
        $this->values = $values;

        return $this;
    }
}
