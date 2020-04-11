import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import './LoginPage.css';

export class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            passw: "",
        };
    }

    state = { open: false }

    closeConfigShow = (closeOnDimmerClick) => () => {
      this.setState({closeOnDimmerClick, open: true })
    }
  
    close = () => this.setState({ open: false })

    render() {
        const { open, closeOnDimmerClick } = this.state
        return (
            <div className="loginContainer">
                {this.props.loggedIn ?
                    <button
                        className="cta"
                        onClick={this.props.logoutClick}
                    >
                            Logout
                </button> :
                    <Modal trigger={<button className="cta" onClick={this.closeConfigShow(true, false)}>Login </button>}
                            open={open}
                            closeOnDimmerClick={closeOnDimmerClick}
                            onClose={this.close} closeIcon>
                        <Modal.Content>
                            <div className="modalContent">
                                <div className="login-container">
                                    <div className="login">
                                        <h2 className="heading">Already have an EOS Account?</h2>
                                        <p className="sub-heading"> Just login in with your EOS account and password.</p>

                                        <div className="form-container">
                                            <div className="form-fields">
                                                <div className="userAccountName">
                                                    <h4><label htmlFor="crop-price">EOS Account Name</label>
                                                        {/* <span><small><i>Account not found</i></small></span> */}
                                                    </h4>
                                                    <input
                                                        id="price"
                                                        type="text"
                                                        name="crop-price"
                                                        minLength="12"
                                                        maxLength="12"
                                                        placeholder="sterbon2314"
                                                        value={this.state.username}
                                                        onChange={(e) => {
                                                            this.setState({ username: e.target.value });
                                                        }}
                                                        required
                                                    />
                                                </div>

                                                <div className="userAccountName">
                                                    <h4><label htmlFor="crop-price">EOS Password</label> </h4>
                                                    <input
                                                        id="pass"
                                                        type="password"
                                                        name="crop-price"
                                                        value={this.state.passw}
                                                        onChange={(e) => {
                                                            this.setState({ passw: e.target.value });
                                                        }}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="loginBtn">
                                                <button className="login-cta"
                                                    name="submit-button"
                                                    value="Upload"
                                                    onClick={() =>
                                                        this.props.loginClick(this.state.username, this.state.passw)
                                                    }
                                                    // onClick={this.close}
                                                >
                                                    Log In
                                            </button>
                                            </div>

                                            <div className="createEOSAccount" id="signUpClicked" onClick={this.close}>
                                                <h5 onClick={this.close}>Don't have an EOS account? Create one now!</h5>
                                                <Link to="/sign_up"><h5 className="signUpLink" onClick={this.close}>Create EOS Account</h5></Link>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </Modal.Content>
                    </Modal>
                }
            </div>
        )
    }
}

export default LoginPage;