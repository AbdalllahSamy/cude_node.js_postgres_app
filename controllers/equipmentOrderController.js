const EquipmentOrder = require('../models/equipmentOrder');
const Order = require('../models/order');
const Equipment = require('../models/equipment');

// Add a new equipment order
exports.addEquipmentOrder = async (req, res) => {
    try {
        const { order_id, equipment_id, quantity } = req.body;

        // Validate required fields
        if (!order_id || !equipment_id || !quantity) {
            return res.status(400).json({ message: 'Order ID, Equipment ID, and Quantity are required.' });
        }

        // Check if the order exists
        const order = await Order.findByPk(order_id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        // Check if the equipment exists
        const equipment = await Equipment.findByPk(equipment_id);
        if (!equipment) {
            return res.status(404).json({ message: 'Equipment not found.' });
        }

        // Create the equipment order
        const equipmentOrder = await EquipmentOrder.create({ order_id, equipment_id, quantity });
        res.status(201).json({ message: 'Equipment order added successfully', equipmentOrder });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get all equipment orders for a specific order
exports.getEquipmentOrdersByOrder = async (req, res) => {
    try {
        const { order_id } = req.params;

        const equipmentOrders = await EquipmentOrder.findAll({
            where: { order_id },
            include: [
                { model: Equipment, attributes: ['equipment_name', 'model_number', 'location'] },
            ],
        });

        if (!equipmentOrders.length) {
            return res.status(404).json({ message: 'No equipment orders found for this order.' });
        }

        res.json(equipmentOrders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update an equipment order
exports.updateEquipmentOrder = async (req, res) => {
    try {
        const { equipment_order_id } = req.params;
        const { quantity } = req.body;

        const equipmentOrder = await EquipmentOrder.findByPk(equipment_order_id);
        if (!equipmentOrder) {
            return res.status(404).json({ message: 'Equipment order not found.' });
        }

        equipmentOrder.quantity = quantity || equipmentOrder.quantity;
        await equipmentOrder.save();

        res.json({ message: 'Equipment order updated successfully', equipmentOrder });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete an equipment order
exports.deleteEquipmentOrder = async (req, res) => {
    try {
        const { equipment_order_id } = req.params;

        const equipmentOrder = await EquipmentOrder.findByPk(equipment_order_id);
        if (!equipmentOrder) {
            return res.status(404).json({ message: 'Equipment order not found.' });
        }

        await equipmentOrder.destroy();
        res.json({ message: 'Equipment order deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
