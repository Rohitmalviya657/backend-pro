import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';

export const protect = (req, res, next) => {
    // Get the token from the 'tokenInput' header
    const token = req.header('tokenInput');
    console.log('Token received:', token);

    // If no token is provided, return an unauthorized status
    if (!token) {
        return res.status(401).json({ message: "Token not found" });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, "rohitmalviya");
        req.user = decoded;
        console.log("Decoded token:", decoded);

        // Move to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(401).json({ error: "Not authorized, token failed" });
    }
};
