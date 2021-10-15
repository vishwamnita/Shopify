import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";

function RegisterScreen(props) {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const userRegister = useSelector(state => state.userRegister);
    const { loading, userInfo, error } = userRegister;
    const dispatch = useDispatch();
    const redirect = props.location.search?props.location.search.split("=")[1]:"/";

    useEffect(() => {
        if(userInfo) {
            props.history.push(redirect);
        }
        //eslint-disable-next-line
    }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(register(name, email, password));
    }

    return <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Create Account</h2>
                </li>
                <li>
                    {loading && <div>Loading...</div>}
                    {error && <div>Invalid Email or Password</div>}
                </li>
                <li>
                    <label htmlFor="name">
                        Name
                    </label>
                    <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    value={name}
                    >
                    </input>
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
                    <label htmlFor="re-password">
                        Re-Enter Password
                    </label>
                    <input 
                    type="password" 
                    name="re-password" 
                    id="re-password" 
                    onChange={(e) => setRePassword(e.target.value)}
                    placeholder="Confirm your password"
                    value={rePassword}
                    >
                    </input>
                </li>
                <li>
                    <button className="button primary">Register</button>
                </li>
                <li>
                    Already have an account? 
                    <Link to={redirect === "/" ? "signin" : "signin?redirect=" + redirect} className="button secondary text-center">Sign In</Link>
                </li>
            </ul>
        </form>
    </div>
}

export default RegisterScreen;