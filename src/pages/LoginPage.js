import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import './LoginPage.css'

export class LoginPage extends Component {
    render() {
        return (
            <div className="loginContainer">
                <Modal trigger={<button className="cta" >Login</button>} closeIcon>
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
                                                    <span><small><i>Account not found. Create new account.</i></small></span>
                                                    </h4>
                                                    <input 
                                                        id="price"
                                                        type="text" 
                                                        name="crop-price"
                                                        placeholder="sterbon2314"
                                                        required
                                                    />
                                            </div>
                                        </div>
                                        
                                        <div className="loginBtn">
                                            <button className="login-cta" 
                                                name="submit-button" 
                                                value="Upload" 
                                                onClick = {this.continue}>
                                                Log In   
                                            </button>
                                        </div>

                                        <div className="createEOSAccount" id="signUpClicked">
                                            <h5>Don't have an EOS account? Don't worry create one now!</h5>
                                            <Link to="/sign_up"><h5 className="signUpLink">Create EOS Account</h5></Link>                                               
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}

export default LoginPage
