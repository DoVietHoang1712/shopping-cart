const passport = require('passport');
const User = require('../models/user');
const LocalStratery = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
//const {check, validationResult} = require('express-validator');

passport.serializeUser(function(user, done) {
    done(null, user.id)
});

passport.deserializeUser(async function(id, done){
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use('local.signup', new LocalStratery({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
} ,function(req, email, password, done){
    req.checkBody('email', 'Invalid Email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid Password').notEmpty().isLength({min: 4});
    let errors = req.validationErrors();
    if(errors){
        let messages = [];
        errors.forEach(error => {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({email}, async function(err, user) {
        if(err){
            done(err);
        } 
        if(user) {
            done(null, false, {message: 'Email is already in use.'});
        }
        let newUser = new User();
        let encode = await bcrypt.hash(password, 10);
        newUser.email = email;
        newUser.password = encode;
        newUser.save(function(err, result){
            if(err){
                return done(err);
            } 
            return done(null, newUser);
        })
    })
}));

passport.use('local.signin', new LocalStratery({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
    req.checkBody('email', 'Invalid Email').isEmail().notEmpty();
    req.checkBody('email', 'Invalid Email').notEmpty().isLength({min: 4});
    let errors = req.validationErrors();
    if(errors){
        let messages = [];
        errors.forEach(error => {
            messages.push(error.msg);
        });
        return(null, false, req.flash('error', messages));
    }
    User.findOne({email}, async function(err, user){
        if(err){
            return done(err);
        } 
        if(!user){
            return done(null, false, {message: 'Email is not sign up'});
        } 
        let check = await bcrypt.compare(password, user.password);
        if(check !== true){
            return done(null, false, {message: 'Incorrect Password'});
        } else{
            return done(null, user);
        }
    })
}));