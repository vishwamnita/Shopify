import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrder } from "../actions/orderActions";

function OrdersScreen(props) {

    const orderList = useSelector(state => state.orderList);
    const { loading, orders, error } = orderList;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listOrder());
    }, [dispatch]);

    return (
        <div>
            <h1>Orders</h1>
            {
                loading 
                ? <div>Loading...</div>
                : error ? <div>{error}</div>
                : (
                    <table className="table">
                        <thead>
                            <tr>
                                <td>ORDERED BY</td>
                                <td>ID</td>
                                <td>DATE</td>
                                <td>TOTAL PRICE</td>
                                <td>PAID</td>
                                <td>DELIVERED</td>
                                <td>ACTIONS</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders && orders.map(order => {
                                    return (
                                        <tr key={order._id}>
                                            <td>{order.user}</td>
                                            <td>{order._id}</td>
                                            <td>{order.createdAt.substring(0, 10)}</td>
                                            <td>{order.totalPrice.toFixed(2)}</td>
                                            <td>{order.isPaid ? order.paidAt.substring(0, 10) : "No" }</td>
                                            <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : "No"}</td>
                                            <td>
                                                <button 
                                                type="button" 
                                                className="secondary" 
                                                onClick={() => props.history.push("/orders/" + order._id)}>
                                                    Details
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                )
            }
        </div>
    )
}

export default OrdersScreen;