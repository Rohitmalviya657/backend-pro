// routes/admin.router.js
import express from 'express';
import {
    createAdmin,
    getAllUsers,
    getAllBookings,
    getAllRooms
} from '../controllers/admin.controller.js';

const router = express.Router();

// Create an Admin (optional, for initial setup)
router.post('//create', createAdmin);

// Get all users
router.get('/users', getAllUsers);

// Get all bookings
router.get('/bookings', getAllBookings);

// Get all rooms
router.get('/rooms', getAllRooms);

export default router;
