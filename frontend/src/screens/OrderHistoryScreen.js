import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrderUser } from "../actions/orderActions";

function OrderHistoryScreen(props) {

    const orderUserList = useSelector(state => state.orderUserList);
    const { loading, orders, error } = orderUserList;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listOrderUser());
    }, [dispatch]);

    return (
        <div>
            <h1>Order History</h1>
            {
                loading 
                ? <div>Loading...</div>
                : error ? <div>{error}</div>
                : (
                    <table className="table">
                        <thead>
                            <tr>
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

export default OrderHistoryScreen;