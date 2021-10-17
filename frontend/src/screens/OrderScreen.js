import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { detailsOrder } from "../actions/orderActions";

function OrderScreen(props) {

    const orderId = props.match.params.id;
    const dispatch = useDispatch();

    const orderDetails = useSelector(state => state.orderDetails);
    const { loading, order, error } = orderDetails;

    useEffect(() => {
        dispatch(detailsOrder(orderId));
    }, [dispatch, orderId]);

    return loading
    ? <div>Loading...</div> 
    : error
    ? <div>{error}</div>
    : ( <div>
            <h1>Order: {order._id}</h1>
            <div className="placeorder">
                <div className="placeorder-info">
                    <div>
                        <h3>Shipping</h3>
                        <div>
                            <h4>{ order.shippingAddress.fullName }</h4>
                            <p>
                            { order.shippingAddress.address }, { order.shippingAddress.city }, 
                            {" "}{ order.shippingAddress.pinCode }, { order.shippingAddress.country }
                            </p>
                            {order.isDelivered 
                            ? <b>Delivered at {order.deliveredAt}</b> 
                            : <b>Not Delivered</b> 
                            }
                        </div>
                    </div>
                    <div>
                        <h3>Payment</h3>
                        <div>
                            <p>Payment Method: {order.paymentMethod}</p>
                            {order.isPaid 
                            ? <b>Paid at {order.paidAt}</b> 
                            : <b>Not Paid</b> 
                            }
                        </div>
                    </div>
                    <div>
                        <ul className="cart-list-container">
                            <li>
                                <h3>Order Items</h3>
                                <div>
                                    Price
                                </div>
                            </li>
                            {
                                order.orderItems.map(item => {
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
                            <h3>Order Summary</h3>
                        </li>
                        <li>
                            <div>Items</div>
                            <div>&#8377; {order.itemsPrice}</div>
                        </li>
                        <li>
                            <div>Shipping</div>
                            <div>&#8377; {order.shippingPrice}</div>
                        </li>
                        <li>
                            <div>Tax</div>
                            <div>&#8377; {order.taxPrice}</div>
                        </li>
                        <li>
                            <div>Order Total</div>
                            <div>&#8377; {order.totalPrice}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default OrderScreen;