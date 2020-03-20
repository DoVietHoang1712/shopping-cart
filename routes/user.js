const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const passport = require('passport');
const csrf = require('csurf');
const csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile', isLogin , (req,res) => {
    res.render('users/profile.ejs');
});

router.get('/', notLogin, function (req, res, next) {
    next();
});

router.get('/signup', async (req, res) => {
    let messages = req.flash('error');
    console.log(messages);
    res.render('users/signup.ejs', {csrfToken: req.csrfToken(), messages: messages, hasError: messages.length});
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/signup',
    failureFlash: true
}));

router.get('/signin', async (req, res) => {
    let messages = req.flash('error');
    //console.log(messages);
    res.render('users/signin.ejs', {csrfToken: req.csrfToken(), messages: messages, hasError: messages.length});
});

router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/users/signin');
})

module.exports = router;

function isLogin(req, res, next) {
    if(req.isAuthenticated){
        next();
    } 
    res.redirect('/');
}

function notLogin(req, res, next) {
    if(!req.isAuthenticated){
        next();
    } 
    res.redirect('/');
}