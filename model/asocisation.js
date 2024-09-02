import RoomsAvailable from "./Roomsavailabler.js";
import User from "./user.model.js";
import Owner from "./Owner.js";
import Payment from "./payment.model.js";
//import Payment from "./payment.model.js";
Owner.hasMany(RoomsAvailable, { foreignKey: 'id' });
RoomsAvailable.belongsTo(Owner, { foreignKey: 'id' });

// User.hasMany(Payment, { foreignKey: 'userid' });
// Payment.belongsTo(User, { foreignKey: 'userid' });

// RoomsAvailable.hasMany(Payment, { foreignKey: 'roomid' });
// Payment.belongsTo(RoomsAvailable, { foreignKey: 'roomid' });



export {
    User, RoomsAvailable,

};
