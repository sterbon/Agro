import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { login, logout } from '../../scatter/localWallet_helper'
import './Nav.css';
import LoginPage from '../../pages/LoginPage'

class Nav extends Component {
    constructor(props) {
        super(props);
        var loggedIn = false;
        if (localStorage.getItem("current_user") != "null" && localStorage.getItem("current_user") !== undefined) {
            loggedIn = true;
        }

        this.state = {
            loggedIn,
        }
    }
    
    loginClick(username, passw) {
        login(username, passw);
        this.setState({ loggedIn: true });
    }
    logoutClick() {
        logout();
        this.setState({ loggedIn: false });
        this.props.history.push('/');    
    }

    render() {
        const { loggedIn } = this.state;

        return (
            <header className="nav-container">
                <Link to="/">
                    <h1 className="logo">Agro</h1>
                </Link>
                <nav>
                    <ul className="nav_links-container">
                        <Link to="/crop_catalog">
                            <li className="nav_links">
                                <p className="nav_text" >Catalog</p>
                            </li>
                        </Link>
                        {loggedIn ?
                        <React.Fragment>
                            <Link to="/add_crop">
                                <li className="nav_links">
                                    <p className="nav_text" >Upload Crops</p>
                                </li>
                            </Link>
                            <Link to="/orders">
                                <li className="nav_links">
                                    <p className="nav_text" >Transactions</p>
                                </li>
                            </Link>
                        </React.Fragment> :
                        <React.Fragment></React.Fragment>
                        }
                        <Link to="/crop_tracking">
                            <li className="nav_links">
                                <p className="nav_text" >Track</p>
                            </li>
                        </Link>
                        <Link to="/about">
                            <li className="nav_links">
                                <p className="nav_text" >About</p>
                            </li>
                        </Link>

                        <Link to="/import_account">
                            <li className="nav_links">
                                <p className="nav_text" >Import Account</p>
                            </li>
                        </Link>
                    </ul>
                </nav>
                {/* {loggedIn ?
                    <button className="cta" onClick={this.logOutUser.bind(this)} value="LOG OUT" >Logout</button> : 
                    <button className="cta" onClick={this.loginUser.bind(this)} value="LOG IN" >Login</button>
                } */}

                <div className="loginCtaContainer">
                    {/* <button className="cta" value="LOG IN" >Login</button> */}
                    <LoginPage 
                        loggedIn={this.state.loggedIn} 
                        loginClick={this.loginClick.bind(this)} 
                        logoutClick={this.logoutClick.bind(this)} 
                    />
                </div>
            </header>
        )
    }
}

export default withRouter(Nav);