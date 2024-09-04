import express from 'express';
import { signUp, signIn, deletee, update, fetchc, getLandlordRooms } from '../controller/Owner.controller.js';
import { body } from 'express-validator';
import userMiddleware from '../controller/bookedroom.js';
import { protect } from '../Midelwear/authmeadeleware.js';
const router = express.Router();
router.post("/signup",
    body("username", "username is required").notEmpty(),
    body("email", "email is rerquired").notEmpty(),
    body("contact", "contact is required").notEmpty(),
    body("contact", "contact must have length min  10 and max 10").isLength(),
    // body("loginid", "loginid 1-for tenent and").notEmpty(),

    body("adharnumber", "adhar is required").isLength(),
    body("password", "password is required").notEmpty(),
    body("password", "password must have length at least 4 latter").isLength({ min: 4 },), signUp


)
router.post("/signin", signIn);
router.delete("/delete", protect, deletee);
router.put('/update', update);
router.get("/fetch", fetchc);
router.get("/get", userMiddleware, getLandlordRooms);
export default router;