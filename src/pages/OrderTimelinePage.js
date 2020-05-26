import React, { Component } from 'react';
import QRScanner from 'qr-code-scanner';
import './OrderTimelinePage.css';
import {
    getDetailsByCropId,
} from '../scatter/localWallet_helper';

class Timeline extends Component {
    render() {
        const { producer, cropName, price, buyer, cropAmount, dateOfHarvest, dateOfSow, fertilizers, sold, uploadDate, tracking_details } = this.props.cropDetails;
        let status = "Available", purchasedElem = null, track_loc = null;
        if(sold) {
            status = "Sold Out";
            purchasedElem = <li className="event" data-date="2019-11-12">
                            <h3>Crop Purchased</h3>
                            <p>by { buyer }</p> 
                            <p>Total price : ₹ { price * cropAmount }</p>   
                        </li>;
            
            if(tracking_details!= null || tracking_details!== null || tracking_details!= undefined){
                
                track_loc = tracking_details.map((track, index) => {
                    if(index > 0 ){
                    return (
                        <li className="event" data-date="2019-11-12">
                            <h3>Crop Shipped</h3>
                            <p>By : { producer }</p>
                            <p>From : {tracking_details[index - 1 ]}</p>
                            <p>To : {track} </p>  
                        </li>
                    )}
                    // else{
                    //     return null
                    // }
                });
            }
        }

        return (
            <ul className="timeline">
                <li className="event" data-date={dateOfHarvest}>
                    <h3>Crop Produced</h3>
                    <p>{ cropName } ({ status })</p>
                    <p>Sow Date : { dateOfSow }</p>
                    <p>Fertilizers used: {fertilizers}</p>
                    <p>Harvest Date : { dateOfHarvest }</p>
                    <p>Place of Harvest : { tracking_details[0] }</p>
                </li>
                <li className="event" data-date={uploadDate}>
                    <h3>Crop Uploaded</h3>
                    <p>{ cropAmount } Kg</p>
                    <p>by { producer }</p>
                    <p>Price : ₹ { price } per Kg</p>
                    <p className="upload-desc">(Crop uploaded to Agro, decentralized supplychain.)</p>    
                </li>
                { purchasedElem }
                { track_loc }
            </ul>
        );
    }
}

class OrderTimelinePage extends Component {
    state = {
        cropId: "",
        cropDetails: null,
    }

    showCropTimeline() {
        console.log("cropid: ", this.state.cropId);
        getDetailsByCropId(this.state.cropId)
        .then((result) => {
            this.setState({ cropDetails: result.rows[0] })
        });
    }

    render() {
        const { cropId, cropDetails } = this.state;
        // console.log("Crop Detail: ", cropDetails);
        let timeline = null;
        if(cropDetails) {
            timeline = <Timeline cropDetails={cropDetails}/>;
        }
        else if(cropDetails === undefined) {
            timeline = <p className="error-timeline">Crop does not exist of entered crop ID!</p>
        }
        
        return(        
            <React.Fragment>

                <div className="timeline-container">
                    <div id="content">
                        <h2>Know Your Foodgrain Supply Chain</h2>
                        <div className="search-container">
                            <div className="searchbox">
                                <button className="btn-search"/>
                                <input 
                                    id="search" 
                                    type="text" 
                                    placeholder="Enter crop ID here." 
                                    name="search" 
                                    className="search" 
                                    value={cropId}
                                    onChange={(e) => {
                                        this.setState({ cropId: e.target.value })
                                    }}
                                    onKeyPress={(e) => {
                                        if (e.key === "Enter") {
                                            this.showCropTimeline();
                                          }
                                    }}
                                />
                                <button  
                                    className="btn-search"
                                    onClick={this.showCropTimeline.bind(this)}
                                >
                                    <img src="https://img.icons8.com/cotton/24/000000/search--v2.png" />
                                </button>
                            </div>
                            <div className="option">
                                OR
                            </div>
                            <button
                                className="btn-search qrCode"
                                onClick={ () =>
                                    QRScanner.initiate({
                                    onResult: (result) => { this.setState({cropId : result}) },
                                    timeout: 10000,
                                })}
                            >
                                <img src="https://img.icons8.com/wired/64/000000/qr-code.png"/>
                            </button>
                        </div>

                        { timeline }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default OrderTimelinePage;