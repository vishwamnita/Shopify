import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, dropDups: true },
    password: {type: String, required: true },
    type: { type: String, required: true },
});

const userModel = mongoose.model("user", userSchema);

export default userModel;