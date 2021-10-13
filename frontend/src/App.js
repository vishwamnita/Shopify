import './App.css';
import { BrowserRouter, Route, Link } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from './screens/ProductScreen';
import CartScreen from "./screens/CartScreen";
import SigninScreen from './screens/SigninScreen';
import { useDispatch, useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import { signOut } from './actions/userActions';

function App() {

    const dispatch = useDispatch();
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const openMenu = () => {
        document.querySelector(".sidebar").classList.add("open");
    }

    const closeMenu = () => {
        document.querySelector(".sidebar").classList.remove("open");
    }

    const signOutHandler = () => {
        dispatch(signOut());
    }

    return (
        <BrowserRouter>
            <div className="grid-container">
                <header className="header">
                    <div className="brand">
                        <button onClick={openMenu}>&#9776;</button>
                        <Link to="/">Shopify</Link>
                    </div>
                    <div className="header-links">
                        <Link to="/signin">Cart</Link>
                        {/* <a href="cart.html">Cart</a> */}
                        {
                            userInfo ? (
                                <div className="dropdown">
                                    <Link to="/profile">{userInfo.name}</Link>
                                    <ul className="dropdown-content">
                                        <Link to="/" onClick={signOutHandler}>Sign Out</Link>
                                    </ul>
                                </div>
                            ) : (
                                <Link to="/signin">Sign In</Link>                                
                            )
                        }
                    </div>
                </header>
                <aside className="sidebar">
                    <h3>Shopping Categories</h3>
                    <button className="sidebar-close-button" onClick={closeMenu}>x</button>
                    <ul>
                        <li>
                            <a href="index.html">Pants</a>
                        </li>
                        <li>
                            <a href="index.html">Shirts</a>
                        </li>
                    </ul>
                </aside>
                <main className="main">
                    <div className="content">

                        <Route path="/signout" component={HomeScreen} />
                        <Route path="/placeorder" component={PlaceOrderScreen} />
                        <Route path="/payment" component={PaymentScreen} />
                        <Route path="/shipping" component={ShippingScreen} />
                        <Route path="/products" component={ProductsScreen} />
                        <Route path="/register" component={RegisterScreen} />                    
                        <Route path="/signin" component={SigninScreen} />
                        <Route path="/product/:id" component={ProductScreen} />
                        <Route path="/" exact={true} component={HomeScreen} />
                        <Route path="/cart/:id?" component={CartScreen} />
                        
                    </div>
                </main>
                <footer className="footer">
                    All rights reserved &copy; 2021
                </footer>
            </div>
        </BrowserRouter>
    );
}

export default App;