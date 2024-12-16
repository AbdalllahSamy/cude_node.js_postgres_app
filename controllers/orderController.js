const Order = require('../models/order');
const User = require('../models/user');

// Create a new order
exports.createOrder = async (req, res) => {
    try {
        const { user_id, date } = req.body;

        // Validate required fields
        if (!user_id) {
            return res.status(400).json({ message: 'User ID is required.' });
        }

        // Check if user exists
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const order = await Order.create({ user_id, date });
        res.status(201).json({ message: 'Order created successfully', order });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get all orders
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: {
                model: User,
                attributes: ['username', 'email'], // Include related user details
            },
        });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get an order by ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id, {
            include: {
                model: User,
                attributes: ['username', 'email'], // Include related user details
            },
        });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update an order
exports.updateOrder = async (req, res) => {
    try {
        const { user_id, date } = req.body;
        const order = await Order.findByPk(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (user_id) {
            // Validate user existence
            const user = await User.findByPk(user_id);
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }
        }

        order.user_id = user_id || order.user_id;
        order.date = date || order.date;
        await order.save();

        res.json({ message: 'Order updated successfully', order });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        await order.destroy();
        res.json({ message: 'Order deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
