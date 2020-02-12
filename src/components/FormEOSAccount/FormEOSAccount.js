import React, { Component } from 'react'
import './FormEOSAccount.css'

export class FormEOSAccount extends Component {
    render() {
        return (
            <div className="EOSAccount-container">
                <div className="EOSAccount">
                    <h2 className="heading">Yay! You are almost there. Just one more step.</h2>
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
        )
    }
}

export default FormEOSAccount

