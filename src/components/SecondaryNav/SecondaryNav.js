import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './SecondaryNav.css'
import {
    requestLogin,
    logout,
} from '../../scatter/scatter_actions';

class SecondaryNav extends Component {
    loginUser = () => this.props.dispatch(requestLogin());
    logOutUser = () => {
        this.props.dispatch(logout());
    };

    render() {
        const { loggedIn } = this.props.scatter;

        return(
            <header className="secondary-nav-container">
                <Link to="/">
                    <h1 className="secondary-logo">Agro</h1>
                </Link>
                <nav>
                    <ul className="secondary-nav_links-container">
                        <Link to="/">
                            <li className="secondary-nav_links"><p className="secondary-nav_text">Home</p></li>
                        </Link>
                        <Link to="/crop_catalog">
                            <li className="secondary-nav_links"><p className="secondary-nav_text">Catalog</p></li>
                        </Link>
                        <Link to="/crop_tracking">
                            <li className="secondary-nav_links"><p className="secondary-nav_text">Track</p></li>
                        </Link>
                    </ul>
                </nav>
                
                {loggedIn ?
                    <button className="secondary-cta" onClick={this.logOutUser.bind(this)} value="LOG OUT" >Logout</button> : 
                    <button className="secondary-cta" onClick={this.loginUser.bind(this)} value="LOG IN" >Login</button>
                }
                
            </header>
        )
    }
}

const mapStateToProps = ({ scatter }) => {
    return {
        scatter,
    };
};

const mapDispatchToProps = (dispatch) => {
    return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(SecondaryNav);