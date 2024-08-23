import RoomsAvailable from "../model/Roomsavailabler.js";
// import bodyParser, { raw } from "body-parser";
import { validationResult } from "express-validator";
import bcrypt from 'bcryptjs';
import { request, response } from "express";
import User from "../model/user.model.js";
import { where } from "sequelize";
export const addrom = async (request, response, next) => {
    //  let { loginid } = request.body;
    console.log("dsgsdjkdas");
    let { loginid, description, price, location, size, id } = request.body;
    console.log(description, id);
    console.log("heloo" + description, id);
    try {

        // if (!errors.isEmpty()) return response.status(401).json({ error: "Bad request" });
        let landlord = await User.findOne({ where: { loginid, id }, raw: true });
        console.log(landlord);
        if (landlord) {
            let user = await RoomsAvailable.create({ description, price, location, id, size, loginid });
            console.log("user:", user);
            return response.status(201).json({ message: 'user saved', user });

        }
        else {
            console.log("user not find");
            return response.status(500).json({ error: "Rong Info---" })
        }

    }
    catch (err) {
        console.log("Welcome outside");
        console.log(err);
        return response.status(500).json({ error: "Internal Server Error" });
    }


}
export const fetchcromm = async (request, response, next) => {
    // let{id}=request.body;
    try {
        let fetch = await RoomsAvailable.findAll();

        return fetch.length != 0 ? response.status(200).json({ message: "data Fetch success", fetch }) : response.status(401).json({ error: "Bad delete request" });




    }
    catch (error) {
        return response.status(500).json({ error: "internal Server Eroor" })
    }

}




