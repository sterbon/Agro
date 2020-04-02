import React, { Component } from 'react';
import './ProductDetail.css';
import { connect } from 'react-redux';
import { Image, Button, Input } from 'semantic-ui-react';
import Grain from '../static/images/Grain.jpg'

import ProducerCard from '../components/ProducerCard/ProducerCard';
import {
    buyCrop
} from '../scatter/localWallet_helper';

class ProductDetail extends Component {
    state = {
        selectedProducer: null,
    }

    selectProducer(selectedProducerDetail){
        this.setState({ selectedProducer: selectedProducerDetail });
    }

    buyData(e) {
        e.preventDefault();
        console.log("Prod: ",this.state.selectedProducer.productId)
        buyCrop(this.state.selectedProducer.productId)
        .then((result) =>
            {
                console.log(result)
            });
    }

    render() {
        const { cropName, details } = this.props.location.state;
        // console.log("At product page: ", cropName, details);
        const { selectedProducer } = this.state;
        const { cropImage, productId, cropAmount, price, producer, dateOfHarvest, dateOfSow, fertilizers, sold } = details;
        
        let producersList = null;
        if(productId.length) {
            producersList = Object.keys(productId).map((key) => {
                let cardStyle = {};
                if(selectedProducer && (productId[key] === selectedProducer.productId)) {
                    cardStyle = { 
                        background: "#EE6E6C", 
                        boxShadow: "0 2px 8px 0 rgba(0,0,0,0.12)",
                    };
                }

                const detail = {
                    productId: productId[key],
                    cropAmount: cropAmount[key], 
                    price: price[key], 
                    producer: producer[key],
                    dateOfHarvest: dateOfHarvest[key],
                    dateOfSow: dateOfSow[key],
                    fertilizers: fertilizers[key],
                    sold: sold[key],
                };

                return <ProducerCard 
                        style={cardStyle}
                        key={key}
                        detail={detail}
                        click={() => {
                            this.selectProducer.bind(this)(detail);
                        }}
                    />;
            });
        }

        let aboutSelectedProduct = null;
        if(selectedProducer !== null) {
            aboutSelectedProduct = (
                <React.Fragment>
                    <h4 className="misc-header">About Selected Product</h4>
                    <div className="productMisc">
                        <div className="productMisc-label">
                            <p>Quantity :</p>
                            <p>Price :</p>
                            <p>Seller :</p>
                            <p>Sow date :</p>
                            <p>Harvest date :</p>
                            <p>Fertilizers used :</p>
                        </div>

                        <div className="productMisc-text">
                            <p>{ selectedProducer.cropAmount } Kg</p>
                            <p>₹ { selectedProducer.price } per Kg</p>
                            <p>{ selectedProducer.producer }</p>
                            <p>{ selectedProducer.dateOfSow }</p>
                            <p>{ selectedProducer.dateOfHarvest }</p>
                            <p>{ selectedProducer.fertilizers }</p>
                        </div>
                    </div>
                    <div className="addToCart">
                        <Button 
                            className={`cta${selectedProducer.sold ? " disabled" : ""}`}
                            fluid
                            onClick={this.buyData.bind(this)}>
                                Buy Crop
                        </Button>
                    </div>
                </React.Fragment>
            );
        }

        return (
            <React.Fragment>
                <section className="productDetail">
                    <div className="productDetail-text">
                        <div className="addProduct-img">
                            <Image src={cropImage} size='large' rounded />
                        </div>
                    </div>

                    <div className="productDetail-container">
                        <h2 className="productName">{ cropName }</h2>
                        {/* <div className="addToCart">
                            <Button className="cta" fluid>ADD TO CART</Button>
                        </div> */}
                        <div className="selectProducer">
                            <h4>Select Producer</h4>
                            { producersList }
                        </div>
                        { aboutSelectedProduct }
                    </div>
                </section>
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ scatter }) => {
    return { scatter };
};

const mapDispatchToProps = (dispatch) => {
    return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);