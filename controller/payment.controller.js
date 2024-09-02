import Payment from "../model/payment.model.js";
import Razorapay from "./Rojarpay.js";
import RoomsAvailable from "../model/Roomsavailabler.js";
export const bookRoom = async (req, res) => {
    const { amount } = req.body;
    try {
        const order = await Razorapay.orders.create({
            amount,
            currency: 'INR',
            receipt: 'order_rcptid_11',
        });
        res.json({ order });
    } catch (error) {
        res.status(500).json({ error: 'Error creating Razorpay order' });
    }
};//this is


export const createPayment = async (req, res) => {
    const { amount, userId, roomId, razorpayPaymentId } = req.body;

    try {
        const newPayment = await Payment.create({
            amount,
            userId,
            roomId,
            razorpayPaymentId
        });

        return res.status(201).json({
            message: "Payment processed successfully.",
            payment: newPayment
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error processing payment.",
            error: error.message
        });
    }
};
export const addMypayment = async (req, res) => {
    const userId = req.user.userId;
    const { amount, roomId, razorpayPaymentId } = req.body;

    try {
        // Check if the room is already booked
        const room = await RoomsAvailable.findOne({ where: { Roomid: roomId } });
        if (room.booked) {
            return res.status(400).json({ error: 'Room is already booked' });
        }

        // Check if the user has already booked this room
        const existingBooking = await Payment.findOne({ where: { roomId, userId } });
        if (existingBooking) {
            return res.status(400).json({ error: 'You have already booked this room' });
        }

        // Proceed to book the room and update the room status
        const myExercise = await Payment.create({ amount, roomId, userId, razorpayPaymentId });
        await room.update({ booked: true }); // Mark the room as booked

        res.json(myExercise);
    } catch (error) {
        res.status(500).json({ error: 'Error adding room to myroom' });
    }
};//this is new api
export const fetchMyPayments = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is stored in the request
        const myPayments = await Payment.findAll({
            where: { userId },
            include: {
                model: RoomsAvailable,
                attributes: ['id', 'roomTitle', 'roomImageUrl'] // Include relevant room details
            }
        });
        res.json(myPayments);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching My Payments' });
    }
};
