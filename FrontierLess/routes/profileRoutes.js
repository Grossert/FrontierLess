const express = require('express')
const router = express.Router()
const checkAuth = require('../helpers/auth').checkAuth

const ProfileController = require('../controllers/ProfileController')

router.get('/', checkAuth, ProfileController.getProfile)

module.exports = router