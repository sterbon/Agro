import React, { Component } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import './CropCatalogCard.css';
import productImage from '../../static/images/atta.jpeg'

class CropCatalogCard extends Component {
    render() {
        const { cropName, details } = this.props;

        console.log("Details at card: ", details)
        let MultipleChoice = null;
        if(Object.keys(details).length !== 0) {
            MultipleChoice = Object.keys(details.producer).map((i) => {
                return(
                    <span key={i}>
                        <hr/>
                        <Card.Meta>Producer {Number(i)+1}: { details.producer[i] }</Card.Meta>
                        <Card.Meta>R. { details.price[i] } per Kg</Card.Meta>
                        <Card.Meta>Amount: { details.cropAmount[i] } Kg</Card.Meta>
                    </span>
                );
            })
        }
        else {
            MultipleChoice = <p>No producers currently.</p>
        }
        return (
            <Card>
                <Card.Content>
                    <Card.Header>{ cropName }</Card.Header>
                    { MultipleChoice }
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                    <Button basic 
                        color='green'
                        // onClick={()=> this.props.buyCrop(productId)}
                    >
                        Buy Crop
                    </Button>
                    </div>
                </Card.Content>
            </Card>
        );
    }
}

export default CropCatalogCard;