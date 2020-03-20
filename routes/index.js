const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Cart = require('../models/cart');

router.get('/', async (req, res) => {
    let products = await Product.find({});
    res.render('shop/index.ejs', {title: 'Shopping Cart', products: products});
});

router.get('/add-to-cart/:id', async (req, res) => {
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function(err, result) {
        if(err){
            res.redirect('/');
        }
        cart.add(result, productId);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/');
    })
});

module.exports = router;