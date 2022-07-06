const router = require("express").Router()
const Trip = require("../models/Trip.model")
const User = require("./../models/User.model")    //For populated
const { isLoggedIn, isLoggedOut } = require('./../middleware/session-guard')
const { checkRole } = require('./../middleware/roles-checker')


// Create trip
router.get("/trips/create", isLoggedIn, checkRole('ADMIN', 'DRIVER'), (req, res, next) => res.render('trips/new-trip'))

router.post("/trips/create", isLoggedIn, (req, res, next) => {

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
            },
            date, description, numberOfPassengers, smokingAllowed, owner: req.session.currentUser._id
        })
        .then(() => res.redirect('/trips'))
        .catch(err => console.log(err))
})


// Show Trips
router.get('/trips', isLoggedIn, (req, res, next) => {

    Trip
        .find()
        .select({ origin: 1, destination: 1, numberOfPassengers: 1 }) // Map image
        .then(trips => res.render('trips/trip-list', { trips }))
        .catch(err => console.log(err))
})


// Show Details of Trip
router.get('/trips/:id', isLoggedIn, (req, res, next) => {

    const { id } = req.params

    Trip
        .findById(id)
        .populate('passengers owner')
        .then(trip => {
            let isTripPassenger = false
            trip.passengers.forEach(element => {
                if (element._id.toString() === req.session.currentUser._id) {
                    isTripPassenger = true
                }
            })
            res.render('trips/details-trip', { trip, isTripPassenger })
        })
        .catch(err => console.log(err))
})


//  Edit trips
router.get('/trips/:id/edit', isLoggedIn, (req, res, next) => {

    const { id } = req.params

    Trip

        .findById(id)
        .then(trips => {
            res.render('trips/edit-trip', { trips })
        })
        .catch(err => console.log(err))
})

router.post('/trips/:id/edit', isLoggedIn, (req, res, next) => {

    const { id } = req.params
    const { origin, destination, date, description, numberOfPassengers, smokingAllowed } = req.body

    Trip
        .findByIdAndUpdate(id, {
            origin: {
                address: origin,
            },

            destination: {
                address: destination,

            }, date, description, numberOfPassengers, smokingAllowed
        })
        .then(() => res.redirect('/trips'))
        .catch(err => console.log(err))
});


// Delete trip
router.post('/trips/:id/delete', isLoggedIn, (req, res) => {

    const { id } = req.params

    Trip
        .findByIdAndDelete(id)
        .then(() => res.redirect('/trips'))
        .catch(err => console.log(err))
})


// Join Trip
router.get('/trips/:id/join', isLoggedIn, (req, res) => {

    const { id } = req.params
    console.log("EOEOEEO", req.session)

    const idNewPassenger = req.session.currentUser._id

    Trip
        .findByIdAndUpdate(id, { $push: { passengers: idNewPassenger } })
        .then((passengers) => res.render('trips/join-user-trip', { passengers }))
        .catch(err => console.log(err))
})


/*
router.post("/trips/create", isLoggedIn, (req, res, next) => {

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
            },
            date, description, numberOfPassengers, smokingAllowed
        })

        .then(() => res.redirect('/trips'))
        .catch(err => console.log(err))
})  */




module.exports = router