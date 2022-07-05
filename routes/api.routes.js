const router = require("express").Router()

const Trip = require('./../models/Trip.model')

router.get('/trips/:id', (req, res) => {
    const { id } = req.params

    Trip
        .findById(id)
        .then(trips => res.json(trips))
        .catch(err => res.json({ Message: 'server error', err }))
})


module.exports = router