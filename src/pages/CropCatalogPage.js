import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CropCatalogPage.css';
import FilterAccordian from '../components/FilterAccordian/FilterAccordian';
import CropCatalogCard from '../components/CropCatalogCard/CropCatalogCard';
import {
    buyCrop
} from '../scatter/scatter_actions';

import {
    getCropDetailsTable,
} from '../scatter/scatter_helper';

class CropCatalogPage extends Component {
    state = {
        cropsList: [],
    }

    render() {
        getCropDetailsTable()
        .then((result) => {
            this.setState({ cropsList : result.rows });
        });
        const CropCatalogList = Object.values(this.state.cropsList).map((crop) => {
            if(!crop.sold) {
                return <CropCatalogCard crop={crop} />
            }
            return;
        });

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