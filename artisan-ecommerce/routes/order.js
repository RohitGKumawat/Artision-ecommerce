const express = require('express');
const { placeOrder, getUserOrders, getAllOrders, updateOrderStatus } = require('../controllers/orderController');
const router = express.Router();

// Route to place an order
router.post('/', placeOrder);

// Route to get user's orders
router.get('/my-orders', getUserOrders);

// Admin route to get all orders
router.get('/all', getAllOrders);

// Admin route to update order status
router.put('/:id/status', updateOrderStatus);

module.exports = router;
