const router = require("express").Router()

// Base routes
router.use('/', require('./base.routes'))

// Auth routes
router.use('/users', require('./auth.routes'))

// Trips routes 
router.use('/', require('./trip.routes'))

// Api Maps routes
router.use('/api', require('./api.routes'))

// User routes
router.use('/', require('./user.routes'))

// Rating routes
// router.use('/', require('./rating.routes'))

module.exports = router