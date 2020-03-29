import React, { Component } from 'react'
import './SignUpPage.css';
import FormUserDetails from '../components/FormUserDetails/FormUserDetails';
import FormLandDetails from '../components/FormLandDetails/FormLandDetails';
import FormEOSAccount from '../components/FormEOSAccount/FormEOSAccount';


export class SignUpPage extends Component {
    state = {
        step: 1
    }

    //Function to proceed to next step in form
    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    }

    //Function to move to previous step in form
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    }

    render() {   
        const { step } = this.state;
        
        switch(step){
            case 1: return(
                <FormEOSAccount nextStep = {this.nextStep} />
            )

            case 2: return(
                <FormLandDetails nextStep = {this.nextStep} prevStep = {this.prevStep}    />
            )

            case 3: return(
                <FormUserDetails nextStep = {this.nextStep}  prevStep = {this.prevStep}    />
            )
        }
    }
}

export default SignUpPage
