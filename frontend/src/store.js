import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import Cookie from "js-cookie";
import { cartReducer } from "./reducers/cartReducers";
import { productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer } from "./reducers/productReducers";
import { userDeleteReducer, userListReducer, userRegisterReducer, userSigninReducer } from "./reducers/userReducers";

const cartItems = (Cookie.get("cartItems") && JSON.parse(Cookie.get("cartItems"))) || [];
const userInfo = (Cookie.get("userInfo") && JSON.parse(Cookie.get("userInfo"))) || "";

const initialState = { 
    cart : { 
            cartItems, 
            shippingAddress : Cookie.get("shippingAddress")
            ? JSON.parse(Cookie.get("shippingAddress"))
            : {},
            paymentMethod: Cookie.get("paymentMethod")
            ? JSON.parse(Cookie.get("paymentMethod"))
            : "Cash On Delivery"
        }, 
        userSignin : { userInfo } 
    };

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;
