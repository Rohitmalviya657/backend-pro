import Payment from "../model/payment.model.js";
import Razorapay from "./Rojarpay.js";
export const bookRoom = async (req, res) => {
    const { amount } = req.body;
    try {
        const order = await Razorapay.orders.create({
            amount,
            currency: 'INR',
            receipt: 'order_rcptid_11',
        });
        res.json({ order });
    } catch (error) {
        res.status(500).json({ error: 'Error creating Razorpay order' });
    }
};//this is


export const createPayment = async (req, res) => {
    const { amount, userId, roomId, razorpayPaymentId } = req.body;

    try {
        const newPayment = await Payment.create({
            amount,
            userId,
            roomId,
            razorpayPaymentId
        });

        return res.status(201).json({
            message: "Payment processed successfully.",
            payment: newPayment
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error processing payment.",
            error: error.message
        });
    }
};
export const addMypayment = async (req, res) => {
    const userId = req.user.userId;
    const { amount, roomId, razorpayPaymentId } = req.body;
    console.log("userrr", userId);


    try {
        const myExercise = await Payment.create({ amount, roomId, userId, razorpayPaymentId });
        res.json(myExercise);
        console.log(myExercise);

    } catch (error) {
        res.status(500).json({ error: 'Error adding room to myroom' });
    }
};//this is new api