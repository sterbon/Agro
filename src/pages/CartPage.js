import React, { Component } from 'react';
import SecondaryNav from '../components/SecondaryNav/SecondaryNav';
import './CartPage.css';

class CartPage extends Component {
    render() {
        return (
            <React.Fragment>
                <SecondaryNav />
                <div>
                    My Cart
                </div>
            </React.Fragment>            
        );
    }
}

export default CartPage;