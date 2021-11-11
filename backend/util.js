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

const isAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if(token) {
        const onlyToken = token.slice(6, token.length);
        jwt.verify(onlyToken, config.JWT_SECRET_KEY, (error, decode) => {
            if(error) {
                res.status(401).send({msg: "Invalid Token"});
            }
            req.user = decode;
            next();
            return;
        });
    } else {
        return res.status(401).send({msg: "Token is not supplied."});
    }
}

const isAdmin = (req, res, next) => {
    if(req.user && req.user.type === "admin") {
        return next();
    }
    else {
        return res.status(401).send({msg: "Admin token is not valid."});
    }
}

const isCeo = (req, res, next) => {
    if(req.user && req.user.type === "ceo") {
        return next();
    }
    else {
        return res.status(401).send({msg: "CEO token is not valid."});
    }
}

const isAdminOrCeo = (req, res, next) => {
    if(req.user && (req.user.type === "ceo" || req.user.type === "admin")) {
        return next();
    }
    else {
        return res.status(401).send({msg: "Token is not valid."});
    }
}

const isAdminOrCeoOrSeller = (req, res, next) => {
    if(req.user && (req.user.type === "ceo" || req.user.type === "admin" || req.user.type === "seller")) {
        return next();
    }
    else {
        return res.status(401).send({msg: "Token is not valid."});
    }
}

export { 
    getToken,
    isAuth,
    isAdmin,
    isCeo,
    isAdminOrCeo,
    isAdminOrCeoOrSeller,
} ;