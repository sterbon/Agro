import { Image, Segment, Header, Label, Icon, List, Popup, Button } from "semantic-ui-react";
// import 'semantic-ui-css/semantic.min.css'
import React, { Component } from 'react';
import penny from '../static/images/penny.jpg';
import './OrdersPage.css';

class OrderCard extends Component {
    render() {
        return (
            <div className="orderCard">
                <Segment raised stacked>
                    <div id="orderCard-container">
                        <div id="order-details">
                            <h4>Transaction ID: #1234</h4>
                            <div id="btn-container"><Button href="https://eostracker.io/transactions/80145543/31ef8125ed68970bb46492a49bf0e8af25aea29a2112606b9406933fe7c77bd6" target="_blank" >See transaction at eostracker.com</Button></div>
                        </div>

                        {/* <div id="order-date">
                            {/* <h3>Order Date: 30/08/2019</h3> }
                            <h3>Expected Delivery Date: 30/08/2019</h3>
                            <h3>Delivery Status: Shipped</h3>
                        </div> */}

                        <div className="order-date">
                            <h3 id="test">Order Date: 30/08/2019</h3>
                            <h3>Expected Delivery Date: 30/08/2019</h3>
                            <h3 id="testing">Delivery Status: Shipped</h3>
                        </div>

                        <div className="order-img-container">
                            <img src={penny} width="120px" height="120px" align="left"/>
                            <div id="orderProduct-details" >
                                <h5 id="pprice" >Qty:  1</h5>
                                <h4>Rice Bag (100 Kg)</h4>
                                <h5 id="pprice">Rs. 10000</h5>
                            </div>

                            <div id="order-seller">
                                <h5>Seller ID: </h5>
                                <h5>Seller Name:</h5>
                            </div>
                            

                        </div>
                        
                    </div>
                </Segment>
            </div>
        );
    }
}

class OrdersPage extends Component {

    render() {
        return (
            <React.Fragment>
                <Header as='h3' dividing>
                    My Orders
                </Header>
                <OrderCard/>
                <OrderCard/>    
            </React.Fragment>
        )
    }
}

export default OrdersPage;