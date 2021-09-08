# Crypto-gains
 Application to monitor gains or loses when trading crypto

Usernames:
 1. Username: hoho
    Password: 1234454

 2. Username: tester
    Password: 12345678

Aplication made in Laravel + Vue.

To start, run the following commands:

```sh
npm install
php -r "unlink('composer-setup.php');"
composer require tymon/jwt-auth:dev-develop --prefer-source
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"

npm run production

php artisan serve --port=8000
```

> or
npm run dev

Aplication will be on: localhost:8000

> Tables are made in laravel, to write them in mysql run:  php artisan migrate
