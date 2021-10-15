import Axios from "axios";
import Cookie from "js-cookie";
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_RESET, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_REQUEST } from "../constants/orderConstants";
import { CART_EMPTY } from "../constants/cartConstants";

export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    try {
        const { userSignin: { userInfo } } = getState();
        const { data } = await Axios.post("/api/orders", order, {
            headers: {
                Authorization: "Bearer" + userInfo.token,
            }
        });

        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
        dispatch({ type: CART_EMPTY });
        Cookie.remove("cartItems");
    } catch (error) {
        dispatch({ 
            type: ORDER_CREATE_FAIL, 
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        });
    }
}

export const detailsOrder = (orderId) => async (dispatch, getState) => {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
    try {
        const { userSignin: { userInfo } } = getState();
        const { data } = await Axios.get("/api/orders/" + orderId, {
            headers: {
                Authorization: "Bearer" + userInfo.token,
            }
        });
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        const msg = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: ORDER_DETAILS_FAIL, payload: msg });
    }
}