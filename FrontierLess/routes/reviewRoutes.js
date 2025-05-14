const express = require('express');
const router = express.Router();
const { checkAuth } = require('../helpers/auth');
const ReviewController = require('../controllers/ReviewController');

router.get('/:id', checkAuth, ReviewController.getReview);
router.get('/reviews/:projectId', checkAuth, ReviewController.findAllByProject);
router.post('/', checkAuth, ReviewController.createReview);
router.delete('/:id/:projectId', checkAuth, ReviewController.removeReview);
router.put('/edit/:id', checkAuth, ReviewController.updateReview);

module.exports = router