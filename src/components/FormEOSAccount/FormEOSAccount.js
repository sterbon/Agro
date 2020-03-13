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
            <div className="EOSAccountContainer">
                <div className="EOSAccount">
                    <Modal open={open}
                        onOpen={this.open}
                        onClose={this.close}
                        trigger={
                            <button className="continue-cta" 
                            name="submit-button" 
                            value="Upload" >
                            Continue   
                        </button>
                        }
                        closeIcon className="EOSAccountModal">
                        <Modal.Content>
                            <div className="modalContent">
                                <div className="EOSAccountContent">
                                    <div className="form-container">
                                        <div className="form-fields">
                                            <h2 className="heading">You are almost there. Just one more step.</h2>
                                            <p className="sub-heading">Click on the button below. It will redirect to the EOS account creation site. 
                                                                        It is an easy way to create an EOS account without much of a hassle</p>  
                                                            
                                            <div className="EOSAccountBtn">
                                                <button className="EOSAccount-cta" 
                                                        name="submit-button" 
                                                        value="Upload" >
                                                        <a href="https://eos-account-creator.com/" target="_blank">Create EOS Account Here</a>  
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal.Content>
                    </Modal>
                </div>
                
            </div>

















        )
    }
}

export default FormEOSAccount

