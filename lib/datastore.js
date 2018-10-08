'use strict'

const redis = require('redis')
const bluebird = require('bluebird')
const debug = require('debug')('todo: datastore')
const parseDatabaseUrl = require('parse-database-url')
bluebird.promisifyAll(redis)

const connections = {}

function initializeRedis() {
  if (connections.cache) {
    return connections.cache
  }
  const url = process.env.REDIS_URL
  const {host, port} = parseDatabaseUrl(url)
  const client = redis.createClient(port, host)
  
  client.on('connect', () => {
    debug('Connected to DB')
  })
  
  client.on('end', () => {
    debug('Connection to redis terminated')
  })
  
  client.on('error', (err) => {
    debug('Error occurred', err)
    console.log("\nNo connectin to save todos. Exiting...")
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
