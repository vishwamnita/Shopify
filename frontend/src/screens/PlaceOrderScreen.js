import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

function PlaceOrderScreen(props) {

    const cart = useSelector(state => state.cart);
    const { cartItems, shippingAddress: shipping, paymentMethod: payment } = cart;

    const orderCreate = useSelector(state => state.orderCreate);
    const { loading, order, success, error } = orderCreate;

    if(!shipping.address) {
        props.history.push("/shipping");
    } else if(!payment) {
        props.history.push("/payment");
    }

    cart.itemsPrice = Number(cartItems.reduce((acc, cur) => acc + cur.price * cur.qty, 0)).toFixed(2);
    cart.shippingPrice = Number(cart.itemsPrice > 500 ? 0 : 100).toFixed(2);
    cart.taxPrice = Number(0.15 * cart.itemsPrice).toFixed(2);
    cart.totalPrice = Number(Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2);

    const dispatch = useDispatch();

    if(cartItems.length === 0) {
        cart.itemsPrice = cart.shippingPrice = cart.taxPrice = cart.totalPrice = 0.0;
    }


    const placeOrderHandler = () => {
        cart.createdAt = Date.now();
        dispatch(createOrder({ ...cart, orderItems: cart.cartItems, }));
    }

    useEffect(() => {
        if(success) {
            props.history.push("orders/" + order._id);
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [dispatch, order, success, props.history]);

    // const checkOutHandler = () => {
    //     if(!shipping.address) {
    //         props.history.push("/signin?redirect=shipping");
    //     }
    // }

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
                        { loading && <div>Loading...</div> } 
                        { error && <div>{error}</div> }
                    </li>
                    <li>
                        <h3>Order Summary</h3>
                    </li>
                    <li>
                        <div>Items</div>
                        <div>&#8377; {cart.itemsPrice}</div>
                    </li>
                    <li>
                        <div>Shipping</div>
                        <div>&#8377; {cart.shippingPrice}</div>
                    </li>
                    <li>
                        <div>Tax</div>
                        <div>&#8377; {cart.taxPrice}</div>
                    </li>
                    <li>
                        <div>Order Total</div>
                        <div>&#8377; {cart.totalPrice}</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    
}

export default PlaceOrderScreen;