import React from 'react';
import './HowitWorks.css';
import buy from '../../static/images/buy.png'
import explore from '../../static/images/explore.png'
import upload from '../../static/images/upload.png'

function HowitWorks()
{
    return(
        <div className="how-container">
            <h1>How It Works</h1>
            <section className="how">
            <div className="how-text">
                <h2>Upload</h2>
                <p className="how-para">Agro is the easiest and safest way to to sell crops online.
                    Discover new ways to monetize and scale your business online with Agro.</p>
            </div>
            <div className="how-img">
                <img src={upload} />
            </div>
        </section>

        <section className="how1 how1-small">
            <div className="how-text how-text-small">
                <h2>Explore</h2>
                <p className="how-para">Agro is best way to buy crops online.
                    Discover different types of food grains from farmers and vendors from all around India.</p>
            </div>
            <div className="how-img how-img-small">
                <img src={explore} />
            </div>
        </section>

        <section className="how how-small">
            <div className="how-text">
                <h2>Track</h2>
                <p className="how-para">Agro is the safest way to buy, sell crops online.
                   Track your crops at every step of the supply chain using our robust tracking functionality.</p>
            </div>
            <div className="how-img-buy">
                <img src={buy} />
            </div>
        </section>
        </div>
    )
}

export default HowitWorks;