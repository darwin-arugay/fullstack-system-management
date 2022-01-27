# fullstack-system-management

## Backend

1.  `$ cd backend` folder then do the ff:
    **APOLOGIZE** _please add a database and table manually_

2.  Add a database called _users_ and a table called _users_

    ### With the following FIELDS:

    - userId(varchar(255)) = Primary Key
    - firstName(varchar(255))
    - lastName(varchar(255))
    - address(varchar(255))
    - postcode(varchar(255))
    - emailAddress(varchar(255))
    - username(varchar(255))
    - password(varchar(255))
    - contactNumber(varchar(255))

3.  Database connection, please use you own credentials for password and user on your mysql workbench

    - host: "localhost",
    - user: "root",
    - password: "ENTER_PASSWORD",
    - database: "users"

4.  Install the dependencies
    1. please install nodemon globally, `$ npm install --global nodemon`
    2. `$ npm install` - install dependencies
    3. `$ nodemon` - start the server

## Front-end

1. `$ cd frontend` folder then do the ff:

- `$ npm install` - install dependencies
- `$ npm start` - start the application
