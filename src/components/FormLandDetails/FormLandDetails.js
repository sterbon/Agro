import React, { Component } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import FormEosAccount from '../FormEOSAccount/FormEOSAccount'
import './FormLandDetails.css'

export class FormLandDetails extends Component {

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    state = { open: false }

    open = () => this.setState({ open: true })
    close = () => this.setState({ open: false })

    render() {
        const { open } = this.state

        return (

            <div>
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
                       closeIcon className="landDetailsModal">
                    <Modal.Content>
                        <div className="modalContent">
                            <div className="signUpContainer">
                                <div className="signUp">
                                <h2 className="heading">Land Registeration Details</h2>
                                <p className="sub-heading"> Agro is the easiest and safest way to buy, sell crops online.
                             Discover new ways to monetize and scale your business online with Agro.</p>

                                    <div className="form-container">
                                        <div className="form-fields">

                                            <div className="landRegNo">
                                                <h4><label htmlFor="crop-name">Land Registeration Number</label></h4>
                                                <input 
                                                    id="amount"
                                                    type="text" 
                                                    name="crop-amount"
                                                    placeholder="4589-6398-5012"
                                                    required
                                                />
                                            </div>
                                            
                                            <h3 className="addressHead">Address</h3>
                                            <div className="address-container">
                                                <div className="address">
                                                    <div className="country">
                                                        <h4><label htmlFor="crop-name">Country</label></h4>
                                                                <input 
                                                                    id="pro"
                                                                    type="text" 
                                                                    name="crop-name"
                                                                    placeholder="India"
                                                                    required
                                                                />                 
                                                    </div>
                                                    <div className="city">
                                                        <h4><label htmlFor="crop-name">City</label></h4>
                                                                <input 
                                                                    id="pro"
                                                                    type="text" 
                                                                    name="crop-name"
                                                                    placeholder="Gurgoan"
                                                                    required
                                                                />                 
                                                    </div>
                                                </div>

                                                <div className="address">
                                                    <div className="state">
                                                        <h4><label htmlFor="crop-name">State</label></h4>
                                                                <input 
                                                                    id="pro"
                                                                    type="text" 
                                                                    name="crop-name"
                                                                    placeholder="Manesar"
                                                                    required
                                                                />                 
                                                    </div>
                                                    <div className="pin">
                                                        <h4><label htmlFor="crop-name">Pin Number</label></h4>
                                                                <input 
                                                                    id="pro"
                                                                    type="text" 
                                                                    name="crop-name"
                                                                    placeholder="110078"
                                                                    required
                                                                />                 
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="ctaBtnGroup">
                                                <button className="back-cta" 
                                                    name="submit-button" 
                                                    value="Upload" 
                                                    onClick = {this.back}>
                                                    Back   
                                                </button>
                                                
                                                <FormEosAccount />
                                                {/* <button className="continue-cta" 
                                                    name="submit-button" 
                                                    value="Upload" 
                                                    onClick = {this.continue}>
                                                    Continue   
                                                </button> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Content>
                </Modal>
            </div>











        //      <div className="addCrop-container">
        //      <h2 className="heading">Land Registeration Details</h2>
        //      <p className="sub-heading"> Agro is the easiest and safest way to buy, sell crops online.
        //                      Discover new ways to monetize and scale your business online with Agro.</p>

        //      <div className="landRegNo">
        //          <h4><label htmlFor="crop-name">Land Registeration Number</label></h4>
        //          <input 
        //              id="amount"
        //              type="text" 
        //              name="crop-amount"
        //              placeholder="4589-6398-5012"
        //              required
        //          />
        //      </div>
            
        //      <h3 className="addressHead">Address</h3>
        //      <div className="address-container">
        //          <div className="address">
        //              <div className="country">
        //                  <h4><label htmlFor="crop-name">Country</label></h4>
        //                          <input 
        //                              id="pro"
        //                              type="text" 
        //                              name="crop-name"
        //                              placeholder="India"
        //                              required
        //                          />                 
        //              </div>
        //              <div className="city">
        //                  <h4><label htmlFor="crop-name">City</label></h4>
        //                          <input 
        //                              id="pro"
        //                              type="text" 
        //                              name="crop-name"
        //                              placeholder="Gurgoan"
        //                              required
        //                          />                 
        //              </div>
        //          </div>

        //          <div className="address">
        //              <div className="state">
        //                  <h4><label htmlFor="crop-name">State</label></h4>
        //                          <input 
        //                              id="pro"
        //                              type="text" 
        //                              name="crop-name"
        //                              placeholder="Manesar"
        //                              required
        //                          />                 
        //              </div>
        //              <div className="pin">
        //                  <h4><label htmlFor="crop-name">Pin Number</label></h4>
        //                          <input 
        //                              id="pro"
        //                              type="text" 
        //                              name="crop-name"
        //                              placeholder="110078"
        //                              required
        //                          />                 
        //              </div>
        //          </div>
        //      </div>
            
        //      <div className="ctaBtnGroup">
        //          <button className="back-cta" 
        //              name="submit-button" 
        //              value="Upload" 
        //              onClick = {this.back}>
        //              Back   
        //          </button>

        //          <button className="continue-cta" 
        //              name="submit-button" 
        //              value="Upload" 
        //              onClick = {this.continue}>
        //              Continue   
        //          </button>
        //      </div>
        //  </div>
        )
    }
}

export default FormLandDetails
