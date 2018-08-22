import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      "myName":""
    }
  }

  componentDidMount(){
    fetch(`https://yogeshkrishnajadhav.github.io/stub/personalDetails.json`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({myName: result.personalDetails});
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
  }

  render() {
    var inlineStyle = {
      "paddingBottom": '80px'
    }
    var output = <div>
      <h1>{this.state.myName.name}</h1>
      <h1>{this.state.myName.position}</h1>
      <h1>{this.state.myName.experience}</h1>
      <h1>{this.state.myName.mail}</h1>
      <h1>{this.state.myName.phone}</h1>
      <h1>{this.state.myName.education}</h1>
      <h1>{this.state.myName.location}</h1>
    </div>;
    return (
      <div className="App">
        <header className="App-header" style={inlineStyle}>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <h1 className="App-title">What I Learned from this tutorial</h1>
          <ul>
            <li>Use of Ajax Call and Interact with data</li>
          </ul>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.<br/>
        </p>
        {output}
      </div>
    );
  }
}

export default App;
