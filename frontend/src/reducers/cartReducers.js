import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT, CART_SAVE_SHIPPING, CART_EMPTY } from "../constants/cartConstants";

export function cartReducer(state = {cartItems: [], shippingAdress: {}, paymentMethod: "Cash On Delivery" }, action) {
    switch(action.type) {
        case CART_ADD_ITEM:
            const  item = action.payload;
            const product = state.cartItems.find(x => x.product === item.product);
            if(product) {
                return { 
                    cartItems: 
                        state.cartItems.map(x => x.product === product.product ? item : x)
                };
            }
            return { cartItems: [...state.cartItems, item] };
        case CART_REMOVE_ITEM:
            return { cartItems: state.cartItems.filter(x => x.product !== action.payload)};
        case CART_SAVE_SHIPPING:
            return { ...state, shippingAddress: action.payload };
        case CART_SAVE_PAYMENT:
            return { ...state, paymentMethod: action.payload }
        case CART_EMPTY:
            return { ...state, cartItems: [] };
        default:
            return state;
    }
}
