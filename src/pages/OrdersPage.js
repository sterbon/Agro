import { Segment, Header, Button } from "semantic-ui-react";
import React, { Component } from 'react';
import { connect } from 'react-redux';

import penny from '../static/images/penny.png';
import { getTransactionDetails } from '../scatter/localWallet_helper';
import './OrdersPage.css';

class OrderCard extends Component {
    render() {
        const { account, transaction } = this.props;
        const { transactionID, cropName, productId, farmer, buyer, price, quantity } = transaction;
        const trackerUrl = `${"https://jungle.bloks.io/transaction/"}${transactionID}`;
        // console.log("trans: ", transaction);
        let otherAccount = null, orderCardStyle = null;
        if (account.name === farmer) {
            otherAccount = `${"Buyer : "}${buyer}`;
            orderCardStyle = {
                background: "#FFF9C4",
            }
        }
        else if (account.name === buyer) {
            otherAccount = `${"Seller : "}${farmer}`;
            orderCardStyle = {
                background: "#E3F2FD",
            }
        }

        return (
            <div className="orderCard">
                <Segment raised>
                    <div id="orderCard-container">
                        <div id="order-details">
                            <h4>Transaction ID : {transactionID}</h4>
                        </div>

                        <div className="orderDate-container">
                            <h4>{otherAccount}</h4>
                            <h4>Crop : <span>{cropName}</span></h4>
                            <h4 id="delivStatus">Transaction Status : <span>Completed</span></h4>
                        </div>

                        <div className="order-img-container">
                            <img src={penny} width="120px" height="120px" />
                            <div id="orderProduct-details" >
                                <h4 id="pprice" >Crop ID : <span>{`${"G36C"}${productId}`}</span></h4>
                                <h4 id="pprice" >Quantity : <span>{quantity} kg</span></h4>
                                <h4 id="pprice" >Price : <span>₹ {price} per Kg</span></h4>
                            </div>
                            {/* <div id="order-seller">
                                <h4></h4>
                            </div> */}
                        </div>
                        <div id="btn-container">
                            <Button href={trackerUrl} target="_blank" >See transaction at Bloks.io jungle</Button>
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
            loggedIn: false,
            currentUser: null
        }
        this.getTransactionDetailFunc = this.getTransactionDetailFunc.bind(this);

        this.getTransactionDetailFunc();
    }

    componentDidUpdate(prevProps, prevState) {
        // const { loggedIn } = this.props.scatter;
        if (localStorage.getItem("current_user") !== null || localStorage.getItem("current_user") !== undefined) {
            var username = localStorage.getItem("current_user");
            this.setState({
                loggedIn: true,
                currentUser: username
            })
        }
        username = localStorage.getItem("current_user");
        if (this.state.loggedIn === true) {
            this.getTransactionDetailFunc();
        }
    }

    getTransactionDetailFunc() {
        const transactionList = [];
        const { loggedIn, currentUser } = this.state;
        
        if (loggedIn) {
            getTransactionDetails()
                .then((result) => {
                    const transactions = result.rows;

                    transactions.map((transaction) => {
                        if (transaction.farmer === currentUser || transaction.buyer === currentUser) {
                            transactionList.push(transaction);
                        }
                        
                    });
                    this.setState({ transactionList });
                });
        }
    }

    render() {
        const { loggedIn, currentUser } = this.state;
        const { transactionList } = this.state;
        // console.log("page: ", transactionList);
        console.log("translist:", transactionList);
        console.log("loggedIn", loggedIn);
        let ListView = <p className="else-text">Loading...</p>;
        if (transactionList.length) {
            ListView = Object.values(transactionList).map((transaction) => {
                return <OrderCard
                    key={transaction.transactionID}
                    transaction={transaction}
                    account={currentUser}
                />
            });
        }

        return (
            <React.Fragment>
                <div className="order-container">
                    <Header as='h2'>
                        Your Transactions
                    </Header>
                    {loggedIn ? ListView : <p className="else-text">Sorry. Currently you are not logged in.</p>}
                </div>
            </React.Fragment>
        )
    }
}


export default (OrdersPage); 