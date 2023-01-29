require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()


const fs = require('fs')

const routes = require('./routes/index')

const app = express()

const port = process.env.PORT

// connect to routes in folder routes
app.use( '/api', routes)

app.listen(port, () => console.log('Server is Runing ' + port))