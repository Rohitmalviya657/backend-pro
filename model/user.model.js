import { DataTypes } from "sequelize";
import sequelize from "../db/dbconfig.js";
import bcrypt from 'bcryptjs';
import { Result } from "express-validator";
const User = sequelize.define("nextt", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    // loginid: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    adharnumber: {
        type: DataTypes.STRING,
        allowNull: false
    },


});
sequelize.sync().then(result => {
    console.log("user table Created---");
}).catch(err => {
    console.log("Something wrong in user---");
})
User.checkPassword = async (password, encryptedPassword) => {
    return bcrypt.compareSync(password, encryptedPassword);
};
export default User;