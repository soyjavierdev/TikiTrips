
/* const isJoin = (req, res, next) => {
    const { passengers } = req.params

    passengers.forEach(element => {
        if (req.session.currentUser._id !== element._id) {
            next()
        } else {
            return res.render('user/list-users', { errorMessage: 'You are not authorized to perform this action' })
        }
    })

}

module.exports = { isJoin } */