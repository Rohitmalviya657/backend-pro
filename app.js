import express from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
//import usermodel from './model/user.model.js'
import Userrouter from './routes/user.router.js'
import roomrouter from './routes/rooms.router.js'
import bookingrouter from './routes/boking.js'
import './model/Roomsavailabler.js';
import "./model/asocisation.js"
import './model/bookingPayment.modell.js'
import './model/Payment.model.js'


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use("/user", Userrouter);
app.use("/user", roomrouter);
app.use("/user", bookingrouter)

// app.use("/user", (req, res) => {
//     res.status(200).json({ message: "greetings fellows" })
// });
app.listen(4000, () => {
    console.log("server stated");
})
