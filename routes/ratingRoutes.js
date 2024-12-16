const express = require('express');
const ratingController = require('../controllers/ratingController');

const router = express.Router();

router.post('/add', ratingController.addRating);
router.get('/equipment/:equipment_id', ratingController.getRatingsByEquipment);
router.put('/update/:rating_id', ratingController.updateRating);
router.delete('/delete/:rating_id', ratingController.deleteRating);

module.exports = router;
