<?php

namespace App\Tests\Behat\Context\Traits;

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

        // $this->authManager->authenticate
        // $this->request
        $this->requestManager->authenticate($user->getEmail(), $user->getPassword());

        print_r($user->getPassword());

        //print_r($userReference->getEmail());
    }
}
