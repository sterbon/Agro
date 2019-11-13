import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react';
import './CropCatalogCard.css';

class CropCatalogCard extends Component {
    render() {
        const { cropName, details } = this.props;

        return (
            <Card>
                <Image src={details.cropImage} wrapped ui={false}/>
                <Card.Content>
                    <Card.Header>{ cropName }</Card.Header>
                </Card.Content>
                <Card.Content extra>
                    <Link to={{ pathname: '/product', state: { cropName, details } }}>    
                      <div className='ui two buttons'> 
                        <Button inverted 
                            color='blue'
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