class Helpers {
    isAuthenticated = (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error', 'Primero debes iniciar sesión.');
        res.redirect('/users/signin');
    }
}

module.exports = new Helpers();