import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

function ProfileScreen(props) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } =  userSignin;

    const userDetails = useSelector(state => state.userDetails);
    const { loading, user, error } = userDetails;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = userUpdateProfile;

    const dispatch = useDispatch();

    useEffect(() => {
        if(!user) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
            dispatch(detailsUser(userInfo._id));
        } else {
            setName(user.name);
            setEmail(user.email);
        }
    }, [dispatch, userInfo._id, user]);

    const sumbmitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            alert("Password and Confirm password do not match");
        }
        dispatch(updateUserProfile({ userId: user._id, name, email, password }));
    }

    return (
        <div className="form">
            <form onSubmit={sumbmitHandler}>
                <ul className="form-container">
                    <li>
                        <h1>User Profile</h1>
                    </li>
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                    {loadingUpdate && <div>Loading...</div>}
                    {errorUpdate && <div>{errorUpdate}</div>}
                    {successUpdate && <div>Profile Updated Successfully</div>}
                    {
                        !loading && ( 
                        <div>
                            <li>
                                <label htmlFor="name">Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    placeholder="Enter Name"
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)}>
                                </input>
                            </li>
                            <li>
                                <label htmlFor="email">Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    placeholder="Enter Email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}>
                                </input>
                            </li>
                            <li>
                                <label htmlFor="password">Password</label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    placeholder="Enter Password" 
                                    onChange={(e) => setPassword(e.target.value)}>
                                </input>
                            </li>
                            <li>
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input 
                                    type="password" 
                                    id="confirmPassword" 
                                    placeholder="Re-enter Password"
                                    onChange={(e) => setConfirmPassword(e.target.value)}>
                                </input>
                            </li>
                            <li>
                                <label />
                                <button type="submit" className="button primary">
                                    Update
                                </button>
                            </li>
                        </div>)
                    }
                </ul>
            </form>
        </div>
    );
}

export default ProfileScreen;