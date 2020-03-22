import React, { Component } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import './ImportAccount.css'

export class ImportAccount extends Component {

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
                                    <small><i>(Exactly 12 characters)</i></small>
                                </span>
                            </h4>
                            <input 
                                id="price"
                                type="text" 
                                name="crop-price"
                                placeholder="sterbon2413"
                                required
                            />
                        </div>

                        <div className="ImportAccountPassword">
                            <h4><label htmlFor="crop-price">EOS Password</label></h4>
                                <input 
                                    id="price"
                                    type="password" 
                                    name="crop-price"
                                    required
                                />
                        </div>

                        <div className="ImportAccountKey">
                            <h4><label htmlFor="crop-price">EOS Private Key</label></h4>
                                <input 
                                    id="price"
                                    type="password" 
                                    name="crop-price"
                                    required
                                />
                        </div>
              
                        <div className="ImportAccountBtn">
                            <button className="ImportCta" 
                                    name="submit-button" 
                                    value="Upload" >
                                    Import Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ImportAccount

