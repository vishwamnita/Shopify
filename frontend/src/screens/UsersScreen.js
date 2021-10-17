import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUsers, deleteUser } from "../actions/userActions";

function UsersScreen(props) {

    const userList = useSelector(state => state.userList);
    const { loading, users, error } = userList;

    const userDelete = useSelector(state => state.userDelete);
    const { success: successDelete } = userDelete;

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(listUsers());
        //eslint-disable-next-line
    }, [successDelete]);

    const deleteHandler = (user) => {
        dispatch(deleteUser(user._id));
    }

    return(<div className="content content-margined">
        <div className="product-header">
            <h3>Users</h3>
        </div>
        <li>
            { loading && <div>Loading...</div> }
            { error && <div>{error}</div> }
        </li>
        <div className="product-list">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>EMAIL</th>
                        <th>USER TYPE</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => {
                        return (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.type}</td>
                            <td>
                                {
                                    user.type !== "admin" &&
                                    <button className="button" onClick={() => deleteHandler(user)}>Delete</button>
                                }
                            </td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
    </div>);
}

export default UsersScreen;