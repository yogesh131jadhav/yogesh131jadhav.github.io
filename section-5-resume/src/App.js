import React, { Component } from 'react';
import './App.css';
import LandingPage from './component/landing-page/landing-page';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "landingPage" : ""
    };
  }
  componentDidMount() {
    fetch(`https://yogeshkrishnajadhav.github.io/stub/personalDetails.json`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({landingPage: result});
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
  }
  render() {
    return (
      <div className="App">
        <LandingPage serviceData={this.state.landingPage}/>
      </div>
    );
  }
}

export default App;
