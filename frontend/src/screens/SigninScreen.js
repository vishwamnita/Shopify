import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../actions/userActions";

function SigninScreen(props) {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin;
    const dispatch = useDispatch();
    const redirect = props.location.search?props.location.search.split("=")[1]:"/";

    useEffect(() => {
        if(userInfo) {
            redirect === "cart" ? props.history.push(redirect + "/" + userInfo._id) : props.history.push(redirect);
        }
        //eslint-disable-next-line
    }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
    }

    return <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Sign-In</h2>
                </li>
                <li>
                    {loading && <div>Loading...</div>}
                    {error && <div>Invalid Email or Password</div>}
                </li>
                <li>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    value={email}
                    >
                    </input>
                </li>
                <li>
                    <label htmlFor="password">
                        Password
                    </label>
                    <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    value={password}
                    >
                    </input>
                </li>
                <li>
                    <button className="button primary">Sign In</button>
                </li>
                <li>
                    New to Shopify?
                </li>
                <li>
                    <Link to={redirect === "/" ? "register" : "register?redirect=" + redirect} className="button secondary text-center">Create your Shopify account</Link>
                </li>
            </ul>
        </form>
    </div>
}

export default SigninScreen;