import React, { Component } from 'react';
import './landing-page.css';
import Headers from '../headers/headers';
import Sections from '../sections/sections';
import Footer from '../Footer/Footer';

class landingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "personalDetails":""
    };
    this.count = 0;
  }
  render(props) {
    if(this.props.serviceData.personalDetails && this.count == 0) {
      this.setState({personalDetails : this.props.serviceData.personalDetails});
      this.setState({articles : this.props.serviceData.articles});
      this.count++;
    }
    return (
      <div className="landingPage">
        <Headers personalDetails={this.state.personalDetails}/>
        <Sections articles={this.state.articles}/>
        <Footer />
      </div>
    );
  }
}

export default landingPage;
