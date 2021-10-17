import { ORDER_USER_LIST_REQUEST, ORDER_USER_LIST_SUCCESS, ORDER_USER_LIST_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_RESET, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from "../constants/orderConstants";

export function orderCreateReducer(state = {}, action) {
    switch(action.type) {
        case ORDER_CREATE_REQUEST:
            return { loading: true };
        case ORDER_CREATE_SUCCESS:
            return { loading: false, success: true, order: action.payload };
        case ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_CREATE_RESET:
            return {};
        default:
            return state;
    }
}

export function orderDetailsReducer(state = { loading: true, order: {} }, action) {
    switch(action.type) {
        case ORDER_DETAILS_REQUEST:
            return { loading: true };
        case ORDER_DETAILS_SUCCESS:
            return { loading: false, order: action.payload };
        case ORDER_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export function orderUserListReducer(state = { orders: [] }, action) {
    switch(action.type) {
        case ORDER_USER_LIST_REQUEST:
            return { loading: true };
        case ORDER_USER_LIST_SUCCESS:
            return { loading: false, orders: action.payload };
        case ORDER_USER_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}