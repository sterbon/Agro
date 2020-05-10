import React from 'react'


const Spinner = (props) => {
    return <div className="ui active inverted dimmer">
        {/* <div className="ui huge text loader"> {props.msg || 'Loading...'}</div> */}
        <div className="ui huge text loader"> {props.msg}</div>
      </div>;
};

Spinner.defaultProps = {
    msg: 'Loading...'
}
export default Spinner;