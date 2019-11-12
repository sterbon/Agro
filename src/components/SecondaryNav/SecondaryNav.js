import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './SecondaryNav.css';
import {
	withRouter
} from 'react-router-dom';
import {
    requestLogin,
    logout,
} from '../../scatter/scatter_actions';

class SecondaryNav extends Component {
    loginUser = () => this.props.dispatch(requestLogin());
    logOutUser = () => {
        this.props.dispatch(logout());
        this.props.history.push('/');
    };

    render() {
        const { loggedIn } = this.props.scatter;
        const { style } = this.props;

        return(
            <header className="secondary-nav-container" >
                <Link to="/">
                    <h1  style={style} className="secondary-logo">Agro</h1>
                </Link>
                <nav>
                    <ul className="secondary-nav_links-container" >
                        <Link to="/crop_catalog">
                            <li className="secondary-nav_links">
                                <p className="secondary-nav_text" style={style}>Catalog</p>
                            </li>
                        </Link>
                        {loggedIn ?
                            <React.Fragment>
                                <Link to="/add_crop">
                                    <li className="secondary-nav_links">
                                        <p className="secondary-nav_text" style={style}>Upload Crop</p>
                                    </li>
                                </Link>
                                <Link to="/orders">
                                    <li className="secondary-nav_links">
                                        <p className="secondary-nav_text" style={style}>Transactions</p>
                                    </li>
                                </Link>
                            </React.Fragment> :
                            <React.Fragment></React.Fragment>
                        }
                        <Link to="/crop_tracking">
                            <li className="secondary-nav_links">
                                <p className="secondary-nav_text" style={style}>Track</p>
                            </li>
                        </Link>
                        <Link to="/about">
                            <li className="secondary-nav_links">
                                <p className="secondary-nav_text" style={style}>About</p>
                            </li>
                        </Link>
                    </ul>
                </nav>
                
                {loggedIn ?
                    <button className="secondary-cta" style={style} onClick={this.logOutUser.bind(this)} value="LOG OUT" >Logout</button> : 
                    <button className="secondary-cta" style={style} onClick={this.loginUser.bind(this)} value="LOG IN" >Login</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SecondaryNav));