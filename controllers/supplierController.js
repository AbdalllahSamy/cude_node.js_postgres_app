const Supplier = require('../models/supplier');

// Create a new supplier
exports.createSupplier = async (req, res) => {
    try {
        const { supplier_name, contact_info, address } = req.body;

        // Validate required fields
        if (!supplier_name || !contact_info || !address) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const supplier = await Supplier.create({ supplier_name, contact_info, address });
        res.status(201).json({ message: 'Supplier created successfully', supplier });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get all suppliers
exports.getSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.findAll();
        res.json(suppliers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a supplier by ID
exports.getSupplierById = async (req, res) => {
    try {
        const supplier = await Supplier.findByPk(req.params.id);
        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        res.json(supplier);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a supplier
exports.updateSupplier = async (req, res) => {
    try {
        const { supplier_name, contact_info, address } = req.body;
        const supplier = await Supplier.findByPk(req.params.id);

        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        supplier.supplier_name = supplier_name || supplier.supplier_name;
        supplier.contact_info = contact_info || supplier.contact_info;
        supplier.address = address || supplier.address;
        await supplier.save();

        res.json({ message: 'Supplier updated successfully', supplier });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a supplier
exports.deleteSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.findByPk(req.params.id);
        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        await supplier.destroy();
        res.json({ message: 'Supplier deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
