const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Order = require('./order');
const Equipment = require('./equipment');

const EquipmentOrder = sequelize.define('EquipmentOrder', {
    equipment_order_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Order,
            key: 'order_id',
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
        validate: {
            min: 1,
        },
    },
}, {
    tableName: 'equipment_orders',
    timestamps: false,
});

module.exports = EquipmentOrder;
