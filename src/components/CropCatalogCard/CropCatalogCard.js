import React, { Component } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';

class CropCatalogCard extends Component {
    render() {
        const { name, price, description } = this.props.crop;
        return (
            <Card>
                <Card.Content>
                    {/* <Image
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                    /> */}
                    <Card.Header>{ name }</Card.Header>
                    <Card.Meta>Rs. { price }</Card.Meta>
                    <Card.Description>
                        { description }
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                    <Button basic color='green'>
                        Show Crop Detail
                    </Button>
                    </div>
                </Card.Content>
            </Card>
        );
    }
}

export default CropCatalogCard;