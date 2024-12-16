const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.post('/new', orderController.createOrder);
router.get('/view', orderController.getOrders);
router.get('/:id', orderController.getOrderById);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
