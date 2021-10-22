import express from "express";
import data from "./data";
import dotenv from "dotenv";
import config from "./config";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import orderRoute from "./routes/orderRoute";
import bodyParser from "body-parser";

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("DB connected!"))
.catch(error => console.log(error));

const app = express();

app.use(bodyParser.json());

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);

// app.get("/api/products", (req, res) => {
//     res.send(data.products);
// });

const port = 8080;

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});


















// app.get("/api/products/:id", (req, res) => {
//     const productId = req.params.id;
//     const product = data.products.find(x => x._id === productId);
//     if(product) {
//         res.send(product);
//     } else {
//         res.status(404).send({msg: "Product not found."});
//     }
// });
