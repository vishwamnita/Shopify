import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePayment } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

function PaymentScreen(props) {
    
    const cart = useSelector(state => state.cart);
    const { shippingAddress: shipping } = cart;
    const [paymentMethod, setPaymentMethod] = useState("");

    if(!shipping.address) {
        props.history.push("shipping");
    }

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePayment(paymentMethod));
        props.history.push("placeorder");
    }

    return <div>
        <CheckoutSteps step1 step2 step3 ></CheckoutSteps>
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h2>Payment</h2>
                    </li>
                    <li>
                        <div className="big-font">
                            <input 
                            type="radio" 
                            name="paymentMethod" 
                            id="cashOnDelivery"
                            value="Cash On Delivery"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            >
                            </input>
                            <label htmlFor="cashOnDelivery">
                                Cash On Delivery
                            </label>
                        </div>
                    </li>
                    <li>
                        <div className="big-font">
                            <input 
                            type="radio" 
                            name="paymentMethod" 
                            id="phonpe"
                            value="Phonpe"
                            required
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            >
                            </input>
                            <label htmlFor="phonpe">
                                Phonpe
                            </label>
                        </div>
                    </li>
                    
                    <li>
                        <button type="submit" className="button primary">Continue</button>
                    </li>
                </ul>
            </form>
        </div>
    </div>
        
}

export default PaymentScreen;