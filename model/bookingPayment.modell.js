import { DataTypes } from "sequelize";
import sequelize from "../db/dbconfig.js";
import User from "./user.model.js";
import RoomsAvailable from "./Roomsavailabler.js";

const BookingPayment = sequelize.define("BookingPayment", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },


    roomid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: RoomsAvailable,
            key: 'Roomid'
        }
    },
    bookingDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
});

// Define associations
User.hasMany(BookingPayment, { foreignKey: 'userid' }); // A User can have many BookingPayments
BookingPayment.belongsTo(User, { foreignKey: 'userid' }); // A BookingPayment belongs to a User

RoomsAvailable.hasMany(BookingPayment, { foreignKey: 'roomid' }); // A Room can have many BookingPayments
BookingPayment.belongsTo(RoomsAvailable, { foreignKey: 'roomid' }); // A BookingPayment belongs to a Room

export default BookingPayment;
