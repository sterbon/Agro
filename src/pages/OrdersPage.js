import { Segment, Header, Button } from "semantic-ui-react";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SecondaryNav from '../components/SecondaryNav/SecondaryNav';
import penny from '../static/images/penny.png';
import { getTransactionDetails } from '../scatter/scatter_helper';
import './OrdersPage.css';

class OrderCard extends Component {
    render() {
        const { account, transaction } = this.props;
        const { transactionID, cropName, productId, farmer, buyer, price, quantity } = transaction;
        const trackerUrl = `${"https://jungle.bloks.io/transaction/"}${transactionID}`;
        console.log("trans: ", transaction);
        let otherAccount = null;
        if(account.name === farmer) {
            otherAccount = `${"Buyer : "}${buyer}`;
        } 
        else if(account.name === buyer) {
            otherAccount = `${"Seller : "}${farmer}`;
        }

        return (
            <div className="orderCard">
                <Segment raised stacked>
                    <div id="orderCard-container">
                        <div id="order-details">
                            <h4>Transaction ID : { transactionID }</h4>
                            <div id="btn-container">
                                <Button href={trackerUrl} target="_blank" >See transaction at Bloks.io jungle</Button>
                            </div>
                        </div>

                        <div className="orderDate-container">
                            <h3 id="orderDate">Transaction Date: 30/08/2019</h3>
                            <h3>Crop : { cropName }</h3>
                            <h3 id="delivStatus">Transaction Status: Completed</h3>
                        </div>

                        <div className="order-img-container">
                            <img src={penny} width="120px" height="120px" />
                            <div id="orderProduct-details" >
                                <h4 id="pprice" >Crop ID : { `${"G36C"}${productId}` }</h4>
                                <h4 id="pprice" >Quantity : { quantity } kg</h4>
                                <h4 id="pprice" >Price : ₹ { price }</h4>
                            </div>
                            <div id="order-seller">
                                <h4>{ otherAccount }</h4>
                            </div>
                        </div>
                    </div>
                </Segment>
            </div>
        );
    }
}

class OrdersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactionList: [],
        }
        this.getTransactionDetailFunc = this.getTransactionDetailFunc.bind(this);

        this.getTransactionDetailFunc();
    }

    componentDidUpdate(prevProps, prevState) {
        const { loggedIn } = this.props.scatter;

        if(prevProps.scatter.loggedIn !== loggedIn){
            this.getTransactionDetailFunc();
        }
    }

    getTransactionDetailFunc() {
        const transactionList = [];
        const { loggedIn, userAccount } = this.props.scatter;
        if(loggedIn){
            getTransactionDetails()
            .then((result) => {
                const transactions = result.rows;

                transactions.map((transaction) => {
                    if(transaction.farmer === userAccount.name || transaction.buyer === userAccount.name)
                    {   
                        transactionList.push(transaction);
                    }
                });  
                this.setState({ transactionList });         
            });
        }
    }

    render() {
        const { loggedIn, userAccount } = this.props.scatter;
        const { transactionList } = this.state;
        console.log("page: ", transactionList);

        let ListView = <p className="else-text">Loading...</p>;
        if(transactionList.length) {
            ListView = Object.values(transactionList).map((transaction) => {
                return <OrderCard 
                    key={transaction.transactionID}
                    transaction={transaction} 
                    account={userAccount}
                />
            });
        }

        return (
            <React.Fragment>
                <SecondaryNav />
                <div className="order-container">
                    <Header as='h2'>
                        Your Transactions
                    </Header>
                    { loggedIn ? ListView : <p className="else-text">You are not logged in.</p> }
                </div>  
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ scatter }) => {
    return {
        scatter,
    };
};

export default connect(mapStateToProps)(OrdersPage); 