# Instagram-Clone

## Authors
Austin Burnett

For the purpose of learning more about Backend develeopment/technologies, I decided to tackle designing the backend for a web application that takes inspiration from the features that Instagram provides.

## What is Instagram-Clone?
A complete backend system that handles the logic for most of the features that Instagram has. 

### Dependencies
- [ExpressJS](https://expressjs.com/)
- [Nodemon](https://www.npmjs.com/package/nodemon/)
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
- [x] Backend Complete
    - [x] Require a multipart body parser for processing form data
    - [x] Controllers
        - [x] Add middleware to redirect user if not currently logged in
        - [x] Create controller to handle user business logic
        - [x] Create controller to handle post business logic
        - [x] Sent correct HTTP error codes back to client 
        - [x] User controller
            - [x] Handle login form
                - [x] Check if user exists in db 
                - [x] Use node cryto to sign JWT & Store secret in dotenv file
                      secret will be 128 bits
            - [x] Handle login form 
            - [x] Handle register form
                - [x] Check if email is in use
            - [x] Handle register page
            - [x] Handle operations for single user
                - [x] Delete user
                - [x] Update user
                - [x] Get user
                - [x] Create user
        - [x] Post controller
            - [x] Handle post form
            - [x] Handle operations for single post 
                - [x] Delete post
                - [x] Update post
                - [x] Get post
                - [x] Create post
            - [x] Handle operations for single comment 
                - [x] Delete comment
                - [x] Update comment
                - [x] Get comment
                - [x] Create comment
    - [x] Models 
        - [x] Create User Schema
        - [x] Create Post Schema
        - [x] Authentication
            - [x] Use a hashing algorithm to hash confidential info
            - [x] Query using user's model and confirm credentials
    - [x] Restful api
        - [x] Create an api folder in routes to organize api routes
        - [x] Create api endpoints
            - [x] Create users folder in routes/api/ for all endpoints accessing the users' resources
            - [x] Create user routes to handle crud operations
            - [x] Create post routes to handle crud operations 
        - [x] CRUD operations on users
        - [x] CRUD operations on posts
        - [x] Authorization (Session state) (Secure endponts)
            - [x] Add authorization using JWT(HMAC) 
- [ ] Extensions
    - [ ] Deploy to aws 
    - [ ] CI/CD with gitlab or github action
    - [ ] Unit testing
    - [ ] Update README to show quickstart guide for easy demonstration
    - [ ] Create a video demonstrating the core functionalities
    - [x] Docker dev enviroment
    - [ ] Kubernetes
    - [ ] Websocket for private messages
    - [ ] Caching with redis
    - [ ] Load balancing/testing
    - [ ] Write a blog about how to replicate this app / teach about backend developement
    - [ ] Use a message queue like kafka or rabbitmq 
    - [ ] Batch jobs

### Architecture
- [ ] Use draw.io to create a diagram on the architecture
