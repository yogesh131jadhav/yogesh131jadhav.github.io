import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      "response" : {}
    };
  }

  componentDidMount() {
    fetch(`https://yogeshkrishnajadhav.github.io/stub/personalDetails.json`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({response: result.personalDetails});
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
  }

  render() {
    let personalDetails = <div>
      <h1>{this.state.response.name}</h1>
    </div>;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {personalDetails}
      </div>
    );
  }
}

export default App;
