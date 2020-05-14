# Recrutas

## Fixtures

```shell
docker-compose exec php composer require --dev doctrine/doctrine-fixtures-bundle
```

```shell
docker-compose exec php bin/console doctrine:fixtures:load
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
