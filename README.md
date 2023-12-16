## Setting up Project 
Open PostgreSQL command line interface and run: 
```
CREATE DATABASE nestjs;
```
("Replace 'nestjs' with your preferred database name, and make sure to use that same name in your .env file."). Tables will be auto generated.

## Description 

NestJS authentication application that includes login and sign-up functionalities. Used a PostgreSQL database and connected it to NestJS. To manage a database easier, used an Object-relational mapping (ORM) tool called TypeORM.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

