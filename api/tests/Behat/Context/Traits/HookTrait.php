<?php

namespace App\Tests\Behat\Context\Traits;

use DAMA\DoctrineTestBundle\Doctrine\DBAL\StaticDriver;

trait HookTrait
{
    /**
     * @BeforeSuite
     */
    public static function beforeSuite()
    {
        //var_dump("before suite");
        StaticDriver::setKeepStaticConnections(true);
    }

    /**
     * @BeforeScenario
     */
    public function beforeScenario()
    {
        //var_dump("before sena");
        /** Init default Content-Type */
        $this->requestHeaders["Content-Type"] = "application/ld+json";
        StaticDriver::beginTransaction();
    }

    /**
     * @AfterScenario
     */
    public function afterScenario()
    {
        //var_dump("after sena");
        $this->requestHeaders["Content-Type"] = "";
        StaticDriver::rollBack();
    }

    /**
     * @AfterSuite
     */
    public static function afterSuite()
    {
        //var_dump("after suite");
        StaticDriver::setKeepStaticConnections(false);
    }
}
