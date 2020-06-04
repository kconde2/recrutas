<?php

namespace App\Tests\Behat\Manager;

class AuthManager
{
    private $bearerToken;

    /**
     * Get the value of bearerToken
     */
    public function getBearerToken()
    {
        return $this->bearerToken;
    }

    /**
     * Set the value of bearerToken
     *
     * @return  self
     */
    public function setBearerToken($bearerToken)
    {
        $this->bearerToken = $bearerToken;

        return $this;
    }

    public function isAuthenticated()
    {
        // may be add additional check on token validity
        $this->getBearerToken() !== '';
    }
}
