import express from 'express';
import { signUp, signIn, deletee, update, fetchc, fetchmyroom, fetchMyPayments, fetchMyexercise, fetchMy } from '../controller/user.controller.js';
import { body } from 'express-validator';
import { protect } from '../Midelwear/authmeadeleware.js';
//import { fetchcr, getPaymentsByUserId } from '../controller/bookedroom.js';
import userMiddleware from '../controller/bookedroom.js'
import { submitContactForm } from '../controller/Contack.router.js';
const router = express.Router();

router.post("/signup",
    body("username", "username is required").notEmpty(),
    body("email", "email is required").notEmpty(),
    body("contact", "contact is required").notEmpty(),
    body("contact", "contact must have length min 10 and max 10").isLength({ min: 10, max: 10 }),
    body("adharnumber", "adhar is required").isLength({ min: 12, max: 12 }), // Adjust length as necessary
    body("password", "password is required").notEmpty(),
    body("password", "password must have length at least 4 characters").isLength({ min: 4 }),
    signUp
);

router.post("/signin", signIn);
router.delete("/delete", deletee);
router.put('/update', update);
router.get("/fetch", fetchc);
// router.get("/fetchbyid", getPaymentsByUserId);
// router.get("/fetchr", fetchcr);
router.get("/fetchh", protect, fetchMyPayments); // Ensure this route is correct
router.get("/done", fetchmyroom);
router.get('/getmyexercises', protect, fetchMyexercise);
router.get("/my", userMiddleware, fetchMy)
router.post("/msg", submitContactForm);

export default router;
