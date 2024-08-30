// import User from "./models/user.model.js";
// import Room from "./models/room.model.js";
// import Payment from "./models/payment.model.js";
// // Import other models if necessary

// // Payment and User association
// Payment.belongsTo(User, {
//     foreignKey: {
//         name: 'userId',
//         allowNull: false
//     },
//     onDelete: 'CASCADE'
// });

// User.hasMany(Payment, {
//     foreignKey: 'userId'
// });

// // Payment and Room association
// Payment.belongsTo(Room, {
//     foreignKey: {
//         name: 'roomId',
//         allowNull: false
//     },
//     onDelete: 'CASCADE'
// });

// Room.hasMany(Payment, {
//     foreignKey: 'roomId'
// });

// // Uncomment and modify if using Booking or Transaction models
// // Payment.belongsTo(Booking, {
// //     foreignKey: {
// //         name: 'bookingId',
// //         allowNull: true
// //     },
// //     onDelete: 'SET NULL'
// // });

// // Booking.hasOne(Payment, {
// //     foreignKey: 'bookingId'
// // });

// // Sync all models with the database
// sequelize.sync()
//     .then(() => {
//         console.log("All tables created with associations");
//     })
//     .catch(err => {
//         console.log("Error creating tables or associations", err);
//     });
