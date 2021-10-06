import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import data from "../data";

function ProductScreen(props) {
    const product = data.products.find(x => x._id === props.match.params.id);
    return <div>
        <div>
            <Link to="/">Back to results</Link>
        </div>
        <div className="details">
            <div className="details-image">
                <img src={product.image} alt={product.name}/>
            </div>
            <div className="details-info">
                <ul>
                    <li>
                        <h4>{product.name}</h4>
                    </li>
                    <li>
                        {product.rating} Stars ({product.numReviews} Reviews)
                    </li>
                    <li>
                        <b>{product.price}</b>
                    </li>
                    <li>
                        Description:
                        <div>
                            {product.description}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
}

export default ProductScreen;