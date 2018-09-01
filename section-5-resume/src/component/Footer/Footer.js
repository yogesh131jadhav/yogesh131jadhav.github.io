import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "articles":""
    };
    this.count = 0;
  }

  render() {
    return (
      <footer>&copy; Yogesh</footer>
    );
  }
}

export default Footer;
