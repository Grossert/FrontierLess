const express = require('express')
const router = express.Router()
const { checkAuth } = require('../helpers/auth')

const UserController = require('../controllers/UserController')

router.get('/:id', checkAuth, UserController.getUser);
router.post('/', UserController.createUser);
router.delete('/:id', checkAuth, UserController.removeUser);
router.put('/:id', checkAuth, UserController.updateUser);
router.post('/:followedId/follow', checkAuth, UserController.followUser);
router.delete('/:followedId/unfollow', checkAuth, UserController.unfollowUser);
router.get('/:userId/followers', checkAuth, UserController.getFollowers);//Lista usuários que seguem o userId
router.get('/:userId/following', checkAuth, UserController.getFollowing);//Lista usuários seguidos pelo userId

module.exports = router