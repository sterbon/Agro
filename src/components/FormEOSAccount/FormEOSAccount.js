import React, { Component } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import './FormEOSAccount.css'

export class FormEOSAccount extends Component {

    state = { open: false }

    open = () => this.setState({ open: true })
    close = () => this.setState({ open: false })


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
                                placeholder="sterbon2413"
                                required
                            />
                        </div>

                        {/* <div className="EOSPassword">
                            <h4><label htmlFor="crop-price">EOS Password</label></h4>
                                <input 
                                    id="price"
                                    type="password" 
                                    name="crop-price"
                                    required
                                />
                        </div> */}
              
                        <div className="EOSAccountBtn">
                            <button className="EOSAccount-cta" 
                                    name="submit-button" 
                                    value="Upload" >
                                    Create and Store your keys
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FormEOSAccount

