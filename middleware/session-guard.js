const isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
        return res.render('user/list-users', { errorMessage: 'You must be logged in to access this page' })
    }
    next()
}

const isLoggedOut = (req, res, next) => {
    if (req.session.currentUser) {
        return res.redirect('/')
    }
    next()
}




module.exports = { isLoggedIn, isLoggedOut }