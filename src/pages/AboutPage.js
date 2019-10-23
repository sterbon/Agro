import React, { Component } from 'react';
import SecondaryNav from '../components/SecondaryNav/SecondaryNav';
import './AboutPage.css';

class AboutPage extends Component {
    render() {
        return (
            <React.Fragment>
                <SecondaryNav />
                <h3 className="about-title">About Agro</h3>
                <div className="about-content">
                    With a population of greater than 1.3 billion, India is the second most populous nation in the
                    world. And with such a big population, dividing and sustainable use of resources is necessary.
                    One of the most important resources for any country is food. Grains, fruits, vegetables, meats
                    are all important for any country and citizens but more so for a country with 50% population
                    below the age of 25. Also, being a developing nation, India needs a more robust, transparent,
                    faster, user-friendly way to handle the distribution of these resources which will reduce effective
                    transaction costs and also corruption.
                    Over the few decades, lot of research work on the issues in supply chain management has
                    been carried out in manufacturing and service sectors but little attention given to agriculture
                    sector and the flip side agriculture sector contributing major part of human livelihood in the
                    country like India and raw material for other industry. 
                    Using Blockchain to handle the supply chain of these food items hits all of these
                    checkboxes.
                    Blockchain will result in the supply chain being more robust, transparent, and cost-effective.
                </div>
            </React.Fragment>
        );
    }
}

export default AboutPage;