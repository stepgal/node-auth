[![Build Status](https://travis-ci.com/stepgal/node-auth.svg?branch=master)](https://travis-ci.com/stepgal/node-auth)

# Authentication API

## Technical Specifications

**Summary**

Authentication API allows us to register and store user data in the database.

[<img src="https://raw.githubusercontent.com/stepgal/web/master/img/AuthAlgorithmDiagram.png" align="center" width="800" hspace="10" vspace="10">](https://raw.githubusercontent.com/stepgal/web/master/img/AuthAlgorithmDiagram.png)


**Specifications**

**Language**: Java Script (use NodeJS)

**API Documentation**: Swagger

**Database**: mongoDB

    HOST: mongodb://13.59.96.104:27017/auth
    Table Name: users
    Table Structure: 
        email: String
        password: String

**Request**: /user/{email/{password}
    example: http://127.0.0.1:3001/user/test@hot.com/mypassword

**Response**: JSON

    Status Code: 200
    {
        "status":"OK",
        "message":"NEW USER",
        "user":
        {
            "_id":"5eec9a6c90674e74c8abaa09",
            "email":"test@hot.com",
            "password":"mypassword"
        }
    }

    Status Code: 404
    {
        "status":"FAILURE",
        "message":"Bad request: format - GET http://url:port/user/{email}/{password}"
    }


## Getting Started

### Documentation

Documentation will be served at `/swagger` [API Docs](http://ec2-18-222-219-162.us-east-2.compute.amazonaws.com:3001/swagger). It is suggested to check it if you want to execute any request since it contains a **Try Out** option, which is much more comfortable than using other tools such as Postman.

### Installing node

Get the latest version of node from the [official website](https://nodejs.org/).

Install dependencies by running `npm i`.

### Database configuration
MongoDB hosted on mongodb://13.59.96.104:27017/auth


### Starting app

We have two ways to start the app. To start it in production mode run `npm start` in the root path of the project. To start it run `node start server.js`. Then access the app at **localhost:3001**. The port is logged in the console where you run the start script.  
Also, you can start the app in production mode using [docker-compose](https://docs.docker.com/compose/install/). You just have to run `docker-compose up`.

## Development

### Environments

By default, the environment will be **development**, but you can easily change it using the **NODE_ENV** environmental variable.

### Environment variables

[Dotenv](https://www.npmjs.com/package/dotenv) is used for managing environment variables. They are stored in the `/.env` file. Take into account that the variables defined in the `bashrc` are not overrided.

The environment variables should be added to the `.env` file in the form of `NAME=VALUE`, as the following example:

```
NODE_ENV=DEVELOPMENT
SERVER_PORT=3001

# Main Mongo DB
MONGO_DB_MAIN_HOST=mongodb://13.59.96.104:27017/auth
MONGO_DB_MAIN_POOL_SIZE=70
```

**Remember not to push nor commit the `.env` file.**

## Deploy

### AWS
This app was deployed using [AWS](https://aws.amazon.com/). The base url is [http://ec2-18-222-219-162.us-east-2.compute.amazonaws.com:3001/](http://ec2-18-222-219-162.us-east-2.compute.amazonaws.com:3001/).

## About
This project was written and is maintained by [Stepan Galoyan](https://github.com/stepgal).

