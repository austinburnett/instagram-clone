### Instructions on how to get backend up and running ###

Note: We have a bind mount on /src, node_modules contains a module argon2
which is installed specifically for each os. This is why I had to modify
the project structure. Simply adding a .dockerignore file with node_modules
did not work.

Note: to ensure the monogInit.js script runs, remove all volumes in docker
as this only runs if /data/db is empty i.e on database initialization.

### How to run the backend
1. cd /Server/src
2. docker compose up

### If you would like to run the project without containerization (not recommended). 
1. rm -r node_modules
2. rm package-lock.json 
3. npm install
4. Uncomment the other DB_URI env variable in .env file in
5. Start mongodb server. brew services start mongodb-community (macos)
6. npm start

To run with containerization after this, you would need to complete steps
1, 2, 4
