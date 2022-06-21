const express = require('express')

const controller = require('./launches.controller')

const router = express.Router();

router.get('/', controller.getAllLaunches)
router.post('/', controller.addNewLaunch)
router.delete('/:id', controller.abortLaunch)

module.exports = router