// @flow

import express from 'express'
import { Server } from 'http'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'

import routing from './routing'
import apiRouting from './api/routes'
import loadModels from './models'
import { WEB_PORT, STATIC_PATH, MONGODB_URI } from '../shared/config'
import { isProd } from '../shared/util'

const app = express()

// initialize mongoose connection and load models
mongoose.connect(isProd ? process.env.MONGODB_URI || MONGODB_URI : MONGODB_URI)
mongoose.Promise = global.Promise
loadModels()

// flow-disable-next-line
const http = Server(app)

// set up middleware to use gzipped js files
app.get('*.js', (req, res, next) => {
  req.url = `${req.url}.gz`
  res.set('Content-Encoding', 'gzip')
  next()
})

app.use(STATIC_PATH, express.static('dist'))
app.use(STATIC_PATH, express.static('public'))

app.use(cookieSession({
  name: 'session',
  keys: [process.env.SESSION_KEY || 'cat_board_key'],

  maxAge: 365 * 24 * 60 * 60 * 1000,
}))

apiRouting(app)
routing(app)

http.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)' :
    '(development).\nKeep "yarn dev:wds" running in an other terminal'}.`)
})
