const express = require('express');
const router = express.Router();
const checkAuth = require('../helpers/auth').checkAuth;
const ProjectItemController = require('../controllers/ProjectItemController');


router.get('/:id', checkAuth, ProjectItemController.getProjectItem);
router.get('/project-items/:projectId', checkAuth, ProjectItemController.findAllByProject);
router.post('/', checkAuth, ProjectItemController.createProjectItem);
router.delete('/:id', checkAuth, ProjectItemController.removeProjectItem)
router.put('/:id', checkAuth, ProjectItemController.updateProjectItem)

module.exports = router;