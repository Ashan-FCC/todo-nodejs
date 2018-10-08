'use strict'

const prompt = require('inquirer').prompt
const { addTodo, showAll, complete, exitApplication } = require('./handlers')
const { warmup } = require('./datastore')

const handlerMap = {
  'Add todo': addTodo,
  'Show All': showAll,
  'Complete': complete,
  'Quit': exitApplication
}

let userSelectedAction

function workflow() {
  const initialQuestion = [
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: Object.keys(handlerMap)
    }
  ]
  warmup()
  return prompt(initialQuestion)
    .then(({ action }) => {
      
      userSelectedAction = action
      return handlerMap[action].call()
        .then((msg) => {
          console.log(msg)
          if (userSelectedAction !== 'Quit') {
            return workflow()
          }
        })
        .catch(e => {
          console.log(e.message)
          return workflow()
        })
    })
}

module.exports = {
  workflow
}
