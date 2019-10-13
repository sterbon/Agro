import React from 'react';
import './Hero.css';
import gif from '../../static/images/hero.gif'

function Hero()
{
    return(
        <section className="hero">
            <div className="hero-text">
                <h2>Buy, Sell, Crops</h2>
                <h2>Digitally</h2>
                <p className="hero-para">Agro is the easiest and safest way to buy, sell crops online.
                   Discover new ways to monetize and scale your business online with Agro.</p>
                <button className="get-started">Get Started</button>
            </div>

            <div className="hero-gif">
                <img src={gif} alt="temp"/>
            </div>
        </section>
    )
}

export default Hero;