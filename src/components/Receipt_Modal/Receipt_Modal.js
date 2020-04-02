import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import './Receipt_Modal.css'
// import { login, logout } from '../scatter/localWallet_helper'

class ReceiptModal extends Component {
    render() {
        return (
            <div className="receiptContainer">
                    <Modal trigger={<button className="cta" >Login </button>} closeIcon>
                        <Modal.Content>
                            <div>
                                <div className="receipt-container">
                                    <div className="receipt">
                                        <div className="receiptHeader">
                                            <div className="receiptHeader-left">
                                                <div className="receiptHeading">
                                                    <h2>RECEIPT</h2>
                                                </div>
                                                <div className="receiptSubHeading">
                                                    <h4 className="receiptSub">TRANSRACTION NUMBER</h4>
                                                    <h4>982093</h4>
                                                </div>
                                            </div>
                                            <div className="receiptHeader-right">
                                                <div className="receiptLogo">
                                                    <h1>Agro</h1>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="receiptForm-container">
                                            <div className="receiptForm-fields">
                                                <table className="receiptTable">
                                                    <tr>
                                                        <th>Crop Name</th>
                                                        <th>Price</th>
                                                        <th>Quantity</th>
                                                        <th>Total Price</th>
                                                    </tr>
                                                    <tr>
                                                        {/* <td colSpan="3" rowSpan="3">
                                                            HEllo owrld
                                                        </td> */}
                                                        <td>Cauliflower</td> 
                                                        <td>Rs. 15 per KG</td>   
                                                        <td>200 KG</td>
                                                        <td>Rs. 2500</td>    
                                                    </tr>
                                                </table>
                                            </div>

                                            <div className="receiptPriceContainer">
                                                <div className="receiptPriceLeft">

                                                </div>
                                                <div className="receiptPriceRight">
                                                    <table className="priceTable">
                                                        <tr>
                                                            <th>SUB TOTAL:</th>
                                                            <td>Rs. 2500</td>
                                                        </tr>
                                                        <tr>
                                                            <th>DISCOUNT:</th>
                                                            <td>Rs. 500</td>
                                                        </tr>
                                                        <tr>
                                                            <th>GRAND TOTAL:</th>
                                                            <td>Rs. 2000</td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>

                                            <div className="partyDetails">
                                                <div className="partyDetailsLeft">
                                                    <div className="sellerDetails">
                                                        <h4>SELLER DETAILS</h4>
                                                        <p>Seller Name</p>
                                                        <p>Seller Something</p>
                                                        <p>Seller Something</p>
                                                    </div>
                                                </div>
                                                <div className="partyDetailsRight">
                                                    <div className="buyerDetails">
                                                        <h4>BUYER DETAILS</h4>
                                                        <p>Buyer Name</p>
                                                        <p>Buyer Something</p>
                                                        <p>Buyer Something</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="printReceipt">
                                                <button className="print-cta"
                                                    onClick={function() {
                                                        window.print();
                                                      }}
                                                    name="submit-button"
                                                    value="Upload">
                                                    Print Receipt
                                            </button>
                                            </div>
                                        </div>
                                        <div className="receiptFooter">
                                            <div className="separator">Thank You For Shopping With Agro.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal.Content>
                    </Modal>
                }
            </div>
        )
    }
}

export default ReceiptModal;