import express from "express";
import { createPayment, bookRoom, addMypayment } from "../controller/payment.controller.js";
import { protect } from "../Midelwear/authmeadeleware.js";

const router = express.Router();

// POST request to handle payment processing
router.post("/addpay", protect, addMypayment);
router.post("/addroom", bookRoom)

export default router;
