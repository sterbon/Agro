import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CropCatalogPage.css';
import FilterAccordian from '../components/FilterAccordian/FilterAccordian';
import CropCatalogCard from '../components/CropCatalogCard/CropCatalogCard';
import SecondaryNav from '../components/SecondaryNav/SecondaryNav';
import {
    buyCrop
} from '../scatter/scatter_actions';

import {
    getCropDetailsTable,
} from '../scatter/scatter_helper';

class CropCatalogPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cropCatalogList: {},
        }
        
        getCropDetailsTable()
        .then((result) => {
            Object.values(result.rows).forEach((crop) => {
                if(!crop.sold) {
                    const cropName = crop.cropName.trim();
                    const { cropCatalogList } = this.state;
                    if(cropName in cropCatalogList) {
                        cropCatalogList[cropName].producer.push(crop.producer);
                        cropCatalogList[cropName].cropAmount.push(crop.cropAmount);
                        cropCatalogList[cropName].price.push(crop.price);
                        
                        this.setState({ cropCatalogList });
                    }
                    else{
                        this.setState({ 
                            cropCatalogList : {
                                ...cropCatalogList,
                                [cropName] : {
                                    producer: [crop.producer],
                                    cropAmount: [crop.cropAmount],
                                    price: [crop.price],
                                }
                            }
                        });
                    }
                }
            })
        });
    }
    
    render() {
        
        console.log("Render Catalog", this.state.cropCatalogList);
        
        let CropCatalogElement = null;

        if(Object.keys(this.state.cropCatalogList).length !== 0){
            CropCatalogElement = Object.keys(this.state.cropCatalogList).map((cropName) => {
                return (
                    <CropCatalogCard 
                        key={cropName}
                        cropName={cropName}
                        details={this.state.cropCatalogList[cropName]} 
                        buyCrop={(productId)=>{this.props.dispatch(buyCrop(productId))}}
                    />
                )
            });    
        }
        else{
            CropCatalogElement = <p>No Crops</p>;
        }
        
        return (
            <React.Fragment>
                {/* <button onClick={()=>{this.props.dispatch(buyCrop())}}>Buy Crop</button> */}
                <SecondaryNav />    
                <div className="cropCatalogContainer">
                    <div className="cropCatalogFilter">
                        <h3>FILTER</h3>
                        <FilterAccordian />
                    </div>
                    <div className="cropCatalogGrid">
                        { CropCatalogElement }
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CropCatalogPage);