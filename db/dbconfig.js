import { Sequelize } from "sequelize";
const sequelize = new Sequelize("RoomRent2", "root", "Rohit@156427", {
    host: 'localhost',
    dialect: 'mysql'
});
sequelize.authenticate()
    .then(result => {
        console.log("Database conected");
    }).catch(err => {
        console.log(err);
    })
export default sequelize;