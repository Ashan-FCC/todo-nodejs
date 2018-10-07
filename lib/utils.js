'use strict'

const Promise = require('bluebird')
const zlib = require('zlib')
const unzip = Promise.promisify(zlib.unzip)
const deflate = Promise.promisify(zlib.deflate)


function compress(obj) {
  return deflate(JSON.stringify(obj)).then(buffer => buffer.toString('base64'))
}

function decompress(str) {
  return unzip(Buffer.from(str, 'base64')).then(s => JSON.parse(s))
}

function formatTodos(todos) {
  let todoString = `
      ************************************************
      Created Date \t|\t Todo
      `
  todos.forEach(todo => {
    const {created, action} = todo
    todoString += `
        ${created} \t|\t ${action}
        `
  })
  todoString += `
      ************************************************
      `
  return todoString
}

module.exports = {
  compress,
  decompress,
  formatTodos
}
