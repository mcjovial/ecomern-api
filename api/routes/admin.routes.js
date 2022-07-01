const express = require('express');
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth.middleware');

const {
  getAllOrders,
  changeOrderStatus,
} = require('../controllers/admin.controller');

// routes
router.get('/admin/orders', authCheck, adminCheck, getAllOrders);
router.put('/admin/order-status', authCheck, adminCheck, changeOrderStatus);

module.exports = router;
