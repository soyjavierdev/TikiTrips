const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const saltRounds = 10

// Sign up

router.get('/users/signup', (req, res, next) => {
    res.render('auth/signup')
})

router.post('/users/signup', (req, res, next) => {

    const { userPwd } = req.body

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(userPwd, salt))
        .then(hashedPassword => User.create({ ...req.body, password: hashedPassword }))
        .then(createdUser => res.redirect('/'))
        .catch(err => console.log(err))  // Cambiar al nuevo
})

// Log in

router.get('/users/login', (req, res, next) => {
    res.render('auth/login')
})

router.post('/users/login', (req, res, next) => {

    const { email, userPwd } = req.body

    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                res.render('auth/login', { errorMessage: 'Email not registered in the database' })
                return
            } else if (bcrypt.compareSync(userPwd, user.password) === false) {
                res.render('auth/login', { errorMessage: 'Password is incorrect' })
                return
            } else {
                req.session.currentUser = user
                res.redirect('/')
            }
        })
        .catch(error => next(error))   // Cambiar al nuevo
})


// Log out

router.get('/users/logout', (req, res, next) => {
    req.session.destroy(() => res.redirect('/users/login'))
})



module.exports = router


