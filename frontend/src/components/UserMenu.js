import React from "react";
import { Link } from "react-router-dom";

function UserMenu(props) {
    return (
        <div className="dropdown">
            <Link to="/profile">
                {props.name + " "}
                <i className="fa fa-caret-down"></i>
            </Link>
            <ul className="dropdown-content">
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/orderhistory">Order History</Link>
                </li>

                <li>
                    <Link to="/support">Support</Link>
                </li>
                <li>
                    <Link to="/" onClick={props.signOutHandler}>
                        Sign Out
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default UserMenu;