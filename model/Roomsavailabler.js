import { DataTypes } from "sequelize";
import sequelize from "../db/dbconfig.js";

const RoomsAvailable = sequelize.define("Rooms", {
    Roomid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.INTEGER,
    },
    location: {
        type: DataTypes.STRING,
    },
    size: {
        type: DataTypes.STRING,
    },
    imgUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    booked: {  // New field to track booking status
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

sequelize.sync()
    .then(result => {
        console.log("roomsavailable table Created---");
    })
    .catch(err => {
        console.log("Something wrong in roomsavailable---", err);
    });

export default RoomsAvailable;
