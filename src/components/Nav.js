import React, { Component } from 'react';


class Nav extends Component {
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
      <div id="navbar">
        <h3 id="head-text">Neighborhood Maps</h3>
      </div>
    );
  }
}

export default Nav;
