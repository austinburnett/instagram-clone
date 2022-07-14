# Instagram-Clone

## Authors
Austin Burnett

For the purpose of learning more about Backend develeopment/technologies, I decided to tackle a web application that takes inspiration from the features that Instagram provides.

## What is Instagram-Clone?
A lightweight web application with most of the features that Instagram has. 

### Dependencies
- [ExpressJS](https://expressjs.com/)
- [Nodemon] (https://www.npmjs.com/package/nodemon/)
- [Pug] (https://pugjs.org/api/getting-started.html)
- [MongoDB] (https://mongodb.github.io/node-mongodb-native/api-generated/mongoclient.html)
- [Mongoose] (https://mongoosejs.com/)
- [Dotenv] (https://www.npmjs.com/package/dotenv)
- [Formidable] (https://www.npmjs.com/package/formidable)

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
    - [ ] Server Side Rendering
        - [x] Render pug template with backend data
        - [ ] Create layout directory inside /views
            -[ ] Create main.pug for other templates to extend off of 
        - [x] Create login template
            - [] Add styling
        - [x] Create Register template
            - [x] Make sure passwords match
            - [  ] Add styling
        - [x] Create home page template
        - [ ] Create user page template
    - [ ] Controllers
        - [ ] Add middleware to redirect user if not currently logged in
        - [x] Create controller to handle user business logic
        - [x] Create controller to handle post business logic
        - [ ] User controller
            - [x] Handle login form
                - [x] Check if user exists in db 
                - [  ] Reroute until succesful login
            - [x] Handle login page 
            - [x] Handle register form
                - [x] Check if email is in use
            - [x] Handle register page
            - [ ] Handle operations for single user
                - [ ] Delete user
                - [ ] Update user
                - [ ] Get user
                - [x] Createuser
    - [ ] Models 
        - [x] Create User Schema
        - [x] Create Post Schema
        - [x] Authentication
            - [x] Use a hashing algorithm to hash confidential info
            - [x] Query using user's model and confirm credentials
    - [ ] Create Restful api
        - [x] Create an api folder in routes to organize api routes
        - [x] Create api endpoints
            - [x] Create users folder in routes/api/ for all endpoints accessing the users' resources
            - [x] Create user routes to handle crud operations
            - [x] Create post routes to handle crud operations 
        - [ ] CRUD operations on users
        - [ ] CRUD operations on posts
        - [ ] Authorization (Session state) (Secure endponts)
            - [ ] Add authorization using JWT 
- [ ] Frontend Complete?
- [ ] Extensions?
    - [ ] Create a quickstart guide to allow for easy demonstration
    - [ ] Create a video demonstrating the core functionalities of InstaClone
    - [ ] Docker support
    - [ ] Cloud service support
    - [ ] CI/CD with gitlab or github action
    - [ ] Websocket for private messages
    - [ ] Caching
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
