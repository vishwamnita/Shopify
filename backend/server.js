import express from "express";
import data from "./data";

const app = express();

app.get("/api/products", (req, res) => {
    res.send(data.products);
});

const port = 8080;

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});