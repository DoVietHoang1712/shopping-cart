const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const csrf = require('csurf');
const csrfProtection = csrf();

router.get('/', async (req, res) => {
    let products = await Product.find({});
    res.render('shop/index.ejs', {title: 'Shopping Cart', products: products});
});

router.get('/users/signup', async (req, res) => {
    res.render('users/signup.ejs', {csrfToken: req.csrfToken()});
})
module.exports = router;