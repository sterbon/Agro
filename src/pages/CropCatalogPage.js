import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CropCatalogPage.css';
import FilterAccordian from '../components/FilterAccordian/FilterAccordian';
import CropCatalogCard from '../components/CropCatalogCard/CropCatalogCard';
import {
    getCropDetailsTable,
    buyCrop
} from '../scatter/scatter_actions';

class CropCatalogPage extends Component {

    render() {
        // this.props.dispatch(buyCrop());
        this.props.dispatch(getCropDetailsTable());
        const CropDetailsList = [
            {
                name: 'Rice',
                price: '20000',
                description: 'callback is invoked with three arguments: the value of the element, the index of the element, and the Array object being traversed.'
            },
            {
                name: 'Chilli',
                price: '2000',
                description: 'callback is invoked with three arguments: the value of the element, the index of the element, and the Array object being traversed.'
            },
            {
                name: 'Wheat',
                price: '20000',
                description: 'callback is invoked with three arguments: the value of the element, the index of the element, and the Array object being traversed.'
            },
            {
                name: 'Coffee',
                price: '50000',
                description: 'callback is invoked with three arguments: the value of the element, the index of the element, and the Array object being traversed.'
            },
            {
                name: 'Tea',
                price: '10000',
                description: 'callback is invoked with three arguments: the value of the element, the index of the element, and the Array object being traversed.'
            },
            {
                name: 'X',
                price: '200',
                description: 'callback is invoked with three arguments: the value of the element, the index of the element, and the Array object being traversed.'
            },
        ];
    
        const CropCatalogList = CropDetailsList.map((crop) => 
            <CropCatalogCard crop={crop} />
        );

        return (
            <React.Fragment>
                <button onClick={()=>{this.props.dispatch(buyCrop())}}>Buy Crop</button>
                    
                <div className="cropCatalogContainer">
                    <div className="cropCatalogFilter">
                        <h3>FILTER</h3>
                        <FilterAccordian />
                    </div>
                    <div className="cropCatalogGrid">
                        { CropCatalogList }
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