const express = require('express');

const router = express.Router();

// middlewares
const { authCheck } = require('../middlewares/auth.middleware');

// controllers
const { saveUserCart, getUserCart, emptyCart, saveAddress, applyCouponToUserCart, getWishlist, removeFromWishlist, addToWishlist, orders, createOrder, createCashOrder } = require('../controllers/user.controller');

router.post('/user/cart', authCheck, saveUserCart); // save cart
router.get('/user/cart', authCheck, getUserCart); // get cart
router.delete('/user/cart', authCheck, emptyCart); // empty cart
router.post('/user/address', authCheck, saveAddress);

router.post('/user/order', authCheck, createOrder); // stripe
router.post('/user/cash-order', authCheck, createCashOrder); // cod
router.get('/user/orders', authCheck, orders);

// coupon
router.post('/user/cart/coupon', authCheck, applyCouponToUserCart);

// wishlist
router.post('/user/wishlist', authCheck, addToWishlist);
router.get('/user/wishlist', authCheck, getWishlist);
router.put('/user/wishlist/:productId', authCheck, removeFromWishlist);

module.exports = router;
