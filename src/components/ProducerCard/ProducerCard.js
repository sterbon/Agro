import React, { Component } from 'react'
import './ProducerCard.css'

class ProducerCard extends Component {
    render() {
        const { detail, click, style } = this.props;
        const { productId, cropAmount, price, producer, sold } = detail;
        let status = "";
        if(sold) {
            status = "SOLD OUT";
        }

        return(
            <div 
                style={style}
                className="producerCard-container"
                onClick={click}
            >
                <span className="cropStatus">
                    { status }
                </span>
                <div className="producerCard">
                    <div className="producerName">
                        <h4 className="col">ID</h4>
                        <h4>{ `${"G36C"}${productId}` }</h4>
                    </div>
                    <div className="cropType">
                        <h4 className="col">Amount</h4>
                        <h4>{ cropAmount } Kg</h4>
                    </div>
                    <div className="cropPrice">
                        <h4 className="col">Price</h4>
                        <h4>₹ { price } per Kg</h4>
                    </div>
                    <div className="producerName">
                        <h4 className="col">Seller</h4>
                        <h4>{ producer }</h4>
                    </div>
                </div>
            </div>
        );
    }
};

export default ProducerCard;