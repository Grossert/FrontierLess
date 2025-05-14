const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/AuhtController')

router.post('/login', AuthController.loginPost)
router.get('/logout', AuthController.logout)

module.exports = router