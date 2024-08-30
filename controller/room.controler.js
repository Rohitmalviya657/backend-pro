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
        let fetch = await RoomsAvailable.findAll();

        return fetch.length != 0 ? response.status(200).json({ message: "Data Fetch success", fetch }) : response.status(401).json({ error: "No Data Found" });
    } catch (error) {
        return response.status(500).json({ error: "Internal Server Error" });
    }
}