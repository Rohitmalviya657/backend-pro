import RoomsAvailable from "../model/Roomsavailabler.js";
import User from "../model/user.model.js";
import { v2 as cloudinary } from 'cloudinary';
import Owner from "../model/Owner.js";

cloudinary.config({
    cloud_name: 'dalxmpyf0',
    api_key: '669457729596977',
    api_secret: 'SV_lkMEzo_4e3lZ7YejkzeAvd4I'
});

export const addrom = async (request, response, next) => {
    let { description, price, location, size, id } = request.body;

    try {
        const file = request.files.imgUrl;
        const result = await cloudinary.uploader.upload(file.tempFilePath);

        let landlord = await Owner.findOne({ where: { id }, raw: true });
        if (landlord) {
            let user = await RoomsAvailable.create({
                description,
                price,
                location,
                id,
                size,
                imgUrl: result.url,
                stock: 1,

            });
            console.log("user:", user);
            return response.status(200).json({ message: 'user saved', user });

        } else {
            console.log("user not find");
            return response.status(500).json({ error: "Wrong Info" });
        }

    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal Server Error" });
    }
}

export const fetchcromm = async (request, response, next) => {
    try {
        let fetch = await RoomsAvailable.findAll(
            { where: { stock: 1 } }
        );

        return fetch.length != 0 ? response.status(200).json({ message: "Data Fetch success", fetch }) : response.status(401).json({ error: "No Data Found" });
    } catch (error) {
        return response.status(500).json({ error: "Internal Server Error" });
    }
}
// room.controller.js

//import RoomsAvailable from "../model/room.model.js"; // Adjust the path as necessary

export const updateStock = async (req, res) => {
    const { Roomid, stock } = req.body;
    console.log("roomid", Roomid, stock);


    try {
        // Validate the input
        if (!Roomid || stock === undefined) {
            return res.status(400).json({ error: "Roomid and stock are required" });
        }

        // Find the room by Roomid
        const room = await RoomsAvailable.findByPk(Roomid);

        if (!room) {
            return res.status(404).json({ error: "Room not found" });
        }

        // Update the stock
        room.stock = stock;
        await room.save();

        return res.status(200).json({ message: "Stock updated successfully", room });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
