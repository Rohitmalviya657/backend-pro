import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';

export const protect = (req, res, next) => {
    let token = req.header('tokenInput');
    if (!token) return res.status(401).json({ message: "token not found" })
    try {

        const tokenverify = jwt.verify(token, "rohitmalviya");
        req.user = tokenverify
        next();
    } catch (error) {
        res.status(401).json({ error: "Not authorized, token failed" });
    }
}
    ;
