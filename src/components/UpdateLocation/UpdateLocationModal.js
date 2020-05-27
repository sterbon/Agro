import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import './UpdateLocationModal.css'
import { updateTrackingDetails } from "../../scatter/localWallet_helper"
class UpdateLocationModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currLocation: "",
            showUpdateSuccess: false,
            currDate: "",
        };
    };

    // handleChange(event, index, value) {this.setState({ fertilizer: value });}
    // uploadDetails = (data) => this.props.dispatch(uploadCrop(data));
    updateLocation(e) {
        e.preventDefault();
        const { currLocation, currDate } = this.state;
        const { transaction } = this.props;
        const { cropName, productId } = transaction;

        var d = new Date();
        console.log(d.toDateString())   

        this.setState({
            currDate: d.toDateString(),
        })
        
        const data = { currLocation, currDate };
        
        console.log(data);
        
        if ((data.currDate != null) && (data.currLocation !== "" || data.currLocation != null)) {
            updateTrackingDetails(productId, data)
                .then((result) => {
                    console.log("GGs: ", result);
                })
        }
        this.setState({
            showUpdateSuccess: true,
            currLocation: "",
        });
    }
    render() {
        const { account, transaction } = this.props;
        const { cropName, productId } = transaction;
        var currentDate = new Date()
        return (
            <div className="updateLocationModalContainer">
                <Modal trigger={<p>Update Current Location</p>} closeIcon>
                    <Modal.Content>
                        <div>
                            <div className="updateLocation-container">
                                <div className="updateLocationHeader">
                                    <h2>Update Current Location Of Shipment</h2>
                                </div>
                                <div className="updateLocationSubHead">
                                    <h3>Crop Name : <span>{cropName}</span></h3>
                                    <h3>Product ID : <span>{productId}</span></h3>
                                </div>
                                {
                                    this.state.showUpdateSuccess && 
                                    <h3 
                                        style={{textAlign: 'center', color: 'green'}}
                                    >
                                        Current Location Updated
                                    </h3>
                                }
                                <div className="updateLocation-form">
                                    <div className="updateLocation">
                                        <label>Current Location</label>
                                        <input
                                            type="text"
                                            placeholder="Enter current location"
                                            id="currLocation"
                                            name="crop-currLocation"
                                            value={this.state.currLocation}
                                            onChange={(e) => { 

                                                var d = new Date();
                                                    this.setState({ 
                                                        currLocation: e.target.value,
                                                        currDate: d.toDateString() 
                                                    });
                                                    // this.setState({ 
                                                    //     currLocation: e.target.value
                                                    // });
                                                }
                                            }
                                            required >
                                        </input>
                                        
                                        <label>Current Date</label>
                                        <input
                                            type="text"
                                            placeholder={this.state.currDate}
                                            id="currDate"
                                            name="crop-currDate"
                                            value={this.state.currDate}
                                            disabled
                                            required >
                                        </input>

                                        <div className="updateLocationBtn">
                                            <button className="update-cta"
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