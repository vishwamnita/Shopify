import React from "react";
import { Link } from "react-router-dom";

function AdminMenu(props) {
    return (
        <div className="dropdown">
            <Link to="#admin">Admin { " " } <i className="fa fa-caret-down"></i></Link>
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
            </ul>
        </div>
    );
}

export default AdminMenu;