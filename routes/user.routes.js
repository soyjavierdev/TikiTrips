// const { listenerCount } = require("../models/Car.model")
const router = require("express").Router()
const User = require("./../models/User.model")
const { isLoggedIn, isLoggedOut } = require('./../middleware/session-guard')
const { checkRole } = require('./../middleware/roles-checker')

const { rolesChecker } = require("./../utils/roles-checker")



// Users list

router.get('/users', isLoggedIn, (req, res, next) => {
    User
        .find()
        .then(users => {
            res.render('user/list-users', { users })
        })
        .catch(err => console.log(err))
})


// One user details

router.get('/users/:id', isLoggedIn, (req, res, next) => {
    const { id } = req.params
    User
        .findById(id)
        .then(user => {
            res.render('user/details-users', { user })
        })
        .catch(err => console.log(err))
})


// Update user

router.get('/users/:id/edit', isLoggedIn, (req, res, next) => {
    const { id } = req.params

    let selfUser = false

    if (id === req.session.currentUser._id) {
        selfUser = true
    }

    User
        .findById(id)
        .then(user => {
            const adminRole = rolesChecker(user).isAdmin
            const driverRole = rolesChecker(user).isDriver
            const passengerRole = rolesChecker(user).isPassenger
            console.log(rolesChecker(user))

            res.render('user/edit-users', { user, adminRole, driverRole, passengerRole, selfUser })

        })
        .catch(err => console.log(err))
})

router.post('/users/:id/edit', isLoggedIn, (req, res, next) => {
    const { username, bio, profilePic, email, phoneNumber, role, birth } = req.body
    const { id } = req.params

    User
        .findByIdAndUpdate(id, { username, bio, profilePic, email, phoneNumber, role, birth })
        .then(() => res.redirect(`/users/${id}`))
        .catch(err => console.log(err))
})


//Delete user

router.post('/users/:id/delete', isLoggedIn, (req, res, next) => {
    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('/users'))
        .catch(err => console.log(err))
})

module.exports = router