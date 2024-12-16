const Cart = require('../models/cart');
const User = require('../models/user');
const Equipment = require('../models/equipment');

// Add an item to the cart
exports.addToCart = async (req, res) => {
    try {
        const { user_id, equipment_id, quantity } = req.body;

        // Validate required fields
        if (!user_id || !equipment_id || !quantity) {
            return res.status(400).json({ message: 'User ID, equipment ID, and quantity are required.' });
        }

        // Check if the equipment exists
        const equipment = await Equipment.findByPk(equipment_id);
        if (!equipment) {
            return res.status(404).json({ message: 'Equipment not found.' });
        }

        // Check if the user exists
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Add item to the cart or update quantity if already present
        const existingCartItem = await Cart.findOne({
            where: { user_id, equipment_id },
        });

        if (existingCartItem) {
            existingCartItem.quantity += quantity;
            await existingCartItem.save();
            return res.status(200).json({ message: 'Cart updated successfully', cart: existingCartItem });
        }

        const cart = await Cart.create({ user_id, equipment_id, quantity });
        res.status(201).json({ message: 'Item added to cart successfully', cart });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get all items in the cart for a user
exports.getCartByUser = async (req, res) => {
    try {
        const { user_id } = req.params;

        const cartItems = await Cart.findAll({
            where: { user_id },
            include: [
                { model: Equipment, attributes: ['equipment_name', 'equipment_img', 'quantity', 'status', 'location'] },
            ],
        });

        if (!cartItems.length) {
            return res.status(404).json({ message: 'Cart is empty.' });
        }

        res.json(cartItems);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update the quantity of an item in the cart
exports.updateCartQuantity = async (req, res) => {
    try {
        const { cart_id } = req.params;
        const { quantity } = req.body;

        if (!quantity) {
            return res.status(400).json({ message: 'Quantity is required.' });
        }

        const cartItem = await Cart.findByPk(cart_id);
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found.' });
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        res.json({ message: 'Cart quantity updated successfully', cart: cartItem });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Remove an item from the cart
exports.removeFromCart = async (req, res) => {
    try {
        const { cart_id } = req.params;

        const cartItem = await Cart.findByPk(cart_id);
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found.' });
        }

        await cartItem.destroy();
        res.json({ message: 'Item removed from cart successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
