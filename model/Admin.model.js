// model/admin.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../db/dbconfig.js';
import bcrypt from 'bcryptjs';

const Admin = sequelize.define('Admin', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'admin', // Default role for this table is 'admin'
    },
});

// Before saving, hash the password
Admin.beforeCreate(async (admin, options) => {
    admin.password = await bcrypt.hash(admin.password, 10);
});

// Sync the model with the database
sequelize.sync()
    .then(() => {
        console.log('Admin table created');
    })
    .catch(err => {
        console.log('Something went wrong while creating Admin table', err);
    });

export default Admin;
