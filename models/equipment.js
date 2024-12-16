const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./category');
const Supplier = require('./supplier');

const Equipment = sequelize.define('Equipment', {
    equipment_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    equipment_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    equipment_img: {
        type: DataTypes.STRING, // Assuming the image is stored as a URL or file path
        allowNull: true,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 5,
    },
    model_number: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    purchase_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Available', // Possible values: Available, In Use, Under Maintenance
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'category_id',
        },
        onDelete: 'SET NULL',
    },
    supplier_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Supplier,
            key: 'supplier_id',
        },
        onDelete: 'SET NULL',
    },
}, {
    tableName: 'equipments',
    timestamps: false,
});

module.exports = Equipment;
