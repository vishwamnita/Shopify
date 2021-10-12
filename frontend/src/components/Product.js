import React from "react";
import { Link } from "react-router-dom";

function Product(props) {
    return (
        <li>
            <div className="product">
                <Link to={"/product/" + props.id}>
                    <img className="product-image" src={props.image} alt="Product" />
                </Link>
                
                <div className="product-name">
                    <Link to={"/product/" + props.id}>{props.name}</Link>
                </div>
                <div className="product-brand">{props.brand}</div>
                <div className="product-price">&#8377; {props.price}</div>
                <div className="product-rating">{props.rating} Stars ({props.numReviews} reviews)</div>
            </div>
        </li>
    );
}

export default Product;