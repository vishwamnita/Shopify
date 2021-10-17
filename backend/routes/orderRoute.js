import express from "express";
import Order from "../models/orderModel";
import mongoose from "mongoose";
import { isAdmin, isAuth } from "../util";

const router = express.Router();

router.get("/all", isAuth, isAdmin, async (req, res) => {
    const orders = await Order.find({});
    res.send(orders);
});

router.get("/user", isAuth, async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
});

router.post("/", isAuth, async (req, res) => {
    if(req.body.orderItems.length === 0) {
        res.status(400).send( {msg: "Cart is Empty."} );
    } else {
        const order = new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            taxPrice: req.body.taxPrice,
            shippingPrice: req.body.shippingPrice,
            totalPrice: req.body.totalPrice,
            createdAt: req.body.createdAt,
            user: req.user._id,
        });
        const createdOrder = await order.save();
        res.status(201).send(createdOrder);
    }
});

router.get("/:id", isAuth, async (req, res) => {
    const order = await Order.findById(req.params.id);
    if(order) {
        res.status(201).send(order);
    } else {
        res.status(404).send({ msg: "Order not found." });
    }
});


export default router;