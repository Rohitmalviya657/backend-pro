import { validationResult } from "express-validator";
import bcrypt from 'bcryptjs';
import User from "../model/user.model.js";
import bodyParser from "body-parser";
import jwt from 'jsonwebtoken'
import Payment from "../model/payment.model.js";
import RoomsAvailable from "../model/Roomsavailabler.js";
export const signUp = async (request, response, next) => {
    try {

        const errors = validationResult(request);
        if (!errors.isEmpty()) return response.status(401).json({ error: "Bad request" });


        let { username, email, contact, password, adharnumber } = request.body;
        const hashpass = await bcrypt.hash(password, 10);
        let user = await User.create({ username, email, contact, password: hashpass, adharnumber });
        console.log("user:", user);
        return response.status(201).json({ message: 'user saved', user });
    }
    catch (err) {
        console.log("Welcome outside");
        console.log(err);
        return response.status(500).json({ error: "Internal Server Error" });
    }
}

// export const signIn = async (request, response, next) => {
//     let { email, password } = request.body;
//     try {
//         let user = await User.findOne({ where: { email }, raw: true });
//         console.log(user);
//         if (user) {
//             const checkpass = User.checkPassword(password, user.password);
//             console.log(checkpass);
//             if (checkpass) {
//                 const tokenid = 'rohitmalviya';
//                 const token = jwt.sign({ email: user.email }, tokenid, { expiredIn: '1h' });
//                 return response.status(200).json({ message: 'sign in success', user, token });
//             }
//             else {
//                 return response.status(401).json({ message: "Bad request | Invalid pass id" });
//             }
//         } else {
//             return response.status(401).json({ message: "Bad request | Invalid email id" });
//         }


//     }
//     catch (err) {
//         return response.status(500).json({ error: "Internal Server Error" });
//     }
// }


export const signIn = async (request, response, next) => {
    const { email, password } = request.body;

    try {

        const user = await User.findOne({ where: { email }, raw: true });
        console.log(user);

        if (user) {
            console.log(password);

            const checkpass = await User.checkPassword(password, user.password);
            console.log(checkpass);

            if (checkpass) {

                const tokenid = 'rohitmalviya'; // Secret key for JWT
                const token = jwt.sign({ userId: user.id, email: user.email }, tokenid, { expiresIn: '1h' });

                return response.status(200).json({ message: 'Sign in success', user, token });
            } else {
                return response.status(401).json({ message: "Bad request | Invalid password" });
            }
        } else {
            return response.status(401).json({ message: "Bad request | Invalid email id" });
        }

    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal Server Error" });
    }
}


export const deletee = async (request, response, next) => {

    try {
        let { id } = request.body;

        let result = await User.destroy({ where: { id } });
        return result >= 0 ? response.status(200).json({ message: "delete success" }) : response.status(401).json({ error: "Bad delete request" });
    }
    catch (err) {
        return response.status(500).json({ error: "Internal Server Error" });
    }
}



//--------------
export const update = async (request, response, next) => {
    let { id, email, password, contact } = request.body;
    console.log(request.body);
    try {
        let rersult = await User.findOne({ where: { email }, raw: true })
        if (rersult)
            return User.update(
                // { password, email, contact },
                { password },
                { where: { email } }

            )
                ? response.status(200).json({ message: "update success" }) : response.status(401).json({ error: "Bad delete request" });

    }
    catch (err) {
        return response.status(500).json({ error: "internal server Error" })

    }
}
///------------------------------------------\
export const fetchc = async (request, response, next) => {
    let { userId } = request.body;
    try {
        let fetch = await User.findAll();
        // let fetch = await Payment.findOne({ where: { userId }, raw: true })

        return fetch.length != 0 ? response.status(200).json({ message: "data Fetch success", fetch }) : response.status(401).json({ error: "Bad delete request" });




    }
    catch (error) {
        return response.status(500).json({ error: "internal Server Eroor" })
    }

}
export const fetchmyroom = async (request, response, next) => {
    let { userId } = request.body;
    try {
        // let fetch = await User.findAll();
        let fetch = await Payment.findOne({ where: { userId }, raw: true })


        return fetch.length != 0 ? response.status(200).json({ message: "data Fetch success", fetch }) : response.status(401).json({ error: "Bad delete request" });




    }
    catch (error) {
        return response.status(500).json({ error: "internal Server Eroor" })
    }

}
// controllers/paymentController.js
export const fetchMyPayments = async (req, res) => {
    try {
        // Extract userId from req.query or req.body
        const { userId } = req.query; // Assuming userId is passed in query params

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const myPayments = await Payment.findAll({
            where: { userId },
            include: {
                model: RoomsAvailable,
                as: 'room', // Ensure alias matches the one defined in the association
                attributes: ['Roomid', 'description', 'price', 'location', 'size', 'imgUrl']
            }
        });

        res.json({ message: "Success", myPayments });
    } catch (error) {
        console.error('Error fetching payments:', error); // Log error details for debugging
        res.status(500).json({ error: 'Error fetching payments' });
    }
};
export const fetchMyexercise = async (req, res) => {
    try {
        // Ensure req.user.id is available
        if (!req.user || !req.user.id) {
            return res.status(400).json({ error: 'User ID is missing in request' });
        }

        const userId = req.user.id;

        // Fetch exercises associated with the user
        const myExercises = await Payment.findAll({
            where: { userId },
            include: {
                model: RoomsAvailable,
                attributes: ['Roomid', 'description', 'price', 'location', 'size', 'imgUrl'],
                // Ensure the alias 'room' matches your model association definition
                as: 'room'
            }
        });

        // Send the fetched exercises
        res.json(myExercises);
    } catch (error) {
        console.error('Error fetching my exercises:', error); // Log the full error
        res.status(500).json({ error: 'Error fetching My Exercises' });
    }
};
export const fetchMy = async (req, res) => {
    try {
        const userId = req.user.userId; // Ensure req.user.id is available
        if (!userId) {
            return res.status(400).json({ error: 'User ID is missing' });
        }
        const myExercises = await Payment.findAll({
            where: { userId },
            include: {
                model: RoomsAvailable,
                attributes: ['Roomid', 'description', 'price', 'location', 'size', 'imgUrl'],
                as: 'room'
            }
        });
        res.json(myExercises);
        console.log(myExercises);

    } catch (error) {
        console.error('Error fetching my exercises:', error); // Log detailed error
        res.status(500).json({ error: 'Error fetching My Exercises' });
    }
};






