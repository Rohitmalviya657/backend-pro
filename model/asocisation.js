import RoomsAvailable from "./Roomsavailabler.js";
import User from "./user.model.js";
import Booking from "./bookingPayment.modell.js";
User.hasMany(RoomsAvailable, { foreignKey: 'id' });
RoomsAvailable.belongsTo(User, { foreignKey: 'id' });

User.hasMany(Booking, { foreignKey: 'userid' });
Booking.belongsTo(User, { foreignKey: 'userid' });

RoomsAvailable.hasMany(Booking, { foreignKey: 'roomid' });
Booking.belongsTo(RoomsAvailable, { foreignKey: 'roomid' });



export {
    User, RoomsAvailable, Booking

};
