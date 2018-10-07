'use strict'

const uniqid = require('uniqid')
const moment = require('moment')
const DATE_FORMAT = 'YYYY-MM-DD'
const prompt = require('inquirer').prompt
const { dispose } = require('./datastore')
const { retrieve, insert, update } = require('./actions')
const { formatTodos } = require('./utils')

const ADD_QUESTION = [
  {
    type : 'input',
    name : 'todo',
    message : 'Add a todo: '
  }
]


function showAll() {
  return retrieve()
    .then(todos => {
      return formatTodos(todos)
    })
}

function addTodo(todos = []) {

  return prompt(ADD_QUESTION)
    .then(({ todo }) => {
      if (todo.trim() !== '') {
        todos.push({
          id: uniqid(),
          action: todo,
          created: moment(new Date()).format(DATE_FORMAT)
        })
        return addTodo(todos)
      }
      return insert(todos)
  })
}

function complete() {
  const completeQuestion = [
    {
      type: 'list',
      name: 'todo',
      message: 'Select which todo to complete',
    }
  ]
  return retrieve()
    .then(todos => {
      
      if (!todos.length) {
        return 'No todos found'
      }
      completeQuestion[0].choices = todos.map(todo => {
        return {
          name: todo.action,
          value: todo
        }
      })
      return prompt(completeQuestion)
    })
    .then(({ todo }) => {
      return update(todo)
    })

}

function exitApplication() {
  dispose()
  return Promise.resolve('Exiting application..')
}

module.exports = {
  showAll,
  addTodo,
  complete,
  exitApplication
}
