import { Segment, Header, Button } from "semantic-ui-react";
import React, { Component } from 'react';
import SecondaryNav from '../components/SecondaryNav/SecondaryNav';
import penny from '../static/images/penny.png';
import { getTransactionDetails } from '../scatter/scatter_helper';
import './OrdersPage.css';

class OrderCard extends Component {
    render() {
        const { transactionID, cropName, productId, farmer, price, quantity } = this.props.transaction;
        const trackerUrl = `${"https://jungle.bloks.io/transaction/"}${transactionID}`;
        
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
                            <h3>Crop: { cropName }</h3>
                            <h3 id="delivStatus">Transaction Status: Completed</h3>
                        </div>

                        <div className="order-img-container">
                            <img src={penny} width="120px" height="120px" />
                            <div id="orderProduct-details" >
                                <h4 id="pprice" >Crop ID : { `${"0G36CR"}${productId}` }</h4>
                                <h4 id="pprice" >Quantity : { quantity } kg</h4>
                                <h4 id="pprice" >Price : ₹ { price }</h4>
                            </div>
                            <div id="order-seller">
                                <h4>Seller : { farmer }</h4>
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

        getTransactionDetails()
        .then((result) => {
            const transactions = result.rows;
            const { transactionList } = this.state;

            transactions.map((transaction) => {
                if(transaction.farmer === "playerspider" || transaction.buyer === "playerspider")
                {
                    transactionList.push(transaction);
                    this.setState({ transactionList });
                }
            });            

            // console.log("Transactions for this account: ", transactionList);
        });
    }

    render() {
        const { transactionList } = this.state;
        let ListView = <h4>you do not have any transactions yet.</h4>;
        if(transactionList.length) {
            ListView = Object.values(transactionList).map((transaction) => {
                return <OrderCard 
                    key={transaction.transactionID}
                    transaction={transaction} 
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
                    { ListView }
                </div>  
            </React.Fragment>
        )
    }
}

export default OrdersPage;