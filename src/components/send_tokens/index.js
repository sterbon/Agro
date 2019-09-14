import React, {Component} from 'react';
import './send-tokens.scss';
import {
    Form, Input, Button,
} from 'antd';

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
            <Form onSubmit={submitForm}>
                <FormItem>
                    <Input
                        name="toAccount" value={toAccount} placeholder="receiver account" onChange={this.inputChangeHandler}/>
                </FormItem>
                <FormItem>
                    <Input type="number" name="amount" placeholder="amount EOS"value={amount} onChange={this.inputChangeHandler}/>
                </FormItem>
                <FormItem>
                    <Input name="memo" value={memo} placeholder="memo" onChange={this.inputChangeHandler}/>
                </FormItem>
                <FormItem>
                    <Button htmlType="submit">Send Tokens</Button>
                </FormItem>
            </Form>
        );
    }

}

export default SendTokens;