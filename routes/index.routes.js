const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// Auth routes
router.use('/', require('./auth.routes'))

//  Trips routes 
router.use('/', require('./trip.routes'))

// Api Maps routes

router.use('/api', require('./api.routes'))




router.use('/', require('./user.routes'))

module.exports = router;
