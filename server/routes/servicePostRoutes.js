const express = require('express')
const { createService, updateService, getService, checkHaveService, getServiceSlug, deleteService, getAllServices, getAllServicesByFilter } = require('../controllers/servicePostControllers')
const { requireLogin }= require('../middlewares/authToken')
const router = express.Router()

router.post('/create-service',requireLogin, createService)
router.get('/edit-service/:slug' ,getService)
router.post('/check-service',requireLogin , checkHaveService)
router.post('/get-service-slug',requireLogin , getServiceSlug)
router.put('/edit-service/:slug',requireLogin , updateService)
router.delete('/edit-service/:slug',requireLogin , deleteService)
router.get('/service', getAllServices)
router.post('/service', getAllServicesByFilter)

module.exports = router