import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { addToCart, removeFromCart } from "../actions/cartActions";

function CartScreen(props) {

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const productId = props.match.params.id;
    const search = props.location.search;
    const qty = search ? Number(search.split("=")[1]) : 1;
    const dispatch = useDispatch();

    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qty));
        }
        // eslint-disable-next-line
    }, []);

    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    }

    const checkOutHandler = () => {
        props.history.push("/signin?redirect=shipping");
    }

    return <div className="cart">
        <div className="cart-list">
            <ul className="cart-list-container">
                <li>
                    <h3>Shopping Cart</h3>
                    <div>
                        Price
                    </div>
                </li>
                {
                    cartItems.length === 0 ? 
                    <div>
                        Your Shopping cart is empty.
                    </div>
                    :
                    cartItems.map(item => {
                        return (
                            <li>
                                <div className="cart-image">
                                    <img src={item.image} alt="product" />
                                </div>
                                <div className="cart-name">
                                    <div>
                                        <Link to={"/product/" + item.product}>
                                            {item.name}
                                        </Link>
                                    </div>
                                    <div>
                                        Qty:
                                        <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </select>
                                        <button
                                        type="button" 
                                        className="button" 
                                        onClick={() => removeFromCartHandler(item.product)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <div className="cart-price">
                                    &#8377; {item.price}
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
        <div className="cart-action">
            <h3>
                Subtotal ( { cartItems.reduce((acc, cur) => acc + Number(cur.qty), 0) } items)
                :
                &#8377; { cartItems.reduce((acc, cur) => acc + cur.price * cur.qty, 0) }
            </h3>
            <button onClick={checkOutHandler} className="button primary full-width" disabled={cartItems.length === 0}>
                Procced to checkout
            </button>
        </div>
    </div>
}

export default CartScreen;