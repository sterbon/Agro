import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import FormLandDetails from '../FormLandDetails/FormLandDetails' 
import './FormUserDetails.css'

export class FormUserDetails extends Component {

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    state = { open: false }

    open = () => this.setState({ open: true })
    close = () => this.setState({ open: false })


    render() {
        const { open } = this.state
        return (
                            <div className="signUpContainer">
                                <div className="signUp">
                                    <h2 className="heading">Namaste!</h2>
                                    <p className="sub-heading">Let's create an EOS Account. But before, 
                                                                we would like you to fill in some basic information.</p>

                                    <div className="form-container">
                                        <div className="form-fields">
                                            <div className="userName">
                                                <div className="firstName">
                                                    <h4><label htmlFor="crop-name">Firstname</label></h4>
                                                            <input 
                                                                    id="pro"
                                                                    type="text" 
                                                                    name="crop-name"
                                                                    placeholder="Hariom"
                                                                    required
                                                                />                 
                                                </div>
                                                <div className="lastName">
                                                    <h4><label htmlFor="crop-name">Lastname</label></h4>
                                                            <input 
                                                                id="pro"
                                                                type="text" 
                                                                name="crop-name"
                                                                placeholder="Bihari"
                                                                required
                                                            />                 
                                                </div>
                                            </div>

                                                <div className="userEmail">
                                                    <h4><label htmlFor="crop-price">Email</label></h4>
                                                    <input 
                                                        id="price"
                                                        type="email" 
                                                        name="crop-price"
                                                        placeholder="JohnDoe@example.com"
                                                        required
                                                    />
                                                </div>

                                                <div className="userMobile">
                                                        <h4><label htmlFor="crop-name">Mobile Number</label></h4>
                                                        <input 
                                                            id="amount"
                                                            type="text" 
                                                            name="crop-amount"
                                                            placeholder="8010639476"
                                                            required
                                                        />
                                                </div>

                                                <div className="userAdhaar">
                                                        <h4><label htmlFor="crop-name">Adhaar Number</label></h4>
                                                        <input 
                                                            id="amount"
                                                            type="text" 
                                                            name="crop-amount"
                                                            placeholder="4589-6398-5012"
                                                            required
                                                        />
                                                </div>
                                        
                                                <div className="continue">
                                                    <button className="continue-cta" 
                                                        name="submit-button" 
                                                        value="Upload" 
                                                        onClick = {this.continue}>
                                                        Continue   
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


        //     <div className="addCrop-container">
        //     <h2 className="heading">Namaste!</h2>
        //     <p className="sub-heading"> Let's create an EOS Account. But before, we would like you to fill in some basic information. 
        //                                 This will help us get to know more about you.</p>

        //     <div className="userName">
        //         <div className="firstName">
        //             <h4><label htmlFor="crop-name">Firstname</label></h4>
        //                     <input 
        //                         id="pro"
        //                         type="text" 
        //                         name="crop-name"
        //                         placeholder="Hariom"
        //                         required
        //                     />                 
        //         </div>
        //         <div className="lastName">
        //             <h4><label htmlFor="crop-name">Lastname</label></h4>
        //                     <input 
        //                         id="pro"
        //                         type="text" 
        //                         name="crop-name"
        //                         placeholder="Bihari"
        //                         required
        //                     />                 
        //         </div>
        //     </div>

        //     <div className="userEmail">
        //             <h4><label htmlFor="crop-price">Email</label></h4>
        //             <input 
        //                 id="price"
        //                 type="email" 
        //                 name="crop-price"
        //                 placeholder="JohnDoe@example.com"
        //                 required
        //             />
        //     </div>

        //     <div className="userMobile">
        //             <h4><label htmlFor="crop-name">Mobile Number</label></h4>
        //             <input 
        //                 id="amount"
        //                 type="text" 
        //                 name="crop-amount"
        //                 placeholder="8010639476"
        //                 required
        //             />
        //     </div>

        //     <div className="userAdhaar">
        //             <h4><label htmlFor="crop-name">Adhaar Number</label></h4>
        //             <input 
        //                 id="amount"
        //                 type="text" 
        //                 name="crop-amount"
        //                 placeholder="4589-6398-5012"
        //                 required
        //             />
        //     </div>
            
        //     <div className="continue">
        //         <button className="continue-cta" 
        //             name="submit-button" 
        //             value="Upload" 
        //             onClick = {this.continue}>
        //             Continue   
        //         </button>
        //     </div>
        // </div>
        )
    }
}

export default FormUserDetails
