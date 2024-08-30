import express from 'express';
import { addrom, fetchcromm } from '../controller/room.controler.js';
import { body } from 'express-validator';
import { protect } from '../Midelwear/authmeadeleware.js';
const router = express.Router();
router.post("/add",
    // body("roomid", "username is required").notEmpty(),
    body("description", "email is rerquired").notEmpty(),
    body("price", "contact is required").notEmpty(),
    body("location", "contact must have length min  10 and max 10").notEmpty(),
    // body("ownerid", "loginid is required").notEmpty(),
    body("size", "size is mandatory").notEmpty(),



    addrom


)
router.get("/Rooms", fetchcromm);
// router.post("/signin", signIn);
// router.delete("/delete", deletee);
// router.put('/update', update);
// router.get("/fetch", fetchc);
export default router;