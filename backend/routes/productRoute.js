import express from "express";
import Product from "../models/productModel";
import { getToken, isAdmin, isAuth } from "../util";

const router = express.Router();

router.get("/", async (req, res) => {
    const products = await Product.find({});
    res.send(products);
});

router.get("/:id", async (req, res) => {
    const product = await Product.findOne({_id: req.params.id});
    if(product) {
        res.send(product);
    } else {
        res.status(404).send({msg: "Product not found"});
    }
});

router.post("/", isAuth, isAdmin, async (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        brand: req.body.brand,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        countInStock: req.body.countInStock,
    });

    const newProduct = await product.save();
    if(newProduct) {
        return res.status(201).send({ msg: "New product created", data: newProduct });
    }
    return res.status(500).send({ msg: "Error in creating the product" });
});

router.put("/:id", isAuth, isAdmin, async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if(product) {
        product.name = req.body.name;
        product.image = req.body.image;
        product.brand = req.body.brand;
        product.category = req.body.category;
        product.description = req.body.description;
        product.price = req.body.price;
        product.countInStock = req.body.countInStock;
        const updatedProduct = await product.save();
        if(updatedProduct) {
            return res.status(200).send({ msg: "Product Updated", data: updatedProduct });
        }
    } else {
        return res.status(500).send({ msg: "Error in updating the product" });
    }
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
    const productToDelete = await Product.findById(req.params.id);
    if(productToDelete) {
        await productToDelete.remove();
        res.send({ msg: "Product Deleted." });
    } else {
        res.send({ msg: "Error in deletion." })
    }
});

export default router;