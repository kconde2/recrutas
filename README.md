# Recrutas

### Fixtures

> docker-compose exec php composer require --dev doctrine/doctrine-fixtures-bundle

> docker-compose exec php bin/console doctrine:fixtures:load

### Emulator

=> Check "instructions-ssl" file then :

> yarn android

then when the emulator has started

> adb reverse tcp:8443 tcp:8443
