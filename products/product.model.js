const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.STRING, allowNull: false },
        quantity: { type: DataTypes.STRING, allowNull: false },
        image: { type: DataTypes.STRING, allowNull: false }
    };

    const options = {
        // Add your options here if needed
    };

    return sequelize.define('Product', attributes, options);
}