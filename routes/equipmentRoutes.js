const express = require('express');
const equipmentController = require('../controllers/equipmentController');

const router = express.Router();

router.post('/new', equipmentController.createEquipment);
router.get('/view', equipmentController.getEquipments);
router.get('/:id', equipmentController.getEquipmentById);
router.put('/:id', equipmentController.updateEquipment);
router.delete('/:id', equipmentController.deleteEquipment);

module.exports = router;
