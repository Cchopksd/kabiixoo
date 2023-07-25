const express = require('express')
const { createService, updateService, getService, checkHaveService, getServiceSlug, deleteService } = require('../controllers/servicePostControllers')
const router = express.Router()

router.post('/create-service', createService)
router.get('/edit-service/:slug',getService)
router.post('/check-service', checkHaveService)
router.post('/get-service-slug', getServiceSlug)
router.put('/edit-service/:slug', updateService)
router.delete('/edit-service/:slug', deleteService)

module.exports = router