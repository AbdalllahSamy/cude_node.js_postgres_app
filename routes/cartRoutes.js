const express = require('express');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.post('/add', cartController.addToCart);
router.get('/view/:user_id', cartController.getCartByUser);
router.put('/update/:cart_id', cartController.updateCartQuantity);
router.delete('/remove/:cart_id', cartController.removeFromCart);

module.exports = router;
