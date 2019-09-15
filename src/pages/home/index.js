import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Col, Row, Button } from 'antd';

import {
    requestLogin,
    fetchWallet,
    logout,
    sendTokens,
    uploadCrop
} from '../../scatter/scatter_actions';

const IPFS = require('ipfs-api');

// import UserWallet from "../../components/user_wallet";
// import SendTokens from "../../components/send_tokens";
// import UserAccount from "../../components/user_account";

class Home extends Component {
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
            // account details
            loggedIn: false,
            userAccount: {
                name: null,
                publicKey: null,
                keyType: null,
            },
            userWallet: {}
        };

    };

    loginUser = () => this.props.dispatch(requestLogin());
    uploadDetails = () => this.props.dispatch(uploadCrop());

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

    logOutUser = () => this.props.dispatch(logout());


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
            console.log("Image Hash:", result[0].hash)
            console.timeEnd()
        })
        this.uploadDetails()
    }

    render() {
        const { userAccount, loggedIn, userWallet } = this.props.scatter;

        const {
            loginUser,
            sendTokens,
            logOutUser,
            uploadDetails
        } = this;

        return (
            <div id="homepage"><>
                <Row>
                    <Col span={24}>
                        <Card style={{ margin: "10px" }} bordered={true}>
                            {loggedIn ? <Button htmlType="button" onClick={logOutUser}>Log out</Button> : <Button htmlType="button" onClick={loginUser}>Log in</Button>}
                        </Card>
                    </Col>
                </Row>

                {loggedIn && <>
                    <form>
                        <label>
                            Product Name:
                        </label>
                        <input id='pro' value={this.state.pname} onChange={(e) => { this.setState({ pname : e.target.value }); }} type='text'></input>

                        <label>
                            Price:
                        </label>
                        <input id='price' value={this.state.price} onChange={(e) => { this.setState({ price : e.target.value }); }} type='text'></input>
                    </form>
                    <button onClick={this.uploadData.bind(this)}>Get Hash</button>
                </>}
            </></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);