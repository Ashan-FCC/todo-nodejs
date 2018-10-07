'use strict'

const Promise = require('bluebird')
const {cache} = require('./datastore')
const {compress, decompress} = require('./utils')

function retrieve() {
  return cache.keysAsync('*')
    .then(keys => {
      if (!keys.length) {
        throw new Error('No saved todos')
      }
      const ops = keys.map(key => cache.getAsync(key).timeout(5000))
      return Promise.all(ops)
    })
    .then(strings => {
     return Promise.all(strings.filter(v => !!v).map(decompress))
    })
}

function insert(todos) {
  const ops = todos.map(todo => {
    return compress(todo)
      .then(compressed => {
        cache.setAsync(todo.id, compressed)
      })
    
  })
  
  return Promise.all(ops)
    .then(() => {
      return 'All todos saved'
    })
}

function update(todo) {
  return cache.expireAsync(todo.id, 0)
    .then((res) => {
      if (res) {
        return `Removed todo: ${todo.action}`
      }
      throw new Error('Could not complete todo')
    })
}

module.exports = {
  retrieve,
  insert,
  update
}
