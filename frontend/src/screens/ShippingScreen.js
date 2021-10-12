import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { saveShipping } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

function ShippingScreen(props) {
    
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [country, setCountry] = useState("");

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShipping({ address, city, pinCode, country }));
        props.history.push("payment");
    }

    return <div>
        <CheckoutSteps step1 step2></CheckoutSteps>
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h2>Shipping</h2>
                    </li>
                    <li>
                        <label htmlFor="address">
                            Address
                        </label>
                        <input 
                        type="text" 
                        name="address" 
                        id="address" 
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your address"
                        value={address}
                        >
                        </input>
                    </li>
                    <li>
                        <label htmlFor="city">
                            City
                        </label>
                        <input 
                        type="text" 
                        name="city" 
                        id="city" 
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter city"
                        value={city}
                        >
                        </input>
                    </li>
                    <li>
                        <label htmlFor="pinCode">
                            Pin Code
                        </label>
                        <input 
                        type="text" 
                        name="pinCode" 
                        id="pinCode" 
                        onChange={(e) => setPinCode(e.target.value)}
                        placeholder="Enter Pin Code"
                        value={pinCode}
                        >
                        </input>
                    </li>
                    <li>
                        <label htmlFor="country">
                            Country
                        </label>
                        <input 
                        type="text" 
                        name="country" 
                        id="country" 
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="Enter Country"
                        value={country}
                        >
                        </input>
                    </li>
                    <li>
                        <button className="button primary">Continue</button>
                    </li>
                </ul>
            </form>
        </div>
    </div>
        
}

export default ShippingScreen;