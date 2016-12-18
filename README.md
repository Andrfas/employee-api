# commands for Docker

#### Команда для побудови образу:

`docker build -t employee .`

#### Команда для запуску контейнера з сервером (перше завдання):

`docker run -d -p 1337:1337 employee grunt lift` 

#### Команда для запуску контейнера, який побудує production-директорію в папку `/home/USER/employee_prod` (друге завдання):

`docker run -d  -v /home/USER/employee_prod:/usr/src/app/www employee grunt buildProd`

# Employee

An application for students to help them find work or courses!!!!
Good look!


## If you are working on back-end!

#### Lift server without api-tests:
```
grunt lift
```

#### Lift server with api-tests:
```
grunt testLift
```

#### Run only api-tests: run, baby, run
```
grunt testServer
```

## If you are working on front-end:

#### Run server:
Will lift sails in current cmd, and open new cmd for front-end.
```
grunt liftFront
```

## Important
All code need to be covered by tests.

## Troubleshooting
Please make sure you have mongo started before running server.
If you see error after pulling repo, please try to make `npm install`.

Changing from Andrew
Changing from Max
One more changin from Max
One more changin from Andrew
