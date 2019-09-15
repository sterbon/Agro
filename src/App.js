import React, { Component } from 'react';
import {connect} from 'react-redux';

import Home from './pages/home'
import {attemptAutoLogin} from './scatter/scatter_actions'

class App extends Component{
    componentDidMount() {
        this.props.dispatch(attemptAutoLogin());
    }

    render(){
        return (
            <Home/>
        );
    }
}

export default connect()(App);
