import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';

export const protect = (req, res, next) => {

    const token = req.header('tokenInput');
    console.log('Token received:', token);

    if (!token) {
        return res.status(401).json({ message: "Token not found" });
    }

    try {
        const decoded = jwt.verify(token, "rohitmalviya");
        req.user = decoded;
        console.log("Decoded token:", decoded);


        next();
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(401).json({ error: "Not authorized, token failed" });
    }
};
