import React from "react";
import data from "../data";
import Product from "../components/Product";

function HomeScreen() {
    return (<ul className="products">
                {data.products.map(product =>
                    <Product 
                        key={product._id}
                        id={product._id}
                        image={product.image}
                        name={product.name}
                        brand={product.brand}
                        price={product.price}
                        rating={product.rating}
                        numReviews={product.numReviews}
                    />
                )}
            </ul>);
}

export default HomeScreen;