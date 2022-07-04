const router = require("express").Router()
const Trip = require("../models/Trip.model")


// Create trip

router.get("/trips/create", (req, res, next) => res.render('trips/new-trip'))

router.post("/trips/create", (req, res, next) => {

    const { origin, destination, latitudeOrigin, longitudeOrigin, latitudeDestination, longitudeDestination, date, description, numberOfPassengers, smokingAllowed } = req.body

    Trip
        .create({
            origin: {
                address: origin,
                location: { type: 'Point', coordinates: [latitudeOrigin, longitudeOrigin] }
            },

            destination: {
                address: destination,
                location: { type: 'Point', coordinates: [latitudeDestination, longitudeDestination] }
            }, date, description, numberOfPassengers, smokingAllowed
        })

        .then(trip => res.redirect('/trips'))
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

//  Edit trips

router.get('/trips/:id/edit', (req, res, next) => {

    const { id } = req.params
    console.log("hola aqui estamos")

    Trip

        .findById(id)
        .then(trips => {
            res.render('trips/edit-trip', { trips })
        })
        .catch(err => console.log(err))
});

router.post('/trips/:id/edit', (req, res, next) => {
    const { id } = req.params
    const { origin, destination, latitudeOrigin, longitudeOrigin, latitudeDestination, longitudeDestination, date, description, numberOfPassengers, smokingAllowed } = req.body

    Trip
        .findByIdAndUpdate(id, {
            origin: {
                address: origin,
                location: { type: 'Point', coordinates: [latitudeOrigin, longitudeOrigin] }
            },

            destination: {
                address: destination,
                location: { type: 'Point', coordinates: [latitudeDestination, longitudeDestination] }
            }, date, description, numberOfPassengers, smokingAllowed
        })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
});


// Delete trip

/*
router.post('/trips/:id/delete', (req, res) => {
    const { id } = req.params

    Trip
        .findByIdAndDelete(id)
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
}) */




module.exports = router