import React, {Component} from 'react';
import './send-tokens.scss';

const FormItem = Form.Item;

class SendTokens extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toAccount : '',
            amount    : '',
            memo      : ''
         };
    }

    inputChangeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    submitForm = (e) => {
        e.preventDefault();
        const {toAccount, amount, memo} = this.state;
        this.props.onSend({toAccount, amount, memo});
    };

    render(){
        const {toAccount, amount, memo} = this.state;
        const {submitForm} = this;
        return (
            <React.Fragment></React.Fragment>
        );
    }

}

export default SendTokens;