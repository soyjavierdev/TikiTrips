const router = require("express").Router()

const Trip = require('./../models/Trip.model')

router.get('/trips', (req, res) => {

    Trip
        .find()
        .then(trips => res.json(trips))
        .catch(err => res.json({ Message: 'server error', err }))
})

module.exports = router