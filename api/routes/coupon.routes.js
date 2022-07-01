const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth.middleware");

// controller
const { createCoupon, listCoupon, removeCoupon } = require("../controllers/coupon.controller.js.js");

// routes
router.post("/coupon", authCheck, adminCheck, createCoupon);
router.get("/coupons", listCoupon);
router.delete("/coupon/:couponId", authCheck, adminCheck, removeCoupon);

module.exports = router;
