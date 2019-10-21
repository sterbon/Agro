import React from 'react';
import './SecondaryNav.css'

function SecondaryNav(){
    return(
        <header className="secondary-nav-container">
            <h1 className="secondary-logo">Agro</h1>
            <nav>
                <ul className="secondary-nav_links-container">
                    <li className="secondary-nav_links"><a className="secondary-nav_text" href="#">Home</a></li>
                    <li className="secondary-nav_links"><a className="secondary-nav_text" href="#">Why Us</a></li>
                    <li className="secondary-nav_links"><a className="secondary-nav_text" href="#">How It Works</a></li>
                </ul>
            </nav>
            <a href="#"><button className="secondary-cta">Login</button></a>
        </header>
    )
}

export default SecondaryNav;