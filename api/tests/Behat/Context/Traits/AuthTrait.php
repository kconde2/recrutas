<?php

namespace App\Tests\Behat\Context\Traits;

use App\Entity\User;

trait AuthTrait
{
    /**
     * The user to use with HTTP basic authentication
     *
     * @var string
     */
    protected $authUser;

    /**
     * The password to use with HTTP basic authentication
     *
     * @var string
     */
    protected $authPassword;

    protected $authManager;

    /**
     * @Given /^I authenticate with user "([^"]*)" and password "([^"]*)"$/
     */
    public function iAuthenticateWithEmailAndPassword($email, $password)
    {
        $this->authUser = $email;
        $this->authPassword = $password;
    }

    /**
     * @Given /^I authenticate as "([^"]*)"$/
     *
     * @param string $userRole
     */
    public function iAuthenticateWithRole(string $userRole)
    {
        $user = $this->referenceManager->getReference('ROLE_' . $userRole);

        if (!$user instanceof User) {
            return;
        }

        $email  = $user->getEmail();
        $password = 'change-this-password';
        $payload = json_decode(sprintf('{"email":"%s", "password": "%s"}', $email, $password));

        // set request header and payload for login
        $this->requestManager
            ->setRequestPayload($payload)
            ->setRequestHeader('Content-Type', 'application/json');

        // send authnentication request
        $this->iRequest('POST', '/authentication_token');

        // extract token from response
        $authToken = $this->arrayGet($this->getScopePayload(), 'token');

        // add token to authorization header
        $this->requestManager->setRequestHeader('Authorization', sprintf('Bearer %s', $authToken));
        $this->authManager->setBearerToken($authToken);

        // save auth user reference
        $this->referenceManager->setReference('auth_user', $user);

        // reset header content type
        $this->requestManager->setRequestHeader('Content-Type', 'application/ld+json');
    }
}
