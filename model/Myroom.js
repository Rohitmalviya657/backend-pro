// import { DataTypes } from 'sequelize';
// import sequelize from "../db/dbConfig.js";
// import Exercise from './Exercise.js';
// import User from './user.model.js';
// const MyExercise = sequelize.define('MyExercise', {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//     },
//     // Foreign key to the Exercise model
//     exerciseId: {
//         type: DataTypes.INTEGER,
//         references: {
//             model: Exercise,
//             key: 'id',
//         },
//     },
//     // Foreign key to the User model
//     userId: {
//         type: DataTypes.INTEGER,
//         references: {
//             model: User,
//             key: 'id',
//         },
//     },
//     razorpayPaymentId: {
//         type: DataTypes.STRING,
//     },
// });

// MyExercise.belongsTo(User, { foreignKey: 'userId' });
// MyExercise.belongsTo(Exercise, { foreignKey: 'exerciseId' });

// export default MyExercise;