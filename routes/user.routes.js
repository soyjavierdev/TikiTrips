const router = require("express").Router()
const User = require("./../models/User.model")
const Rating = require("./../models/Rating.model")
const { isLoggedIn, isLoggedOut } = require('./../middleware/session-guard')
const { checkRole } = require('./../middleware/roles-checker')
const { isAuthorized } = require('./../middleware/admin-owner-checker')
const { rolesChecker } = require("./../utils/roles-checker")


// Users list
router.get('/users', isLoggedIn, (req, res, next) => {

    User
        .find()
        .select({ username: 1, role: 1, profilePic: 1 })
        .then(users => {
            res.render('user/list-users', { users })
        })
        .catch(err => console.log(err))
})


// My profile
router.get('/users/myprofile', isLoggedIn, (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(() => res.render('user/my-profile', { user: req.session.currentUser }))
        .catch(err => console.log(err))
})


// One user details
router.get('/users/:id', isLoggedIn, (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(user => {
            const allRoles = rolesChecker(req.session.currentUser)

            let selfUser = (id === req.session.currentUser._id && allRoles.isAdmin === false)

            res.render('user/details-users', { user, allRoles, selfUser })
        })
        .catch(err => console.log(err))
})


// Update user

router.get('/users/:id/edit', isLoggedIn, isAuthorized, (req, res, next) => {

    const { id } = req.params

    let selfUser = id === req.session.currentUser._id

    User
        .findById(id)
        .then(user => {
            const allRoles = rolesChecker(user)
            res.render('user/edit-users', { user, allRoles, selfUser })
        })
        .catch(err => console.log(err))
})


router.post('/users/:id/edit', isLoggedIn, isAuthorized, (req, res, next) => {

    const { username, bio, profilePic, email, phoneNumber, role, birth } = req.body
    const { id } = req.params

    User
        .findByIdAndUpdate(id, { username, bio, profilePic, email, phoneNumber, role, birth })
        .then(() => res.redirect(`/users/${id}`))
        .catch(err => console.log(err))
})


//Individual Rating


router.post('/users/:id/rating', (req, res, next) => {


    const { score } = req.body
    const { id } = req.params
    const { currentUser } = req.session

    const editRating = { judge: currentUser._id, score }

    Rating
        .create(editRating)
        .then(rating => {
            console.log(id)
            User.findByIdAndUpdate(id, { $push: { ratingArr: rating } }) // Preguntar a Clara
        })
        .then(() => res.render('user/ratings', { id, currentUser, editRating }))
        .catch(err => console.log(err))
    console.log(id)

})

//Delete user
router.post('/users/:id/delete', isLoggedIn, isAuthorized, (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('/users'))
        .catch(err => console.log(err))
})

module.exports = router