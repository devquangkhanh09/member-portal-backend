# Member Portal project
- Author: team Software 1 - Big Data club.

## Description
- Portal for member management.

## Install dependencies

```bash
$ yarn install
```

## Run the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## API Documentation

1. **POST** /auth/signin
   
    Request:

        Body:
           - username
           - password

    Response:

2. **GET** /user/profile

    Request:

    Response:
        
        Body:
           - avatar
             - url16
             - url48
             - url72
             - url144
             - url288
           - Key
           - Name
           - Created
           - Updated
           - HPCC ID
           - Username
           - Date of birth
           - Role
           - Board
           - Student ID
           - Address
           - Email
           - Phone number
           - Major
           - Faculty
