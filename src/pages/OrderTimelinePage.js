import React, { Component } from 'react';
import SecondaryNav from '../components/SecondaryNav/SecondaryNav';
import './OrderTimelinePage.css';
import {
    getDetailsByCropId,
} from '../scatter/scatter_helper';

class Timeline extends Component {
    render() {
        const { producer, cropName, price, buyer, cropAmount, sold } = this.props.cropDetails;
        let status = "Available", purchasedElem = null;
        if(sold) {
            status = "Sold Out";
            purchasedElem = <li className="event" data-date="13th-October-2019">
                            <h3>Purchased</h3>
                            <p>by { buyer }</p>    
                        </li>;
        }

        return (
            <ul className="timeline">
                <li className="event" data-date="1st-October-2019">
                    <h3>Crop Produced</h3>
                    <p>{ cropName } ({ status })</p>
                    <p>{ cropAmount } Kg</p>
                    <p>by { producer }</p>
                    <p>Selling Price: {price}</p>
                </li>
                <li className="event" data-date="11th-October-2019">
                    <h3>Crop Uploaded</h3>
                    <p>Crop uploaded to Agro, decentralized supplychain.</p>    
                </li>
                { purchasedElem }
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
                <SecondaryNav />
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
                                />
                                <button  
                                    className="btn-search"
                                    onClick={this.showCropTimeline.bind(this)}
                                >
                                    <img src="https://img.icons8.com/cotton/24/000000/search--v2.png" />
                                </button>
                            </div>
                        </div>

                        { timeline }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default OrderTimelinePage;