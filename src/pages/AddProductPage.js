import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AddProductPage.css'
import {
    requestLogin,
    fetchWallet,
    logout,
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
            pname: null,
            price: null,
            loggedIn: false,
            userAccount: {
                name: null,
                publicKey: null,
                keyType: null,
            },
            userWallet: {}
        };

    };

    // loginUser = () => this.props.dispatch(requestLogin());
    uploadDetails = (hash) => this.props.dispatch(uploadCrop(hash));

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

    // logOutUser = () => this.props.dispatch(logout());

    uploadData() {
        // const ipfs = new IPFS.create()
        const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
        const {pname, price} = this.state;      
        const data = { pname, price };

        console.log('data',data)
        var buf = Buffer.from(JSON.stringify(data));
        console.log('Buffer', buf)

        console.time()
        ipfs.files.add(buf, (error, result) => {
            if (error) {
                console.error(error)
                console.log("err")
                return
            }
            console.log("Hash:", result[0].hash)
            console.timeEnd()
            this.setState({hash: result[0].hash})
            console.log(this.state.hash)
            this.uploadDetails(this.state.hash)
        })
    }

    render() {
        const { userAccount, loggedIn, userWallet } = this.props.scatter;

        // const {
        //     loginUser,
        //     sendTokens,
        //     logOutUser,
        // } = this;

        return (
            <React.Fragment>
                <div className="addCropComponent">

                  {loggedIn && 
                    <>
                    <h3> ADD CROP </h3>
                    <form >
                        <div className="crop-name">
                            <label htmlFor="crop-name">Crop Name</label>
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
                        <div className="crop-descrip">
                            <label htmlFor="crop-descrip">Description</label>
                            <textarea 
                                type="text" 
                                name="crop-descrip"
                                placeholder="Crop description"
                            />
                        </div>
                        <div className="crop-price">
                            <label htmlFor="crop-price">Price</label>
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
                        <div className="submitcrop-button">
                            <input 
                                type="submit" 
                                name="submit-button" 
                                value="CONFIRM"
                                onClick={this.uploadData.bind(this)} 
                            />
                        </div>
                    </form>
                    </>
                  }
                </div>
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