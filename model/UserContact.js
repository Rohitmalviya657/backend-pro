// models/Contact.js
import { DataTypes } from 'sequelize';
import sequelize from '../db/dbconfig.js';// Adjust the path as needed

const Contactt = sequelize.define('Contact', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});
sequelize.sync().then(result => {
    console.log("Masagetable table Created---");
}).catch(err => {
    console.log("Something wrong in Masage---");
})

export default Contactt;
