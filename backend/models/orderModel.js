import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
    {
        orderItems: [{
            name: { type: String, requrired: true },
            qty: { type: Number, requrired: true },
            image: { type: String, requrired: true },
            price: { type: Number, required: true },
            product: { 
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                requrired: true
            },
        }],
        shippingAddress: {
            fullName: { type: String, requrired: true },
            address: { type: String, requrired: true },
            city: { type: String, requrired: true },
            pinCode: {type: Number, require: true },
            country: { type: String, requrired: true },
        },
        paymentMethod: { type: String, required: true }, 
        itemsPrice: { type: Number, required: true },
        shippingPrice: { type: Number, required: true },
        taxPrice: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        isPaid: { type: Boolean, default: false },
        paidAt: { type: Date },
        isDelivered: { type: Boolean, default: false },
        deliveredAt: { type: Date }
    }, 
    {
        timestapms: true,
    }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;