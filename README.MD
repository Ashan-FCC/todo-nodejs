### Simple Todo Application in Node.js

### Workflow

1. Allows the user to keep adding todo.
2. Show all added todo's
3. Complete a todo, (remove from list)

### Requirements

Node v8+

Redis

### Setup

Run `npm install`

Copy .env_template to .localenv file

Set the redis host and port in the .env file

### Running the app

#### Run the application with local installation of node
Run `node ./bin/todo.js`

#### Run the application with docker image
docker-compose run --rm app ./docker-wait.sh node ./bin/todo.js



### Improvements

Cover with tests.

Have a fallback to save todos if no redis connection is available

Add ability to install globally



