// models/payment.model.js

import { DataTypes } from 'sequelize';
import sequelize from '../db/dbconfig.js';
import User from './user.model.js';
import RoomsAvailable from './Roomsavailabler.js';
import { Result } from 'express-validator';

const Payment = sequelize.define('Payment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    razorpayPaymentId: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Associations between Payment and User
Payment.belongsTo(User, {
    foreignKey: {
        name: 'userId',
        allowNull: false
    },
    onDelete: 'CASCADE'
});

User.hasMany(Payment, {
    foreignKey: 'userId'
});

// Associations between Payment and RoomsAvailable
Payment.belongsTo(RoomsAvailable, {
    foreignKey: {
        name: 'roomId',
        allowNull: false
    },
    as: 'room', // Make sure this alias matches the one used in the include
    onDelete: 'CASCADE'
});

RoomsAvailable.hasMany(Payment, {
    foreignKey: 'roomId'
});
sequelize.sync().then(result => {
    console.log("payment table Created---");
}).catch(err => {
    console.log("Something wrong in user---");
})

export default Payment;
