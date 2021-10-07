import express from "express";
import data from "./data";

const app = express();

app.get("/api/products", (req, res) => {
    res.send(data.products);
});

app.get("/api/products/:id", (req, res) => {
    const productId = req.params.id;
    const product = data.products.find(x => x._id === productId);
    if(product) {
        res.send(product);
    } else {
        res.status(404).send({msg: "Product not found."});
    }
});

const port = 8080;

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});