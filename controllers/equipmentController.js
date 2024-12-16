const Equipment = require('../models/equipment');
const Category = require('../models/category');
const Supplier = require('../models/supplier');

// Create a new equipment
exports.createEquipment = async (req, res) => {
    try {
        const { equipment_name, equipment_img, rating, model_number, purchase_date, quantity, status, location, category_id, supplier_id } = req.body;

        // Validate required fields
        if (!equipment_name || !category_id || !supplier_id) {
            return res.status(400).json({ message: 'Equipment name, category ID, and supplier ID are required.' });
        }

        const equipment = await Equipment.create({
            equipment_name,
            equipment_img,
            rating,
            model_number,
            purchase_date,
            quantity,
            status,
            location,
            category_id,
            supplier_id,
        });

        res.status(201).json({ message: 'Equipment created successfully', equipment });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get all equipments
exports.getEquipments = async (req, res) => {
    try {
        const equipments = await Equipment.findAll({
            include: [
                { model: Category, attributes: ['category_name'] },
                { model: Supplier, attributes: ['supplier_name', 'contact_info'] },
            ],
        });
        res.json(equipments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get an equipment by ID
exports.getEquipmentById = async (req, res) => {
    try {
        const equipment = await Equipment.findByPk(req.params.id, {
            include: [
                { model: Category, attributes: ['category_name'] },
                { model: Supplier, attributes: ['supplier_name', 'contact_info'] },
            ],
        });

        if (!equipment) {
            return res.status(404).json({ message: 'Equipment not found' });
        }
        res.json(equipment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update an equipment
exports.updateEquipment = async (req, res) => {
    try {
        const { equipment_name, equipment_img, rating, model_number, purchase_date, quantity, status, location, category_id, supplier_id } = req.body;
        const equipment = await Equipment.findByPk(req.params.id);

        if (!equipment) {
            return res.status(404).json({ message: 'Equipment not found' });
        }

        equipment.equipment_name = equipment_name || equipment.equipment_name;
        equipment.equipment_img = equipment_img || equipment.equipment_img;
        equipment.rating = rating || equipment.rating;
        equipment.model_number = model_number || equipment.model_number;
        equipment.purchase_date = purchase_date || equipment.purchase_date;
        equipment.quantity = quantity || equipment.quantity;
        equipment.status = status || equipment.status;
        equipment.location = location || equipment.location;
        equipment.category_id = category_id || equipment.category_id;
        equipment.supplier_id = supplier_id || equipment.supplier_id;

        await equipment.save();

        res.json({ message: 'Equipment updated successfully', equipment });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete an equipment
exports.deleteEquipment = async (req, res) => {
    try {
        const equipment = await Equipment.findByPk(req.params.id);
        if (!equipment) {
            return res.status(404).json({ message: 'Equipment not found' });
        }

        await equipment.destroy();
        res.json({ message: 'Equipment deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
