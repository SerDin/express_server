const express = require('express')
const router = express.Router()
const usersRoutes = require('./users/users.routes')
const messageRoutes = require('./messages/messages.routes')

router.use('/users', usersRoutes)
router.use('/messages', messageRoutes)

module.exports = router