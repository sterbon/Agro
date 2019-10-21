import React from 'react'
import './OrderTimeline.css'

function OrderTimeline(){
    return(
            
            <div className="timeline-container">
                <div id="content">
                <h1>Know Your Food Grain Supply Chain</h1>
                <div className="search-container">
                    <div className="searchbox">
                        <button className="btn-menu">
                        </button>
                        <input id="search" type="text" placeholder="Enter Product ID" name="search" className="search" />
                        <button  className="btn-search">
                            <img src="https://img.icons8.com/cotton/24/000000/search--v2.png" />
                        </button>
                    </div>
                </div>
                <ul className="timeline">
                    <li className="event" data-date="12:30 - 1:00pm">
                    <h3>Registration</h3>
                    <p>Get here on time, it's first come first serve. Be late, get turned away.</p>
                    <p>Get here on time, it's first come first serve. Be late, get turned away.</p>
                    <p>Get here on time, it's first come first serve. Be late, get turned away.</p>
                    </li>
                    <li className="event" data-date="2:30 - 4:00pm">
                    <h3>Opening Ceremony</h3>
                    <p>Get ready for an exciting event, this will kick off in amazing fashion with MOP & Busta Rhymes as an opening show.</p>    
                    </li>
                    <li className="event" data-date="5:00 - 8:00pm">
                    <h3>Main Event</h3>
                    <p>This is where it all goes down. You will compete head to head with your friends and rivals. Get ready!</p>    
                    </li>
                    <li className="event" data-date="8:30 - 9:30pm">
                    <h3>Closing Ceremony</h3>
                    <p>See how is the victor and who are the losers. The big stage is where the winners bask in their own glory.</p>    
                    </li>
                </ul>
                </div>
            </div>
    )
}

export default OrderTimeline;