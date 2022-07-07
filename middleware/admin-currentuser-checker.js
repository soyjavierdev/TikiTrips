const isAuthorized = (req, res, next) => {
    const { id } = req.params

    if (req.session.currentUser.role === 'ADMIN' || req.session.currentUser._id === id) {
        next()
    } else {
        return res.render('user/list-users', { errorMessage: 'You are not authorized to perform this action' })
    }
}

module.exports = { isAuthorized }