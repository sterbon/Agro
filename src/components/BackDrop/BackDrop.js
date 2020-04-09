import React from 'react';
import './BackDrop.css';

export default props => (
    <div className="backdrop" onClick={props.click}/>
);
