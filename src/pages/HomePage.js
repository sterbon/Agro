import React, { Component } from 'react';
import Hero from '../components/Hero/Hero';
import Features from '../components/Features/Features';
import './HomePage.css';

class HomePage extends Component {
    render() {
        return (
            <React.Fragment>
                <header className="App-header"> 
                    <Hero />
                    <Features />
                </header>
            </React.Fragment>
        );
    }
}

export default HomePage;