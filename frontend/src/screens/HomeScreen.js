import React, { useEffect } from "react";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

function HomeScreen() {

    // const [products, setProducts] = useState([]);
    const productList = useSelector(state => state.productList);
    const { products, loading, error } = productList;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts());
        return () => {

        };
        //eslint-disable-next-line
    }, []);

    return loading ? <div>Loading...</div> :
            error ? <div>{error}</div> : 
            (<ul className="products">
                {products.map(product =>
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