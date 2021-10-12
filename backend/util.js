import jwt from "jsonwebtoken";
import config from "./config";

const getToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        type: user.type
    }, config.JWT_SECRET_KEY, {
        expiresIn: "48h"
    });
}

export { 
    getToken 
} ;