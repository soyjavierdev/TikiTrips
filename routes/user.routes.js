const { listenerCount } = require("../models/Car.model")
const router = require("express").Router()
const User = require("./../models/User.model")
const { isLoggedIn, isLoggedOut } = require('./../middleware/session-guard')



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
    
    User
        .findById(id)
        // .then(user => {
        //     const isPassenger = false
        //     const isDriver = false
        //     if (user.role === 'PASSENGER') {
        //         isPassenger = true
        //     } else if (user.role === 'DRIVER') {
        //         isDriver = true
        //     }
        //     const info = { user, isPassenger, isDriver }
        //     return info
        // })
        .then(info => res.render('user/edit-users', info))
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