import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react';
import './CropCatalogCard.css';
import Grain from '../../static/images/Grain.jpg'

class CropCatalogCard extends Component {
    render() {
        const { cropName, details } = this.props;

        let MultipleChoice = null;
        // if(Object.keys(details).length !== 0) {
        //     MultipleChoice = Object.keys(details.producer).map((i) => {
        //         return(
        //             <span key={i}>
        //                 <hr/>
        //                 <Card.Meta>Producer {Number(i)+1}: { details.producer[i] }</Card.Meta>
        //                 <Card.Meta>Rs. { details.price[i] } per Kg</Card.Meta>
        //                 <Card.Meta>Amount: { details.cropAmount[i] } Kg</Card.Meta>
        //             </span>
        //         );
        //     })
        // }
        // else {
        //     MultipleChoice = <p>No producers currently.</p>
        // }
        return (
            <Card>
                <Image src={Grain} wrapped ui={false}/>
                <Card.Content>
                    <Card.Header>{ cropName }</Card.Header>    
                    { MultipleChoice }
                </Card.Content>
                <Card.Content extra>
                    <Link to={{ pathname: '/product', state: { cropName, details } }}>    
                      <div className='ui two buttons'> 
                        <Button inverted 
                            color='blue'
                            // onClick={()=> this.props.buyCrop(productId)}
                        >
                            View Crop Details
                        </Button>
                      </div>
                    </Link>
                </Card.Content>
            </Card>
        );
    }
}

export default CropCatalogCard;