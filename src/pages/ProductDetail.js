import React, { Component } from 'react';
import './ProductDetail.css';
import { Image, Button, Dropdown, Input } from 'semantic-ui-react'
import addProduct from '../static/images/atta.jpeg';
import SecondaryNav from '../components/SecondaryNav/SecondaryNav';

class ProductDetail extends Component {
    render() {
        const { cropName, details } = this.props.location.state;
        console.log("Details at product page: ", cropName, details);

        const friendOptions = [
            {
                key: 'Jenny Hess',
                text: 'Jenny Hess',
                value: 'Jenny Hess',
            },
            {
                key: 'Elliot Fu',
                text: 'Elliot Fu',
                value: 'Elliot Fu',
            },
            {
                key: 'Stevie Feliciano',
                text: 'Stevie Feliciano',
                value: 'Stevie Feliciano',
            }
        ]

        return (
            <React.Fragment>
                <SecondaryNav />
                <section className="productDetail">
                    <div className="productDetail-text">
                        <div className="addProduct-img">
                            <Image src={addProduct} size='large' rounded />
                        </div>
                    </div>

                    <div className="productDetail-container">
                        <h3 className="subcat">Rice</h3>
                        <h2 className="productName">Shakti Bhog Chakki Fresh Atta</h2>
                        <div className="productPrice">
                            <h4>Rs. 500</h4>
                        </div>
                        <h5 className="productDescrip">
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                            The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
                            Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
                </h5>
                        <div className="addToCart">
                            <Button className="cta" fluid>ADD TO CART</Button>
                        </div>
                        <div className="productQuantity">
                            <h4>Quantity</h4>
                            <Input
                                label={{ basic: true, content: 'kg' }}
                                labelPosition='right'
                                placeholder='Enter weight...'
                            />
                        </div>
                        <div className="selectProducer">
                            <h4>Quantity</h4>
                            <Dropdown
                                placeholder='Select Producer'
                                fluid
                                selection
                                options={friendOptions}
                            />
                        </div>
                        <h4 className="misc-header">About the Product</h4>
                        <div className="productMisc">
                            <div className="productMisc-label">
                                <p>Quantity:</p>
                                <p>Brand:</p>
                                <p>Manufacturer:</p>
                            </div>

                            <div className="productMisc-text">
                                <p>5 KG</p>
                                <p>Shakti Bhog</p>
                                <p>Shakti Bhog</p>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}

export default ProductDetail;