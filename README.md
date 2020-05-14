# Recrutas

## Install

```shell
docker-compose exec php composer install
docker-compose exec php bin/console doctrine:database:drop --force
docker-compose exec php bin/console doctrine:database:create
docker-compose exec php bin/console doctrine:migrations:migrate --no-interaction
```

## Fixtures

```shell
docker-compose exec php bin/console doctrine:fixtures:load --no-interaction
```

## Emulator

- Check `instructions-ssl.txt` file then :

```shell
yarn android
```

- Then when the emulator has started

```shell
adb reverse tcp:8443 tcp:8443
```
