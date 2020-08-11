const {Router} = require('express');
const router = Router();

const { 
    renderSignUpForm,
    signUp,
    renderSignInForm,
    signIn,
    logOut
} = require('../controllers/users.controller');

// Mostrar form de registro --> GET /users/signup
router.get('/users/signup', renderSignUpForm);
// Registrar Usuario --> POST /users/signup
router.post('/users/signup', signUp);

// Mostrar form para iniciar sesión --> GET /users/signin
router.get('/users/signin', renderSignInForm);
// Iniciar sesión --> POST /users/signin
router.post('/users/signin', signIn);

// Cerrar sesión --> GET /users/logout
router.get('/users/logout', logOut);

module.exports = router;