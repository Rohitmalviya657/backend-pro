import { DataTypes } from "sequelize";
import sequelize from "../db/dbconfig.js";

const Payment = sequelize.define("Payment", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },

});

sequelize.sync().then(result => {
    console.log("Payment table created");
}).catch(err => {
    console.log("Something went wrong while creating Payment table");
})

export default Payment;