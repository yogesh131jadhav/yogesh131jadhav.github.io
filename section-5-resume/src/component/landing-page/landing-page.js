import React, { Component } from 'react';
import './landing-page.css';
import Headers from '../headers/headers';

class landingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render(props) {
    return (
      <div className="landingPage">
        <Headers personalDetails={this.props.serviceData.personalDetails}/>
      </div>
    );
  }
}

export default landingPage;
