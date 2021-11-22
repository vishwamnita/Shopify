

import React, { useEffect } from "react";
import Product from "../components/Product.js";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

function CategoryScreen(props) {

    const productList = useSelector(state => state.productList);
    const { products, loading, error } = productList;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts());
        return () => {

        };
        //eslint-disable-next-line
    }, []);
    console.log(props.filter);
    return loading ? <div>Loading...</div> :
            error ? <div>{error}</div> : 
            (<div>
            <h3 className="purpose"><i>It's an exclusive site just for men's apparel.</i></h3>
            <ul className="products">
                {products.map(product =>
                    {return (
                            product.category === props.filter && 
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
                )}
            </ul>
            </div>);
}

export default CategoryScreen;