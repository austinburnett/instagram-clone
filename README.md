# Instagram-Clone

## Authors
Austin Burnett

For the purpose of learning more about Backend develeopment/technologies, I decided to tackle a web application that takes inspiration from the features that Instagram provides.

## What is Instagram-Clone?
A lightweight web application with most of the features that Instagram has. 

### Dependencies
- [ExpressJS](https://expressjs.com/)
- [Nodemon](https://www.npmjs.com/package/nodemon/)
- [Pug](https://pugjs.org/api/getting-started.html)
- [Mongoose](https://mongoosejs.com/)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Formidable](https://www.npmjs.com/package/formidable)
- [jsonwebtoken]()
- [argon2]()
- [express-jwt]()

### Roadmap
- [x] Initial Backend Setup
    - [x] Setup npm for backend
    - [x] Create Web Server
    - [x] Create Models directory
    - [x] Create Routes directory
    - [x] Create views directory
    - [x] Setup mongoDB
        - [x] Connect to DB
        - [x] Create a reusable asynchronous connection to DB
            - [x] Create a .env file to store confidential DB connection information
            - [x] Create a util directory
            - [x] Create a mongodb utility module
            - [x] Close all DB connections when the backend process has stopped
- [ ] Backend Complete?
    - [x] Require a multipart body parser for processing form data
    - [ ] Controllers
        - [x] Add middleware to redirect user if not currently logged in
        - [x] Create controller to handle user business logic
        - [x] Create controller to handle post business logic
        - [x] Sent correct HTTP error codes back to client 
        - [ ] User controller
            - [x] Handle login form
                - [x] Check if user exists in db 
                - [ ] Send http status code until succesful login
                - [x] Use node cryto to sign JWT & Store secret in dotenv file
                      secret will be 128 bits
            - [x] Handle login form 
            - [x] Handle register form
                - [x] Check if email is in use
            - [x] Handle register page
            - [ ] Handle operations for single user
                - [ ] Delete user
                - [ ] Update user
                - [x] Get user
                - [x] Create user
        - [ ] Post controller
            - [x] Handle post form
            - [ ] Handle operations for single post 
                - [ ] Delete post
                - [ ] Update post
                - [x] Get post
                - [x] Create post
            - [ ] Handle operations for single comment 
                - [ ] Delete comment
                - [ ] Update comment
                - [x] Get comment
                - [x] Create comment
    - [x] Models 
        - [x] Create User Schema
        - [x] Create Post Schema
        - [x] Authentication
            - [x] Use a hashing algorithm to hash confidential info
            - [x] Query using user's model and confirm credentials
    - [ ] Restful api
        - [x] Create an api folder in routes to organize api routes
        - [x] Create api endpoints
            - [x] Create users folder in routes/api/ for all endpoints accessing the users' resources
            - [x] Create user routes to handle crud operations
            - [x] Create post routes to handle crud operations 
        - [ ] CRUD operations on users
        - [ ] CRUD operations on posts
        - [x] Authorization (Session state) (Secure endponts)
            - [x] Add authorization using JWT(HMAC) 
- [ ] Extensions?
    - [ ] Create a quickstart guide to allow for easy demonstration
    - [ ] Create a video demonstrating the core functionalities of InstaClone
    - [ ] Docker support / Kubernetes
    - [ ] Cloud service support
    - [ ] Unit testing
    - [ ] CI/CD with gitlab or github action
    - [ ] Websocket for private messages
    - [ ] Caching with redis
    - [ ] Load balancing/testing
    - [ ] Write a blog about how to replicate this app / teach about backend developement
    - [ ] Create bots that post random, funny images scraped from the web
        - [ ] Let bots post random star wars quotes on posted, random, funny images
        - [ ] execute this script on a time cycle

### Architecture
         ----------------
         Browser/Client
         ----------------
                |
                |
               \|/
            ---------
            Rest Api
            ---------
                |
                |
               \|/
      ------------------------
      Application (Web Server)
      ------------------------
                |
                |
               \|/
           -----------
           Controllers
           -----------
             /      \
            /        \
          \|/        \|/
       -------       ------
       Models        Views
       -------       ------
         |
         |
        \|/
       ----
       DB
       ----
