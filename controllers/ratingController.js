const Rating = require('../models/rating');
const User = require('../models/user');
const Equipment = require('../models/equipment');

// Add a new rating
exports.addRating = async (req, res) => {
    try {
        const { user_id, equipment_id, comment, score } = req.body;

        // Validate required fields
        if (!user_id || !equipment_id || !score) {
            return res.status(400).json({ message: 'User ID, Equipment ID, and Score are required.' });
        }

        // Check if the user exists
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Check if the equipment exists
        const equipment = await Equipment.findByPk(equipment_id);
        if (!equipment) {
            return res.status(404).json({ message: 'Equipment not found.' });
        }

        // Create the rating
        const rating = await Rating.create({ user_id, equipment_id, comment, score });
        res.status(201).json({ message: 'Rating added successfully', rating });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get all ratings for a specific equipment
exports.getRatingsByEquipment = async (req, res) => {
    try {
        const { equipment_id } = req.params;

        const ratings = await Rating.findAll({
            where: { equipment_id },
            include: [
                { model: User, attributes: ['username', 'email'] },
            ],
        });

        if (!ratings.length) {
            return res.status(404).json({ message: 'No ratings found for this equipment.' });
        }

        res.json(ratings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a rating
exports.updateRating = async (req, res) => {
    try {
        const { rating_id } = req.params;
        const { comment, score } = req.body;

        const rating = await Rating.findByPk(rating_id);
        if (!rating) {
            return res.status(404).json({ message: 'Rating not found.' });
        }

        rating.comment = comment || rating.comment;
        rating.score = score || rating.score;
        await rating.save();

        res.json({ message: 'Rating updated successfully', rating });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a rating
exports.deleteRating = async (req, res) => {
    try {
        const { rating_id } = req.params;

        const rating = await Rating.findByPk(rating_id);
        if (!rating) {
            return res.status(404).json({ message: 'Rating not found.' });
        }

        await rating.destroy();
        res.json({ message: 'Rating deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
