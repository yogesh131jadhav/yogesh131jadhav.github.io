import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      myName: "test"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClickHere=this.handleClickHere.bind(this);
  }

  handleChange(event) {
    this.setState({myName: event.target.value});
  }

  handleClickHere(event) {
    console.log("this is example of passing data from child to parent");
    this.setState({
      myName: "Yogesh"
    });
  }

  render() {
    return (
      <div className="App">
        <input type="text" value={this.state.myName} onChange={this.handleChange}/><br/>
        {this.state.myName}
      </div>
    );
  }
}

export default App;
