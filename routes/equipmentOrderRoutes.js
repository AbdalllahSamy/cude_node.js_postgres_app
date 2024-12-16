const express = require('express');
const equipmentOrderController = require('../controllers/equipmentOrderController');

const router = express.Router();

router.post('/add', equipmentOrderController.addEquipmentOrder);
router.get('/order/:order_id', equipmentOrderController.getEquipmentOrdersByOrder);
router.put('/update/:equipment_order_id', equipmentOrderController.updateEquipmentOrder);
router.delete('/delete/:equipment_order_id', equipmentOrderController.deleteEquipmentOrder);

module.exports = router;
