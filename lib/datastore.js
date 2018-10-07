'use strict'

const redis = require('redis')
const bluebird = require('bluebird')
const debug = require('debug')('todo: datastore')
bluebird.promisifyAll(redis)

const connections = {}

function initializeRedis() {
  if (connections.cache) {
    return connections.cache
  }
  const client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST)
  
  client.on('connect', () => {
    debug('Connected to DB')
  })
  
  client.on('end', () => {
    debug('Connection to redis terminated')
  })
  
  client.on('error', () => {
    debug('Error occurred')
    console.log("No connectin to save todos. Exiting...")
    process.exit(1)
  })
  
  connections.cache = client
  return client
}

function dispose() {
  if (connections.cache) {
    return connections.cache.quit()
  }
}

module.exports = {
  get cache() {
    if (!connections.cache) {
      connections.cache = initializeRedis()
    }
    return connections.cache
  },
  dispose,
  warmup: () => initializeRedis()
}
