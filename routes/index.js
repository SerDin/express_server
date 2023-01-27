const express = require('express')
const router = express.Router()
const usersRoutes = require('./users/users.routes')

router.use('/users', usersRoutes)

module.exports = router