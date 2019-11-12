import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './AddProductPage.css';
import SecondaryNav from '../components/SecondaryNav/SecondaryNav'; 
import addProduct from '../static/images/addProduct.png';
import {
    fetchWallet,
    sendTokens,
    uploadCrop
} from '../scatter/scatter_actions';

const IPFS = require('ipfs-api');

class AddProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scatterConnected: false,
            requestedAuth: false,
            connectingScatter: false,
            requestedTransaction: false,
            connectedNetworkName: null,
            pname: "",
            price: "",
            camount: "",
            loggedIn: false,
            userAccount: {
                name: null,
                publicKey: null,
                keyType: null,
            },
            userWallet: {}
        };

    };

    uploadDetails = (data) => this.props.dispatch(uploadCrop(data));

    static getDerivedStateFromProps(props) {
        const
            hasWalletOrError = props.scatter.userWallet || props.scatter.walletError,
            shouldFetchWallet = props.scatter.loggedIn && !(hasWalletOrError || props.scatter.fetchingWallet);

        shouldFetchWallet && props.dispatch(fetchWallet());
        return null;
    }

    sendTokens = ({ toAccount, amount, memo }) => {
        this.props.dispatch(sendTokens({ toAccount, amount, memo }))
    };

    uploadData(e) {
        e.preventDefault();
        const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
        const {pname, price, camount} = this.state;      
        const data = { pname, price, camount };
        this.uploadDetails(data);
    
        //Reset form
        const messageContainer = document.getElementById("messageAlert");
        const message = document.querySelector(".message");
        messageContainer.style.display = "flex";
        message.innerHTML = "Successfull! Crop uploaded to Agro.";
        this.setState({
            pname: "",
            price: "",
            camount: "",
        });
    }
    

    render() {
        const { loggedIn } = this.props.scatter;

        return (
            <React.Fragment>
                <SecondaryNav style={{ color: '#2F4858' }}/>
                <section className="addProduct">
                    <div className="addProduct-text">
                        <p className="addProduct-para">Agro is the easiest and safest way to buy, sell crops online.
                            Discover new ways to monetize and scale your business online with Agro.</p>
                        <div className="addProduct-img">
                            <img src={addProduct} />
                        </div>
                    </div>
                    {
                        loggedIn && 
                        <>
                            <div className="addCrop-container">
                                <div id="messageAlert">
                                    <div className="message"></div>
                                    <span 
                                        className="closeBtn"
                                        onClick={(e) => {
                                            e.target.parentElement.style.display='none';
                                        }}
                                    >
                                        X
                                    </span>
                                </div>
                                <h2>UPLOAD CROP</h2>
                                <form className="addCrop-form">
                                    <div className="crop-name">
                                        <h4><label htmlFor="crop-name">Crop Name</label></h4>
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
                                    {/* <div className="crop-descrip">
                                        <h4><label htmlFor="crop-descrip">Description</label></h4>
                                        <textarea 
                                            type="text" 
                                            name="crop-descrip"
                                            placeholder="Crop description"
                                        />
                                    </div> */}
                                    <div className="crop-price">
                                        <h4><label htmlFor="crop-price">Price</label></h4>
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
                                    <div className="crop-amount">
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
                                    <div className="submitcrop">
                                        <button className="cta" 
                                            name="submit-button" 
                                            value="Upload"
                                            onClick={this.uploadData.bind(this)} 
                                        >Upload</button>
                                    </div>
                                </form>
                            </div>
                        </>
                    }
                </section>
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