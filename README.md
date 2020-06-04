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

### References

- [https://alexandre.salome.fr/blog/twig-templating-in-behat-tests](https://alexandre.salome.fr/blog/twig-templating-in-behat-tests)
- [https://medium.com/manomano-tech/efficient-testing-with-fixtures-on-symfony-4-db0a8ea75245](https://medium.com/manomano-tech/efficient-testing-with-fixtures-on-symfony-4-db0a8ea75245)
