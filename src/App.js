import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { attemptAutoLogin } from './scatter/scatter_actions';
import AddProductPage from './pages/AddProductPage';
import CropCatalogPage from './pages/CropCatalogPage';
import HomePage from './pages/HomePage';
import OrdersPage from './pages/OrdersPage';
import AboutPage from './pages/AboutPage';
import ProductDetail from './pages/ProductDetail';
import OrderTimelinePage from './pages/OrderTimelinePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import ImportAccount from './pages/ImportAccount'
import Nav from './components/Nav/Nav';
import Receipt from './components/Receipt_Modal/Receipt_Modal';
import UpdateLocation from './components/UpdateLocation/UpdateLocationModal'

class App extends Component{
    render(){
        // var d = new Date();
        // console.log(d.toDateString())
        // window.onunload = () => {
        //     localStorage.setItem("current_user", null);
        //  }
        return (
            <React.Fragment>
                <Nav /> 
                <Switch>
                    <Route exact path="/Agro" component={ HomePage } />
                    <Route exact path="/sign_up" component={ SignUpPage } />
                    <Route exact path="/login" component={ LoginPage } />
                    <Route path="/add_crop" component={ AddProductPage } />
                    <Route path="/crop_catalog" component={ CropCatalogPage } />
                    <Route path="/orders" component={ OrdersPage } />
                    <Route path="/about" component={ AboutPage } />
                    <Route path="/product" component={ ProductDetail } />
                    <Route path="/crop_tracking" component={ OrderTimelinePage } />
                    <Route path="/import_account" component={ ImportAccount } />
                </Switch>   
            </React.Fragment>
        );
    }
}

export default connect()(App);
