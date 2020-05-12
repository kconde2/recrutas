<?php

namespace App\Constant;

class ApplicationStatus
{

    const STATUS_CREATED = 'created';
    const STATUS_OPENED = 'opened';
    const STATUS_VALIDATING = 'validating';
    const STATUS_RDV = 'rdv';
    const STATUS_ACCEPTED = 'accepted';
    const STATUS_REFUSED = 'refused';

    public static $choices = [
        self::STATUS_CREATED => 'Créé',
        self::STATUS_OPENED => 'Ouvert',
        self::STATUS_VALIDATING => 'En validation',
        self::STATUS_RDV => 'RDV fixé',
        self::STATUS_ACCEPTED => 'Accepté',
        self::STATUS_REFUSED => 'Refusé'
    ];

    public static function getStatuses()
    {
        return self::$choices;
    }

    public static function getInvertedStatuses()
    {
        return array_flip(self::getStatuses());
    }
}
