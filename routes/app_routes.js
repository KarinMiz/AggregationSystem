const express = require('express')
const router = express.Router()
const Data = require('../controllers/robots_controllers')

router.post('/', Data.getData)
router.post('/statistics', Data.geStatistics)

module.exports = router