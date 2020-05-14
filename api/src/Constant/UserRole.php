<?php

namespace App\Constant;

class UserRole
{
    const ROLE_APPLICANT = 'ROLE_APPLICANT';
    const ROLE_RECRUITER = 'ROLE_RECRUITER';

    public static $choices = [
        self::ROLE_APPLICANT => 'Candidant',
        self::ROLE_RECRUITER => 'Recruteur',

    ];

    public static function getRoles()
    {
        return self::$choices;
    }

    public static function getInvertedRoles()
    {
        return array_flip(self::getRoles());
    }
}
