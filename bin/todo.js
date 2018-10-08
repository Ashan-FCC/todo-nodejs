#!/usr/bin/env node

const path = __dirname + '/../.localenv'
require('dotenv').config({path, silent: true})
const { workflow }  = require('../lib/workflow')

workflow()
