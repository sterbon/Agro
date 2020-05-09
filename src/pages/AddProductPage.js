import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './AddProductPage.css';
import addProduct from '../static/images/addProduct.png';
import { Fertilizers } from '../fertilizers.js';
import { Dropdown } from 'semantic-ui-react';
import { uploadCrop, getLatestCrop} from '../scatter/localWallet_helper';
var QRCode = require('qrcode.react');

class AddProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latestCropId: 'this',
            scatterConnected: false,
            requestedAuth: false,
            connectingScatter: false,
            requestedTransaction: false,
            connectedNetworkName: null,
            pname: "",
            price: "",
            camount: "",
            harvest: "",
            sow:"",
            fertilizer:"",
            loggedIn: false,
            userAccount: {
                name: null,
                publicKey: null,
                keyType: null,
            },
            userWallet: {}
        };
        
    };

    // handleChange(event, index, value) {this.setState({ fertilizer: value });}
    // uploadDetails = (data) => this.props.dispatch(uploadCrop(data));
    uploadData(e) {
        e.preventDefault();
        const {pname, price, camount, harvest, sow, fertilizer} = this.state;      
        const data = { pname, price, camount, harvest, sow, fertilizer };
        console.log(data);
        // uploadCrop(data)
        // .then((result) =>  {
        //     console.log("GGs: ", result);
        // })
        getLatestCrop()
        .then((res) => {
            this.setState({ latestCropId : res });
        });

        this.setState({
            pname: "",
            price: "",
            camount: "",
            harvest: "",
            sow:"",
            fertilizer:"",
        });
    }
    
    render() {
        // const { loggedIn } = this.props.scatter;
        console.log(this.state.latestCropId)
        return (
            // <script type="text/javascript" src="qrcode.js"></script>

            <React.Fragment>
               
                <section className="addProduct">
                    {
                        // loggedIn && 
                        <>

                            <div className="addCrop-container">
                            <h2>UPLOAD CROP</h2>

                                {/* <div id="messageAlert">
                                    <div className="message"></div>
                                    <span 
                                        className="closeBtn"
                                        onClick={(e) => {
                                            e.target.parentElement.style.display='none';
                                        }}
                                    >
                                        x
                                    </span>
                                </div> */}
                                <div className="cropContainer">
                                    <h4><label htmlFor="crop-name">Name</label></h4>
                                    <input 
                                        id="pro"
                                        type="text" 
                                        name="crop-name"
                                        placeholder="Crop name"
                                        value={this.state.pname} 
                                        onChange={(e) => {
                                            this.setState({ pname : e.target.value }); 
                                        }}
                                        required
                                    />
                                </div>
                                <div className="cropContainer">
                                    <h4><label htmlFor="crop-price">Price (Per Kg)</label></h4>
                                    <input 
                                        id="price"
                                        type="number" 
                                        name="crop-price"
                                        placeholder="Crop price"
                                        value={this.state.price} 
                                        onChange={(e) => { 
                                            this.setState({ price : e.target.value }); 
                                        }}
                                        required
                                    />
                                </div>
                                <div className="cropContainer">
                                    <h4><label htmlFor="crop-name">Date of Sow</label></h4>
                                    <input 
                                        id="amount"
                                        type="date" 
                                        name="crop-amount"
                                        placeholder="Date of Harvest"
                                        value={this.state.sow} 
                                        onChange={(e) => { 
                                            this.setState({ sow : String(e.target.value) }); 
                                        }}
                                        required
                                    />
                                </div>
                                <div className="cropContainer">
                                    <h4><label htmlFor="crop-name">Date of Harvest</label></h4>
                                    <input 
                                        id="amount"
                                        type="date" 
                                        name="crop-amount"
                                        placeholder="Date of Harvest"
                                        value={this.state.harvest} 
                                        onChange={(e) => { 
                                            this.setState({ harvest : String(e.target.value) }); 
                                        }}
                                        required
                                    />
                                </div>
                                <div className="cropContainer">
                                    <h4><label htmlFor="crop-price">Amount in Kgs</label></h4>
                                    <input 
                                        id="amount"
                                        type="number" 
                                        name="crop-amount"
                                        placeholder="Crop Amount"
                                        value={this.state.camount} 
                                        onChange={(e) => { 
                                            this.setState({ camount : e.target.value }); 
                                        }}
                                        required
                                    />
                                </div>
                                <div className="cropContainer">
                                    <h4><label htmlFor="crop-price">Fertilizer or Manure Used</label></h4>
                                    <Dropdown
                                        id="amount"
                                        type="text"
                                        name="crop-fertilizer"
                                        placeholder="Fertilizer or Manure Name"
                                        value={this.state.fertilizer}
                                        onChange={(e) => {
                                            this.setState({ fertilizer: e.target.textContent });
                                        }}
                                        // onChange={this.handleChange}
                                        required
                                        fluid
                                        search
                                        selection
                                        options={Fertilizers}
                                    />
                                </div>
                                <div className="submitcrop">
                                    <button className="cta" 
                                        name="submit-button" 
                                        value="Upload"
                                        onClick={this.uploadData.bind(this)}>
                                            Upload
                                    </button>
                                </div>
                                
                            </div>
                                </>
                            }
                            </section>
                            <QRCode value={this.state.latestCropId} />

                            </React.Fragment>                 
                   

                   );
                }
            }
const mapStateToProps = ({ scatter }) => {
    return {
        scatter,
    };
};

const mapDispatchToProps = (dispatch) => {
    return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProductPage);