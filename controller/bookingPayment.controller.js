import BookingPayment from "../model/bookingPayment.modell.js";
import User from "../model/user.model.js";


export const createBookingAndPayment = async (req, res) => {
    try {
        const { userId, roomid, bookingDate, amount } = req.body;


        const user = await User.findByPk(userId);
        console.log(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found. Booking and payment cannot be processed.' });
        }


        if (!roomid || !bookingDate) {
            return res.status(400).json({ error: 'Invalid booking details.' });
        }


        if (!amount || amount <= 0) {
            return res.status(400).json({ error: 'Invalid payment amount.' });
        }


        const newBookingPayment = await BookingPayment.create({ userId, roomid, bookingDate, amount });

        res.status(201).json({
            msg: "Booking and Payment Successfully Done",
            bookingPayment: newBookingPayment
        });

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};


export const getAllBookingsAndPayments = async (req, res) => {
    try {
        const bookingsPayments = await BookingPayment.findAll({
            include: {
                model: User,
                attributes: ['id', 'name']
            }
        });
        res.status(200).json(bookingsPayments);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};


export const getBookingAndPaymentById = async (req, res) => {
    try {
        const { id } = req.params;

        const bookingPayment = await BookingPayment.findByPk(id, {
            include: {
                model: User,
                attributes: ['id', 'name']
            }
        });

        if (!bookingPayment) {
            return res.status(404).json({ error: 'Booking and Payment with the given ID was not found.' });
        }

        res.status(200).json(bookingPayment);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};


export const updateBookingAndPayment = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, roomid, bookingDate, amount } = req.body;

        let bookingPayment = await BookingPayment.findByPk(id);
        if (!bookingPayment) {
            return res.status(404).json({ error: 'Booking and Payment with the given ID was not found.' });
        }


        await bookingPayment.update({ userId, roomid, bookingDate, amount });

        res.status(200).json({
            msg: "Booking and Payment Successfully Updated",
            bookingPayment
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};
