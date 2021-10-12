import express from "express";
import User from "../models/userModel";
import { getToken } from "../util";

const router = express.Router();

router.get("/createadmin", async (req, res) => {
    try {
        const user = await User({
            name: "Vishwam",
            email: "vishwamnita@gmail.com",
            password: "123456",
            type: "admin",
        });
        const newUser = await user.save();
        res.send(newUser);
        
    } catch (error) {
        res.send({msg: error});
    }
});

router.post("/signin", async (req, res) => {
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });    

    if(signinUser) {
        res.send({
            _id: signinUser._id,
            email: signinUser.email,
            name: signinUser.name,
            type: signinUser.type,
            token: getToken(signinUser)
        });
    } else {
        res.status(401).send({msg: "Invalid Email or Password."});
    }    
});    


router.post("/register", async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        type: "buyer"
    });

    const newUser = await user.save();

    if(newUser) {
        res.send({
            _id: newUser._id,
            email: newUser.email,
            name: newUser.name,
            type: newUser.type,
            token: getToken(newUser)
        });
    } else {
        res.status(401).send({msg: "Invalid User Data."});
    }
});

export default router;