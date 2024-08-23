// controllers/admin.controller.js
import Admin from '../model/admin.model.js';
import bcrypt from 'bcryptjs';
import User from '../model/user.model.js'; // Assuming you have a user model
import Booking from '../model/booking.model.js'; // Assuming you have a booking model
import Room from '../model/room.model.js'; // Assuming you have a room model

// Create an Admin (optional, for initial setup)
export const createAdmin = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = await Admin.create({ username, email, password: hashedPassword });
        res.status(201).json(newAdmin);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};

// Get all bookings
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};

// Get all rooms
export const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.findAll();
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};
