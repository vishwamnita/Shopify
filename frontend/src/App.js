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
import OrderScreen from "./screens/OrderScreen";
import { signOut } from './actions/userActions';
import { useEffect, useState } from 'react';
import UsersScreen from './screens/UsersScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from "./screens/ProfileScreen";
import OrdersScreen from "./screens/OrdersScreen";
import AdminMenu from "./components/AdminMenu";
import UserMenu from "./components/UserMenu";
import CeoMenu from "./components/CeoMenu";
import SellerMenu from "./components/SellerMenu";
import CreateUserScreen from './screens/CreateUserScreen';
import DashboardScreen from "./screens/DashboardScreen";
import CategoryScreen from "./screens/CategoryScreen";

function App() {

    const dispatch = useDispatch();
    const userSignin = useSelector(state => state.userSignin);
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    const { userInfo } = userSignin;
    const [ reload, setReload ] = useState(false);

    useEffect(() => {
        if(reload) {
            window.location.reload(false);
            setReload(false)
        }
        return {

        };
    }, [reload]);

    const openMenu = () => {
        document.querySelector(".sidebar").classList.add("open");
    }

    const closeMenu = () => {
        document.querySelector(".sidebar").classList.remove("open");
    }

    const signOutHandler = () => {
        dispatch(signOut());
        setReload(true);
    }

    return (
        <BrowserRouter>
            <div className="grid-container">
                <header className="header">
                    <div className="brand">
                        <button onClick={openMenu}>&#9776;</button>
                        <Link to="/">Shopify</Link>
                    </div>
                    <div className="header">
                        {userInfo && <span className="admin-display">{userInfo.type.toUpperCase()}</span>}
                    </div>
                    <div className="header-links">
                        <Link to="/cart">Cart
                        {cartItems.length > 0 && (
                            <span className="badge">{cartItems.length}</span>
                        )}
                        </Link>
                        {
                            userInfo ? ( <UserMenu 
                                name={userInfo.name} 
                                signOutHandler={signOutHandler}
                                >
                            </UserMenu>
                            ) : (
                                <Link to="/signin">Sign In</Link>
                            )
                        }
                        { userInfo && userInfo.type === "seller" && <SellerMenu id={userInfo._id}></SellerMenu>}
                        { userInfo && userInfo.type === "admin" && <AdminMenu></AdminMenu> }
                        { userInfo && userInfo.type === "ceo" && <CeoMenu></CeoMenu>}
                    </div>
                </header>
                <aside className="sidebar">
                    <h3>Shopping Categories</h3>
                    <button className="sidebar-close-button" onClick={closeMenu}>x</button>
                    <ul>
                        <li>
                            <Link to="/pants" className="link-color">Pants</Link>
                        </li>
                        <li>
                            <Link to="/Shirts" className="link-color">Shirts</Link>
                        </li>
                        <li>
                            <Link to="/shoes" className="link-color">Shoes</Link>
                        </li>
                    </ul>
                </aside>
                <main className="main">
                    <div className="content">

                        <Route path="/shoes" render={(props) => <CategoryScreen filter="Shoes"/> } />
                        <Route path="/shirts" render={(props) => <CategoryScreen filter="Shirts"/> } />
                        <Route path="/pants" render={(props) => <CategoryScreen filter="Pants"/> } />
                        <Route path="/dashboard" component={DashboardScreen} />
                        <Route path="/createUser" component={CreateUserScreen} />
                        <Route path="/allorders" component={OrdersScreen} />
                        <Route path="/profile" component={ProfileScreen} />
                        <Route path="/orderhistory" component={OrderHistoryScreen} />
                        <Route path="/orders/:id" component={OrderScreen} />
                        <Route path="/users" component={UsersScreen} />
                        <Route path="/signout" component={HomeScreen} />
                        <Route path="/placeorder" component={PlaceOrderScreen} />
                        <Route path="/payment" component={PaymentScreen} />
                        <Route path="/shipping" component={ShippingScreen} />
                        <Route path="/products/all" component={ProductsScreen} />
                        <Route path="/products/seller/:id" component={ProductsScreen} />
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