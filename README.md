# webapp-backend 

webapp-backend was built for the purpose of expanding my skills in backend develeopment and cloud technologies. The features provided resemble modern industry standards in Software Development and that of popular social media webapps used today.

The code for local version of the project can be found at: [/Server/src](https://github.com/austinburnett/webapp-backend/tree/master/Server/src).
Which includes the following features:
- Authentication/Authorization with JWT
- Rest Api with CRUD database operations
- Docker development environment
- Continuous Integration(CI) with AWS CodeBuild triggered by pushing commits to the repo
- Postman Api testing workspace
- Unit tests using jest testing framework

The code for the serverless API can be found at: [/Server/serverless/src](https://github.com/austinburnett/webapp-backend/tree/master/Server/serverless/src)

Note: for easy demonstration, I deployed the backend to aws Lambda. However, some of the features on the serverless instance are not available due to the limitations of my budget and aws free tier.

## Overview of Documentation
- Instructions on running the project locally: [/Server/README.md](https://github.com/austinburnett/webapp-backend/blob/master/Server/README.md)

## Demo webapp-backend serverless api here: 
https://wclofcjamd.execute-api.us-east-2.amazonaws.com/dev/expressApp/

## Video demo of webapp-backend with Postman and Docker Compose
<img src="https://github.com/austinburnett/webapp-backend/blob/master/demo.gif"/> 

### Dependencies
- [ExpressJS](https://expressjs.com/)
- [Nodemon](https://www.npmjs.com/package/nodemon/)
- [Mongoose](https://mongoosejs.com/)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Formidable](https://www.npmjs.com/package/formidable)
- [jsonwebtoken]()
- [argon2]()
- [express-jwt]()
- [jest](https://jestjs.io/docs/getting-started)

- [ ] Extensions
    - [ ] Create Reactjs frontend (In progress)
    - [ ] CI/CD with aws, docker, and kubernetes 
    - [x] Unit testing
    - [x] Update README to show quickstart guide for easy demonstration
    - [x] Docker dev enviroment
    - [ ] Websocket for private messages
    - [ ] Caching with redis
    - [ ] Load balancing/testing
    - [ ] Use a message queue like kafka or rabbitmq 
    - [ ] Batch jobs
