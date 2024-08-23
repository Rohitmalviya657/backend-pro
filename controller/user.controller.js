import { validationResult } from "express-validator";
import bcrypt from 'bcryptjs';
import User from "../model/user.model.js";
import bodyParser from "body-parser";
import jwt from 'jsonwebtoken'
export const signUp = async (request, response, next) => {
    try {

        const errors = validationResult(request);
        if (!errors.isEmpty()) return response.status(401).json({ error: "Bad request" });


        let { username, email, contact, loginid, password, adharnumber } = request.body;
        const hashpass = await bcrypt.hash(password, 10);
        let user = await User.create({ username, email, contact, loginid, password: hashpass, adharnumber });
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
        // Find user by email
        const user = await User.findOne({ where: { email }, raw: true });
        console.log(user);

        if (user) {
            console.log(password);
            // Check if the password matches
            const checkpass = await User.checkPassword(password, user.password);
            console.log(checkpass);

            if (checkpass) {
                // Generate JWT token
                const tokenid = 'rohitmalviya'; // Secret key for JWT
                const token = jwt.sign({ email: user.email }, tokenid, { expiresIn: '1h' });

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
    // let{id}=request.body;
    try {
        let fetch = await User.findAll();

        return fetch.length != 0 ? response.status(200).json({ message: "data Fetch success", fetch }) : response.status(401).json({ error: "Bad delete request" });




    }
    catch (error) {
        return response.status(500).json({ error: "internal Server Eroor" })
    }

}




