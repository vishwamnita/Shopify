import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import CheckoutSteps from "../components/CheckoutSteps";

function PlaceOrderScreen(props) {

    const cart = useSelector(state => state.cart);
    const { cartItems, shippingAddress: shipping, paymentMethod: payment } = cart;

    if(!shipping.address) {
        props.history.push("/shipping");
    } else if(!payment.paymentMethod) {
        props.history.push("/payment");
    }

    const itemsPrice = cartItems.reduce((acc, cur) => acc + cur.price * cur.qty, 0);
    const shippingPrice = itemsPrice > 500 ? 0 : 100;
    const taxPrice = 0.15 * itemsPrice;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const dispatch = useDispatch();

    const placeOrderHandler = () => {

    }

    useEffect(() => {
        // eslint-disable-next-line
    }, []);

    const checkOutHandler = () => {
        if(shipping)
        props.history.push("/signin?redirect=shipping");
    }

    return <div>
        <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
        <div className="placeorder">
            <div className="placeorder-info">
                <div>
                    <h3>shipping</h3>
                    <div>
                        {shipping.address}, {shipping.city},
                        {shipping.pinCode}, {shipping.country}
                    </div>
                </div>
                <div>
                    <h3>Payment</h3>
                    <div>
                        Payment Method: {payment.paymentMethod}
                    </div>
                </div>
                <div>
                    <ul className="cart-list-container">
                        <li>
                            <h3>Shopping Cart</h3>
                            <div>
                                Price
                            </div>
                        </li>
                        {
                            cartItems.length === 0 ? 
                            <div>
                                Your Shopping cart is empty.
                            </div>
                            :
                            cartItems.map(item => {
                                return (
                                    <li key={item.product}>
                                        <div className="cart-image">
                                            <Link to={"/product/" + item.product}>
                                                <img src={item.image} alt="product" />
                                            </Link>
                                        </div>
                                        <div className="cart-name">
                                            <div>
                                                <Link to={"/product/" + item.product}>
                                                    {item.name}
                                                </Link>
                                            </div>
                                            <div>
                                                Qty: {item.qty}
                                            </div>
                                        </div>
                                        <div className="cart-price">
                                            &#8377; {item.price}
                                        </div>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className="placeorder-action">
                <ul>
                    <li>
                        <button className="button primary full-width" onClick={placeOrderHandler} >Place Order</button>
                    </li>
                    <li>
                        <h3>Order Summary</h3>
                    </li>
                    <li>
                        <div>Items</div>
                        <div>&#8377; {itemsPrice}</div>
                    </li>
                    <li>
                        <div>Shipping</div>
                        <div>&#8377; {shippingPrice}</div>
                    </li>
                    <li>
                        <div>Tax</div>
                        <div>&#8377; {taxPrice}</div>
                    </li>
                    <li>
                        <div>Order Total</div>
                        <div>&#8377; {totalPrice}</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    
}

export default PlaceOrderScreen;