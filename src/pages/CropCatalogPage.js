import React, { Component } from 'react';
import './CropCatalogPage.css';
import FilterAccordian from '../components/FilterAccordian/FilterAccordian';
import CropCatalogCard from '../components/CropCatalogCard/CropCatalogCard';
import SecondaryNav from '../components/SecondaryNav/SecondaryNav';
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
            // console.log("Rows: ", result.rows);

            Object.values(result.rows).forEach((crop) => {
                // if(!crop.sold) {
                    const cropName = crop.cropName.trim();
                    const { cropCatalogList } = this.state;
                    if(cropName in cropCatalogList) {
                        cropCatalogList[cropName].productId.push(crop.productId);
                        cropCatalogList[cropName].producer.push(crop.producer);
                        cropCatalogList[cropName].cropAmount.push(crop.cropAmount);
                        cropCatalogList[cropName].price.push(crop.price);
                        cropCatalogList[cropName].dateOfHarvest.push(crop.dateOfHarvest);
                        cropCatalogList[cropName].dateOfSow.push(crop.dateOfSow);
                        cropCatalogList[cropName].fertilizers.push(crop.fertilizers);
                        cropCatalogList[cropName].sold.push(crop.sold);
                        
                        this.setState({ cropCatalogList });
                    }
                    else{
                        this.setState({ 
                            cropCatalogList : {
                                ...cropCatalogList,
                                [cropName] : {
                                    productId: [crop.productId],
                                    producer: [crop.producer],
                                    cropAmount: [crop.cropAmount],
                                    price: [crop.price],
                                    dateOfHarvest: [crop.dateOfHarvest],
                                    dateOfSow: [crop.dateOfSow],
                                    fertilizers: [crop.fertilizers], 
                                    sold: [crop.sold],                                   
                                }
                            }
                        });
                    }
                // }
            })
        });
    }
    
    render() {
        // console.log("Render Catalog", this.state.cropCatalogList);
        
        let CropCatalogElement = null;

        if(Object.keys(this.state.cropCatalogList).length !== 0){
            CropCatalogElement = Object.keys(this.state.cropCatalogList).map((cropName) => {
                return (
                    <CropCatalogCard 
                        key={cropName}
                        cropName={cropName}
                        details={this.state.cropCatalogList[cropName]} 
                    />
                )
            });    
        }
        else{
            CropCatalogElement = <p>Loading...</p>;
        }
        
        return (
            <React.Fragment>
                <SecondaryNav />    
                <div className="cropCatalogContainer">
                    {/* <div className="cropCatalogFilter">
                        <h3>FILTER</h3>
                        <FilterAccordian />
                    </div> */}
                    <div className="cropCatalogGrid">
                        { CropCatalogElement }
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default CropCatalogPage;