import express from "express";
import User from "../models/userModel";
import { getToken, isAdmin, isAuth, isCeo, isAdminOrCeo } from "../util";

const router = express.Router();

router.get("/", async (req, res) => {
    const users = await User.find({});
    res.send(users);
})

router.get("/createadmin", async (req, res) => {
    try {
        const user = await User({
            name: "Vishwam Singh",
            email: "vishwam.mnnit2020@gmail.com",
            password: "123456",
            type: "admin",
        });
        const newUser = await user.save();
        res.send(newUser);
        
    } catch (error) {
        res.send({msg: error});
    }
});

router.get("/:id", async(req, res) => {
    const user = await User.findById(req.params.id);
    if(user) {
        res.send(user);
    } else {
        res.status(404).send({ msg: "User not found." });
    }
})

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

router.delete("/:id", isAuth, isAdminOrCeo, async (req, res) => {
    const userToDelete = await User.findById(req.params.id);
    if(userToDelete) {
        await userToDelete.remove();
        res.send({ msg: "User Deleted." });
    } else {
        res.send({ msg: "Error in deleting user" });
    }
});

router.put("/profile", isAuth, async (req, res) => {
    const user = await User.findById(req.user._id);
    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save()
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            type: updatedUser.type,
            token: getToken(updatedUser),
        });
    }
});

router.post("/createUser", isAuth, isCeo, async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        type: req.body.type,
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