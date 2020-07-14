const User = require('../models/User');

const passport = require('passport');

class usersController {

    renderSignUpForm = (req, res) => {
        res.render('users/signup');
    }

    signUp = async (req, res) => {
        const errors = [];
        const {name, email, password, confirm_password} = req.body;

        if(password != confirm_password) {
            errors.push({text: 'Las contraseñas son diferentes.'});
        }
        if(password.length < 4) {
            errors.push({text: 'La contraseña debe tener al menos 4 caracteres.'});
        }
        if(errors.length > 0) {
            res.render('users/signup', {errors, name, email});
        } else {
            try {
                const emailUser = await User.findOne({email});

                if (emailUser) {
                    req.flash('error_msg', 'El correo ya está en uso.');
                    res.redirect('/users/signup');
                } else {
                    const newUser = new User({name, email, password});
                    newUser.password = await newUser.encryptPassword(password);
                    await newUser.save();
                    req.flash('success_msg', 'Registro completado.');
                    res.redirect('/users/signin');
                }
            } catch (error) {
                console.error(error);
                req.flash('error_msg', 'Ha ocurrido un error en la base de datos, intente más tarde.');
                res.redirect('/users/signup');
            };
        }
    }

    renderSignInForm = (req, res) => {
        res.render('users/signin');
    }

    signIn = passport.authenticate('local', {
        failureRedirect: '/users/signin',
        successRedirect: '/notes',
        failureFlash: true
    });

    logOut = (req, res) => {
        try {
            req.logOut();
            req.flash('success_msg', 'Tu sesión ha sido cerrada correctamente.');
            res.redirect('/users/signin');
        } catch (error) {
            console.error(error);
            req.flash('error_msg', 'Ha ocurrido un error, intente más tarde.');
            res.redirect('/notes');
        };
    }

}

module.exports = new usersController();