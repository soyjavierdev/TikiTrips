const router = require("express").Router()
const Trip = require("../models/Trip.model")


// Create trip

router.get("/trips/create", (req, res, next) => res.render('trips/new-trip'))

router.post("/trips/create", (req, res, next) => {

    const { origin, destination, latitude, longitude, date, description, numberOfPassengers, smokingAllowed } = req.body

    Trip
        .create({
            origin: {
                address: origin,
                location: { type: 'Point', coordinates: [latitude, longitude] }
            },

            destination: {
                address: destination,
                location: { type: 'Point', coordinates: [latitude, longitude] }
            }, date, description, numberOfPassengers, smokingAllowed
        })

        .then(trip => res.redirect('/'))
        .catch(err => console.log(err))
})

// Show Trips

router.get('/trips', (req, res, next) => {

    Trip
        .find()
        .then(trips => res.render('trips/trip-list', { trips }))
        .catch(err => console.log(err))
})

// Show Deatils of Trip

router.get('/trips/:id', (req, res, next) => {
    const { id } = req.params

    Trip
        .findById(id)
        .then(trip => {
            res.render('trips/details-trip', { trip })
        })
        .catch(err => console.log(err))
})


module.exports = router