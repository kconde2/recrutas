<?php

namespace App\Tests\Behat\Manager;

use Psr\Http\Message\RequestInterface;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Contracts\HttpClient\ResponseInterface;

class RequestManager
{
    /**
     * Payload of the request
     *
     * @var string
     */
    private $requestPayload;

    /**
     * Payload of the response
     *
     * @var string
     */
    private $responsePayload;

    /**
     * The Guzzle client
     *
     * @var Client
     */
    private $client;

    public function __construct(KernelInterface $kernel)
    {
        $this->client = $kernel->getContainer()->get('test.api_platform.client');
    }

    /**
     * The response of the HTTP request
     *
     * @var \Symfony\Contracts\HttpClient\ResponseInterface
     */
    private $lastResponse;

    /**
     * Headers sent with request
     *
     * @var array[]
     */
    private $requestHeaders = [];

    /**
     * The last request that was used to make the response
     *
     */
    private $lastRequest;

    /**
     * Returns the payload from the current scope within
     * the response.
     *
     * @return mixed
     */
    public function getScopePayload()
    {
        $payload = $this->getResponsePayload();

        if (!$this->scope) {
            return $payload;
        }

        return $this->arrayGet($payload, $this->scope, true);
    }

    /**
     * Checks the response exists and returns it.
     *
     * @return \Symfony\Contracts\HttpClient\ResponseInterface
     * @throws \Exception
     */
    public function getLastResponse()
    {
        if (!$this->lastResponse) {
            throw new \Exception("You must first make a request to check a response.");
        }

        return $this->lastResponse;
    }

    /**
     * Return the response payload from the current response.
     *
     * @return mixed|string
     * @throws \Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface
     */
    private function getResponsePayload()
    {
        $json = json_decode($this->getLastResponse()->getContent(false));
        if (json_last_error() !== JSON_ERROR_NONE) {
            $message = 'Failed to decode JSON body ';

            switch (json_last_error()) {
                case JSON_ERROR_DEPTH:
                    $message .= '(Maximum stack depth exceeded).';
                    break;
                case JSON_ERROR_STATE_MISMATCH:
                    $message .= '(Underflow or the modes mismatch).';
                    break;
                case JSON_ERROR_CTRL_CHAR:
                    $message .= '(Unexpected control character found).';
                    break;
                case JSON_ERROR_SYNTAX:
                    $message .= '(Syntax error, malformed JSON): ' . "\n\n" . $this->getLastResponse()->getContent(false);
                    break;
                case JSON_ERROR_UTF8:
                    $message .= '(Malformed UTF-8 characters, possibly incorrectly encoded).';
                    break;
                default:
                    $message .= '(Unknown error).';
                    break;
            }

            throw new \Exception($message);
        }

        $this->responsePayload = $json;
        return $this->responsePayload;
    }

    /**
     * Set the request of the HTTP request
     *
     * @param  RequestInterface  $lastRequest  The request of the HTTP request
     *
     * @return  self
     */
    public function setLastRequest($lastRequest)
    {
        $this->lastRequest = $lastRequest;

        return $this;
    }

    /**
     * Get the last request that was used to make the response
     */
    public function getLastRequest()
    {
        return $this->lastRequest;
    }

    /**
     * Set the response of the HTTP request
     *
     * @param  ResponseInterface|string  $lastResponse  The response of the HTTP request
     *
     * @return  self
     */
    public function setLastResponse($lastResponse)
    {
        $this->lastResponse = $lastResponse;

        return $this;
    }

    /**
     * Add item to request header
     *
     * @param string $headerName
     * @param string $value
     * @return void
     */
    public function addRequestHeader(string $headerName, $value)
    {
        $this->requestHeaders[$headerName] = $value;
    }

    /**
     * Remove item from request header
     *
     * @param string $headerName
     * @return void
     */
    public function removeRequestHeader(string $headerName)
    {
        unset($this->requestHeaders[$headerName]);
    }

    /**
     * Get headers sent with request
     *
     * @return  array[]
     */
    public function getRequestHeaders()
    {
        return $this->requestHeaders;
    }

    /**
     * Get payload of the request
     *
     * @return  string
     */
    public function getRequestPayload()
    {
        return json_encode($this->requestPayload);
    }

    /**
     * Set payload of the request
     *
     * @param  string  $requestPayload  Payload of the request
     *
     * @return  self
     */
    public function setRequestPayload(string $requestPayload)
    {
        $this->requestPayload = $requestPayload;

        return $this;
    }

    /**
     * Make request to a specified resource path
     *
     * @param string $method (GET|POST|etc...)
     * @param string $resource (/users)
     * @return void
     */
    public function request(string $method, string $resource)
    {
        return $this->client->request($method, $resource, [
            'headers' => $this->requestHeaders,
            'body'    => $this->requestPayload,
        ]);
    }
}
