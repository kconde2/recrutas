<?php

namespace App\Constant;

class ContractType
{
    const TYPE_CDI = 'cdi';
    const TYPE_CDD = 'cdd';
    const TYPE_APPRENTICE = 'apprentice';
    const TYPE_INTERIM = 'interim';

    public static $choices = [
        self::TYPE_CDI => 'CDI',
        self::TYPE_CDD => 'CDD',
        self::TYPE_APPRENTICE => 'Apprentissage',
        self::TYPE_INTERIM => 'Intérim',
    ];

    public static function getType()
    {
        return self::$choices;
    }

    public static function getInvertedType()
    {
        return array_flip(self::getType());
    }
}
