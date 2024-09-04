import { DataTypes } from "sequelize";
// import sequelize from "../db/dbconfig.js";
import sequelize from "../db/dbconfig.js";
import bcrypt from 'bcryptjs';
import { Result } from "express-validator";
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
    // imgUrl: {
    //     type: DataTypes.STRING,
    //     allowNull: false, 
    //     validate: {
    //         isUrl: true 
    //     }
    imgUrl: {
        type: DataTypes.STRING, // <- type for image ( database :postgresql )
        allowNull: true
    },

});
sequelize.sync().then(result => {
    console.log("roomsavailable table Created---");
}).catch(err => {
    console.log("Something wrong in roomsavailable---");
})
export default RoomsAvailable;