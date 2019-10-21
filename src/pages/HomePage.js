import React, { Component } from 'react';
import Nav from '../components/Nav/Nav';
import Hero from '../components/Hero/Hero';
import Features from '../components/Features/Features';
import HowitWorks from '../components/HowitWorks/HowitWorks';
import './HomePage.css';

class HomePage extends Component {
    render() {
        return (
            <React.Fragment>
                <header className="landingPage-container"> 
                    <Nav />
                    <Hero />
                    <Features />
                    <HowitWorks />
                </header>
            </React.Fragment>
        );
    }
}

export default HomePage;