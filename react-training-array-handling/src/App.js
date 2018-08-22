import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.myJson = [{
      "fname":"Yogesh",
      "lname":"Jadhav"
    },{
      "fname":"Pramila",
      "lname":"Jadhav"
    },{
      "fname":"Shinchan",
      "lname":"Nohara"
    }];
    this.myArray = ['test', 'best', 'cest', 'nest'];
  }

  render() {
    var inlineStyle = {
      "paddingBottom": '110px'
    }
    var condition = "test";
    var list = this.myJson.map((val, index) =>
      <li key={index}>
        <b>First Name</b>: {val.fname}<br/>
        <b>Last Name</b>: {val.lname}
      </li>
    );
    var arrayList = this.myArray.map((vals, index)=>
      <li key={index}>{vals}</li>
    )
    return (
      <div className="App">;
        <header className="App-header" style={inlineStyle}>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <h1 className="App-title">What I Learned from this tutorial</h1>
          <ul>
            <li>Use of Array and Json</li>
            <li>Use of Inline Style</li>
            <li>Inline if condition</li>
          </ul>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <br/> True condition: 
          {condition == 'test' && 
            <span>This is inline condition scenario</span>
          }
          <br/> Wrong condition: 
          {condition == 'test1' && 
            <span>This is inline condition scenario</span>
          }
        </p>
        <h1>Use of JSON</h1>
        <ul>{list}</ul>
        <h1>Use of Array</h1>
        <ol>{arrayList}</ol>
      </div>
    );
  }
}

export default App;
