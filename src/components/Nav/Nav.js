import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { login, logout } from '../../scatter/localWallet_helper'
import './Nav.css';
import BackDrop from '../BackDrop/BackDrop';
import SideDrawer from '../SideDrawer/SideDrawer';
import LoginPage from '../../pages/LoginPage';

const DrawerToggleButton = props => (
	<button className="toggle-button" onClick={props.click}>
		<div className="toggle-button__line" />
		<div className="toggle-button__line" />
		<div className="toggle-button__line" />
	</button>
)

class Nav extends Component {
    constructor(props) {
        super(props);
        var loggedIn = false;
        if (sessionStorage.getItem("current_user") != "null" && sessionStorage.getItem("current_user") != null && sessionStorage.getItem("current_user") !== undefined) {
            loggedIn = true;
        }

        this.state = {
            loggedIn,
            SideDrawerOpen: false,
        }
    }
    
    loginClick(username, passw) {
        login(username, passw);
        // console.log("Name: ", typeof sessionStorage.getItem("current_user"));
        if (sessionStorage.getItem("current_user") !== "null" && sessionStorage.getItem("current_user") !== null && sessionStorage.getItem("current_user") !== undefined) {
            this.setState({ loggedIn: true });
        }
    }
    logoutClick() {
        logout();
        this.setState({ loggedIn: false });
        this.props.history.push('/Agro');    
    }

    drawerToggleClickHandler = () => {
		this.setState((prevState) => {
			return { SideDrawerOpen: !prevState.SideDrawerOpen };
		});
	};
	backdropClickHandler = () => {
		this.setState({ SideDrawerOpen: false });
	};

    render() {
        const { loggedIn, SideDrawerOpen } = this.state;
        let backdrop;
		if (SideDrawerOpen) {
			backdrop = <BackDrop click={this.backdropClickHandler.bind(this)} />;
		}
        console.log("localstorage:",localStorage)
        console.log("sessionstorage:",sessionStorage)
        return (
            <React.Fragment>
                <SideDrawer 
                    loggedIn={loggedIn} 
                    show={this.state.SideDrawerOpen} 
                    click={this.backdropClickHandler.bind(this)}
                />
				{backdrop}
                <header className="nav-container">
                    <div className="toolbar__toggle-button">
                        <DrawerToggleButton click={this.drawerToggleClickHandler.bind(this)} />
                    </div>
                    <Link to="/Agro">
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
                            loggedIn={loggedIn} 
                            loginClick={this.loginClick.bind(this)} 
                            logoutClick={this.logoutClick.bind(this)} 
                        />
                    </div>
                </header>
            </React.Fragment>
        )
    }
}

export default withRouter(Nav);