const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {}

User.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password_hash: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        reset_password_token: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize,
        modelName: 'user',
        underscored: true
    }
);

module.exports = User;
