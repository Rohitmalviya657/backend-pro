// controllers/paymentController.js
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';

import Payment from '../model/payment.model.js';
import RoomsAvailable from '../model/Roomsavailabler.js';




const userMiddleware = (req, res, next) => {
    const token = req.header('tokenInput');
    console.log('Received Token:', token); // Check if token is being passed correctly
    if (!token) return res.status(401).json({ message: 'No token found, authorization failed' });

    try {
        const verifytoken = jwt.verify(token, "rohitmalviya");
        req.user = verifytoken;
        console.log('Verified User:', verifytoken); // Should log the decoded token with user info
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
export default userMiddleware
