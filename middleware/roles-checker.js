const checkRole = (...grantedRoles) => (req, res, next) => {

    if (grantedRoles.includes(req.session.currentUser.role)) {
        next()
    } else {
        res.render('auth/no-permission', { errormessage: "You don't have the necessary credentials, please contact the Admin" })
    }
}

module.exports = { checkRole }