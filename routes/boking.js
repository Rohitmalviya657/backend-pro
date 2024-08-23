import express from 'express';
import {
    createBookingAndPayment,
    getAllBookingsAndPayments,
    getBookingAndPaymentById,
    updateBookingAndPayment
} from '../controller/bookingPayment.controller.js';
import { body } from 'express-validator';

const router = express.Router();

router.post('/book-and-pay',
    body('userId', 'User ID is required').notEmpty(),
    body('roomid', 'Room ID is required').notEmpty(),
    body('bookingDate', 'Booking Date is required').notEmpty(),
    body('amount', 'Amount is required').isDecimal(),
    createBookingAndPayment
);

router.get('/', getAllBookingsAndPayments);

router.get('/:id', getBookingAndPaymentById);

router.put('/:id',
    body('userId', 'User ID is required').notEmpty(),
    body('roomid', 'Room ID is required').notEmpty(),
    body('bookingDate', 'Booking Date is required').notEmpty(),
    body('amount', 'Amount is required').isDecimal(),
    updateBookingAndPayment
);

export default router;
