import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { attemptAutoLogin } from './scatter/scatter_actions';
import Nav from './components/Nav/Nav';
import AddProductPage from './pages/AddProductPage';
import CropCatalogPage from './pages/CropCatalogPage';
import HomePage from './pages/HomePage';
import OrdersPage from './pages/OrdersPage';
import AboutPage from './pages/AboutPage';

class App extends Component{
    componentDidMount() {
        this.props.dispatch(attemptAutoLogin());
    }

    render(){
        return (
            <React.Fragment>
                <Nav />
                <Switch>
                    <Route exact path="/" component={ HomePage } />
                    <Route path="/add_crop" component={ AddProductPage } />
                    <Route path="/crop_catalog" component={ CropCatalogPage } />
                    <Route path="/orders" component={ OrdersPage } />
                    <Route path="/about" component={ AboutPage } />
                </Switch>
            </React.Fragment>
        );
    }
}

export default connect()(App);
