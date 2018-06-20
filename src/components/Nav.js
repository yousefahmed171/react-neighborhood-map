import React, { Component } from 'react';


class Nav extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this);
  }

  render() {
    let menuText = this.props.sidebarOpen ? "Close" : "Open";
    return (
      <div id="navbar">
        <h3 id="head-text">Neighborhood Maps</h3>
        <h3 id="menu-text" className="transition" title={ menuText + " Sidebar" }
          onClick={() => { this.props.toggleSideBar(!this.props.sidebarOpen) }}>
          { menuText }
        </h3>
      </div>
    );
  }
}

export default Nav;
