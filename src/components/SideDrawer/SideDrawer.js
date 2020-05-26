import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './SideDrawer.css';

class SideDrawer extends Component {
  render() {
    let drawerClass = "side-drawer";
    if(this.props.show) {
      drawerClass = "side-drawer open";
    }
    return (
        <nav className={drawerClass}>
          {/* <div className="side-alalogo">
            <img src={logo} width="170px" height="170px" />
          </div> */}
          <div className="side-alalogo">
            <h1 
                className="logo"
                onClick={() => {
                    this.props.history.push('/Agro');
                    this.props.click();
                }}
            >
                Agro
            </h1>
          </div>
          <ul>
            <li className="catalog">
              <a
                onClick={() => {
                    this.props.history.push('/crop_catalog');
                    this.props.click();
                }}
              >
                Catalog
                <i className="arrow right"></i>
              </a>
            </li>
            {
                this.props.loggedIn ? 
                <React.Fragment>
                    <li className="upload_crops">
                    <a
                        onClick={() => {
                            this.props.history.push('/add_crop');
                            this.props.click();
                        }}
                    >
                            Upload Crops
                            <i className="arrow right"></i>
                        </a>
                    </li>
                    <li className="transaction"> 
                    <a
                        onClick={() => {
                            this.props.history.push('/orders');
                            this.props.click();
                        }}
                    >
                            Transaction
                            <i className="arrow right"></i>
                        </a>
                    </li>
                </React.Fragment> :
                <React.Fragment></React.Fragment>
            }
            <li className="track">
                <a
                    onClick={() => {
                        this.props.history.push('/crop_tracking');
                        this.props.click();
                    }}
                >
                Track
                <i className="arrow right"></i>
              </a>
            </li>
            <li className="import_account">
                <a
                    onClick={() => {
                        this.props.history.push('/import_account');
                        this.props.click();
                    }}
                >
                Import account
                <i className="arrow right"></i>
              </a>
            </li>
            <li className="about">
                <a
                    onClick={() => {
                        this.props.history.push('/about');
                        this.props.click();
                    }}
                >
                About
                {/* <i className="arrow right"></i> */}
              </a>
            </li>
          </ul>
        </nav>
    );
  }
}

export default withRouter(SideDrawer);