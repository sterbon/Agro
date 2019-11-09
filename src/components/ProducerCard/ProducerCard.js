import React from 'react'
import './ProducerCard.css'

const ProducerCard = () => {
    return(
        <div className="producerCard-container">
            <div className="producerCard">
                <div className="radio">
                    <input id="radio-1" name="radio" type="radio" />
                </div>
                <div className="producerName">
                    <h4>John Doe</h4>
                </div>
                <div className="cropType">
                    <h4>Brown Rice</h4>
                </div>                
                <div className="cropPrice">
                    <h4>Rs 200/KG</h4>
                </div>
            </div>
        </div>
    )
}

export default ProducerCard