import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import GoogleApiWrapper from './components/Map'
import Nav from './components/Nav'
import Sidebar from './components/Sidebar'



class App extends Component {
  constructor() {
    super();
    this.state = {
      markers: {}
    }
  }

  componentDidMount() {
    console.log(this);
  }

  render() {
    return (
      <div id="app-container">
        <Nav />

        <GoogleApiWrapper />
      </div>
    );
  }
}

export default App;
