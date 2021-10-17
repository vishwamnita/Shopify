import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

function AdminRoute({ component: Component, ...rest }) {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    return (
        <Route
            { ...rest }
            render={(props) => {
                userInfo && userInfo.type === "admin" ?  (
                    <Component { ...props }></Component>
                ) : (
                    <Redirect to="/signin"></Redirect>
                )
            }}
        ></Route>
    );
}

export default AdminRoute;