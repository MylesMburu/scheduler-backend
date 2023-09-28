const router = require('express').Router();
const { getAllTasks } = require('../controllers/tasks.controller');

router.get('/', getAllTasks);

module.exports = router;