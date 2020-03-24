import React, { Component } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import ecc from 'eosjs-ecc'
import './FormEOSAccount.css'
import { createNewAccount, getAccount } from '../../scatter/localWallet_helper';

export class FormEOSAccount extends Component {

    state = { open: false, private_key: "", public_key: "", username: "", password: "" }

    open = () => this.setState({ open: true })
    close = () => this.setState({ open: false })

    generateKeys() {
        ecc.randomKey().then(x => {
            var private_key = x;
            var public_key = ecc.privateToPublic(private_key);
            console.log(private_key, public_key)
            this.setState({private_key : private_key, public_key : public_key});
        });
    }

    

    render() {
        const { open } = this.state
        return (
            <div className="EOSAccountContent">
                <h2 className="heading">Create your EOS account with just one step.</h2>
                <p className="sub-heading">Create your own EOS username. Click the button to generate 
                                           and store keys of your account</p>  
                <div className="form-container">
                    <div className="form-fields">
                        <div className="EOSUserName">
                            <h4><label htmlFor="crop-price">EOS Username</label>
                                <span>
                                    <small><i>(Exactly 12 characters)</i></small>
                                </span>
                            </h4>
                            <input 
                                id="price"
                                type="text" 
                                name="crop-price"
                                placeholder="example12345"
                                minLength="12"
                                maxLength="12"
                                value={this.state.username}
                                onChange={(e) => {
                                    this.setState({ username: e.target.value });
                                }}
                                required
                            />
                        </div>

                        <div className="EOSPassword">
                            <h4><label htmlFor="crop-price">Password</label></h4>
                                <input 
                                    id="price"
                                    type="password" 
                                    name="crop-price"
                                    value={this.state.password}
                                    onChange={(e) => {
                                        this.setState({ password: e.target.value });
                                    }}
                                    required
                                />
                        </div>
              
                        <div className="EOSUserName">
                            <h4><label htmlFor="crop-price">Private Key</label></h4>
                                <input 
                                    id="price"
                                    type="text" 
                                    name="crop-price"
                                    value = {this.state.private_key}
                                    onChange={(e) => {
                                        this.setState({ private_key: e.target.value });
                                    }}
                                    required
                                />
                        </div>

                        <div className="EOSPassword">
                            <h4><label htmlFor="crop-price">Public Key</label></h4>
                                <input 
                                    id="price"
                                    type="text" 
                                    name="crop-price"
                                    value = {this.state.public_key}
                                    onChange={(e) => {
                                        this.setState({ public_key: e.target.value });
                                    }}
                                    required
                                />
                        </div>

                        <div className="EOSAccountBtn">
                            <button className="EOSAccount-cta" 
                                    name="submit-button" 
                                    value="Upload"
                                    // onClick = {() => {createNewAccount(this.state.username, this.state.password, this.state.public_key, this.state.private_key)}}
                                    onClick = {() => {this.generateKeys()}}>
                                    Generate your Keys!
                            </button>
                            
                        </div>

                        <div className="EOSAccountBtn">
                            <button className="EOSAccount-cta" 
                                    name="submit-button" 
                                    value="Upload"
                                    onClick = {() => {createNewAccount(this.state.username, this.state.password, this.state.public_key, this.state.private_key)}}
                                    // onClick = {() => {this.generateKeys()}}
                                    >
                                    Create Account
                            </button>
                            
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default FormEOSAccount

