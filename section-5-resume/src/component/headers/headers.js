import React, { Component } from 'react';
import './headers.css';

class Headers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "personalDetails":""
    };
    this.count = 0;
  }
  render() {
    if(this.props.personalDetails && this.count == 0) {
      this.state.personalDetails = this.props.personalDetails;
      this.count++;
    }
    return (
      <header className="bgColorPrimary padTopBottom50">
        <div className="container">
          <div className="row colorWhite posRel">
            <div className="col-md-3">
              <div className="personalDP colorPrimary">
                <i className="fa fa-user-circle-o"></i>
              </div>
            </div>
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-5">
                  <div className="padRightLeft20">
                    <h1>{this.state.personalDetails.name}</h1>
                    <h5>{this.state.personalDetails.position}</h5>
                    <h5>{this.state.personalDetails.experience}</h5>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="padRightLeft20 padTop20 personalDetails">
                    <div><i className="fa fa-address-card"></i> {this.state.personalDetails.mail}</div>
                    <div><i className="fa fa-mobile"></i> {this.state.personalDetails.phone}</div>
                    <div><i className="fa fa-graduation-cap"></i> {this.state.personalDetails.education}</div>
                    <div><i className="fa fa-map-marker"></i> {this.state.personalDetails.location}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Headers;
