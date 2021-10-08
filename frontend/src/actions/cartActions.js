import Axios from "axios";
import Cookies from "js-cookie";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

const addToCart = (productId, qty) => async (dispatch, getState) => {
    try {
        const { data } = await Axios.get("/api/products/" + productId);
        dispatch({
            type: CART_ADD_ITEM, payload: {
                product: data._id,
                name: data.name,
                price: data.price,
                image: data.image,
                countInStock: data.countInStock,
                qty,
            }
        });
        
        const { cart: { cartItems } } = getState();
        Cookies.set("cartItems", JSON.stringify(cartItems));
    } catch (error) {
        
    }
}

const removeFromCart = (productId) => async (dispatch, getState) => {
    try {
        dispatch({type: CART_REMOVE_ITEM, payload: productId});

        const { cart: { cartItems } } = getState();
        Cookies.set("cartItems", JSON.stringify(cartItems));
    } catch (error) {
        
    }
}

export { addToCart, removeFromCart };