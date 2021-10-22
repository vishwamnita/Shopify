import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  listProducts, saveProduct, deleteProduct } from "../actions/productActions";

function ProductsScreen(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [countInStock, setCountInStock] = useState("");

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const productList = useSelector(state => state.productList);
    const { products } = productList;

    const productSave = useSelector(state => state.productSave);
    const { loading : loadingSave, success : successSave, error : errorSave } = productSave;

    const productDelete = useSelector(state => state.productDelete);
    const { success : successDelete } = productDelete;

    const dispatch = useDispatch();

    useEffect(() => {
        if(successSave) {
            setModalVisible(false);
        }
        dispatch(listProducts({ id: userInfo._id, type: userInfo.type }));
        //eslint-disable-next-line
    }, [successSave, successDelete]);

    const openModal = (product) => {
        setModalVisible(true);
        setId(product._id);
        setName(product.name);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setDescription(product.description);
        setPrice(product.price);
        setCountInStock(product.countInStock);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const seller = userInfo._id;
        dispatch(saveProduct({ 
            _id: id, name, image, brand, category, description, price, countInStock, seller
        }));
    }

    const deleteHandler = (product) => {
        dispatch(deleteProduct(product._id));
    }

    return(<div className="content content-margined">
        <div className="product-header">
            <h3>Products</h3>
            <button className="button primary" onClick={() => openModal({})}>Create Product</button>
        </div>
        {modalVisible &&
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h2>Create Product </h2>
                    </li>
                    <li>
                        {loadingSave && <div>Loading...</div>}
                        {errorSave && <div>{errorSave}</div>}
                    </li>
                    <li>
                        <label htmlFor="name">
                            Name
                        </label>
                        <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Product Name"
                        >
                        </input>
                    </li>
                    <li>
                        <label htmlFor="image">
                            Image
                        </label>
                        <input 
                        type="text" 
                        name="imgage" 
                        id="image" 
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="Enter Product Image URL"
                        >
                        </input>
                    </li>
                    <li>
                        <label htmlFor="description">
                            Description
                        </label>
                        <textarea 
                        name="description" 
                        id="description" 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter Product Description"
                        />
                    </li>
                    <li>
                        <label htmlFor="category">
                            Category
                        </label>
                        <input 
                        type="text" 
                        name="category" 
                        id="category" 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Enter Product Category"
                        >
                        </input>
                    </li>
                    <li>
                        <label htmlFor="brand">
                            Brand
                        </label>
                        <input 
                        type="text" 
                        name="brand" 
                        id="brand" 
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        placeholder="Enter Product Brand"
                        >
                        </input>
                    </li>
                    <li>
                        <label htmlFor="price">
                            Price
                        </label>
                        <input 
                        type="text" 
                        name="price" 
                        id="price" 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter Product Price"
                        >
                        </input>
                    </li>
                    <li>
                        <label htmlFor="countInStock">
                            Count In Stock
                        </label>
                        <input 
                        type="text" 
                        name="countInStock" 
                        id="countInStock" 
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                        placeholder="Enter Product Count In Stock"
                        >
                        </input>
                    </li>
                    <li>
                        <button type="submit" className="button primary">{id ? "Update Product" : "Create Product"}</button>
                    </li>
                    <li>
                        <button type="button" onClick={() => setModalVisible(false)} className="button secondary">Back</button>
                    </li>
                </ul>
            </form>
        </div>
        }
        <div className="product-list">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Seller</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map(product => {
                        return ( 
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.seller}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            {((userInfo.type === "ceo" || userInfo.type === "admin" || userInfo.type === "seller") 
                                && (<td>
                                <button className="button" onClick={() => openModal(product)}>Edit</button>
                                {" "}
                                <button className="button" onClick={() => deleteHandler(product)}>Delete</button>
                            </td>))}
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
    </div>);
}

export default ProductsScreen;