import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './LoginPage.css'

export class LoginPage extends Component {
    render() {
        return (
        <div className="addCrop-container">
            <h2 className="heading">Already have an EOS Account?</h2>
            <p className="sub-heading"> Just login in with your EOS account and password.</p>

            <div className="userAccountName">
                    <h4><label htmlFor="crop-price">EOS Account Name</label></h4>
                    <input 
                        id="price"
                        type="text" 
                        name="crop-price"
                        placeholder="sterbon2314"
                        required
                    />
            </div>

            <div className="userPassword">
                    <h4><label htmlFor="crop-name">Password</label></h4>
                    <input 
                        id="amount"
                        type="password" 
                        name="crop-amount"
                        required
                    />
            </div>
            
            <div className="loginBtn">
                <button className="login-cta" 
                    name="submit-button" 
                    value="Upload" 
                    onClick = {this.continue}>
                    Log In   
                </button>
            </div>

            <div className="createEOSAccount">
                <h5>Don't have an EOS account? Don't worry create one now!</h5>
                <Link to="/sign_up">
                    <h5 className="signUpLink">Create EOS Account</h5>
                </Link>
            </div>
        </div>
        )
    }
}

export default LoginPage
