const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Equipment = require('./equipment');

const Rating = sequelize.define('Rating', {
    rating_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'user_id',
        },
        onDelete: 'CASCADE',
    },
    equipment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Equipment,
            key: 'equipment_id',
        },
        onDelete: 'CASCADE',
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5, // Assuming the score range is 1-5
        },
    },
}, {
    tableName: 'ratings',
    timestamps: false,
});

module.exports = Rating;
