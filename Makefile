jwt:
	chmod +x ./script/jwt.sh && ./script/jwt.sh
fixt:
	docker-compose exec php bin/console hautelook:fixtures:load -n
test:
	docker-compose exec php vendor/bin/behat
