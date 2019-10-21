import React, { Component } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import './CropCatalogCard.css';
import productImage from '../../static/images/atta.jpeg'

class CropCatalogCard extends Component {
    render() {
        console.log(this.props.crop);
        const { productId, cropName, price, cropAmount } = this.props.crop;
        return (
            <Card>
                <Image src={productImage} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{ cropName }</Card.Header>
                    <Card.Meta>Rs. { price }</Card.Meta>
                    <Card.Meta>{ cropAmount } Kg</Card.Meta>
                    <Card.Description>
                        lorem ipsum
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                    <Button basic 
                        color='green'
                        onClick={()=> this.props.buyCrop(productId)}
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