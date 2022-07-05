const rolesChecker = user => {
    return {
        isAdmin: user?.role === 'ADMIN',
        isDriver: user?.role === 'DRIVER',
        isPassenger: user?.role === 'PASSENGER',
    }
}

module.exports = { rolesChecker }