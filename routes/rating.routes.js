const router = require("express").Router()
const User = require("./../models/User.model")
const { isLoggedIn, isLoggedOut } = require('./../middleware/session-guard')


// Rating a specific user
router.get('/users/:id/rate', (req, res, next) => {
    const { id } = req.params

    res.render('ratings/ratings-form')
})

// router.post('/users/:id/rate', (req, res, next) => {
//     const { id } = req.params

//     User
//         .findById(id)
//         .then(() => res.render('ratings/ratings-form', { user: req.session.currentUser }))
//         .catch(err => console.log(err))

// })

module.exports = router