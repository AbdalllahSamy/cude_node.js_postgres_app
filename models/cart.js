const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Equipment = require('./equipment');

const Cart = sequelize.define('Cart', {
    cart_id: {
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
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
}, {
    tableName: 'cart',
    timestamps: false,
});

module.exports = Cart;
