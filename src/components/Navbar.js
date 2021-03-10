import React, { Component } from 'react';
import './App.css';
class Navbar extends Component {

  render() {
    return (
        // <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        //   <a
        //     className="navbar-brand col-sm-3 col-md-2 mr-0"
        //     href="http://www.google.com"
        //     target="_blank"
        //     rel="nooperner noreferrer"
        //   >
        //   Luke Roznovsky
        //   </a>

        <nav className="navbar-expand-sm bg-light">
          <ul className="navbar-nav">
            <li className="nav-item">
                <a href="htpps://www.google.com" className="nav-link">[NAME]</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="htpps://www.google.com">Home</a>
            </li>
            <li className="nav-item">
              <a href="htpps://www.google.com" className="nav-link">About</a>
            </li>
            <li className="nav-item">
              <a href="htpps://www.google.com" className="nav-link">Contact</a>
            </li>
            <li className="nav-item ml-auto">
              <p id="account" class="accountName">{this.props.account}</p>
            </li>
          </ul>
        </nav>

    );
  }
}

export default Navbar;
