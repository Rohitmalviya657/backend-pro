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
        // allowNull: false

    },
    price: {
        type: DataTypes.INTEGER,

    },
    location: {
        type: DataTypes.STRING,


    },
    // ownerid: {
    //     type: DataTypes.INTEGER,

    // },
    size: {
        type: DataTypes.STRING,

    },
    loginid: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

});
sequelize.sync().then(result => {
    console.log("user table Created---");
}).catch(err => {
    console.log("Something wrong---");
})
// RoomsAvailable.checkPassword = async (password, encryptedPassword) => {
//     return bcrypt.compareSync(password, encryptedPassword);
// };
export default RoomsAvailable;