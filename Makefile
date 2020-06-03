jwt:
	chmod +x ./script/jwt.sh && ./script/jwt.sh
fixt:
	docker-compose exec php bin/console hautelook:fixtures:load -n
behat:
	docker-compose exec php bin/console vendor/bin/behat
