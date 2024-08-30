import { DataTypes } from "sequelize";
import sequelize from "../db/dbconfig.js";
import User from "./user.model.js";
// import RoomsAvailable from "./RoomsAvailable.js";
import RoomsAvailable from "./Roomsavailabler.js";

const Payment = sequelize.define("Payment", {
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
    onDelete: 'CASCADE'
});

RoomsAvailable.hasMany(Payment, {
    foreignKey: 'roomId'
});

// Syncing the models with the database
sequelize.sync().then(result => {
    console.log("Payment table Created");
}).catch(err => {
    console.log("Something went wrong with the payment table:", err);
});

export default Payment;
