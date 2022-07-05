const router = require("express").Router();
const { rolesChecker } = require("./../utils/roles-checker")


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// Auth routes
router.use('/', require('./auth.routes'))

//  Trips routes 
router.use('/', require('./trip.routes'))






router.use('/', require('./user.routes'))

module.exports = router;
