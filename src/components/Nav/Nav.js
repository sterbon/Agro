import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Nav.css';
import {
    requestLogin,
    logout,
} from '../../scatter/scatter_actions';

class Nav extends Component {
    loginUser = () => this.props.dispatch(requestLogin());
    logOutUser = () => {
        this.props.dispatch(logout());
    };

    render() {
        const { loggedIn } = this.props.scatter;

        return(
            <header className="nav-container">
                <Link to="/"><h1 className="logo">AGRO</h1></Link>
                <nav>
                    <ul className="nav_links-container">
                        <Link to="/crop_catalog">
                            <li className="nav_links"><a href="#">Catalog</a></li>
                        </Link>
                        {loggedIn ?
                        <React.Fragment>
                            <Link to="/orders">
                                <li className="nav_links"><a href="#">Orders</a></li>
                            </Link>
                            <Link to="/add_crop">
                                <li className="nav_links"><a href="#">Add Crop</a></li>
                            </Link>
                        </React.Fragment> :
                        <React.Fragment></React.Fragment>
                        }
                        <Link to="/about">
                            <li className="nav_links"><a href="#">About</a></li>
                        </Link>
                    </ul>
                </nav>
                {loggedIn ?
                    <button className="cta" onClick={this.logOutUser.bind(this)} value="LOG OUT" >Logout</button> : 
                    <button className="cta" onClick={this.loginUser.bind(this)} value="LOG IN" >Login</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Nav);