import React, { Component } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import './ImportAccount.css'
import {storeKeys} from '../scatter/localWallet_helper'
export class ImportAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            pvtKey: ""
        };
    }
        render() {
            return (
                <div className="ImportAccountContent">
                    <h2 className="heading">Create your EOS account with just one step.</h2>
                    <p className="sub-heading">Create your own EOS username. Click the button to generate
                                           and store keys of your account</p>
                    <div className="form-container">
                        <div className="form-fields">
                            <div className="ImportAccountName">
                                <h4><label htmlFor="crop-price">EOS Username</label>
                                    <span>
                                        <small><i>(Exactly 12 characters long)</i></small>
                                    </span>
                                </h4>
                                <input
                                    id="uname"
                                    value={this.state.username}
                                    onChange={(e) => {
                                        this.setState({ username: e.target.value });
                                    }}
                                    type="text"
                                    name="username"
                                    placeholder="sterbon2413"
                                    minLength="12"
                                    maxLength="12"
                                    required
                                />
                            </div>

                        <div className="ImportAccountPassword">
                            <h4><label htmlFor="crop-price">EOS Password</label></h4>
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

                            <div className="ImportAccountKey">
                                <h4><label htmlFor="crop-price">EOS Private Key</label></h4>
                                <input
                                    id="price"
                                    type="password"
                                    name="crop-price"
                                    value={this.state.pvtKey}
                                    onChange={(e) => {
                                        this.setState({ pvtKey: e.target.value });
                                    }}
                                    required
                                />
                            </div>

                            <div className="ImportAccountBtn">
                                <button className="ImportCta"
                                    name="submit-button"
                                    value="Upload"
                                    onClick={ () => 
                                        // console.log("hello")
                                        storeKeys(this.state.pvtKey, this.state.username, this.state.password)
                                        } >

                                    Import Account
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

export default ImportAccount;

