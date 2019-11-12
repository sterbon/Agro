import React, { Component } from 'react';
import './ProductDetail.css';
import { connect } from 'react-redux';
import { Image, Button, Input } from 'semantic-ui-react';
import Grain from '../static/images/Grain.jpg'
import SecondaryNav from '../components/SecondaryNav/SecondaryNav';
import ProducerCard from '../components/ProducerCard/ProducerCard';
import {
    buyCrop
} from '../scatter/scatter_actions';

class ProductDetail extends Component {
    state = {
        selectedProducer: null,
    }

    selectProducer(selectedProducerDetail){
        this.setState({ selectedProducer: selectedProducerDetail });
    }

    render() {
        const { cropName, details } = this.props.location.state;
        // console.log("At product page: ", cropName, details);
        const { selectedProducer } = this.state;
        const { productId, cropAmount, price, producer } = details;
        
        let producersList = null;
        if(productId.length) {
            producersList = Object.keys(productId).map((key) => {
                let cardStyle = {};
                if(selectedProducer && (productId[key] === selectedProducer.productId)) {
                    cardStyle = { 
                        background: "#DCE775", 
                        boxShadow: "0 2px 8px 0 rgba(0,0,0,0.12)",
                    };
                }

                const detail = {
                    productId: productId[key],
                    cropAmount: cropAmount[key], 
                    price: price[key], 
                    producer: producer[key]
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
                        </div>

                        <div className="productMisc-text">
                            <p>{ selectedProducer.cropAmount } Kg</p>
                            <p>₹ { selectedProducer.price } per Kg</p>
                            <p>{ selectedProducer.producer }</p>
                        </div>
                    </div>
                    <div className="addToCart">
                        <Button 
                            className="cta" 
                            fluid
                            onClick={() => {
                                this.props.dispatch(buyCrop(selectedProducer.productId))
                            }}                        
                        >
                            BUY CROP
                        </Button>
                    </div>
                </React.Fragment>
            );
        }

        return (
            <React.Fragment>
                <SecondaryNav />
                <section className="productDetail">
                    <div className="productDetail-text">
                        <div className="addProduct-img">
                            <Image src={Grain} size='large' rounded />
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