<?php

namespace App\Constant;

class UserGender
{
    const GENDER_MALE = 'M';
    const GENDER_FEMALE = 'F';

    public static $genders = [
        self::GENDER_MALE => 'Homme',
        self::GENDER_FEMALE => 'Femme',

    ];

    public static function getGenders()
    {
        return self::$genders;
    }

    public static function getInvertedGenders()
    {
        return array_flip(self::getGenders());
    }
}
