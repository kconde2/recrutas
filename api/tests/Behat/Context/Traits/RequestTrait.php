<?php

namespace App\Tests\Behat\Context\Traits;

use App\Tests\Behat\Manager\RequestManager;
use Behat\Gherkin\Node\PyStringNode;
use GuzzleHttp\Psr7\Request;

trait RequestTrait
{
    private RequestManager $requestManager;

    /**
     * @Given I have the payload
     */
    public function iHaveThePayload(PyStringNode $requestPayload)
    {
        $requestPayload = $this->referenceManager->renderPyStringNodeTemplate($requestPayload);

        $this->requestManager->setRequestPayload(json_decode($requestPayload->getRaw()));
    }

    /**
     * @When /^I request "(GET|PUT|POST|DELETE|PATCH) ([^"]*)"$/
     */
    public function iRequest($httpMethod, $resource)
    {
        $method = strtoupper($httpMethod);

        $resource = $this->referenceManager->renderTwigTemplate($resource);

        // $options = [];

        // if ($this->authUser) {
        //     $options = [
        //         'auth' => [
        //             $this->authUser,
        //             $this->authPassword
        //         ]
        //     ];
        // }
        // $this->authManager->isAuthenticated()
        // Add token to header
        // Otherwise remove token from header

        $request = new Request(
            $httpMethod,
            $resource,
            $this->requestManager->getRequestHeaders(),
            $this->requestManager->getRequestPayload()
        );

        $this->requestManager->setLastRequest($request);

        try {
            // Send request
            $response = $this->requestManager->request($method, $resource);
            $this->requestManager->setLastResponse($response);
        } catch (\Exception $e) {
            $response = $e->getMessage();

            if ($response === null) {
                throw $e;
            }

            $this->requestManager->setLastResponse($response);
            throw new \Exception('Bad response.');
        }
    }

    /**
     * Set before send request
     *
     * @Given /^I set the "([^"]*)" header to be "([^"]*)"$/
     */
    public function iSetTheHeaderToBe($headerName, $value)
    {
        $this->requestManager->setRequestHeader($headerName, $value);
    }

    /**
     * Test header after request
     *
     * @Given /^the "([^"]*)" header should be "([^"]*)"$/
     */
    public function theHeaderShouldBe($headerName, $expectedHeaderValue)
    {
        $response = $this->requestManager->getLastResponse();

        assertEquals($expectedHeaderValue, (string) $response->getHeader($headerName));
    }

    /**
     * Test header after request
     *
     * @Given /^the "([^"]*)" header should exist$/
     */
    public function theHeaderShouldExist($headerName)
    {
        $response = $this->requestManager->getLastResponse();

        assertTrue($response->hasHeader($headerName));
    }

    /**
     * Test status code after request
     *
     * @Then /^the response status code should be (?P<code>\d+)$/
     */
    public function theResponseStatusCodeShouldBe($statusCode)
    {
        $response = $this->requestManager->getLastResponse();

        assertEquals(
            $statusCode,
            $response->getStatusCode(),
            sprintf('Expected status code "%s" does not match observed status code "%s"', $statusCode, $response->getStatusCode())
        );
    }

     /**
     * Returns the payload from the current scope within
     * the response.
     *
     * @return mixed
     */
    public function getScopePayload()
    {
        $payload = $this->requestManager->getResponsePayload();

        if (!$this->scope) {
            return $payload;
        }

        return $this->arrayGet($payload, $this->scope, true);
    }
}
