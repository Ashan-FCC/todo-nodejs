### Simple Todo Application in Node.js

### Workflow

1. Allows the user to keep adding todo.
2. Show all added todo's
3. Complete a todo, (remove from list)

### Requirements

Node v8+

### Setup

Run `npm install`

Copy .env_template to .env file

Set the redis host and port in the .env file

Run `node ./bin/todo.js`


### Improvements

Cover with tests.

Have a fallback to save todos if no redis connection is available

Add ability to install globally

