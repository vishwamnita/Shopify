import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userCreate } from "../actions/userActions";

function CreateUserScreen(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [type, setType] = useState("");

    const createUser = useSelector(state => state.createUser);
    const { loading: loadingSave, success: successSave, error: errorSave } = createUser;

    const dispatch = useDispatch();

    useEffect(() => {

    }, [successSave]);

    const submitHandler = (e) => {
        e.preventDefault();
        if(password === confirmPassword) {
            dispatch(userCreate({
                name, email, password, type
            }));
        }
        else {
            alert("Passwords do not match!");
        }
    }

    return(<div className="content content-margined">
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h2>Create User</h2>
                    </li>
                    <li>
                        {loadingSave && <div>Loading...</div>}
                        {successSave && <div>User Created Successfully</div>}
                        {errorSave && <div>{errorSave}</div>}
                    </li>
                    <li>
                        <label htmlFor="name">
                            Name
                        </label>
                        <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter UserName"
                        >
                        </input>
                    </li>
                    <li>
                        <label htmlFor="email">
                            email
                        </label>
                        <input 
                        type="text" 
                        name="email" 
                        id="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Email"
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        >
                        </input>
                    </li>
                    <li>
                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input 
                        type="password" 
                        name="confirmPassword" 
                        id="confirmPassword" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter Password"
                        >
                        </input>
                    </li>
                    <li>
                        <label htmlFor="admin">
                            Admin
                        </label>
                        <input 
                        type="radio" 
                        name="userType" 
                        id="admin" 
                        value="admin"
                        onChange={(e) => setType(e.target.value)}
                        >
                        </input>
                    </li>
                    <li>
                        <label htmlFor="seller">
                            Seller
                        </label>
                        <input 
                        type="radio" 
                        name="userType" 
                        id="seller" 
                        value="seller"
                        onChange={(e) => setType(e.target.value)}
                        >
                        </input>
                    </li>
                    <li>
                        <label htmlFor="buyer">
                            Buyer
                        </label>
                        <input 
                        type="radio" 
                        name="userType" 
                        id="buyer" 
                        value="buyer"
                        onChange={(e) => setType(e.target.value)}
                        >
                        </input>
                    </li>                    
                    <li>
                        <button type="submit" className="button primary">"Create User"</button>
                    </li>
                </ul>
            </form>
        </div>       
    </div>);
}

export default CreateUserScreen;