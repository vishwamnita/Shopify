import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser } from "../actions/userActions";

function ProfileScreen(props) {

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } =  userSignin;

    const userDetails = useSelector(state => state.userDetails);
    const { loading, user, error } = userDetails;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsUser(userInfo._id))
    }, [dispatch, userInfo._id]);

    const sumbmitHandler = (e) => {
        e.preventDefault();

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
                    {
                        !loading && ( 
                        <div>
                            <li>
                                <labe htmlFor="name">Name</labe>
                                <input 
                                    type="text" 
                                    id="name" 
                                    placeholder="Enter Name" 
                                    value={user.name}>                                        
                                </input>
                            </li>
                            <li>
                                <label htmlFor="email">Email</label>
                                <input 
                                    type="text" 
                                    id="email" 
                                    placeholder="Enter Email" 
                                    value={user.email}>
                                </input>
                            </li>
                            <li>
                                <label htmlFor="password">Password</label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    placeholder="Enter Password" 
                                    value={user.password}>
                                </input>
                            </li>
                            <li>
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input 
                                    type="password" 
                                    id="confirmPassword" 
                                    placeholder="Re-enter Password">
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