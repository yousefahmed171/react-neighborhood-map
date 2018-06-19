import React, { Component } from 'react';


class Sidebar extends Component {
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
      <div className="">

      </div>
    );
  }
}

export default Sidebar;
