import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { AUTH_TOKEN } from "../constants";
import "../Styles/Header.css";

class Header extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    return (
      <div className="header">
        <div className="menu">
          <Link to="/" className="logo">Share With Me</Link>
          <div className="menu-2">
            <Link to="/" className="new">
              new
            </Link>
            <Link to="/top" className="top">
              top
            </Link>
            <Link to="/search" className="search">
              search
            </Link>
            {/* only loged in user: if authToken is not available */}
            {authToken && (
              <Link to="/create" className="submit">
                Share
              </Link>
            )}
          </div>
        </div>
        <div className="login">
          {authToken ? (
            <div
              className="logout-1"
              onClick={() => {
                localStorage.removeItem(AUTH_TOKEN);
                this.props.history.push(`/`);
              }}
            >
              logout
            </div>
          ) : (
            <Link to="/login" className="login-1">
              login
            </Link>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
