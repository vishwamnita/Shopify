import React from "react";
import { Link } from "react-router-dom";

function SellerMenu(props) {
    return (
        <div className="dropdown">
            <Link to="#admin">Seller { " " } <i className="fa fa-caret-down"></i></Link>
            <ul className="dropdown-content">
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to={"/products/seller/" + props.id}>Products</Link>
                </li>
            </ul>
        </div>
    );
}

export default SellerMenu;