import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import '../Receipt_Modal/Receipt_Modal.css'
import { updateTrackingDetails } from "../../scatter/localWallet_helper"
class UpdateLocationModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currLocation: "",
        };
    };

    // handleChange(event, index, value) {this.setState({ fertilizer: value });}
    // uploadDetails = (data) => this.props.dispatch(uploadCrop(data));
    updateLocation(e) {
        e.preventDefault();
        const { currLocation } = this.state;
        const { transaction } = this.props;
        const { cropName, productId } = transaction;
        const data = { currLocation };

        console.log(data);
        console.log(transaction.productId);

        updateTrackingDetails(productId, data)
            .then((result) => {
                console.log("GGs: ", result);
            })

        this.setState({
            currLocation: "",
        });
    }
    render() {
        const { account, transaction } = this.props;
        const { cropName, productId } = transaction;
        return (
            <div className="receiptContainer">
                <Modal trigger={<p>Update Current Location</p>} closeIcon>
                    <Modal.Content>
                        <div>
                            <div className="receipt-container">
                                <div className="receipt">
                                    <div className="receiptHeader">
                                        <div className="receiptHeader-left">
                                            <div className="receiptHeading">
                                                <h2>Update Current Location Of Shipment - {cropName}({productId})</h2>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="receiptForm-container">

                                        <input
                                            type="text"
                                            placeholder="Enter current location"
                                            id="currLocation"
                                            name="crop-currLocation"
                                            value={this.state.currLocation}

                                            onChange={(e) => {
                                                this.setState({ currLocation: e.target.value });
                                            }}

                                            required >
                                        </input>

                                        <div className="printReceipt">

                                            <button className="print-cta"
                                                // onClick={() => {
                                                //     this.updateLocation(productId, this.state.currLocation);
                                                // } }
                                                onClick={this.updateLocation.bind(this)}
                                                name="submit-button"
                                                value="Upload">

                                                Update current location
                                                </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Content>
                </Modal>

            </div>
        )
    }
}

export default UpdateLocationModal;