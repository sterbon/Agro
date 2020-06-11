import React, { Component } from 'react';
import './CropCatalogPage.css';
import FilterAccordian from '../components/FilterAccordian/FilterAccordian';
import CropCatalogCard from '../components/CropCatalogCard/CropCatalogCard';
import Spinner from '../components/Spinner';
import Grain from '../static/images/Grain.jpg'
import { getCropDetailsTable } from '../scatter/localWallet_helper';

import Unsplash, { toJson } from 'unsplash-js';

const KEY = "e7d3d4ff6d6694a54dc10ca8ddb7e32b8033a64b2e8971cbc27ac49ab2395f5e";

class CropCatalogPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cropCatalogList: {},
        }
        
        getCropDetailsTable()
        .then((result) => {
            console.log("Rows: ", result);

            Object.values(result.rows).forEach((crop) => {
                // if(!crop.sold) {
                    const cropName = crop.cropName.trim();
                    const unsplash = new Unsplash({ 
                        accessKey: KEY 
                    });
                    const query = `${cropName}`;
                    
                    unsplash.search.photos(query, 1, 4, { orientation: "landscape" })
                    .then(toJson)
                    .then(result => {
                        const { cropCatalogList } = this.state; 
                        let cropImage = Grain;
                        if(result.results[1].urls) {
                            // cropImage = result.results[0].urls.raw;
                            cropImage = result.results[3].urls.regular;
                        }
                        else{
                            cropImage = null;
                        }
                        
                        if(cropName in cropCatalogList) {
                            cropCatalogList[cropName].productId.push(crop.productId);
                            cropCatalogList[cropName].producer.push(crop.producer);
                            cropCatalogList[cropName].cropAmount.push(crop.cropAmount);
                            cropCatalogList[cropName].price.push(crop.price);
                            cropCatalogList[cropName].dateOfHarvest.push(crop.dateOfHarvest);
                            cropCatalogList[cropName].dateOfSow.push(crop.dateOfSow);
                            cropCatalogList[cropName].fertilizers.push(crop.fertilizers);
                            cropCatalogList[cropName].sold.push(crop.sold);
                            cropCatalogList[cropName].uploadDate.push(crop.uploadDate);
                            cropCatalogList[cropName].trackingLocation.push(crop.trackingLocation);
                            this.setState({ cropCatalogList });
                        }
                        else {
                            this.setState({ 
                                cropCatalogList : {
                                    ...cropCatalogList,
                                    [cropName] : {
                                        cropImage,
                                        productId: [crop.productId],
                                        producer: [crop.producer],
                                        cropAmount: [crop.cropAmount],
                                        price: [crop.price],
                                        dateOfHarvest: [crop.dateOfHarvest],
                                        dateOfSow: [crop.dateOfSow],
                                        fertilizers: [crop.fertilizers],
                                        uploadDate: [crop.uploadDate], 
                                        sold: [crop.sold],          
                                        trackingLocation: [crop.trackingLocation],                         
                                    }
                                }
                            });
                        }
                    }); 
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
            // CropCatalogElement = <p>Loading...</p>;
            CropCatalogElement = <Spinner/>
        }
        
        return (
            <React.Fragment>
 
                <div className="cropCatalog">
                    <h2 className="cropCatalogHeader">Stock Catalog</h2> 
                    <div className="cropCatalogContainer">
                        {/* <div className="cropCatalogFilter">
                            <h3>FILTER</h3>
                            <FilterAccordian />
                        </div> */}
                        <div className="cropCatalogGrid">
                            { CropCatalogElement }
                        </div>
                    </div>
                </div>
                
            </React.Fragment>
        );
    }
}

export default CropCatalogPage;