const express = require('express');
const supplierController = require('../controllers/supplierController');

const router = express.Router();

router.post('/new', supplierController.createSupplier);
router.get('/view', supplierController.getSuppliers);
router.get('/:id', supplierController.getSupplierById);
router.put('/:id', supplierController.updateSupplier);
router.delete('/:id', supplierController.deleteSupplier);

module.exports = router;
