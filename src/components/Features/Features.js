import React from 'react';
import './Features.css';
import penny from '../../static/images/penny.png'
import freedom from '../../static/images/freedom.png'
import open from '../../static/images/open.png'
import risk from '../../static/images/risk_free.png'
import safety from '../../static/images/safety.png'
import upgrade from '../../static/images/upgrade.png'

function Features()
{
    return(
<section className="features">
            <h1>Why Us</h1>
            <div className="features-grid-container">
                <div className="features-grid-top">
                    <div className="features-card">
                        <img src={penny} width="80px" height="80px"/>
                        <h3>Charge less than a penny</h3>
                        <p className="features-text">Explore microtransactions like never before and monetize any digital interaction</p>
                    </div>

                    <div className="features-card">
                        <img src={risk} width="80px" height="80px"/>
                        <h3>EOS, risk-free</h3>
                        <p className="features-text">Automatically convert bitcoin to your local currency at the time of transaction and avoid all price volatility.</p>
                    </div>

                    <div className="features-card">
                        <img src={safety} width="80px" height="80px"/>
                        <h3>Safety first</h3>
                        <p className="features-text">Know your funds are safe and sound with our cryptographically secure platform and 24hr customer support.</p>
                    </div>
                </div>

                <div className="features-grid-bottom">
                    <div className="features-card">
                        <img src={freedom} width="80px" height="80px"/>
                        <h3>Freedom from chargebacks</h3>
                        <p className="features-text">Never deal with chargebacks or holds again as every payment settles instantly.</p>
                    </div>

                    <div className="features-card">
                        <img src={open} width="80px" height="80px"/>
                        <h3>Open to the world</h3>
                        <p className="features-text">No bank account required. Internet access is all you need to start accepting bitcoin anywhere.</p>
                    </div>

                    <div className="features-card">
                        <img src={upgrade} width="80px" height="80px"/>
                        <h3>Upgrade to Lightning</h3>
                        <p className="features-text">Take advantage of bitcoin’s newest payment protocol and experience instant settlements and low fees.</p>
                    </div>
                </div>
            </div>
        
        </section>
    )
}

export default Features;