const express = require('express')
const bodyParser = require('body-parser')
const weatherRoutes = require('./routes/weather.routes')
const app = express()

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.use('/api/weatherRoutes', weatherRoutes)

module.exports = app
