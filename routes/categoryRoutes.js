const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.post('/new', categoryController.createCategory);
router.get('/view', categoryController.getCategories);
router.get('/:id', categoryController.getCategoryById);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
