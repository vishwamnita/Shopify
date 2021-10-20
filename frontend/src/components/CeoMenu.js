import React from "react";
import { Link } from "react-router-dom";

function CeoMenu(props) {
    return (
        <div className="dropdown">
            <Link to="#admin">CEO { " " } <i className="fa fa-caret-down"></i></Link>
            <ul className="dropdown-content">
                <li>
                    <Link to="/products">Products</Link>
                </li>
                <li>
                    <Link to="/users">Users</Link>
                </li>
                <li>
                    <Link to="/allorders">Orders</Link>
                </li>
                <li>
                    <Link to="/createUser">Create User</Link>
                </li>
            </ul>
        </div>
    );
}

export default CeoMenu;