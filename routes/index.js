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

router.get('/shopping-cart', async (req, res) => {
    if(!req.session.cart){
        return res.render('shop/shop-cart.ejs', {products: null});
    }
    let cart = new Cart(req.session.cart);
    console.log(cart.generateArray());
    res.render('shop/shop-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/checkout', (req, res) => {
    if(!req.session.cart){
        return res.redirect('/shopping-cart');
    }
    let cart = new Cart(req.session.cart);
    res.render('shop/checkout.ejs', {total: cart.totalPrice, })
})
module.exports = router;