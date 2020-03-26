import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';
import gif from '../../static/images/farmer.png';
import LoginPage from '../../pages/LoginPage'

function Hero()
{
    return(
        <section className="hero">
            <div className="hero-text">
                <h2>Agro is the Effortless Blockchain Supply Chain Platform</h2>
                <p className="hero-para">Agro is the easiest and safest way to buy, sell crops online.
                   Discover new ways to monetize and scale your business online with Agro.</p>
                <div className="cta-container">
                    <Link to="/crop_catalog"><button className="cta">Explore Catalog</button></Link>
                </div>
            </div>

            <div className="hero-img">
                <img src={gif} />
            </div>
        </section>
    )
}

export default Hero;