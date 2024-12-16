const Category = require('../models/category');

// Create a new category
exports.createCategory = async (req, res) => {
    try {
        const { category_name } = req.body;

        // Validate required fields
        if (!category_name) {
            return res.status(400).json({ message: 'Category name is required.' });
        }

        const category = await Category.create({ category_name });
        res.status(201).json({ message: 'Category created successfully', category });
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ message: 'Category name must be unique.' });
        } else {
            res.status(500).json({ message: 'Server error', error: err.message });
        }
    }
};

// Get all categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a category
exports.updateCategory = async (req, res) => {
    try {
        const { category_name } = req.body;
        const category = await Category.findByPk(req.params.id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        category.category_name = category_name || category.category_name;
        await category.save();

        res.json({ message: 'Category updated successfully', category });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        await category.destroy();
        res.json({ message: 'Category deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
