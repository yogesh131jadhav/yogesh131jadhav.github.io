import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {};
    this.submitForm = this.submitForm.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  submitForm() {
    alert("Test");
    console.log(this.state);
  }

  _onChange(e) {
    var state = {};
    state[e.target.name] =  e.target.value;
    this.setState(state);
  }

  render() {
    let data = "";
    if(this.state.fname || this.state.lname) {
      data = "Entered Name is " + (this.state.fname ? this.state.fname: "") + " " + (this.state.lname ? this.state.lname:"");
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <h1 className="App-title">This example is to handle form data</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        https://reactjs.org/docs/forms.html<br/>
        https://blog.revathskumar.com/2015/07/submit-a-form-with-react.html<br/>
        <input type="text" name="fname" id="name" placeholder="First Name" onChange={this._onChange}/><br/><br/>
        <input type="text" name="lname" id="lname" placeholder="Last Name" onChange={this._onChange}/><br/><br/>
        <button onClick={this.submitForm}> Submit </button><br/>
        {data}
      </div>
    );
  }
}

export default App;
